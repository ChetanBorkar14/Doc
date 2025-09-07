import { MongoClient, ServerApiVersion, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/doctor_dashboard";

declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined;
}

let client: MongoClient;

export async function getMongoClient(): Promise<MongoClient> {
  if (!global.__mongoClient) {
    global.__mongoClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  client = global.__mongoClient;
  if (!client.db) {
    await client.connect();
  }
  return client;
}

export async function getDb(dbName = process.env.MONGODB_DB || "doctor_dashboard"): Promise<Db> {
  const c = await getMongoClient();
  return c.db(dbName);
}

export function collection<T extends Document>(db: Db, name: string): Collection<T> {
  return db.collection<T>(name);
}


