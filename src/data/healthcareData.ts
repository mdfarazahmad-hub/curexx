import {
  Doctor,
  Appointment,
  HealthMetric,
  FamilyMember,
  HealthRecord,
  PatientQueueItem,
  CriticalInventoryItem,
  Payment,
  InsurancePolicy,
  Medicine,
  MedicineOrder,
  DiagnosticTest,
  DiagnosticBooking
} from '../types';

export const CUREX_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuC27gM2XrHMrDsDeWcKwrJOc5QOaF1HImQJRYIEP1zaJj_5U-iZ69BOrIJrxJEAlzTvF7oclulGmXOqyZucQfK0mrnBGpXF3K7aQ8r6_p9oVqcFsr7RXMICvh5T1gAR3nTHTV4KUoxaRl-WYTLlES4zu1Xh2MGpJTk5BDc2Adj-GDaGTKFRhKfoL-xfQetHLx4lzR5YtWIT4On4eQv37JhvRH5C9uG7o5YyNwBFsAT8Ke4UIOb3k3bf";

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Sharma',
    specialty: 'Cardiologist',
    hospital: 'ABC Multispeciality Hospital',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMhKMZoiD8hsThuwPoFozlwSYbZ-pb_BdZoPqNDrgwTxkJP7L7-0VKtXIc82WU3KYgIj2LHhLTp5Gv2KnOdXTfTX-wU_XN8LyFU-Sx8fjeMx4YPnY3CTgDcnIdI8SFNF9RUnqctfTzUvN2eQAKiG2AtqR9L5aQh171pH3xgnoqUviPAiIwQp9YC78Ivuhfi0Vqt4gBOC6hWAvFEwx7Eg-2kC37tlMKF-MlhF-s44ZbpOastlisiUxF',
    rating: 4.9,
    availableToday: true
  },
  {
    id: 'dr-rajesh',
    name: 'Dr. Rajesh Kumar',
    specialty: 'General Physician',
    hospital: 'ABC Multispeciality Hospital',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9XHJhj9wEQCI6K9y8RqmbSHBmRqIBAc1ZmSLFdizVXYkK94Cp7sZJsenU9n-4LaPWWBhsArzvfwti0S3XJr7ZiZyJRdntZUZR1fjSgN3JixSVODrDBUgrpDphMVRWTzIl4-O3I6EbLL1RhMoWcCGFEtnYGLjlunoaWNq8rBLaW49IxAv9VpeHLduxDenjwHp6AfCP8RvBwXLi2RSTdYh-PwsD-SOOc9frSK-Mp4LFAhcLgPoe9kcW',
    rating: 4.8,
    availableToday: true
  },
  {
    id: 'dr-sarah',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Ophthalmologist',
    hospital: 'Metro Vision Centre',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlpfZ7IBPi-iFFdOn4Rv4uNDYLHJk2f_g5_5L48yatjMGaXbEkX-KBCp5rZ9_oewMotl2-AagP_FNJBQtYNRMttH2Hr9m8v4NH6AoHAU_MjyVFmZzR4erRoMtAKc5ATGkJ3cu19VZPU0qxdf-3xuF9RzenvRupPPWVWNjevzxl8yEyrYLneQu23PvT4GHLZoFieYtolI6dYia5XQt34XdrcHLdAIOTLOHgfHmms7cutuIfSzu1PB6n',
    rating: 4.95,
    availableToday: false
  },
  {
    id: 'dr-vikram',
    name: 'Dr. Vikram Patel',
    specialty: 'Pediatrician',
    hospital: 'ChildCare Specialty Clinic',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLlrXezyDd_50Z3CXpZUsLqy8VvgORVRMakSKqdY16pChSOQJ-zsfuDpMfxxupI3oaoZPtKWjmW8xKrkAdxtG-evRgV8B3cOJjLCkanOO9dgeguHAvspsGUfGSZLYBB5JEu2ZNCmlIjNr20Gi1yvOh_J_Z2PTntxSnLOQbHpfVmHjYQ4QKu_9r32dpWWF1xLZAnpjQWO1g3qOmFzZ8c421Awn4KG5qHbK4VlqtwUdwTo1ILke1sXQT',
    rating: 4.7,
    availableToday: true
  }
];

