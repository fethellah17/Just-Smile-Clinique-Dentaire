# Appointment Workflow Testing Guide

## Quick Start Testing

### Test 1: Create Appointment with Existing Patient
**Steps:**
1. Navigate to "Gestion des Rendez-vous"
2. Click "Nouveau RDV"
3. Select "Patient existant" tab
4. Choose a patient from dropdown (e.g., "Benali Fatima")
5. Select a date and time
6. Enter treatment type (e.g., "Détartrage")
7. Click "Ajouter RDV"

**Expected Result:**
- Appointment appears in list with status "En attente"
- Appointment is grouped by date
- Patient name and treatment type are displayed

---

### Test 2: Create Appointment with New Patient
**Steps:**
1. Navigate to "Gestion des Rendez-vous"
2. Click "Nouveau RDV"
3. Select "Nouveau patient" tab
4. Fill in:
   - Nom: "Dupont"
   - Prénom: "Marie"
   - Téléphone: "0795123456"
   - Catégorie de Soin: "Soins de base"
   - Date: Tomorrow's date
   - Heure: "10:00"
5. Click "Ajouter RDV"

**Expected Result:**
- Appointment created with status "En attente"
- Appointment appears in list
- No patient record created yet (pending conversion)

---

### Test 3: Confirm Appointment (Existing Patient)
**Steps:**
1. Create appointment with existing patient (Test 1)
2. Click on the appointment in the list
3. Action modal appears showing:
   - Patient name
   - Date and time
   - Care category
   - Current status
4. Click "Confirmer" button

**Expected Result:**
- Appointment status changes to "Confirmé" (green badge)
- Toast shows: "Rendez-vous confirmé"
- Modal closes
- No patient modal opens (patient already exists)

---

### Test 4: Confirm Appointment (New Patient) - Conversion Flow
**Steps:**
1. Create appointment with new patient (Test 2)
2. Click on the appointment in the list
3. Action modal appears
4. Click "Confirmer" button

**Expected Result:**
- Appointment status changes to "Confirmé"
- "Nouveau Patient" modal opens automatically
- Pre-filled fields:
  - Nom: "Dupont" (from appointment)
  - Prénom: "Marie" (from appointment)
  - Téléphone: "0795123456" (from appointment)
  - Catégorie: "Soins de base" (from appointment)
- Empty fields:
  - Âge: (empty, required)
  - Antécédents Médicaux: (empty, optional)
  - Type de Soin: (empty, optional)

---

### Test 5: Complete Patient Conversion
**Steps:**
1. Follow Test 4 up to patient modal opening
2. Fill in remaining fields:
   - Âge: "35"
   - Antécédents Médicaux: "Aucun"
   - Type de Soin: Select from dropdown (e.g., "Détartrage")
3. Click "Ajouter Patient"

**Expected Result:**
- Patient record created
- Patient modal closes
- Toast shows: "Rendez-vous confirmé. Veuillez compléter le dossier du patient."
- Appointment now linked to new patient
- New patient appears in "Patients" list

---

### Test 6: Reject Appointment
**Steps:**
1. Create appointment (existing or new patient)
2. Click on the appointment
3. Action modal appears
4. Click "Rejeter" button

**Expected Result:**
- Appointment status changes to "Annulé" (red badge)
- Toast shows: "Rendez-vous rejeté"
- Modal closes
- No patient record created
- Appointment remains in list but marked as cancelled

---

### Test 7: Delete Appointment
**Steps:**
1. Create appointment
2. Click trash icon on appointment card
3. Confirmation dialog appears
4. Click "Supprimer"

**Expected Result:**
- Appointment removed from list
- No appointments shown for that date if it was the only one

---

### Test 8: Modal Transitions
**Steps:**
1. Create new patient appointment
2. Click appointment
3. Click "Confirmer"
4. Observe patient modal opening

**Expected Result:**
- Smooth transition between modals
- No data loss
- Pre-filled data visible
- Professional appearance maintained

---

