/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { VisitsScreen } from './components/screens/VisitsScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { ClinicalScreen } from './components/screens/ClinicalScreen';
import { CommandScreen } from './components/screens/CommandScreen';
import { LoginAuthScreen, AuthUser, UserRole } from './components/screens/LoginAuthScreen';

// Modals
import { VideoConsultationModal } from './components/modals/VideoConsultationModal';
import { BookVisitModal } from './components/modals/BookVisitModal';
import { LabReportModal } from './components/modals/LabReportModal';
import { ShareIdModal } from './components/modals/ShareIdModal';
import { UploadRecordModal } from './components/modals/UploadRecordModal';
import { CriticalAlertModal } from './components/modals/CriticalAlertModal';
import { AiCopilotModal } from './components/modals/AiCopilotModal';
import { AmbulanceDispatchModal } from './components/modals/AmbulanceDispatchModal';
import { BedReallocationModal } from './components/modals/BedReallocationModal';
import { PrescriptionModal } from './components/modals/PrescriptionModal';
import { PatientChartModal } from './components/modals/PatientChartModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { RescheduleModal } from './components/modals/RescheduleModal';
import { SosModal } from './components/modals/SosModal';
import { LocationPickerModal } from './components/modals/LocationPickerModal';
import { VirtualQueueModal } from './components/modals/VirtualQueueModal';
import { PaymentHistoryModal } from './components/modals/PaymentHistoryModal';
import { InsuranceModal } from './components/modals/InsuranceModal';
import { PharmacyModal } from './components/modals/PharmacyModal';
import { DiagnosticsModal } from './components/modals/DiagnosticsModal';
import { FamilyCircleModal } from './components/modals/FamilyCircleModal';
import { usePatientLocation } from './hooks/usePatientLocation';
import { useVirtualQueue } from './hooks/useVirtualQueue';

import {
  INITIAL_UPCOMING_APPOINTMENTS,
  INITIAL_PAST_APPOINTMENTS,
  INITIAL_CANCELLED_APPOINTMENTS,
  INITIAL_HEALTH_RECORDS,
  INITIAL_PATIENT_QUEUE,
  INITIAL_PAYMENTS,
  INITIAL_INSURANCE_POLICY,
  INITIAL_MEDICINES,
  INITIAL_MEDICINE_ORDERS,
  INITIAL_DIAGNOSTIC_TESTS,
  INITIAL_DIAGNOSTIC_BOOKINGS,
  FAMILY_PROFILES,
} from './data/healthcareData';

import {
  ScreenTab,
  Appointment,
  HealthRecord,
  PatientQueueItem,
  Payment,
  InsurancePolicy,
  InsuranceClaim,
  Medicine,
  MedicineOrder,
  DiagnosticTest,
  DiagnosticBooking,
  FamilyMember,
} from './types';