export const INITIAL_UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-001',
    doctor: DOCTORS[0],
    status: 'Confirmed',
    date: 'Today, Oct 24',
    time: '10:30 AM',
    tokenNumber: '#14',
    isUpcoming: true,
    type: 'video',
    notes: 'Routine hypertension follow-up & review of lipid panel report.'
  }
];

export const INITIAL_PAST_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-past-1',
    doctor: DOCTORS[1],
    status: 'Completed',
    date: 'Sep 12, 2023',
    time: '02:00 PM',
    tokenNumber: '#08',
    isUpcoming: false,
    type: 'in-person',
    notes: 'Seasonal viral infection consultation. Prescribed anti-pyretic & hydration.'
  },
  {
    id: 'app-past-2',
    doctor: DOCTORS[2],
    status: 'Completed',
    date: 'Aug 04, 2023',
    time: '11:15 AM',
    tokenNumber: '#03',
    isUpcoming: false,
    type: 'in-person',
    notes: 'Annual vision acuity check. Lens power stable.'
  }
];

export const INITIAL_CANCELLED_APPOINTMENTS: Appointment[] = [];

export const HEALTH_METRICS: HealthMetric[] = [
  {
    id: 'bp',
    title: 'Blood Pressure',
    value: '120/80',
    subtext: 'Stable',
    status: 'Normal',
    statusType: 'normal',
    trend: 'stable',
    icon: 'favorite'
  },
  {
    id: 'hr',
    title: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    subtext: 'Optimal',
    status: 'Good',
    statusType: 'good',
    trend: 'up',
    icon: 'activity_zone'
  },
  {
    id: 'bmi',
    title: 'Weight',
    value: '68',
    unit: 'kg',
    subtext: 'On track',
    status: 'BMI 22.1',
    statusType: 'optimal',
    trend: 'stable',
    icon: 'monitor_weight'
  }
];

export const FAMILY_PROFILES: FamilyMember[] = [
  {
    id: 'dad',
    name: 'Dad (68)',
    relationship: 'Father',
    age: 68,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrWsyyM23tSD12gAgVS7cas6PwCdG8ApjxNhLNuSffAm5Fx8tvDWNCWKqK1EYahM4hNx5VVuCw3rGXmG52b02f7GQP_zBEanKdPHvjbWxb64je_gHFOv2NSo_2azwU5yFv1F02IPV9ixptNxmbQNu1zr_q8VlNIPYkPmgeEOmRPZpaA1GCibVLJdj64ghEyc91hCn4pOvJM4V5hnZmmQcq8Ykt1YnmtYYHmDkwTPni1234Lqhdz2tm',
    ringColor: 'ring-[#004c46]'
  },
  {
    id: 'priya',
    name: 'Priya (38)',
    relationship: 'Spouse',
    age: 38,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlpfZ7IBPi-iFFdOn4Rv4uNDYLHJk2f_g5_5L48yatjMGaXbEkX-KBCp5rZ9_oewMotl2-AagP_FNJBQtYNRMttH2Hr9m8v4NH6AoHAU_MjyVFmZzR4erRoMtAKc5ATGkJ3cu19VZPU0qxdf-3xuF9RzenvRupPPWVWNjevzxl8yEyrYLneQu23PvT4GHLZoFieYtolI6dYia5XQt34XdrcHLdAIOTLOHgfHmms7cutuIfSzu1PB6n',
    ringColor: 'ring-[#adc7ff]'
  },
  {
    id: 'aarav',
    name: 'Aarav (10)',
    relationship: 'Son',
    age: 10,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-m3n-gm-c6DWh0A8Ffmr2l4y7vCfiAWrAi2JFxgesac_g8SXii2lKGmcsdUSaDixKI0jhHFS_kR_RQm1ahD-w5NYGqjvp0xvEL23Py70VQMhjd-n__G9Z_7TsdyWn-G3siJdHy5k7h4IdaaSc-ypPFRVLJvmblx9kQ0DDpyltscer7sxhHZ9RGaawUBKV99dx6fpoixBXeCa9_kUXeDsvlfmWmXugBDlI3Zy4VHWwJf1CbNvciCao',
    ringColor: 'ring-[#bcc9c7]'
  }
];

