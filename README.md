# 🏥 CureX: One App. Every Healthcare Need.

Welcome to **CureX**, a production-grade Android healthcare ecosystem that connects patients, doctors, hospitals, diagnostic centres, pharmacies, and ambulances into one secure super-app.

Designed for simplicity, reliability, and scale, CureX removes the friction from modern healthcare.

---

## 🎯 The Vision

Unlike basic doctor-booking apps, **CureX** is an end-to-end ecosystem. 
We believe that patients shouldn't need five different apps for appointments, medical records, pharmacies, ambulances, and insurance. 

CureX unifies the entire healthcare pipeline:
- **Patients** get a calm, intuitive interface to manage their health and family members.
- **Doctors** get powerful clinical dashboards and AI-summarized patient histories.
- **Hospitals** get a commanding view of their operations, staff, and inventory.

## ✨ Core Features

### 👤 For Patients
- **Unified Discovery**: Find hospitals, clinics, and doctors nearby.
- **Smart Appointments**: Book in-person, video, or follow-up consultations.
- **Emergency SOS**: 1-tap emergency request that instantly alerts nearby hospitals and dispatches ambulances.
- **Health Records Vault**: Securely store and view prescriptions, lab reports, and AI-summarized medical histories.
- **Pharmacy & Diagnostics**: Order medicines to your door or book home-sample collections.

### 🩺 For Healthcare Professionals
- **Doctor Dashboard**: Manage daily appointments, follow-ups, and critical cases.
- **Patient Consultation**: Review AI-summarized clinical histories, add notes, and generate prescriptions.
- **Hospital Administration**: High-level KPIs covering bed utilization, revenue, staff, and inventory alerts.
- **Role-Based Access (RBAC)**: Secure access tailored to 15+ different roles (Admin, Doctor, Nurse, Pharmacist, etc.).

---

## 🛠 Tech Stack & Architecture

- **Language**: Kotlin 1.9
- **UI Framework**: Jetpack Compose (Material 3)
- **Architecture**: Clean Architecture + MVVM
- **Dependency Injection**: Dagger Hilt
- **Navigation**: Type-Safe Navigation Compose
- **Backend/Database**: Firebase (Auth, Firestore, Storage)
- **Local Caching**: Room Database (Offline-first support)
- **Concurrency**: Kotlin Coroutines & Flows

## 🚀 Getting Started (Demo Mode)

To evaluate the app without manually creating dozens of accounts, CureX includes a built-in **Demo Seeder**:

1. Open the app and land on the **Role Selection Screen**.
2. Tap the **"Initialize Demo Data"** button at the bottom of the screen.
3. This will instantly populate the connected Firebase Firestore with:
   - Dummy Hospitals and Clinics
   - Dummy Doctors with schedules
   - Dummy Patients and Medical Records
4. You can then log in using the pre-configured mock credentials provided in the code.

## 🔒 Security & AI Safety

- **Invisible AI**: AI is used strictly as an assistant in the background (e.g., summarizing complex medical histories for doctors to read quickly).
- **Safety First**: AI *never* diagnoses, prescribes, approves insurance, or makes autonomous clinical decisions.
- **Data Privacy**: Granular Firestore rules and RBAC ensure that pharmacy staff cannot see financial records, and doctors only see relevant clinical data.

---
*Built with ❤️ for the National Healthcare Hackathon.*
