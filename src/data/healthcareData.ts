import { Doctor, Appointment, HealthMetric, FamilyMember, HealthRecord, PatientQueueItem, CriticalInventoryItem } from '../types';

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