export const QUICK_SERVICES = [
  { id: 'find-doc', title: 'Find Doctor', displayLabel: 'Find...', icon: 'stethoscope', bg: 'bg-[#daf5f0]', color: 'text-[#004c46]' },
  { id: 'hospital', title: 'Hospital', displayLabel: 'Hospital', icon: 'local_hospital', bg: 'bg-[#edf2ff]', color: 'text-[#0059bb]' },
  { id: 'visits', title: 'Visits', displayLabel: 'Visits', icon: 'calendar_month', bg: 'bg-[#e7efed]', color: 'text-[#2e3d3b]' },
  { id: 'diagnostics', title: 'Diagnostics', displayLabel: 'Diagnostics', icon: 'biotech', bg: 'bg-[#daf5f0]', color: 'text-[#004c46]' },
  { id: 'medicines', title: 'Medicines', displayLabel: 'Medicines', icon: 'pill', bg: 'bg-[#edf2ff]', color: 'text-[#0059bb]' },
  { id: 'ambulance', title: 'Ambulance', displayLabel: 'Ambulance', icon: 'ambulance', bg: 'bg-[#ffebe8]', color: 'text-[#ba1a1a]' },
  { id: 'prescriptions', title: 'Prescriptions', displayLabel: 'Prescriptions', icon: 'maps_ugc', bg: 'bg-[#e7efed]', color: 'text-[#2e3d3b]' },
  { id: 'reports', title: 'Reports', displayLabel: 'Reports', icon: 'lab_profile', bg: 'bg-[#daf5f0]', color: 'text-[#004c46]' },
  { id: 'records', title: 'Health Records', displayLabel: 'Health...', icon: 'folder_shared', bg: 'bg-[#edf2ff]', color: 'text-[#0059bb]' },
  { id: 'insurance', title: 'Insurance', displayLabel: 'Insurance', icon: 'verified_user', bg: 'bg-[#e7efed]', color: 'text-[#2e3d3b]' },
  { id: 'payments', title: 'Payments', displayLabel: 'Payments', icon: 'payments', bg: 'bg-[#daf5f0]', color: 'text-[#004c46]' },
  { id: 'family', title: 'Family', displayLabel: 'Family', icon: 'family_restroom', bg: 'bg-[#edf2ff]', color: 'text-[#0059bb]' }
];

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'rec-cbc',
    title: 'Complete Blood Count (CBC)',
    category: 'Lab Reports',
    provider: 'ABC Central Diagnostic Lab',
    date: 'Today, 9:45 AM',
    summary: 'Hemoglobin 14.2 g/dL, WBC 6.8 K/uL, Platelets 250 K/uL. All markers in optimal range.',
    verified: true,
    badge: 'Lab Verified',
    details: {
      hemoglobin: '14.2 g/dL',
      wbc: '6.8 K/uL',
      platelets: '250 K/uL',
      rbc: '4.9 M/uL',
      glucose: '92 mg/dL'
    },
    fileSize: '1.4 MB'
  },
  {
    id: 'rec-rx-1',
    title: 'Cardiology Follow-up Meds',
    category: 'Prescriptions',
    provider: 'Dr. Sarah Jenkins',
    date: 'Oct 14, 2023',
    summary: 'Amoxicillin 500mg (1 capsule 3x daily), Lisinopril 10mg.',
    verified: true,
    badge: 'Prescription',
    fileSize: '840 KB'
  },
  {
    id: 'rec-xray',
    title: 'Chest X-Ray (PA View)',
    category: 'Imaging',
    provider: 'City Diagnostics',
    date: 'Sep 28, 2023',
    summary: 'Clear lung fields. No acute cardiopulmonary abnormalities detected. Costophrenic angles sharp.',
    verified: true,
    badge: 'Imaging',
    fileSize: '12.8 MB'
  },
  {
    id: 'rec-vax',
    title: 'Influenza Quadrivalent Vaccine',
    category: 'Vaccinations',
    provider: 'Metro Health Clinic',
    date: 'Aug 12, 2023',
    summary: 'Batch #FL-98234 administered successfully in left deltoid.',
    verified: true,
    badge: 'Vaccination',
    fileSize: '512 KB'
  }
];

