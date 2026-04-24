# Appointment Workflow - Visual Summary

## 1. Appointment Creation Modal

### Tab 1: Existing Patient
```
┌─────────────────────────────────────────┐
│ Nouveau Rendez-vous                     │
├─────────────────────────────────────────┤
│ [Patient existant] [Nouveau patient]    │
├─────────────────────────────────────────┤
│                                         │
│ Patient *                               │
│ ┌─────────────────────────────────────┐ │
│ │ Sélectionner un patient         ▼ │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Date *              Heure *             │
│ ┌──────────────┐   ┌──────────────┐    │
│ │ YYYY-MM-DD   │   │ HH:MM        │    │
│ └──────────────┘   └──────────────┘    │
│                                         │
│ Type de soin *                          │
│ ┌─────────────────────────────────────┐ │
│ │ Détartrage, Contrôle, etc.          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│              [Annuler] [Ajouter RDV]   │
└─────────────────────────────────────────┘
```

### Tab 2: New Patient
```
┌─────────────────────────────────────────┐
│ Nouveau Rendez-vous                     │
├─────────────────────────────────────────┤
│ [Patient existant] [Nouveau patient]    │
├─────────────────────────────────────────┤
│                                         │
│ Nom *               Prénom *            │
│ ┌──────────────┐   ┌──────────────┐    │
│ │ Hadj-bouziane│   │ Fethellah    │    │
│ └──────────────┘   └──────────────┘    │
│                                         │
│ Téléphone *                             │
│ ┌─────────────────────────────────────┐ │
│ │ 0795632344                          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Catégorie de Soin *                     │
│ ┌─────────────────────────────────────┐ │
│ │ Sélectionner une catégorie      ▼ │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Date *              Heure *             │
│ ┌──────────────┐   ┌──────────────┐    │
│ │ YYYY-MM-DD   │   │ HH:MM        │    │
│ └──────────────┘   └──────────────┘    │
│                                         │
│              [Annuler] [Ajouter RDV]   │
└─────────────────────────────────────────┘
```

---

## 2. Appointment List View

```
┌─────────────────────────────────────────────────────────────┐
│ Gestion des Rendez-vous                                     │
│ 5 rendez-vous planifiés                  [+ Nouveau RDV]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📅 lundi 15 avril 2026                                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 09:00  Benali Fatima              [Confirmé] [🗑]       │ │
│ │        Contrôle                                         │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ 10:30  Khelifi Ahmed              [Confirmé] [🗑]       │ │
│ │        Suite bridge                                     │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ 14:00  Boumediene Sara            [En attente] [🗑]     │ │
│ │        Détartrage                                       │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 📅 mardi 16 avril 2026                                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 09:30  Zerrouki Amina             [Confirmé] [🗑]       │ │
│ │        Contrôle ODF                                     │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ 11:00  Messaoudi Karim            [En attente] [🗑]     │ │
│ │        Contrôle post-extraction                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Legend:
[Confirmé]    = Green badge (status: confirmé)
[En attente]  = Orange badge (status: en attente)
[Annulé]      = Red badge (status: annulé)
[🗑]          = Delete button
```

---

## 3. Appointment Action Modal

```
┌─────────────────────────────────────────┐
│ Gestion du Rendez-vous                  │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Patient                             │ │
│ │ Benali Fatima                       │ │
│ │                                     │ │
│ │ Date              Heure             │ │
│ │ lun 15 avr        09:00             │ │
│ │                                     │ │
│ │ Catégorie de Soin                   │ │
│ │ Soins de base                       │ │
│ │                                     │ │
│ │ Statut                              │ │
│ │ [En attente]                        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Que souhaitez-vous faire avec ce       │
│ rendez-vous ?                           │
│                                         │
│ [✓ Confirmer] [✗ Rejeter]              │
│                                         │
│        [Fermer]                         │
│                                         │
└─────────────────────────────────────────┘
```

---

## 4. Patient Conversion Flow

