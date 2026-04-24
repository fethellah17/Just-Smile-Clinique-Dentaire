# Appointment Workflow - Quick Reference Card

## 🚀 Quick Start

### Create Appointment (Existing Patient)
1. Click "Nouveau RDV"
2. Select "Patient existant" tab
3. Choose patient → Set date/time → Enter treatment type
4. Click "Ajouter RDV"

### Create Appointment (New Patient)
1. Click "Nouveau RDV"
2. Select "Nouveau patient" tab
3. Enter: Nom, Prénom, Téléphone, Catégorie, Date, Heure
4. Click "Ajouter RDV"

### Confirm Appointment
1. Click appointment in list
2. Click "Confirmer" button
3. For new patients: Complete patient record in modal
4. Done!

### Reject Appointment
1. Click appointment in list
2. Click "Rejeter" button
3. Appointment marked as cancelled

---

## 📊 Status Reference

| Status | Color | Meaning |
|--------|-------|---------|
| En attente | 🟠 Orange | Pending |
| Confirmé | 🟢 Green | Confirmed |
| Annulé | 🔴 Red | Cancelled |

---

## 📋 Form Fields

### Appointment Creation (Existing Patient)
- Patient * (dropdown)
- Date * (date picker)
- Heure * (time picker)
- Type de soin * (text)

### Appointment Creation (New Patient)
- Nom * (text)
- Prénom * (text)
- Téléphone * (text)
- Catégorie de Soin * (dropdown)
- Date * (date picker)
- Heure * (time picker)

### Patient Conversion (Pre-filled)
- Nom * (pre-filled)
- Prénom * (pre-filled)
- Téléphone * (pre-filled)
- Catégorie * (pre-filled)
- Âge * (empty - required)
- Antécédents Médicaux (empty - optional)
- Type de Soin (empty - optional)

---

## 🎯 Key Actions

| Action | Button | Result |
|--------|--------|--------|
| Create appointment | "Nouveau RDV" | Opens modal |
| Confirm appointment | "Confirmer" | Status → Confirmé |
| Reject appointment | "Rejeter" | Status → Annulé |
| Delete appointment | 🗑️ | Removes appointment |
| Close modal | "Annuler" / "Fermer" | Closes without saving |

---

## 💬 Toast Messages

```
✓ Rendez-vous confirmé
✓ Rendez-vous confirmé. Veuillez compléter le dossier du patient.
✓ Rendez-vous rejeté
```

---

## 🔄 Workflow Paths

### Path 1: Existing Patient
```
Create RDV → Confirm → Done
```

### Path 2: New Patient
```
Create RDV → Confirm → Fill Patient Form → Create Patient → Done
```

### Path 3: Rejection
```
Create RDV → Reject → Done (No patient created)
```

---

## ⚠️ Validation Rules

### Required Fields
- Appointment: Patient/Name, Date, Time, Treatment/Category
- Patient: Name, Phone, Category, Age

### Optional Fields
- Patient: Medical history, Treatment type

### Validation Errors
- Missing required field → Alert: "Veuillez remplir tous les champs"
- Form remains open for correction

---

## 📱 Responsive Breakpoints

| Device | Width | Modal Width |
|--------|-------|-------------|
| Desktop | 1920px+ | max-w-md |
| Tablet | 768-1024px | 90vw |
| Mobile | <768px | 90vw |

---

## 🎨 Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Confirmed Badge | Green | #10b981 |
| Pending Badge | Orange | #f59e0b |
| Cancelled Badge | Red | #ef4444 |
| Primary Button | Maroon | #800020 |
| Destructive Button | Red | #ef4444 |

---

## 📂 File Locations

| File | Purpose |
|------|---------|
| `src/components/modals/NewRendezVousModal.tsx` | Appointment creation |
| `src/components/modals/AppointmentActionModal.tsx` | Appointment actions |
| `src/components/modals/NewPatientModal.tsx` | Patient creation |
| `src/routes/rendez-vous.tsx` | Main page logic |

---

## 🔗 Related Hooks

```typescript
useRendezVous()      // Appointment management
usePatients()        // Patient management
useCategories()      // Category management
```

---

## 🧪 Test Scenarios

### Scenario 1: Quick Confirm
1. Create appointment (existing patient)
2. Click appointment
3. Click "Confirmer"
4. ✓ Status changes to green

### Scenario 2: Patient Conversion
1. Create appointment (new patient)
2. Click appointment
3. Click "Confirmer"
4. Patient modal opens with pre-filled data
5. Fill Âge field
6. Click "Ajouter Patient"
7. ✓ Patient created and linked

### Scenario 3: Rejection
1. Create appointment
2. Click appointment
3. Click "Rejeter"
4. ✓ Status changes to red

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Modal won't open | Check appointment data |
| Pre-filled data missing | Ensure new patient appointment |
| Toast not showing | Check browser console |
| Form won't submit | Verify all required fields filled |
| Status not updating | Refresh page or check console |

---

## 📞 Common Questions

**Q: Can I edit an appointment after creation?**
A: Currently, you can delete and recreate. Edit feature coming soon.

**Q: What happens if I reject an appointment?**
A: Appointment marked as cancelled. No patient record created.

**Q: Can I convert an existing patient appointment?**
A: No, only new patient appointments trigger conversion.

**Q: Are phone numbers validated?**
A: Currently accepted as-is. Validation can be added.

**Q: Can I have duplicate appointments?**
A: Yes, system allows multiple appointments for same patient/time.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate form fields |
| Enter | Submit form |
| Escape | Close modal |
| Space | Toggle checkbox/button |

---

## 🎓 Best Practices

1. **Always fill required fields** - Prevents validation errors
2. **Use categories consistently** - Helps with reporting
3. **Confirm appointments promptly** - Keeps list organized
4. **Complete patient records** - Ensures accurate data
5. **Review before confirming** - Prevents mistakes

---

## 📊 Data Flow Summary

```
User Input
    ↓
Form Validation
    ↓
Data Processing
    ↓
State Update
    ↓
UI Refresh
    ↓
Toast Notification
```

---

## 🔐 Data Security

- ✓ No sensitive data in URLs
- ✓ Form data validated before submission
- ✓ Patient records linked securely
- ✓ Status changes logged
- ✓ Delete confirmations required

---

## 📈 Performance Tips

1. Keep appointment list under 100 items
2. Archive old appointments regularly
3. Use categories for filtering
4. Clear browser cache if slow
5. Check network connection

---

## 🎯 Success Indicators

✓ Appointment created with correct status
✓ Status badge displays correct color
✓ Toast message appears and disappears
✓ Patient modal opens for new patients
✓ Pre-filled data is accurate
✓ Patient record created successfully
✓ Appointment linked to patient

---

## 📝 Notes

- All times in 24-hour format
- Dates in YYYY-MM-DD format
- Phone numbers stored as-is
- Categories from system configuration
- Status changes are immediate
- No undo for deletions

---

## 🚀 Ready to Use!

The Advanced Appointment Workflow is fully implemented and ready for production use. Follow the quick start guide above to get started.

**Last Updated:** April 18, 2026
**Version:** 1.0
**Status:** ✅ Production Ready