export const INITIAL_PATIENT_QUEUE: PatientQueueItem[] = [
  {
    id: 'pat-1',
    name: 'Eleanor Vance',
    gender: 'F',
    age: 54,
    symptoms: 'Persistent dry cough, mild fatigue',
    status: 'In Consultation',
    timeSlot: '09:30 AM - 10:00 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi7JArtTOjcOpCC__jt3iVV2HKfQKILxMx0rYrr0hCfGwKsesd419IdqZrgTN1sZRjM2Tldt0QUJGDpiEG8geBGKzRJ0LWjitUW78Juk642XEt3VZM9s8ZLtvlep7oCfUNI276Mn9lDmNfeswNDCjDOeZwfrDcGLBdJefRUfpURHoRz-4TCQ1jib0ohIZIjCFbiq1DPjnkjXUepGCwrNFyRrMdTANDzmkw8wezrbi9iz7GG_5Re0Bx',
    historySummary: 'Hypertensive for 8 years, taking ACE inhibitor. No chest pain or dyspnea on exertion.',
    vitals: { bp: '134/86', hr: '76 bpm', temp: '98.4 F', spO2: '98%' }
  },
  {
    id: 'pat-2',
    name: 'Arthur Pendelton',
    gender: 'M',
    age: 68,
    symptoms: 'Joint stiffness, morning pain in knees',
    status: 'Waiting',
    timeSlot: '10:00 AM - 10:30 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9XHJhj9wEQCI6K9y8RqmbSHBmRqIBAc1ZmSLFdizVXYkK94Cp7sZJsenU9n-4LaPWWBhsArzvfwti0S3XJr7ZiZyJRdntZUZR1fjSgN3JixSVODrDBUgrpDphMVRWTzIl4-O3I6EbLL1RhMoWcCGFEtnYGLjlunoaWNq8rBLaW49IxAv9VpeHLduxDenjwHp6AfCP8RvBwXLi2RSTdYh-PwsD-SOOc9frSK-Mp4LFAhcLgPoe9kcW',
    historySummary: 'Osteoarthritis bilateral knees. Reports pain score 6/10 on waking.',
    vitals: { bp: '128/82', hr: '70 bpm', temp: '98.6 F', spO2: '99%' }
  },
  {
    id: 'pat-3',
    name: 'Sophia Martinez',
    gender: 'F',
    age: 29,
    symptoms: 'Acute migraine, sensitivity to light',
    status: 'Waiting',
    timeSlot: '10:30 AM - 11:00 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI1eAloL3_84Gjr1xxKLqbICyga-1IuBkPkvmqbF1ZBxVXe5z8-WNyDn9KmbH0s65HEyL63-yFINt--nzJ_GAxVUQDVQHammKhIlYgGXBZR6aSk2kOoe-VuPaaITDXaMKkSxNUpS3y4vfD1WmyGk2c15WFVCIInJBx7KXfn3E6fHIc3MfTxGEt7_GlxLzzHBy9bWVdDbsU7NoU_EHgo3-iaAcasPVybA-EZDdcFZ2uKrbpSqDpAw57',
    historySummary: 'Episodic migraine with aura. Last attack 3 weeks ago.',
    vitals: { bp: '118/74', hr: '82 bpm', temp: '98.2 F', spO2: '99%' }
  },
  {
    id: 'pat-4',
    name: 'Marcus Chen',
    gender: 'M',
    age: 34,
    symptoms: 'Annual wellness checkup & lab review',
    status: 'Completed',
    timeSlot: '09:00 AM - 09:30 AM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLlrXezyDd_50Z3CXpZUsLqy8VvgORVRMakSKqdY16pChSOQJ-zsfuDpMfxxupI3oaoZPtKWjmW8xKrkAdxtG-evRgV8B3cOJjLCkanOO9dgeguHAvspsGUfGSZLYBB5JEu2ZNCmlIjNr20Gi1yvOh_J_Z2PTntxSnLOQbHpfVmHjYQ4QKu_9r32dpWWF1xLZAnpjQWO1g3qOmFzZ8c421Awn4KG5qHbK4VlqtwUdwTo1ILke1sXQT',
    historySummary: 'Routine corporate physical. Fasting lipid panel and HbA1c all within normal limits.',
    vitals: { bp: '116/76', hr: '68 bpm', temp: '98.4 F', spO2: '100%' }
  }
];