### Step 1: Appointment Created (New Patient)
```
Appointment Status: En attente
├─ patientId: "" (empty)
├─ patientNom: "Dupont Marie"
├─ date: "2026-04-20"
├─ heure: "10:00"
├─ motif: "Soins de base"
└─ statut: "en attente"
```

### Step 2: User Clicks Appointment
```
Action Modal Opens
├─ Shows appointment details
├─ Displays two buttons:
│  ├─ Confirmer
│  └─ Rejeter
└─ User clicks "Confirmer"
```

### Step 3: Appointment Confirmed
```
Appointment Status: Confirmé
├─ patientId: "" (still empty)
├─ statut: "confirmé"
└─ Patient Modal Opens Automatically
```

### Step 4: Patient Modal Pre-filled
```
Patient Modal
├─ nom: "Dupont" ✓ (pre-filled)
├─ prenom: "Marie" ✓ (pre-filled)
├─ telephone: "0795123456" ✓ (pre-filled)
├─ categorie: "Soins de base" ✓ (pre-filled)
├─ age: "" (empty - required)
├─ antecedents: "" (empty - optional)
└─ typeSoin: "" (empty - optional)
```

### Step 5: Doctor Completes Patient Record
```
Patient Modal (Completed)
├─ nom: "Dupont" ✓
├─ prenom: "Marie" ✓
├─ telephone: "0795123456" ✓
├─ categorie: "Soins de base" ✓
├─ age: "35" ✓ (filled by doctor)
├─ antecedents: "Aucun" ✓ (filled by doctor)
└─ typeSoin: "Détartrage" ✓ (filled by doctor)
```

### Step 6: Patient Created & Linked
```
Patient Record Created
├─ id: "6" (new patient ID)
├─ nom: "Dupont"
├─ prenom: "Marie"
├─ telephone: "0795123456"
├─ categorie: "Soins de base"
├─ age: 35
├─ antecedents: "Aucun"
└─ typeSoin: "Détartrage"

Appointment Updated
├─ patientId: "6" (now linked)
├─ statut: "confirmé"
└─ Patient modal closes

Toast: "Rendez-vous confirmé. Veuillez compléter le dossier du patient."
```

---

## 5. Status Badge Colors

```
┌──────────────────────────────────────────┐
│ Status Badge Styling                     │
├──────────────────────────────────────────┤
│                                          │
│ [Confirmé]                               │
│  Background: Green (#10b981 / success)   │
│  Border: Light green                     │
│  Text: Green                             │
│                                          │
│ [En attente]                             │
│  Background: Orange (#f59e0b / warning)  │
│  Border: Light orange                    │
│  Text: Orange                            │
│                                          │
│ [Annulé]                                 │
│  Background: Red (#ef4444 / destructive) │
│  Border: Light red                       │
│  Text: Red                               │
│                                          │
└──────────────────────────────────────────┘
```

---

## 6. Toast Notifications

```
Success Toast (Green)
┌─────────────────────────────────────────┐
│ ✓ Rendez-vous confirmé                  │
└─────────────────────────────────────────┘
Auto-dismisses after 3 seconds

Success Toast (Green)
┌─────────────────────────────────────────┐
│ ✓ Rendez-vous confirmé. Veuillez        │
│   compléter le dossier du patient.      │
└─────────────────────────────────────────┘
Auto-dismisses after 3 seconds

Success Toast (Green)
┌─────────────────────────────────────────┐
│ ✓ Rendez-vous rejeté                    │
└─────────────────────────────────────────┘
Auto-dismisses after 3 seconds
```

---

## 7. Responsive Design

### Desktop (1920px+)
```
┌─────────────────────────────────────────────────────────┐
│ Full width modal (max-w-md)                             │
│ All elements visible                                    │
│ Proper spacing maintained                              │
└─────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────────────────────────────────────┐
│ Modal width: 90vw                    │
│ Touch-friendly buttons               │
│ Scrollable if needed                 │
└──────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌────────────────────┐
│ Modal width: 90vw  │
│ Full height scroll │
│ Large touch targets│
│ Stacked layout     │
└────────────────────┘
```

