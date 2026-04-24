# Appointment Status Logic - Visual Guide

## 🎯 Status Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    APPOINTMENT CREATED                      │
│                    Status: En attente                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
                    ┌───────────────┐
                    │ USER CLICKS   │
                    │ APPOINTMENT   │
                    └───────────────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
                ↓           ↓           ↓
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ En       │  │ Confirmé │  │ Annulé   │
        │ attente  │  │          │  │          │
        └──────────┘  └──────────┘  └──────────┘
                │           │           │
                ↓           ↓           ↓
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Action   │  │ Patient  │  │ Disabled │
        │ Modal    │  │ Modal    │  │ State    │
        └──────────┘  └──────────┘  └──────────┘
                │           │           │
        ┌───────┴───────┐   │           │
        │               │   │           │
        ↓               ↓   ↓           ↓
    Confirm        Reject  Complete  Delete
        │               │   │           │
        ↓               ↓   ↓           ↓
    Confirmé       Annulé  Patient   Removed
                            Created
```

---

## 📋 Appointment Row States

### State 1: Pending (En attente)

```
┌─────────────────────────────────────────────────────────────┐
│ 10:00  Dupont Marie                    [En attente]  [🗑]   │
│        Soins de base                                        │
│                                                             │
│ Opacity: 100%                                               │
│ Hover: Light background                                     │
│ Cursor: pointer                                             │
│ Clickable: YES                                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
                    ┌───────────────┐
                    │ ACTION MODAL  │
                    │               │
                    │ Confirmer     │
                    │ Rejeter       │
                    │ Fermer        │
                    └───────────────┘
```

### State 2: Confirmed (Confirmé)

```
┌─────────────────────────────────────────────────────────────┐
│ 10:00  Dupont Marie                    [Confirmé]   [🗑]    │
│        Soins de base                                        │
│                                                             │
│ Opacity: 100%                                               │
│ Hover: Light background                                     │
│ Cursor: pointer                                             │
│ Clickable: YES                                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
                    ┌───────────────┐
                    │ PATIENT MODAL │
                    │               │
                    │ Pre-filled:   │
                    │ - Nom         │
                    │ - Prénom      │
                    │ - Catégorie   │
                    │               │
                    │ Empty:        │
                    │ - Téléphone   │
                    │ - Âge         │
                    │ - Antécédents │
                    └───────────────┘
```

### State 3: Rejected (Annulé)

```
┌─────────────────────────────────────────────────────────────┐
│ 10:00  Dupont Marie                    [Annulé]     [🗑]    │
│        Soins de base                                        │
│                                                             │
│ Opacity: 60% (Reduced)                                      │
│ Hover: None                                                 │
│ Cursor: not-allowed                                         │
│ Clickable: NO                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
                    ┌───────────────┐
                    │ NO ACTION     │
                    │ (Disabled)    │
                    └───────────────┘