export const INITIAL_INVENTORY_ALERTS: CriticalInventoryItem[] = [
  {
    id: 'inv-1',
    name: 'O-Negative Blood Units',
    department: 'Blood Bank',
    units: 2,
    unitLabel: 'units remaining in blood bank',
    status: 'Critical Shortage',
    isCritical: true,
    icon: 'bloodtype'
  },
  {
    id: 'inv-2',
    name: 'Epinephrine Autoinjectors',
    department: 'Trauma Bay 3',
    units: 5,
    unitLabel: 'Low stock in Trauma Bay 3',
    status: 'Low Reserve',
    isCritical: true,
    icon: 'vaccines'
  },
  {
    id: 'inv-3',
    name: 'N95 Respirators (Size M)',
    department: 'Central Depot',
    units: 14,
    unitLabel: 'Depot reserve below 15%',
    status: 'Threshold Warning',
    isCritical: true,
    icon: 'masks'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    amount: 500.0,
    date: '2023-10-27',
    type: 'Consultation',
    status: 'Success',
    invoiceNumber: 'INV-2023-1089',
    provider: 'Dr. Ananya Sharma (Cardiology OPD)',
    description: 'Follow-up Cardiology Consultation & ECG Evaluation',
    paymentMethod: 'UPI • Google Pay'
  },
  {
    id: 'pay-2',
    amount: 1250.0,
    date: '2023-10-25',
    type: 'Medicine',
    status: 'Success',
    invoiceNumber: 'INV-2023-1064',
    provider: 'CureX Pharmacy Hub #04',
    description: 'Prescription Order: Telmisartan 40mg + Atorvastatin 10mg (30-day supply)',
    paymentMethod: 'HDFC Credit Card ending in 4082'
  },
  {
    id: 'pay-3',
    amount: 850.0,
    date: '2023-10-20',
    type: 'Lab Test',
    status: 'Success',
    invoiceNumber: 'INV-2023-0982',
    provider: 'ABC Diagnostics Central Lab',
    description: 'Complete Blood Count (CBC) & Fasting Blood Sugar Test',
    paymentMethod: 'CureX Health Wallet'
  },
  {
    id: 'pay-4',
    amount: 350.0,
    date: '2023-10-14',
    type: 'Consultation',
    status: 'Success',
    invoiceNumber: 'INV-2023-0911',
    provider: 'Dr. Rajesh Kumar (General Medicine)',
    description: 'Telehealth Video Consultation for Seasonal Flu',
    paymentMethod: 'UPI • PhonePe'
  },
  {
    id: 'pay-5',
    amount: 2100.0,
    date: '2023-10-08',
    type: 'Lab Test',
    status: 'Success',
    invoiceNumber: 'INV-2023-0854',
    provider: 'ABC Diagnostics Central Lab',
    description: 'Comprehensive Lipid Profile & Liver Function Test (LFT)',
    paymentMethod: 'Debit Card ending in 1928'
  },
  {
    id: 'pay-6',
    amount: 450.0,
    date: '2023-11-01',
    type: 'Consultation',
    status: 'Pending',
    invoiceNumber: 'INV-2023-1120',
    provider: 'Dr. Vikram Patel (Pediatric OPD)',
    description: 'Upcoming Wellness & Developmental Follow-up',
    paymentMethod: 'Pending Payment'
  }
];

