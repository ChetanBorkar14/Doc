
export const db = {
  users: [
    {
      user_id: "usr_001",
      device_id: "dev_12345",
      name: "Ravi Sharma",
      phone_number: "+91-9876543210",
      address: {
        village: "Sangrur",
        district: "Patiala",
        state: "Punjab",
        pincode: "148001",
      },
      preferred_language: "pa",
      created_at: "2025-08-01T09:00:00Z",
      last_login: "2025-09-06T07:00:00Z",
    },
    // Add more users as needed
  ],
  patients: [
    {
      patient_id: "pat_001",
      user_id: "usr_001",
      doctor_id: "doc_123",
      name: "Suman Sharma",
      relation_to_user: "Mother",
      dob: "1960-05-10",
      gender: "Female",
      blood_group: "O+",
      medical_history: {
        chronic_conditions: ["Diabetes"],
        allergies: ["Penicillin"],
        past_surgeries: [],
      },
      uploaded_reports: [
        {
          report_id: "rep_001",
          title: "Blood Sugar Report",
          file_url: "https://cloud/reports/rep_001.pdf",
          uploaded_at: "2025-08-30T10:00:00Z",
        },
      ],
      consultations: [
        {
          consult_id: "cons_001",
          doctor_id: "doc_123",
          diagnosis: "Viral Fever",
          prescription_id: "pres_001",
          date: "2025-09-01",
        },
      ],
    },
    // Add more patients as needed
  ],
  doctors: [
    {
      doctor_id: "doc_123",
      name: "Dr. Arjun Mehta",
      specialization: "General Physician",
      qualifications: ["MBBS", "MD (Internal Medicine)"],
      registration_no: "PMC/2020/5678",
      hospital_affiliation: "Civil Hospital Nabha",
      availability: {
        consultation_modes: ["Video", "In-Person"],
        working_days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        working_hours: {
          start_time: "09:00",
          end_time: "15:00",
        },
      },
      patients_seen: [
        {
          patient_id: "pat_001",
          visit_date: "2025-09-01",
          diagnosis: "Viral Fever",
          prescription_id: "pres_001",
        },
      ],
      prescriptions: [
        {
          prescription_id: "pres_001",
          patient_id: "pat_001",
          issued_on: "2025-09-01",
          medicines: [
            {
              medicine_id: "med_001",
              name: "Paracetamol",
              dosage: "500mg",
              instructions: "Take 1 tablet every 6 hours",
            },
          ],
        },
      ],
      ratings: {
        average_rating: 4.6,
        total_reviews: 128,
      },
    },
    // Add more doctors as needed
  ],

  pharmacy: {
    pharmacy_id: "pharma_101",
    name: "Nabha Civil Hospital Pharmacy",
    owner_name: "Hospital Trust",
    location: {
      district: "Patiala",
      state: "Punjab",
      pincode: "147201",
    },
    contact_number: "+91-9876512345",
    available_medicines: [
      {
        medicine_id: "med_001",
        name: "Paracetamol",
        generic_name: "Acetaminophen",
        brand_name: "Crocin Advance",
        category: "Analgesic / Antipyretic",
        type: "Tablet",
        strength: "500mg",
        dosage_form: "Oral",
        description: "Used for fever reduction and pain relief.",
        manufacturer: "GlaxoSmithKline",
        batch_no: "BATCH2025A",
        expiry_date: "2026-01-30",
        price_per_unit: 2.5,
        currency: "INR",
        quantity_in_stock: 240,
        requires_prescription: true,
        storage_instructions: "Store in a cool, dry place below 25°C.",
        related_prescriptions: ["pres_001"],
      },
    ],
  },

  offline_ai: {
    session_id: "sess_001",
    patient_id: "pat_001",
    timestamp: "2025-09-05T09:30:00Z",
    language: "pa",
    input_mode: "voice",
    symptom_inputs: [
      {
        symptom: "Fever",
        severity: "moderate",
        duration_days: 2,
      },
    ],
    vital_signs: {
      temperature: 38.5,
      bp: "120/80",
      heart_rate: 90,
      oxygen_saturation: 96,
    },
    offline_predictions: [
      {
        condition: "Viral Fever",
        confidence: 0.72,
        recommended_action: "see doctor",
      },
    ],
    urgency_score: 6,
    local_recommendations: {
      first_aid: ["Drink fluids", "Rest"],
      medicine_suggestions: ["Paracetamol"],
      follow_up_time: "24h",
    },
    sync_status: "pending",
  },

  server_ai: {
    session_id: "sess_001",
    patient_id: "pat_001",
    timestamp: "2025-09-05T09:35:00Z",
    source: "offline_ai",
    received_symptom_data: {
      from_offline_ai: true,
      symptoms: ["Fever"],
      urgency_score: 6,
    },
    doctor_interaction: {
      consult_mode: "video",
      doctor_id: "doc_123",
      transcript: "Patient has fever since 2 days...",
      summarized_notes: "Likely viral fever, prescribe paracetamol",
    },
    advanced_diagnosis: [
      {
        condition: "Viral Fever",
        confidence: 0.88,
        supporting_evidence: ["temperature log", "offline AI symptoms"],
        ai_recommendation_level: "refer",
      },
    ],
    pharmacy_recommendations: [
      {
        medicine_name: "Paracetamol",
        dosage: "500mg",
        stock_available: true,
        nearest_pharmacy: {
          id: "pharma_101",
          name: "Nabha Civil Hospital Pharmacy",
          distance_km: 2.5,
        },
      },
    ],
    ml_links: {
      offline_model_feedback: "used to retrain TinyLM",
      recommendation_refinements: "adjusted fever detection rules",
      symptom_drift_detection: true,
    },
    audit_trail: {
      consent_given: true,
      data_shared_with: ["doc_123", "pharma_101"],
      blockchain_hash: "hash_abc123",
    },
  },
};