### Test 9: Form Validation
**Steps:**
1. Click "Nouveau RDV"
2. Try to submit without filling required fields
3. Observe validation

**Expected Result:**
- Alert appears: "Veuillez remplir tous les champs"
- Form remains open
- No appointment created

---

### Test 10: Category Selection
**Steps:**
1. Create new patient appointment
2. Select different categories from dropdown:
   - Chirurgie
   - Prothèse Fixe
   - Soins Esthétiques
   - Orthodontie
   - Soins de base

**Expected Result:**
- All categories load correctly
- Selection updates form
- Category appears in appointment motif

---

## Visual Verification Checklist

### Appointment List View
- [ ] Appointments grouped by date
- [ ] Dates formatted in French (e.g., "lundi 15 avril 2026")
- [ ] Time displayed in 24-hour format
- [ ] Patient names visible
- [ ] Treatment types visible
- [ ] Status badges color-coded:
  - [ ] Green for "Confirmé"
  - [ ] Orange for "En attente"
  - [ ] Red for "Annulé"
- [ ] Trash icons visible and clickable
- [ ] Appointments clickable

### Modal Appearance
- [ ] Modals centered on screen
- [ ] Proper spacing and padding
- [ ] All fields visible and accessible
- [ ] Buttons properly styled
- [ ] Cancel/Close buttons functional
- [ ] Form labels clear and associated with inputs

### Toast Notifications
- [ ] Toast appears after actions
- [ ] Correct message displayed
- [ ] Appropriate color (green for success)
- [ ] Auto-dismisses after 3 seconds
- [ ] Doesn't block interaction

---

## Edge Cases to Test

### Edge Case 1: Duplicate Phone Numbers
- Create multiple new patient appointments with same phone number
- Verify each creates separate appointment
- Verify each can be converted to separate patient

### Edge Case 2: Special Characters in Names
- Create appointment with special characters (é, è, ç, etc.)
- Verify data preserved correctly
- Verify display correct in list and modals

### Edge Case 3: Rapid Clicks
- Rapidly click "Confirmer" button
- Verify only one action processed
- Verify no duplicate records created

### Edge Case 4: Modal Cancellation
- Open appointment action modal
- Click "Fermer" without action
- Verify appointment unchanged
- Verify modal closes cleanly

### Edge Case 5: Patient Modal Cancellation
- Start patient conversion
- Click "Annuler" in patient modal
- Verify appointment remains "confirmé"
- Verify no patient created
- Verify can retry conversion

---

## Performance Testing

### Load Testing
- Create 50+ appointments
- Verify list loads smoothly
- Verify no lag when scrolling
- Verify modals open quickly

### Memory Testing
- Open and close modals repeatedly
- Verify no memory leaks
- Verify smooth performance maintained

---

## Browser Compatibility
Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Responsive Design Testing

### Desktop (1920px+)
- [ ] All elements visible
- [ ] Proper spacing
- [ ] Modals centered

### Tablet (768px - 1024px)
- [ ] Modal width appropriate (90vw)
- [ ] Touch targets adequate
- [ ] Scrolling smooth

### Mobile (< 768px)
- [ ] Modal fills screen appropriately
- [ ] Buttons easily tappable
- [ ] Form fields properly sized
- [ ] No horizontal scroll

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through form fields
- [ ] Enter submits form
- [ ] Escape closes modal
- [ ] Focus visible on all interactive elements

### Screen Reader
- [ ] Labels announced correctly
- [ ] Form structure clear
- [ ] Buttons announced with purpose
- [ ] Status badges announced

### Color Contrast
- [ ] Status badges readable
- [ ] Text on backgrounds sufficient contrast
- [ ] Icons distinguishable

---

## Success Criteria

All tests should pass with:
✅ No console errors
✅ No data loss
✅ Smooth transitions
✅ Correct status updates
✅ Proper toast messages
✅ Pre-filled data accurate
✅ Professional appearance maintained
✅ Responsive on all devices
✅ Accessible to all users