export const INITIAL_INSURANCE_POLICY: InsurancePolicy = {
  id: 'pol-cx-99210',
  policyNumber: 'CX-99210-STAR-HLTH',
  provider: 'Star Health Premier Platinum',
  holderName: 'Eleanor Vance',
  planName: 'Family Health Shield 360',
  sumInsured: 500000,
  remainingCashless: 462500,
  validTill: '31 Dec 2026',
  status: 'Active',
  tpaHelpline: '1800-425-2255',
  claims: [
    {
      id: 'clm-01',
      claimNumber: 'CLM-2023-7741',
      hospital: 'ABC Multispeciality Hospital',
      treatment: 'Cardiac Stress Test & 2D Echo Screening',
      amount: 14500,
      status: 'Settled',
      date: '15 Sep 2023',
      cashless: true,
      notes: '100% cashless pre-authorization approved by TPA desk.'
    },
    {
      id: 'clm-02',
      claimNumber: 'CLM-2023-8890',
      hospital: 'ABC Multispeciality Hospital',
      treatment: 'Day Care Observation & Emergency IV Therapy',
      amount: 23000,
      status: 'Approved',
      date: '04 Oct 2023',
      cashless: true,
      notes: 'Final settlement sanction letter issued. Hospital notified.'
    },
    {
      id: 'clm-03',
      claimNumber: 'CLM-2023-9214',
      hospital: 'Metro Vision Centre',
      treatment: 'Retinal Fundus Fluorescein Angiography',
      amount: 8200,
      status: 'In Review',
      date: '22 Oct 2023',
      cashless: false,
      notes: 'Reimbursement claim documents submitted and undergoing medical audit.'
    }
  ]
};

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Telmisartan 40mg',
    genericName: 'Telmisartan Tablets IP',
    dosage: '40 mg • 1 tablet daily',
    manufacturer: 'Sun Pharma Ltd.',
    price: 180,
    mrp: 220,
    inStock: true,
    prescriptionRequired: true,
    category: 'Cardiac',
    description: 'Angiotensin II receptor antagonist used for essential hypertension management.',
    packSize: 'Strip of 15 tablets'
  },
  {
    id: 'med-2',
    name: 'Atorvastatin 10mg (Atorva)',
    genericName: 'Atorvastatin Calcium IP',
    dosage: '10 mg • At bedtime',
    manufacturer: 'Zydus Cadila',
    price: 145,
    mrp: 175,
    inStock: true,
    prescriptionRequired: true,
    category: 'Cardiac',
    description: 'HMG-CoA reductase inhibitor for reducing LDL cholesterol and cardiovascular risk.',
    packSize: 'Strip of 10 tablets'
  },
  {
    id: 'med-3',
    name: 'Metformin 500mg SR (Glycomet)',
    genericName: 'Metformin Hydrochloride Prolonged Release',
    dosage: '500 mg • Twice daily after meals',
    manufacturer: 'USV Private Limited',
    price: 65,
    mrp: 85,
    inStock: true,
    prescriptionRequired: true,
    category: 'Diabetic',
    description: 'First-line anti-hyperglycemic biguanide medication for Type 2 diabetes.',
    packSize: 'Strip of 20 tablets'
  },
  {
    id: 'med-4',
    name: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin & Potassium Clavulanate',
    dosage: '625 mg • 1 tablet every 12 hrs',
    manufacturer: 'GSK Pharmaceuticals',
    price: 210,
    mrp: 250,
    inStock: true,
    prescriptionRequired: true,
    category: 'Antibiotics',
    description: 'Broad-spectrum bactericidal penicillin antibiotic enhanced with beta-lactamase inhibitor.',
    packSize: 'Strip of 10 tablets'
  },
  {
    id: 'med-5',
    name: 'Paracetamol 650mg (Dolo 650)',
    genericName: 'Paracetamol Tablets IP',
    dosage: '650 mg • As needed for fever/pain',
    manufacturer: 'Micro Labs Ltd',
    price: 35,
    mrp: 42,
    inStock: true,
    prescriptionRequired: false,
    category: 'Pain Relief',
    description: 'Fast-acting antipyretic and analgesic for headache, fever, and muscle aches.',
    packSize: 'Strip of 15 tablets'
  },
  {
    id: 'med-6',
    name: 'Vitamin D3 60,000 IU (Uprise-D3)',
    genericName: 'Cholecalciferol Chewable Capsule',
    dosage: '60,000 IU • 1 softgel weekly',
    manufacturer: 'Alkem Laboratories',
    price: 120,
    mrp: 155,
    inStock: true,
    prescriptionRequired: false,
    category: 'Vitamins',
    description: 'High-potency vitamin D3 for bone mineralization, immune function, and vitality.',
    packSize: 'Box of 4 softgels'
  }
];