export default function App() {
  // Authentication State: null means showing the dual login panel initially!
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Auto Location Hook for Patient Portal
  const {
    location: patientLocation,
    isLocating,
    statusMessage: locationStatusMessage,
    detectLocation,
    setManualLocation,
  } = usePatientLocation();

  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  // Live Virtual Queue Tracker Hook
  const virtualQueue = useVirtualQueue();
  const [isVirtualQueueModalOpen, setIsVirtualQueueModalOpen] = useState(false);

  // Active Screen Tab
  const [activeTab, setActiveTab] = useState<ScreenTab>('home');
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Appointments state
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>(INITIAL_UPCOMING_APPOINTMENTS);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>(INITIAL_PAST_APPOINTMENTS);
  const [cancelledAppointments, setCancelledAppointments] = useState<Appointment[]>(INITIAL_CANCELLED_APPOINTMENTS);

  // Health records state
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(INITIAL_HEALTH_RECORDS);

  // Patient Queue for Doctor view
  const [patientQueue, setPatientQueue] = useState<PatientQueueItem[]>(INITIAL_PATIENT_QUEUE);

  // Active Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoAppointment, setActiveVideoAppointment] = useState<Appointment | null>(upcomingAppointments[0] || null);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [appointmentToReschedule, setAppointmentToReschedule] = useState<Appointment | null>(null);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<HealthRecord | null>(healthRecords[0]);

  const [isShareIdModalOpen, setIsShareIdModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCriticalAlertOpen, setIsCriticalAlertOpen] = useState(false);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
  const [isBedModalOpen, setIsBedModalOpen] = useState(false);

  const [isPrescribeModalOpen, setIsPrescribeModalOpen] = useState(false);
  const [selectedPatientForRx, setSelectedPatientForRx] = useState<PatientQueueItem | null>(null);

  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [selectedPatientForChart, setSelectedPatientForChart] = useState<PatientQueueItem | null>(null);

  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // CureX Core Android Super-App Modules State
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [insurancePolicy, setInsurancePolicy] = useState<InsurancePolicy>(INITIAL_INSURANCE_POLICY);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [medicineOrders, setMedicineOrders] = useState<MedicineOrder[]>(INITIAL_MEDICINE_ORDERS);
  const [isPharmacyModalOpen, setIsPharmacyModalOpen] = useState(false);

  const [diagnosticTests, setDiagnosticTests] = useState<DiagnosticTest[]>(INITIAL_DIAGNOSTIC_TESTS);
  const [diagnosticBookings, setDiagnosticBookings] = useState<DiagnosticBooking[]>(INITIAL_DIAGNOSTIC_BOOKINGS);
  const [isDiagnosticsModalOpen, setIsDiagnosticsModalOpen] = useState(false);

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(FAMILY_PROFILES);
  const [activeFamilyMemberId, setActiveFamilyMemberId] = useState<string>(FAMILY_PROFILES[0]?.id || 'fam-1');
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);

  const [savedPatient, setSavedPatient] = useState<AuthUser | null>(null);
  const [savedDoctor, setSavedDoctor] = useState<AuthUser | null>(null);
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('patient');

  // Login handler
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    if (user.role === 'doctor') {
      setSavedDoctor(user);
      setActiveTab('clinical'); // Doctor opens directly to clinical queue & emergency alerts
    } else {
      setSavedPatient(user);
      setActiveTab('home'); // Patient opens directly to home dashboard & upcoming visits
    }
  };

  // Sign out handler
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  // Switch role handler (Patient <-> Doctor)
  const handleSwitchRole = () => {
    if (!currentUser) return;
    const targetRole: UserRole = currentUser.role === 'patient' ? 'doctor' : 'patient';
    const existingProfile = targetRole === 'patient' ? savedPatient : savedDoctor;
    if (existingProfile) {
      setCurrentUser(existingProfile);
      setActiveTab(targetRole === 'patient' ? 'home' : 'clinical');
    } else {
      setAuthInitialRole(targetRole);
      setCurrentUser(null);
    }
  };

  // Handlers for booking & rescheduling
  const handleBookSuccess = (newApp: Appointment) => {
    setUpcomingAppointments((prev) => [newApp, ...prev]);
    setActiveTab('visits');
  };

  const handleRescheduleSuccess = (appId: string, newDate: string, newTime: string) => {
    setUpcomingAppointments((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, date: newDate, time: newTime } : a))
    );
  };

  const handleCancelAppointment = (appId: string) => {
    const target = upcomingAppointments.find((a) => a.id === appId);
    if (!target) return;
    if (window.confirm(`Are you sure you want to cancel the consultation with ${target.doctor.name}?`)) {
      setUpcomingAppointments((prev) => prev.filter((a) => a.id !== appId));
      setCancelledAppointments((prev) => [{ ...target, status: 'Cancelled' }, ...prev]);
    }
  };

  const handleOpenVideoCall = (app?: Appointment) => {
    setActiveVideoAppointment(app || upcomingAppointments[0] || null);
    setIsVideoModalOpen(true);
  };

  const handleOpenReschedule = (app?: Appointment) => {
    setAppointmentToReschedule(app || upcomingAppointments[0] || null);
    setIsRescheduleModalOpen(true);
  };

  const handleViewReport = (record: HealthRecord) => {
    setSelectedReport(record);
    setIsReportModalOpen(true);
  };

  const handleDownloadReport = (record: HealthRecord) => {
    alert(`Downloading verified ${record.title} (${record.fileSize || '1.4 MB'})...`);
  };

  const handleUploadSuccess = (newRec: HealthRecord) => {
    setHealthRecords((prev) => [newRec, ...prev]);
  };

  const handleQuickServiceClick = (serviceId: string) => {
    switch (serviceId) {
      case 'find-doc':
      case 'visits':
      case 'hospital':
        setIsBookModalOpen(true);
        break;
      case 'ambulance':
        setIsSosModalOpen(true);
        break;
      case 'reports':
      case 'records':
        setActiveTab('health');
        break;
      case 'medicines':
      case 'prescriptions':
        setIsPharmacyModalOpen(true);
        break;
      case 'family':
        setIsFamilyModalOpen(true);
        break;
      case 'insurance':
        setIsInsuranceModalOpen(true);
        break;
      case 'payments':
        setIsPaymentModalOpen(true);
        break;
      case 'diagnostics':
        setIsDiagnosticsModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handlePayPendingBill = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, status: 'Success', paymentMethod: 'UPI • Instant Verified' }
          : p
      )
    );
  };

  const handleSubmitNewClaim = (claimData: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'status' | 'date'>) => {
    const newClaim: InsuranceClaim = {
      id: `clm-${Date.now()}`,
      claimNumber: `CLM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'In Review',
      date: 'Today',
      ...claimData,
    };
    setInsurancePolicy((prev) => ({
      ...prev,
      claims: [newClaim, ...prev.claims],
    }));
  };

  const handlePlaceMedicineOrder = (items: { medicine: Medicine; quantity: number }[], deliveryAddress: string) => {
    const total = items.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
    const newOrder: MedicineOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `CX-MED-${Math.floor(1000 + Math.random() * 9000)}`,
      items,
      totalAmount: total,
      status: 'Placed',
      orderDate: 'Just now',
      estimatedDelivery: 'Within 45 mins',
      deliveryAddress,
      riderName: 'Ramesh Verma (CureX Express)',
      riderPhone: '+91 98765 43210',
      step: 1,
    };
    setMedicineOrders((prev) => [newOrder, ...prev]);

    // Record verified transaction in Payment History
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      amount: total,
      date: new Date().toISOString().split('T')[0],
      type: 'Medicine',
      status: 'Success',
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      provider: 'CureX Pharmacy Express',
      description: `Doorstep Medicine Delivery (${items.length} items)`,
      paymentMethod: 'CureX Instant Pay'
    };
    setPayments((prev) => [newPayment, ...prev]);
  };

  const handleBookDiagnosticTest = (
    test: DiagnosticTest,
    date: string,
    timeSlot: string,
    homeCollection: boolean,
    address: string
  ) => {
    const newBooking: DiagnosticBooking = {
      id: `bk-${Date.now()}`,
      bookingRef: `CX-LAB-${Math.floor(1000 + Math.random() * 9000)}`,
      test,
      patientName: currentUser?.name || 'Eleanor Vance',
      date,
      timeSlot,
      homeCollection,
      address,
      status: 'Confirmed',
      amount: test.price,
    };
    setDiagnosticBookings((prev) => [newBooking, ...prev]);

    // Record in Payment History
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      amount: test.price,
      date: new Date().toISOString().split('T')[0],
      type: 'Lab Test',
      status: 'Success',
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      provider: 'CureX Diagnostics Lab Network',
      description: `${test.title} (Home Collection)`,
      paymentMethod: 'Prepaid Digital Voucher'
    };
    setPayments((prev) => [newPayment, ...prev]);
  };

  const handleAddFamilyMember = (newMem: Omit<FamilyMember, 'id'>) => {
    const member: FamilyMember = {
      id: `fam-${Date.now()}`,
      ...newMem,
    };
    setFamilyMembers((prev) => [...prev, member]);
  };

  const handleSelectFamilyMember = (memberId: string) => {
    if (memberId === 'new') {
      setIsFamilyModalOpen(true);
    } else {
      setActiveFamilyMemberId(memberId);
    }
  };

  const handleOpenPrescribe = (patient: PatientQueueItem) => {
    setSelectedPatientForRx(patient);
    setIsPrescribeModalOpen(true);
  };

  const handleViewChart = (patient: PatientQueueItem) => {
    setSelectedPatientForChart(patient);
    setIsChartModalOpen(true);
  };

  const handleAddNote = (patient: PatientQueueItem) => {
    const note = window.prompt(`Add clinical encounter note for ${patient.name}:`);
    if (note) {
      setPatientQueue((prev) =>
        prev.map((p) =>
          p.id === patient.id
            ? { ...p, historySummary: `${p.historySummary || ''} [Note: ${note}]` }
            : p
        )
      );
      alert('Note saved to chart successfully.');
    }
  };

  const handleInsertCopilotNote = (patientId: string, noteText: string) => {
    setPatientQueue((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, historySummary: `${p.historySummary || ''}\n\n[AI Copilot SOAP]:\n${noteText}` } : p
      )
    );
    alert('AI Clinical SOAP Note inserted into EHR chart.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-[#eef5f4] to-slate-200 text-[#191c1d] flex flex-col items-center justify-start antialiased selection:bg-[#a2f1e6] selection:text-[#00201d]">
      {/* Discreet presentation viewport switcher for desktop */}
      <div className="hidden sm:flex fixed bottom-5 right-5 z-40 items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-[#bec9c6]/40 text-xs font-semibold text-[#3e4947] hover:text-[#004c46] hover:bg-white transition-all">
        <button
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="flex items-center gap-1.5"
          title="Toggle between Mobile Phone Frame and Fluid View"
        >
          <span className="material-symbols-outlined text-[16px]">
            {deviceFrameMode ? 'fullscreen' : 'smartphone'}
          </span>
          <span>{deviceFrameMode ? 'Fluid View' : 'Phone Frame'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrameMode
            ? 'max-w-[430px] my-0 sm:my-6 rounded-none sm:rounded-[44px] shadow-2xl overflow-hidden border-0 sm:border-[8px] sm:border-[#1a1d1e] bg-[#f8f9fa] relative'
            : 'max-w-2xl my-0 sm:my-6 rounded-none sm:rounded-3xl shadow-xl overflow-hidden bg-[#f8f9fa] relative'
        } min-h-screen flex flex-col`}
      >
        {/* Phone Notch/Status Bar on Desktop Phone Frame */}
        {deviceFrameMode && (
          <div className="hidden sm:flex items-center justify-between px-7 pt-3 pb-1 text-[12px] font-semibold text-[#191c1d] bg-[#f8f9fa] select-none z-50">
            <span>9:41</span>
            <div className="w-24 h-4 bg-[#191c1d] rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-[14px]">
              <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>
        )}

        {/* If user is NOT logged in: Show the dual Patient / Doctor Login Panel */}
        {!currentUser ? (
          <LoginAuthScreen
            onLoginSuccess={handleLoginSuccess}
            defaultRole={authInitialRole}
          />
        ) : (
          <>
            {/* App Header (Rendered on secondary tabs; Home tab has its integrated header) */}
            {activeTab !== 'home' && (
              <Header
                activeTab={activeTab}
                currentUser={currentUser}
                onOpenSos={() => setIsSosModalOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
                onLogout={handleLogout}
              />
            )}

            {/* Main Content Area */}
            <main className="flex-1 px-5 pt-3 pb-24 bg-[#f8f9fa] overflow-y-auto">
              {activeTab === 'home' && (
                <HomeScreen
                  currentUser={currentUser}
                  patientLocation={patientLocation}
                  isLocating={isLocating}
                  virtualQueue={virtualQueue}
                  onOpenProfile={() => setIsProfileOpen(true)}
                  onOpenNotifications={() => setIsNotificationsOpen(true)}
                  onOpenLocationPicker={() => setIsLocationPickerOpen(true)}
                  onRefreshGps={(e) => {
                    e.stopPropagation();
                    detectLocation(true);
                  }}
                  onOpenVirtualQueueModal={() => setIsVirtualQueueModalOpen(true)}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onOpenVideoCall={() => handleOpenVideoCall()}
                  onOpenReschedule={() => handleOpenReschedule()}
                  onOpenReport={() => handleViewReport(healthRecords[0])}
                  onOpenBookVisit={() => setIsBookModalOpen(true)}
                  onOpenSos={() => setIsSosModalOpen(true)}
                  onQuickServiceClick={handleQuickServiceClick}
                  onSelectFamilyMember={handleSelectFamilyMember}
                />
              )}

              {activeTab === 'visits' && (
                <VisitsScreen
                  upcomingAppointments={upcomingAppointments}
                  pastAppointments={pastAppointments}
                  cancelledAppointments={cancelledAppointments}
                  myTokenNumber={virtualQueue.myTokenNumber}
                  currentServingToken={virtualQueue.currentServingToken}
                  onOpenVirtualQueueModal={() => setIsVirtualQueueModalOpen(true)}
                  onOpenBookModal={() => setIsBookModalOpen(true)}
                  onJoinVideoCall={(app) => handleOpenVideoCall(app)}
                  onReschedule={(app) => handleOpenReschedule(app)}
                  onCancelAppointment={handleCancelAppointment}
                  onViewSummary={(app) => {
                    alert(`Viewing clinical summary for appointment with ${app.doctor.name}:\n\nDiagnosis: ${app.notes || 'Routine checkup completed successfully.'}\nStatus: Completed • All vitals documented.`);
                  }}
                />
              )}

              {activeTab === 'health' && (
                <HealthScreen
                  currentUser={currentUser}
                  records={healthRecords}
                  onOpenShareId={() => setIsShareIdModalOpen(true)}
                  onOpenUploadModal={() => setIsUploadModalOpen(true)}
                  onViewReport={handleViewReport}
                  onDownloadReport={handleDownloadReport}
                  onViewScan={() => {
                    alert('Opening DICOM Web Viewer for Chest X-Ray PA View (Series #9042)... Resolution: 2048x2048. Clear lung parenchyma confirmed.');
                  }}
                  onViewRefills={() => {
                    alert('Refill requested for Lisinopril 10mg. Transmitted to Apollo Pharmacy. Ready for pickup in 2 hours.');
                  }}
                />
              )}

              {activeTab === 'clinical' && (
                <ClinicalScreen
                  currentUser={currentUser}
                  queue={patientQueue}
                  onOpenCriticalAlert={() => setIsCriticalAlertOpen(true)}
                  onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
                  onOpenPrescribe={handleOpenPrescribe}
                  onViewChart={handleViewChart}
                  onAddNote={handleAddNote}
                />
              )}

              {activeTab === 'command' && (
                <CommandScreen
                  onOpenAmbulanceDispatch={() => setIsAmbulanceModalOpen(true)}
                  onOpenBedReallocation={() => setIsBedModalOpen(true)}
                />
              )}
            </main>

            {/* Global Bottom Navigation tailored for Patient vs Doctor */}
            <BottomNav
              activeTab={activeTab}
              userRole={currentUser.role}
              onTabChange={(tab) => setActiveTab(tab)}
            />
          </>
        )}
      </div>

      {/* Modals & Dialogs (Active when logged in) */}
      {currentUser && (
        <>
          <VideoConsultationModal
            isOpen={isVideoModalOpen}
            appointment={activeVideoAppointment}
            onClose={() => setIsVideoModalOpen(false)}
          />

          <BookVisitModal
            isOpen={isBookModalOpen}
            onClose={() => setIsBookModalOpen(false)}
            onBookSuccess={handleBookSuccess}
          />

          <RescheduleModal
            isOpen={isRescheduleModalOpen}
            appointment={appointmentToReschedule}
            onClose={() => setIsRescheduleModalOpen(false)}
            onRescheduleSuccess={handleRescheduleSuccess}
          />

          <LabReportModal
            isOpen={isReportModalOpen}
            record={selectedReport}
            onClose={() => setIsReportModalOpen(false)}
            onDownload={() => selectedReport && handleDownloadReport(selectedReport)}
          />

          <ShareIdModal
            isOpen={isShareIdModalOpen}
            onClose={() => setIsShareIdModalOpen(false)}
          />

          <UploadRecordModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onUploadSuccess={handleUploadSuccess}
          />

          <CriticalAlertModal
            isOpen={isCriticalAlertOpen}
            onClose={() => setIsCriticalAlertOpen(false)}
          />

          <AiCopilotModal
            isOpen={isAiCopilotOpen}
            onClose={() => setIsAiCopilotOpen(false)}
            onInsertNote={handleInsertCopilotNote}
          />

          <AmbulanceDispatchModal
            isOpen={isAmbulanceModalOpen}
            onClose={() => setIsAmbulanceModalOpen(false)}
            onDispatchSuccess={(unit) => {
              alert(`${unit} dispatched successfully to incident location.`);
            }}
          />

          <BedReallocationModal
            isOpen={isBedModalOpen}
            onClose={() => setIsBedModalOpen(false)}
            onConfirm={() => {
              alert('Hospital bed capacity allocation updated live across all departments.');
            }}
          />

          <PrescriptionModal
            isOpen={isPrescribeModalOpen}
            patient={selectedPatientForRx}
            onClose={() => setIsPrescribeModalOpen(false)}
            onSave={(rxText) => {
              alert(`Prescription transmitted to pharmacy and patient portal:\n${rxText}`);
            }}
          />

          <PatientChartModal
            isOpen={isChartModalOpen}
            patient={selectedPatientForChart}
            onClose={() => setIsChartModalOpen(false)}
            onOpenPrescribe={handleOpenPrescribe}
          />

          <NotificationsModal
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            onSelectAction={(action) => {
              if (action === 'video') handleOpenVideoCall();
              else if (action === 'report') setIsReportModalOpen(true);
              else if (action === 'refill') setActiveTab('health');
            }}
          />

          <ProfileModal
            isOpen={isProfileOpen}
            currentUser={currentUser}
            onClose={() => setIsProfileOpen(false)}
            onOpenShareId={() => setIsShareIdModalOpen(true)}
            onLogout={handleLogout}
            onSwitchRole={handleSwitchRole}
          />
        </>
      )}

      {/* SOS Modal always available */}
      <SosModal
        isOpen={isSosModalOpen}
        location={patientLocation}
        onClose={() => setIsSosModalOpen(false)}
        onRefreshLocation={() => detectLocation(true)}
      />

      {/* Location Picker & GPS Auto-Detection Modal */}
      <LocationPickerModal
        isOpen={isLocationPickerOpen}
        currentLocation={patientLocation}
        isLocating={isLocating}
        statusMessage={locationStatusMessage}
        onClose={() => setIsLocationPickerOpen(false)}
        onDetectAutoLocation={() => detectLocation(true)}
        onSelectManualLocation={(city, addr, area) => setManualLocation(city, addr, area)}
      />

      {/* Virtual Queue Tracker Modal with Real-time Simulation & Digital Pass */}
      <VirtualQueueModal
        isOpen={isVirtualQueueModalOpen}
        currentServingToken={virtualQueue.currentServingToken}
        myTokenNumber={virtualQueue.myTokenNumber}
        tokensAhead={virtualQueue.tokensAhead}
        estimatedMinutesLeft={virtualQueue.estimatedMinutesLeft}
        urgencyStatus={virtualQueue.urgencyStatus}
        guidanceHeadline={virtualQueue.guidanceHeadline}
        guidanceSubtext={virtualQueue.guidanceSubtext}
        tokensList={virtualQueue.tokensList}
        soundEnabled={virtualQueue.soundEnabled}
        isAutoAdvancing={virtualQueue.isAutoAdvancing}
        patientName={currentUser?.name || 'Patient'}
        onClose={() => setIsVirtualQueueModalOpen(false)}
        onAdvanceToken={virtualQueue.advanceToken}
        onRewindToken={virtualQueue.rewindToken}
        onResetToDemo={virtualQueue.resetToPromptState}
        onDeferToken={virtualQueue.deferToken}
        onToggleSound={() => virtualQueue.setSoundEnabled(!virtualQueue.soundEnabled)}
        onToggleAutoAdvance={() => virtualQueue.setIsAutoAdvancing(!virtualQueue.isAutoAdvancing)}
      />

      {/* CureX Android Port Modals */}
      <PaymentHistoryModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payments={payments}
        onPayPendingBill={handlePayPendingBill}
      />

      <InsuranceModal
        isOpen={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
        policy={insurancePolicy}
        onSubmitNewClaim={handleSubmitNewClaim}
      />

      <PharmacyModal
        isOpen={isPharmacyModalOpen}
        onClose={() => setIsPharmacyModalOpen(false)}
        medicines={medicines}
        orders={medicineOrders}
        onPlaceOrder={handlePlaceMedicineOrder}
      />

      <DiagnosticsModal
        isOpen={isDiagnosticsModalOpen}
        onClose={() => setIsDiagnosticsModalOpen(false)}
        tests={diagnosticTests}
        bookings={diagnosticBookings}
        onBookTest={handleBookDiagnosticTest}
      />

      <FamilyCircleModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        members={familyMembers}
        activeMemberId={activeFamilyMemberId}
        onSelectMember={setActiveFamilyMemberId}
        onAddMember={handleAddFamilyMember}
      />
    </div>
  );
}