```

---

## 🔄 Complete Workflow Visualization

### Workflow 1: Create → Confirm → Convert

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: CREATE APPOINTMENT                                   │
├──────────────────────────────────────────────────────────────┤
│ Form:                                                        │
│ - Nom: Dupont                                                │
│ - Prénom: Marie                                              │
│ - Téléphone: 0795123456                                      │
│ - Catégorie: Soins de base                                   │
│ - Date: 2026-04-20                                           │
│ - Heure: 10:00                                               │
│                                                              │
│ Result: Appointment created with status "En attente"         │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: APPOINTMENT IN LIST                                  │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐   │
│ │ 10:00  Dupont Marie            [En attente]  [🗑]     │   │
│ │        Soins de base                                  │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ Status: En attente (Orange badge)                            │
│ Action: Click to open action modal                           │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: ACTION MODAL APPEARS                                 │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐   │
│ │ Gestion du Rendez-vous                                │   │
│ │                                                        │   │
│ │ Patient: Dupont Marie                                 │   │
│ │ Date: lun 20 avr                                       │   │
│ │ Heure: 10:00                                           │   │
│ │ Catégorie: Soins de base                               │   │
│ │ Statut: En attente                                     │   │
│ │                                                        │   │
│ │ [✓ Confirmer]  [✗ Rejeter]                            │   │
│ │ [Fermer]                                               │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ User clicks: "Confirmer"                                     │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 4: STATUS UPDATED & PATIENT MODAL OPENS                 │
├──────────────────────────────────────────────────────────────┤
│ Status: Confirmé (Green badge)                               │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐   │
│ │ Nouveau Patient                                        │   │
│ │                                                        │   │
│ │ Nom: Dupont (pre-filled)                               │   │
│ │ Prénom: Marie (pre-filled)                             │   │
│ │ Téléphone: _________ (empty)                           │   │
│ │ Catégorie: Soins de base (pre-filled)                  │   │
│ │ Âge: _________ (empty)                                 │   │
│ │ Antécédents: _________ (empty)                         │   │
│ │                                                        │   │
│ │ [Annuler]  [Ajouter Patient]                           │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ Doctor completes remaining fields                            │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 5: PATIENT CREATED                                      │
├──────────────────────────────────────────────────────────────┤
│ Patient Record Created:                                      │
│ - Nom: Dupont                                                │
│ - Prénom: Marie                                              │
│ - Téléphone: 0795123456                                      │
│ - Catégorie: Soins de base                                   │
│ - Âge: 35                                                    │
│ - Antécédents: Aucun                                         │
│                                                              │
│ Appointment Linked:                                          │
│ - patientId: 6                                               │
│ - Status: Confirmé                                           │
│                                                              │
│ Toast: "Rendez-vous confirmé. Veuillez compléter le         │
│         dossier du patient."                                 │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 Workflow 2: Revisit Confirmed Appointment

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: CONFIRMED APPOINTMENT IN LIST                        │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐   │
│ │ 10:00  Dupont Marie            [Confirmé]   [🗑]      │   │
│ │        Soins de base                                  │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ Status: Confirmé (Green badge)                               │
│ Action: Click to open patient modal directly                 │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: PATIENT MODAL OPENS DIRECTLY                         │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐   │
│ │ Nouveau Patient                                        │   │
│ │                                                        │   │
│ │ Nom: Dupont (pre-filled)                               │   │
│ │ Prénom: Marie (pre-filled)                             │   │
│ │ Téléphone: _________ (empty)                           │   │
│ │ Catégorie: Soins de base (pre-filled)                  │   │
│ │ Âge: _________ (empty)                                 │   │
│ │ Antécédents: _________ (empty)                         │   │
│ │                                                        │   │
│ │ [Annuler]  [Ajouter Patient]                           │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ No action modal shown!                                       │
│ Patient modal opens immediately                              │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: COMPLETE PATIENT RECORD                              │
├──────────────────────────────────────────────────────────────┤
│ Doctor fills remaining fields:                               │
│ - Téléphone: 0795123456                                      │
│ - Âge: 35                                                    │
│ - Antécédents: Aucun                                         │
│                                                              │
│ Click: "Ajouter Patient"                                     │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 4: PATIENT CREATED & LINKED                             │
├──────────────────────────────────────────────────────────────┤
│ Patient record created and linked to appointment             │
│ Toast: "Rendez-vous confirmé. Veuillez compléter le         │
│         dossier du patient."                                 │
└──────────────────────────────────────────────────────────────┘
```

---