export const INITIAL_MEDICINE_ORDERS: MedicineOrder[] = [
  {
    id: 'ord-8831',
    orderNumber: 'CX-MED-8831',
    items: [
      { medicine: INITIAL_MEDICINES[0], quantity: 2 },
      { medicine: INITIAL_MEDICINES[1], quantity: 1 }
    ],
    totalAmount: 505,
    status: 'Out for Delivery',
    orderDate: 'Today, 09:15 AM',
    estimatedDelivery: 'Within 35 mins (by 11:30 AM)',
    deliveryAddress: 'Apt 4B, Emerald Residency, Sector 62',
    riderName: 'Ramesh Verma (CureX Express)',
    riderPhone: '+91 98765 43210',
    step: 3
  },
  {
    id: 'ord-7920',
    orderNumber: 'CX-MED-7920',
    items: [
      { medicine: INITIAL_MEDICINES[4], quantity: 1 },
      { medicine: INITIAL_MEDICINES[5], quantity: 2 }
    ],
    totalAmount: 275,
    status: 'Delivered',
    orderDate: '22 Oct 2023',
    estimatedDelivery: 'Delivered on time',
    deliveryAddress: 'Apt 4B, Emerald Residency, Sector 62',
    riderName: 'Amit Singh',
    riderPhone: '+91 98111 22334',
    step: 4
  }
];

export const INITIAL_DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    id: 'diag-cbc',
    title: 'Complete Blood Count (CBC) with ESR',
    code: 'TEST-CBC-01',
    category: 'Hematology',
    sampleType: 'Whole Blood (EDTA)',
    fastingRequired: false,
    reportHours: 6,
    price: 380,
    originalPrice: 550,
    popular: true,
    parametersCount: 24,
    description: 'Evaluates overall health status; checks for anemia, infection, leukemia, and platelet disorders.'
  },
  {
    id: 'diag-lipid',
    title: 'Comprehensive Lipid Panel (Cholesterol)',
    code: 'TEST-LIPID-02',
    category: 'Cardiovascular',
    sampleType: 'Serum Blood',
    fastingRequired: true,
    fastingHours: 12,
    reportHours: 8,
    price: 650,
    originalPrice: 900,
    popular: true,
    parametersCount: 8,
    description: 'Measures Total Cholesterol, HDL, LDL, VLDL, and Triglycerides to calculate heart attack risk.'
  },
  {
    id: 'diag-hba1c',
    title: 'HbA1c (Glycated Hemoglobin) 3-Month Glucose',
    code: 'TEST-HBA1C-03',
    category: 'Diabetic Health',
    sampleType: 'Whole Blood',
    fastingRequired: false,
    reportHours: 6,
    price: 490,
    originalPrice: 700,
    popular: true,
    parametersCount: 2,
    description: 'Gold standard test reflecting average blood sugar control over the previous 90 to 120 days.'
  },
  {
    id: 'diag-thyroid',
    title: 'Thyroid Profile Total (T3, T4, TSH)',
    code: 'TEST-THY-04',
    category: 'Endocrinology',
    sampleType: 'Serum Blood',
    fastingRequired: true,
    fastingHours: 10,
    reportHours: 12,
    price: 520,
    originalPrice: 780,
    popular: false,
    parametersCount: 3,
    description: 'Screens for hyperthyroidism and hypothyroidism, assessing metabolic equilibrium.'
  },
  {
    id: 'diag-fullbody',
    title: 'CureX Master Whole Body Health Package',
    code: 'PKG-MASTER-05',
    category: 'Full Body Wellness',
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    fastingHours: 12,
    reportHours: 24,
    price: 1999,
    originalPrice: 4200,
    popular: true,
    parametersCount: 78,
    description: 'Includes CBC, Liver (LFT), Kidney (KFT), Lipid, Thyroid, HbA1c, Vitamin D3, B12, Urine Routine.'
  }
];

export const INITIAL_DIAGNOSTIC_BOOKINGS: DiagnosticBooking[] = [
  {
    id: 'bk-diag-101',
    bookingRef: 'CX-LAB-2023-101',
    test: INITIAL_DIAGNOSTIC_TESTS[0],
    patientName: 'Eleanor Vance',
    date: 'Tomorrow, 08:00 AM',
    timeSlot: '08:00 AM - 09:00 AM',
    homeCollection: true,
    address: 'Apt 4B, Emerald Residency, Sector 62',
    status: 'Phlebotomist Assigned',
    amount: 380
  }
];

