import { NextRequest } from "next/server";
import { getDb, collection } from "@/lib/db";

export async function GET(_req: NextRequest) {
  const db = await getDb();
  const patientsCol = collection<any>(db, "patients");

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();

      // Send a comment to keep the connection open
      controller.enqueue(encoder.encode(`:ok\n\n`));

      // Use change streams if available
      let changeStream: any;
      try {
        changeStream = patientsCol.watch([], { fullDocument: "updateLookup" });
        for await (const change of changeStream as any) {
          if (change.operationType === "insert") {
            const data = JSON.stringify({ type: "insert", doc: change.fullDocument });
            controller.enqueue(encoder.encode(`event: message\n`));
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }
      } catch {
        // Fallback: polling every 5s for latest patients
        let lastCount = await patientsCol.countDocuments();
        const interval = setInterval(async () => {
          const count = await patientsCol.countDocuments();
          if (count > lastCount) {
            const latest = await patientsCol
              .find({})
              .sort({ _id: -1 })
              .limit(count - lastCount)
              .toArray();
            for (const doc of latest) {
              const data = JSON.stringify({ type: "insert", doc });
              controller.enqueue(encoder.encode(`event: message\n`));
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
            lastCount = count;
          }
        }, 5000);

        (controller as any)._cleanup = () => clearInterval(interval);
      }
    },
    cancel(reason) {
      const cleanup = (this as any)._cleanup;
      if (cleanup) cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}