## ❌ Workflow 3: Reject Appointment

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: PENDING APPOINTMENT IN LIST                          │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐   │
│ │ 10:00  Dupont Marie            [En attente]  [🗑]     │   │
│ │        Soins de base                                  │   │
│ └────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: ACTION MODAL APPEARS                                 │
├──────────────────────────────────────────────────────────────┤
│ User clicks: "Rejeter"                                       │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: APPOINTMENT REJECTED                                 │
├──────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────┐   │
│ │ 10:00  Dupont Marie            [Annulé]     [🗑]      │   │
│ │        Soins de base                                  │   │
│ │                                                        │   │
│ │ Opacity: 60% (Reduced)                                 │   │
│ │ Cursor: not-allowed                                    │   │
│ │ Clickable: NO                                          │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ Status: Annulé (Red badge)                                   │
│ Toast: "Rendez-vous rejeté"                                  │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ STEP 4: APPOINTMENT DISABLED                                 │
├──────────────────────────────────────────────────────────────┤
│ User clicks appointment:                                     │
│ → No action (disabled)                                       │
│ → No modal opens                                             │
│ → Visual feedback: Reduced opacity                           │
│                                                              │
│ Only option: Delete appointment                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color & Styling Reference

### Status Badge Colors

```
┌─────────────────────────────────────────┐
│ En attente (Pending)                    │
│ ┌─────────────────────────────────────┐ │
│ │ [En attente]                        │ │
│ │ Background: #fef3c7 (Light Orange)  │ │
│ │ Border: #fbbf24 (Orange)            │ │
│ │ Text: #d97706 (Dark Orange)         │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Confirmé (Confirmed)                    │
│ ┌─────────────────────────────────────┐ │
│ │ [Confirmé]                          │ │
│ │ Background: #d1fae5 (Light Green)   │ │
│ │ Border: #6ee7b7 (Green)             │ │
│ │ Text: #059669 (Dark Green)          │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Annulé (Rejected)                       │
│ ┌─────────────────────────────────────┐ │
│ │ [Annulé]                            │ │
│ │ Background: #fee2e2 (Light Red)     │ │
│ │ Border: #fca5a5 (Red)               │ │
│ │ Text: #dc2626 (Dark Red)            │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 📱 Mobile vs Desktop

### Mobile View

```
┌──────────────────────────────┐
│ 10:00  Dupont Marie          │
│        Soins de base         │
│                              │
│ [En attente]  [🗑]           │
│                              │
│ Full width                   │
│ Touch-friendly               │
│ Proper spacing               │
└──────────────────────────────┘
```

### Desktop View

```
┌────────────────────────────────────────────────────────────┐
│ 10:00  Dupont Marie                    [En attente]  [🗑]  │
│        Soins de base                                       │
│                                                            │
│ Proper alignment                                           │
│ Hover effects                                              │
│ Efficient layout                                           │
└────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Visual Indicators

### Pending Appointment
```
✓ Normal opacity (100%)
✓ Hover background color
✓ Pointer cursor
✓ Orange badge
✓ Clickable
```

### Confirmed Appointment
```
✓ Normal opacity (100%)
✓ Hover background color
✓ Pointer cursor
✓ Green badge
✓ Clickable
```

### Rejected Appointment
```
✗ Reduced opacity (60%)
✗ No hover effect
✗ Not-allowed cursor
✗ Red badge
✗ Not clickable
```

---

## 🎯 User Interaction Flow

```
User sees appointment list
        ↓
┌───────┴───────┬───────────┐
│               │           │
↓               ↓           ↓
En attente   Confirmé    Annulé
│               │           │
↓               ↓           ↓
Click        Click       Click
│               │           │
↓               ↓           ↓
Action        Patient    Nothing
Modal         Modal      (Disabled)
│               │           │
↓               ↓           ↓
Confirm/      Complete   Delete
Reject        Record     Only
```

---

## 📊 State Transition Matrix

```
Current State    User Action         New State      Modal Shown
─────────────────────────────────────────────────────────────
En attente       Click               -              Action Modal
En attente       Confirm             Confirmé       Patient Modal
En attente       Reject              Annulé         None
Confirmé         Click               -              Patient Modal
Annulé           Click               -              None
Any              Delete              Removed        Confirmation
```

---

## 🚀 Summary

The refined appointment status logic provides:
- ✅ Clear status-based routing
- ✅ Faster workflow for confirmed appointments
- ✅ Visual feedback for all states
- ✅ Disabled state for rejected appointments
- ✅ Professional appearance
- ✅ Responsive design
- ✅ Improved user experience