---

## 8. User Journey Map

```
START
  │
  ├─→ Click "Nouveau RDV"
  │     │
  │     ├─→ Select "Patient existant"
  │     │     │
  │     │     ├─→ Choose patient
  │     │     ├─→ Set date/time
  │     │     ├─→ Enter treatment type
  │     │     └─→ Submit
  │     │           │
  │     │           └─→ Appointment created (En attente)
  │     │                 │
  │     │                 └─→ Click appointment
  │     │                       │
  │     │                       ├─→ Click "Confirmer"
  │     │                       │     └─→ Status: Confirmé ✓
  │     │                       │
  │     │                       └─→ Click "Rejeter"
  │     │                             └─→ Status: Annulé ✗
  │     │
  │     └─→ Select "Nouveau patient"
  │           │
  │           ├─→ Enter name
  │           ├─→ Enter phone
  │           ├─→ Select category
  │           ├─→ Set date/time
  │           └─→ Submit
  │                 │
  │                 └─→ Appointment created (En attente)
  │                       │
  │                       └─→ Click appointment
  │                             │
  │                             └─→ Click "Confirmer"
  │                                   │
  │                                   ├─→ Status: Confirmé
  │                                   │
  │                                   └─→ Patient Modal Opens
  │                                         │
  │                                         ├─→ Pre-filled:
  │                                         │   ├─ Nom
  │                                         │   ├─ Prénom
  │                                         │   ├─ Téléphone
  │                                         │   └─ Catégorie
  │                                         │
  │                                         ├─→ Fill remaining:
  │                                         │   ├─ Âge
  │                                         │   ├─ Antécédents
  │                                         │   └─ Type de Soin
  │                                         │
  │                                         └─→ Submit
  │                                               │
  │                                               └─→ Patient Created ✓
  │                                                     │
  │                                                     └─→ Appointment Linked
  │                                                           │
  │                                                           └─→ Toast: Success
  │
  └─→ END
```

---

## 9. Data Validation Flow

```
Form Submission
  │
  ├─→ Check required fields
  │     │
  │     ├─→ All filled? YES → Continue
  │     │
  │     └─→ Missing fields? NO → Show alert
  │           "Veuillez remplir tous les champs"
  │           Form remains open
  │
  ├─→ Validate data types
  │     │
  │     ├─→ Valid? YES → Continue
  │     │
  │     └─→ Invalid? NO → Show alert
  │           Form remains open
  │
  └─→ Submit
        │
        └─→ Create appointment/patient
              │
              └─→ Show success toast
```

---

## 10. Component Hierarchy

```
AppLayout
├─ RendezVousPage
│  ├─ Appointment List
│  │  └─ Appointment Cards (grouped by date)
│  │
│  ├─ NewRendezVousModal
│  │  ├─ Tabs
│  │  │  ├─ Existing Patient Tab
│  │  │  └─ New Patient Tab
│  │  └─ Form
│  │
│  ├─ AppointmentActionModal
│  │  ├─ Appointment Details
│  │  ├─ Confirm Button
│  │  ├─ Reject Button
│  │  └─ Close Button
│  │
│  ├─ NewPatientModal
│  │  └─ Form (with optional pre-filled data)
│  │
│  ├─ Toast Notification
│  │
│  └─ Delete Confirmation Dialog
```

---

## 11. Key Features Checklist

```
✓ Create appointment with existing patient
✓ Create appointment with new patient
✓ Manual name entry (Nom & Prénom)
✓ Mandatory phone field
✓ Care category dropdown
✓ Default status "En attente"
✓ Appointment action modal
✓ Confirm action
✓ Reject action
✓ Patient conversion logic
✓ Pre-filled patient data
✓ Empty fields for doctor input
✓ Success toast messages
✓ Professional UI design
✓ Responsive layouts
✓ Smooth transitions
✓ Status color coding
✓ Appointment grouping by date
✓ Delete functionality
✓ Form validation
```
