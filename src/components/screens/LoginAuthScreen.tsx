import React, { useState } from 'react';
import { CUREX_LOGO } from '../../data/healthcareData';

export type UserRole = 'patient' | 'doctor';

export interface AuthUser {
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  badgeTitle?: string;
  identifier: string; // Patient Health ID or Doctor License No
  department?: string;
  hospital?: string;
  bloodGroup?: string;
  age?: string;
}

interface LoginAuthScreenProps {
  onLoginSuccess: (user: AuthUser) => void;
  defaultRole?: UserRole;
}

export const LoginAuthScreen: React.FC<LoginAuthScreenProps> = ({
  onLoginSuccess,
  defaultRole = 'patient',
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Patient inputs
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [patientBloodGroup, setPatientBloodGroup] = useState('O+');
  const [patientAge, setPatientAge] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientLocationStr, setPatientLocationStr] = useState('');
  const [isDetectingSignupLoc, setIsDetectingSignupLoc] = useState(false);

  // Doctor inputs
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const [doctorLicenseId, setDoctorLicenseId] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('Cardiology');
  const [doctorHospital, setDoctorHospital] = useState('');

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify'>('request');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const specialties = [
    'Cardiology',
    'Internal Medicine',
    'Emergency Medicine',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'General Surgery',
    'Dermatology',
    'Oncology',
  ];

  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      setPatientLocationStr('San Francisco, CA');
      return;
    }
    setIsDetectingSignupLoc(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=14&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.county || 'Metro Area';
            const state = data.address?.state_code || data.address?.state || '';
            setPatientLocationStr(state ? `${city}, ${state}` : city);
          } else {
            setPatientLocationStr('Current GPS Location');
          }
        } catch {
          setPatientLocationStr('Current GPS Location');
        } finally {
          setIsDetectingSignupLoc(false);
        }
      },
      () => {
        setIsDetectingSignupLoc(false);
        setPatientLocationStr('Civic Center, San Francisco, CA');
      },
      { timeout: 6000 }
    );
  };

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);

    const trimmedName = patientName.trim();
    const trimmedEmail = patientEmail.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name to proceed.');
      return;
    }
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email or health ID.');
      return;
    }
    if (!patientPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const initials = trimmedName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      const generatedId = `CX-${Math.floor(10000 + Math.random() * 90000)}-${initials || 'PT'}`;

      onLoginSuccess({
        role: 'patient',
        name: trimmedName,
        email: trimmedEmail,
        phone: patientPhone.trim() || undefined,
        identifier: generatedId,
        badgeTitle: authMode === 'signup' ? 'Primary Policyholder' : 'Verified Patient',
        bloodGroup: patientBloodGroup || 'O+',
        age: patientAge.trim() || undefined,
      });
    }, 500);
  };

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);

    const trimmedDocName = doctorName.trim();
    const trimmedEmail = doctorEmail.trim();

    if (!trimmedDocName) {
      setErrorMessage('Please enter your practitioner name to proceed.');
      return;
    }
    if (!trimmedEmail) {
      setErrorMessage('Please enter your hospital email or medical practitioner ID.');
      return;
    }
    if (!doctorPassword) {
      setErrorMessage('Please enter your clinical password.');
      return;
    }

    if (authMode === 'signup') {
      const trimmedLicense = doctorLicenseId.trim();
      if (!trimmedLicense) {
        setErrorMessage('Please provide your medical registration / license number.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const formattedName = trimmedDocName.toLowerCase().startsWith('dr')
          ? trimmedDocName
          : `Dr. ${trimmedDocName}`;

        onLoginSuccess({
          role: 'doctor',
          name: formattedName,
          email: trimmedEmail,
          identifier: trimmedLicense,
          department: doctorSpecialty,
          hospital: doctorHospital.trim() || 'ABC Multispeciality Hospital',
          badgeTitle: `Attending Physician • ${doctorSpecialty}`,
        });
      }, 500);
    } else {
      // Doctor Sign in mode
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const formattedName = trimmedDocName.toLowerCase().startsWith('dr')
          ? trimmedDocName
          : `Dr. ${trimmedDocName}`;

        const derivedLicense = doctorLicenseId.trim() || `MED-${Math.floor(10000 + Math.random() * 90000)}`;

        onLoginSuccess({
          role: 'doctor',
          name: formattedName,
          email: trimmedEmail,
          identifier: derivedLicense,
          department: doctorSpecialty,
          hospital: doctorHospital.trim() || 'ABC Multispeciality Hospital',
          badgeTitle: `Consultant • ${doctorSpecialty}`,
        });
      }, 500);
    }
  };

  const handleForgotRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const email = forgotEmail.trim();
    if (!email) {
      setErrorMessage('Please enter your registered email address or identifier.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotStep('verify');
      setRecoveryCode('849201'); // Pre-fill sample recovery code for smooth testing
      setSuccessNotice(`A 6-digit recovery code has been dispatched to ${email}.`);
    }, 600);
  };

  const handleForgotVerifyAndReset = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!recoveryCode.trim()) {
      setErrorMessage('Please enter the 6-digit recovery code.');
      return;
    }
    if (!newPassword) {
      setErrorMessage('Please enter a new password.');
      return;
    }
    if (newPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedRole === 'patient') {
        setPatientPassword(newPassword);
        setPatientEmail(forgotEmail);
      } else {
        setDoctorPassword(newPassword);
        setDoctorEmail(forgotEmail);
      }

      setAuthMode('signin');
      setForgotStep('request');
      setRecoveryCode('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccessNotice('Your password has been successfully reset! You can now sign in.');
    }, 600);
  };

  const openForgotPassword = () => {
    setAuthMode('forgot');
    setForgotStep('request');
    setErrorMessage(null);
    setSuccessNotice(null);
    setForgotEmail(selectedRole === 'patient' ? patientEmail : doctorEmail);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f3] flex flex-col justify-center items-center p-4 sm:p-6 text-[#191c1d]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#bec9c6]/40 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#004c46] flex items-center justify-center shadow-md p-2.5">
            <img src={CUREX_LOGO} alt="CureX Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-[24px] font-extrabold tracking-tight text-[#004c46]">CureX Health</h1>
            <p className="text-[13px] text-[#3e4947]">Enterprise Clinical &amp; Patient Portal</p>
          </div>
        </div>

        {/* Role Selector Tabs: Patient vs Doctor */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#f3f4f5] rounded-2xl border border-[#bec9c6]/30">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('patient');
              setErrorMessage(null);
              setSuccessNotice(null);
            }}
            className={`py-2.5 px-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'patient'
                ? 'bg-white text-[#004c46] shadow-sm'
                : 'text-[#56605e] hover:text-[#191c1d]'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">person</span>
            <span>Patient Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('doctor');
              setErrorMessage(null);
              setSuccessNotice(null);
            }}
            className={`py-2.5 px-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'doctor'
                ? 'bg-[#004c46] text-white shadow-sm'
                : 'text-[#56605e] hover:text-[#191c1d]'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">stethoscope</span>
            <span>Doctor &amp; Staff</span>
          </button>
        </div>

        {/* Mode Navigation Bar: Sign In vs Register vs Forgot Password */}
        <div className="flex items-center justify-between border-b border-[#edeeef] pb-3">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#6f7977]">
            {authMode === 'forgot'
              ? 'Password Recovery'
              : selectedRole === 'patient'
              ? 'Patient Authentication'
              : 'Clinical Practitioner Authentication'}
          </span>
          <div className="flex items-center gap-1 text-[12px]">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage(null);
                setSuccessNotice(null);
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                authMode === 'signin'
                  ? 'bg-[#004c46]/10 text-[#004c46]'
                  : 'text-[#6f7977] hover:text-[#191c1d]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
                setSuccessNotice(null);
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                authMode === 'signup'
                  ? 'bg-[#004c46]/10 text-[#004c46]'
                  : 'text-[#6f7977] hover:text-[#191c1d]'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Error notification banner */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[12px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success notification banner */}
        {successNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[12px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-emerald-600 shrink-0">check_circle</span>
            <span>{successNotice}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 1: FORGOT PASSWORD RECOVERY PANEL                       */}
        {/* ============================================================ */}
        {authMode === 'forgot' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                  setSuccessNotice(null);
                }}
                className="w-8 h-8 rounded-full bg-[#f3f4f5] hover:bg-[#edeeef] text-[#004c46] flex items-center justify-center transition-colors"
                title="Return to Sign In"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
              <div>
                <h3 className="text-[16px] font-bold text-[#191c1d]">
                  Forgot Your Password?
                </h3>
                <p className="text-[11px] text-[#6f7977]">
                  {forgotStep === 'request'
                    ? `Enter your ${selectedRole === 'patient' ? 'patient email' : 'hospital email'} to receive a recovery code.`
                    : 'Enter the recovery code and your new password.'}
                </p>
              </div>
            </div>

            {forgotStep === 'request' ? (
              <form onSubmit={handleForgotRequest} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                    Registered Email Address *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder={selectedRole === 'patient' ? 'e.g. eleanor.vance@example.com' : 'e.g. physician@curex.hospital'}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#004c46] hover:bg-[#00665e] text-white font-bold text-[13px] shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Recovery Code...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[17px]">send</span>
                      <span>Send Recovery Code</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotVerifyAndReset} className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider">
                      6-Digit Recovery Code *
                    </label>
                    <span className="text-[10px] text-[#004c46] font-semibold bg-[#a2f1e6]/40 px-1.5 py-0.5 rounded">
                      Demo Code: 849201
                    </span>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                      pin
                    </span>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={recoveryCode}
                      onChange={(e) => setRecoveryCode(e.target.value)}
                      placeholder="849201"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[14px] font-mono tracking-wider focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                    New Password *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                      lock_reset
                    </span>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new secure password"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                      lock
                    </span>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new secure password"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#004c46] hover:bg-[#00665e] text-white font-bold text-[13px] shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[17px]">verified</span>
                      <span>Update Password &amp; Return to Sign In</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage(null);
                setSuccessNotice(null);
              }}
              className="w-full text-center text-[12px] font-semibold text-[#004c46] hover:underline pt-2 block"
            >
              ← Remember your password? Return to Sign In
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: PATIENT PORTAL (SIGN IN & REGISTER)                  */}
        {/* ============================================================ */}
        {selectedRole === 'patient' && authMode !== 'forgot' && (
          <form onSubmit={handlePatientSubmit} className="space-y-3.5">
            {/* Full Name Option: Available on BOTH Sign In & Register */}
            <div>
              <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                {authMode === 'signup' ? 'Full Legal Name *' : 'Your Full Name *'}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                Email Address or Patient ID *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="e.g. eleanor.vance@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block">
                  Password *
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={openForgotPassword}
                    className="text-[11px] font-semibold text-[#004c46] hover:text-[#00665e] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={patientPassword}
                  onChange={(e) => setPatientPassword(e.target.value)}
                  placeholder="Enter your confidential password"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
                />
              </div>
            </div>

            {authMode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                      Blood Group
                    </label>
                    <select
                      value={patientBloodGroup}
                      onChange={(e) => setPatientBloodGroup(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    >
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="e.g. 34"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider">
                      Care Location / City
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoDetectLocation}
                      disabled={isDetectingSignupLoc}
                      className="text-[11px] text-[#004c46] hover:text-[#00665e] font-bold flex items-center gap-1 active:scale-95"
                    >
                      <span className={`material-symbols-outlined text-[13px] ${isDetectingSignupLoc ? 'animate-spin' : ''}`}>
                        {isDetectingSignupLoc ? 'sync' : 'my_location'}
                      </span>
                      <span>{isDetectingSignupLoc ? 'Detecting...' : 'Auto-detect GPS'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                      location_on
                    </span>
                    <input
                      type="text"
                      value={patientLocationStr}
                      onChange={(e) => setPatientLocationStr(e.target.value)}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                    Emergency Contact Phone (Optional)
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                      call
                    </span>
                    <input
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="e.g. +1 555-0149"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-xl bg-[#004c46] hover:bg-[#00665e] text-white font-bold text-[13px] shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[17px]">login</span>
                  <span>{authMode === 'signup' ? 'Create Patient Account' : 'Sign In to Patient Portal'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: DOCTOR & STAFF PORTAL (SIGN IN & REGISTER)           */}
        {/* ============================================================ */}
        {selectedRole === 'doctor' && authMode !== 'forgot' && (
          <form onSubmit={handleDoctorSubmit} className="space-y-3.5">
            {/* Practitioner Name Option: Available on BOTH Sign In & Register */}
            <div>
              <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                Practitioner Full Name *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                  stethoscope
                </span>
                <input
                  type="text"
                  required
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Pendelton"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                Hospital Email or Staff ID *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                  badge
                </span>
                <input
                  type="email"
                  required
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  placeholder="e.g. physician@curex.hospital"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block">
                  Clinical Password *
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={openForgotPassword}
                    className="text-[11px] font-semibold text-[#004c46] hover:text-[#00665e] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#6f7977] absolute left-3.5 top-1/2 -translate-y-1/2">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={doctorPassword}
                  onChange={(e) => setDoctorPassword(e.target.value)}
                  placeholder="Enter medical credentials password"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                />
              </div>
            </div>

            {authMode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                      License / Reg No *
                    </label>
                    <input
                      type="text"
                      required
                      value={doctorLicenseId}
                      onChange={(e) => setDoctorLicenseId(e.target.value)}
                      placeholder="e.g. MCI-2022-771"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                      Department
                    </label>
                    <select
                      value={doctorSpecialty}
                      onChange={(e) => setDoctorSpecialty(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                    >
                      {specialties.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                    Hospital / Medical Center Affiliation
                  </label>
                  <input
                    type="text"
                    value={doctorHospital}
                    onChange={(e) => setDoctorHospital(e.target.value)}
                    placeholder="e.g. ABC Multispeciality Hospital"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-xl bg-[#004c46] hover:bg-[#00665e] text-white font-bold text-[13px] shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Validating Medical Registry...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[17px]">verified_user</span>
                  <span>{authMode === 'signup' ? 'Register Clinical Practitioner' : 'Access Clinical Workspace'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Security & Regulatory Footer */}
        <div className="pt-2 border-t border-[#edeeef] flex items-center justify-between text-[11px] text-[#6f7977]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#004c46]">shield</span>
            <span>HIPAA &amp; HL7 FHIR Compliant</span>
          </span>
          <span>v3.4.1 Secure</span>
        </div>
      </div>
    </div>
  );
};
