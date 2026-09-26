export type ScreenTab = 'home' | 'visits' | 'health' | 'clinical' | 'command';

export type AppRole = 'patient' | 'doctor' | 'admin';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  avatar: string;
  rating: number;
  availableToday: boolean;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  date: string;
  time: string;
  tokenNumber: string;
  isUpcoming: boolean;
  notes?: string;
  type: 'video' | 'in-person';
}

export interface HealthMetric {
  id: string;
  title: string;
  value: string;
  unit?: string;
  subtext: string;
  status: string;
  statusType: 'normal' | 'good' | 'optimal' | 'warning';
  trend: 'stable' | 'up' | 'down';
  icon: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  avatar: string;
  ringColor: string;
}

export interface HealthRecord {
  id: string;
  title: string;
  category: 'Lab Reports' | 'Prescriptions' | 'Imaging' | 'Vaccinations' | 'Allergies' | 'Medications';
  provider: string;
  date: string;
  summary: string;
  verified: boolean;
  badge?: string;
  details?: {
    hemoglobin?: string;
    wbc?: string;
    platelets?: string;
    rbc?: string;
    glucose?: string;
  };
  fileSize?: string;
}

export interface PatientQueueItem {
  id: string;
  name: string;
  gender: 'M' | 'F';
  age: number;
  symptoms: string;
  status: 'In Consultation' | 'Waiting' | 'Completed';
  timeSlot: string;
  avatar: string;
  historySummary?: string;
  vitals?: {
    bp: string;
    hr: string;
    temp: string;
    spO2: string;
  };
}

export interface CriticalInventoryItem {
  id: string;
  name: string;
  department: string;
  units: number;
  unitLabel: string;
  status: string;
  isCritical: boolean;
  icon: string;
}

export interface PatientLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  area: string;
  isAutoDetected: boolean;
  accuracyMeters?: number;
  nearestFacility: {
    name: string;
    distanceKm: number;
    etaMinutes: number;
    hasEmergency: boolean;
  };
}

export type QueueUrgencyStatus = 'safe_distance' | 'moving_closer' | 'seat_now' | 'enter_room' | 'consultation_active';

export interface VirtualQueueToken {
  tokenNumber: number;
  patientInitials: string;
  status: 'completed' | 'in_consultation' | 'up_next' | 'waiting' | 'you';
  calledAt?: string;
  approxWaitMins: number;
}

export interface VirtualQueueData {
  myTokenNumber: number;
  currentServingToken: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  hospitalName: string;
  opdDepartment: string;
  roomNumber: string;
  floor: string;
  avgMinutesPerPatient: number;
  estimatedMinutesLeft: number;
  soundEnabled: boolean;
  vibrateEnabled: boolean;
  waitingRoomOccupancyPct: number;
  tokens: VirtualQueueToken[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  type: 'Consultation' | 'Medicine' | 'Lab Test' | 'Emergency' | string;
  status: 'Success' | 'Pending' | 'Refunded';
  invoiceNumber: string;
  provider: string;
  description: string;
  paymentMethod: string;
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  hospital: string;
  treatment: string;
  amount: number;
  status: 'Approved' | 'In Review' | 'Settled' | 'Rejected';
  date: string;
  cashless: boolean;
  notes?: string;
}

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  provider: string;
  holderName: string;
  planName: string;
  sumInsured: number;
  remainingCashless: number;
  validTill: string;
  status: 'Active' | 'Expiring Soon';
  tpaHelpline: string;
  claims: InsuranceClaim[];
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  manufacturer: string;
  price: number;
  mrp: number;
  inStock: boolean;
  prescriptionRequired: boolean;
  category: 'Cardiac' | 'Antibiotics' | 'Diabetic' | 'Pain Relief' | 'Vitamins' | 'General';
  description: string;
  packSize: string;
}

export interface MedicineOrder {
  id: string;
  orderNumber: string;
  items: {
    medicine: Medicine;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'Placed' | 'Prescription Verified' | 'Packed' | 'Out for Delivery' | 'Delivered';
  orderDate: string;
  estimatedDelivery: string;
  deliveryAddress: string;
  riderName?: string;
  riderPhone?: string;
  step: number;
}

export interface DiagnosticTest {
  id: string;
  title: string;
  code: string;
  category: string;
  sampleType: string;
  fastingRequired: boolean;
  fastingHours?: number;
  reportHours: number;
  price: number;
  originalPrice: number;
  popular?: boolean;
  parametersCount: number;
  description: string;
}

export interface DiagnosticBooking {
  id: string;
  bookingRef: string;
  test: DiagnosticTest;
  patientName: string;
  date: string;
  timeSlot: string;
  homeCollection: boolean;
  address?: string;
  status: 'Confirmed' | 'Phlebotomist Assigned' | 'Sample Collected' | 'Report Ready';
  amount: number;
}


