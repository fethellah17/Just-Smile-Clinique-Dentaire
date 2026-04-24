# Smart Auto-Archive Testing Guide

## Test Environment Setup

### Prerequisites
- Application running locally or in test environment
- Access to appointment management view
- Ability to create/modify appointments
- Browser developer tools (optional)

### Test Data
The application includes mock data with appointments on:
- 2026-04-14 (Today in mock data)
- 2026-04-15 (Tomorrow in mock data)

## Test Cases

### Test 1: Verify Today's Appointments Appear First

**Objective**: Confirm that today's appointments are always displayed at the top of the active view.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Observe the appointment list
3. Verify the first date card shows today's date
4. Verify subsequent dates are in chronological order

**Expected Result**:
- First card displays "Aujourd'hui, 18 avril 2026" (or current date)
- Remaining dates follow in ascending order
- No dates appear out of order

**Pass Criteria**: ✅ Today appears first, dates are chronologically sorted

---

### Test 2: Verify Auto-Archive on Last Pending Confirmation

**Objective**: Confirm that a date moves to archive when its last pending appointment is confirmed.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Find a date with mixed statuses (some "Confirmé", one "En attente")
3. Click the pending appointment
4. Click "Confirmer" in the action modal
5. Observe the appointment list

**Expected Result**:
- The date disappears from active view
- The date appears in archive section (if archive is expanded)
- Archive button shows updated count
- No page refresh occurs

**Pass Criteria**: ✅ Date automatically moves to archive, UI updates smoothly

---

### Test 3: Verify Auto-Archive on Last Pending Rejection

**Objective**: Confirm that a date moves to archive when its last pending appointment is rejected.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Find a date with mixed statuses (some "Confirmé", one "En attente")
3. Click the pending appointment
4. Click "Rejeter" in the action modal
5. Observe the appointment list

**Expected Result**:
- The date disappears from active view
- The date appears in archive section (if archive is expanded)
- Rejected appointment shows "Annulé" status in archive
- Archive button shows updated count

**Pass Criteria**: ✅ Date moves to archive after rejection

---

### Test 4: Verify Archive Toggle Functionality

**Objective**: Confirm that the archive section can be toggled open and closed.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Scroll to bottom of active appointments
3. Verify "Voir l'historique des rendez-vous" button is visible
4. Click the button
5. Verify archive section expands
6. Click the button again
7. Verify archive section collapses

**Expected Result**:
- Button text changes between "Voir" and "Masquer"
- Archive section smoothly expands/collapses
- Chevron icon rotates (up/down)
- No page refresh occurs

**Pass Criteria**: ✅ Archive toggle works smoothly

---

### Test 5: Verify Empty State Message

**Objective**: Confirm that the empty state message appears when all appointments are processed.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Confirm all pending appointments (or reject them)
3. Observe the main view

**Expected Result**:
- Main view shows: "Aucun rendez-vous en attente"
- Subtitle shows: "Tous les rendez-vous ont été traités"
- Archive button is still visible (if there are archived appointments)
- No date cards appear in active view

**Pass Criteria**: ✅ Empty state displays correctly

---

### Test 6: Verify Header Count Updates

**Objective**: Confirm that the header shows accurate counts of active and archived appointments.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Note the header count (e.g., "5 rendez-vous actifs • 12 archivés")
3. Confirm a pending appointment
4. Observe the header count

**Expected Result**:
- Active count decreases by 1
- Archived count increases by 1 (if entire date moved to archive)
- Counts update immediately
- Counts are accurate

**Pass Criteria**: ✅ Header counts are accurate and update in real-time

---

### Test 7: Verify Archived Appointments Display

**Objective**: Confirm that archived appointments display correctly with reduced opacity.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Click "Voir l'historique des rendez-vous"
3. Observe archived appointments

**Expected Result**:
- Archived appointments appear with 75% opacity (faded)
- Archived dates are sorted chronologically
- Only "Confirmé" and "Annulé" statuses appear (no "En attente")
- Delete buttons are still functional
- Appointments are not interactive (no hover effects)

**Pass Criteria**: ✅ Archived appointments display correctly

---

### Test 8: Verify Sorting with Multiple Dates

**Objective**: Confirm that dates are sorted correctly when multiple dates exist.

**Steps**:
1. Create appointments for multiple dates:
   - Today
   - Tomorrow
   - 3 days from now
   - 1 day from now
2. Navigate to "Gestion des Rendez-vous"
3. Observe the order of date cards

**Expected Result**:
- Today appears first
- Tomorrow appears second
- 1 day from now appears third
- 3 days from now appears fourth
- All dates are in ascending chronological order

**Pass Criteria**: ✅ Dates are sorted correctly

---

### Test 9: Verify Date Remains Active with Multiple Pending

**Objective**: Confirm that a date stays in active view if it has multiple pending appointments.

**Steps**:
1. Find a date with 2+ pending appointments
2. Confirm one pending appointment
3. Observe the date card

**Expected Result**:
- Date remains in active view
- Confirmed appointment shows "Confirmé" status
- Other pending appointments remain "En attente"
- Date does NOT move to archive

**Pass Criteria**: ✅ Date stays active when pending appointments remain

---

### Test 10: Verify New Appointment Appears in Active View

**Objective**: Confirm that newly created appointments appear in the active view.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Click "Nouveau RDV"
3. Fill in appointment details
4. Submit the form
5. Observe the appointment list

**Expected Result**:
- New appointment appears in active view
- New appointment has "En attente" status
- New appointment is sorted correctly by date
- Toast notification confirms creation

**Pass Criteria**: ✅ New appointments appear correctly in active view

---

### Test 11: Verify Delete Functionality in Archive

**Objective**: Confirm that archived appointments can be deleted.

**Steps**:
1. Navigate to "Gestion des Rendez-vous"
2. Click "Voir l'historique des rendez-vous"
3. Find an archived appointment
4. Click the delete button
5. Confirm deletion in the alert dialog
6. Observe the appointment list

**Expected Result**:
- Appointment is removed from archive
- Archive count decreases
- If date has no more appointments, date card is removed
- Confirmation dialog appears before deletion

**Pass Criteria**: ✅ Delete works in archive section

---

### Test 12: Verify Responsive Design

**Objective**: Confirm that the appointment view works correctly on mobile devices.

**Steps**:
1. Open browser developer tools
2. Enable mobile device emulation (375px width)
3. Navigate to "Gestion des Rendez-vous"
4. Verify layout and functionality

**Expected Result**:
- Appointment cards stack vertically
- Text is readable without horizontal scrolling
- Buttons are easily clickable (touch-friendly)
- Archive toggle works on mobile
- All functionality works as expected

**Pass Criteria**: ✅ Mobile layout is responsive and functional

---

## Performance Tests

### Test 13: Performance with Large Dataset

**Objective**: Confirm that the application performs well with many appointments.

**Steps**:
1. Create 100+ appointments across multiple dates
2. Navigate to "Gestion des Rendez-vous"
3. Measure page load time
4. Confirm an appointment and measure update time
5. Toggle archive and measure response time

**Expected Result**:
- Page loads in < 2 seconds
- Appointment confirmation updates UI in < 500ms
- Archive toggle responds in < 300ms
- No noticeable lag or freezing

**Pass Criteria**: ✅ Performance is acceptable with large datasets

---

### Test 14: Memory Usage

**Objective**: Confirm that the application doesn't leak memory.

**Steps**:
1. Open browser developer tools (Memory tab)
2. Take initial memory snapshot
3. Perform 20 appointment confirmations
4. Toggle archive 10 times
5. Take final memory snapshot
6. Compare memory usage

**Expected Result**:
- Memory usage remains stable
- No significant increase after operations
- No memory leaks detected

**Pass Criteria**: ✅ No memory leaks detected

---

## Edge Cases

### Test 15: Single Appointment on Date

**Objective**: Confirm behavior when a date has only one appointment.

**Steps**:
1. Create a date with only one "En attente" appointment
2. Confirm the appointment
3. Observe the result

**Expected Result**:
- Date immediately moves to archive
- No date card remains in active view
- Archive shows the date with confirmed appointment

**Pass Criteria**: ✅ Single appointment dates move to archive correctly

---

### Test 16: All Appointments Rejected

**Objective**: Confirm behavior when all appointments on a date are rejected.

**Steps**:
1. Create a date with 2+ appointments
2. Reject all appointments
3. Observe the result

**Expected Result**:
- Date moves to archive
- All appointments show "Annulé" status
- Date appears in archive section

**Pass Criteria**: ✅ Rejected appointments move to archive

---

### Test 17: Mixed Status on Same Date

**Objective**: Confirm behavior with mixed statuses on the same date.

**Steps**:
1. Create a date with:
   - 1 "Confirmé" appointment
   - 1 "Annulé" appointment
   - 1 "En attente" appointment
2. Confirm the pending appointment
3. Observe the result

**Expected Result**:
- Date moves to archive
- All three appointments appear in archive
- Archive shows all three statuses

**Pass Criteria**: ✅ Mixed statuses handled correctly

---

## Browser Compatibility Tests

### Test 18: Chrome/Edge

**Steps**:
1. Open application in Chrome or Edge
2. Run all test cases
3. Verify functionality

**Expected Result**: ✅ All tests pass

---

### Test 19: Firefox

**Steps**:
1. Open application in Firefox
2. Run all test cases
3. Verify functionality

**Expected Result**: ✅ All tests pass

---

### Test 20: Safari

**Steps**:
1. Open application in Safari
2. Run all test cases
3. Verify functionality

**Expected Result**: ✅ All tests pass

---

## Regression Tests

### Test 21: Existing Appointment Functionality

**Objective**: Confirm that existing appointment features still work.

**Steps**:
1. Verify appointment creation still works
2. Verify appointment confirmation still works
3. Verify appointment rejection still works
4. Verify appointment deletion still works
5. Verify patient modal opens correctly

**Expected Result**: ✅ All existing features work as before

---

## Test Summary Template

```
Test Date: _______________
Tester: ___________________
Environment: ______________
Browser: __________________

Test Results:
┌─────────────────────────────────────────────────────────┐
│ Test # │ Description              │ Result │ Notes      │
├─────────────────────────────────────────────────────────┤
│ 1      │ Today appears first      │ ✅/❌  │            │
│ 2      │ Auto-archive on confirm  │ ✅/❌  │            │
│ 3      │ Auto-archive on reject   │ ✅/❌  │            │
│ 4      │ Archive toggle           │ ✅/❌  │            │
│ 5      │ Empty state              │ ✅/❌  │            │
│ ...    │ ...                      │ ...    │ ...        │
└─────────────────────────────────────────────────────────┘

Overall Result: ✅ PASS / ❌ FAIL

Issues Found:
- Issue 1: _______________
- Issue 2: _______________

Sign-off: _______________
```

## Continuous Testing

### Automated Tests (Recommended)

```typescript
// Example test structure
describe('Smart Auto-Archive', () => {
  test('should move date to archive when last pending is confirmed', () => {
    // Test implementation
  });

  test('should sort dates with today first', () => {
    // Test implementation
  });

  test('should update header counts correctly', () => {
    // Test implementation
  });
});
```

## Known Limitations

- Archive section requires manual toggle (no auto-expand)
- Archive doesn't auto-delete old appointments
- No bulk operations on archived appointments
- Archive search not implemented

## Support & Troubleshooting

If tests fail:
1. Check browser console for errors
2. Verify appointment data is correct
3. Clear browser cache and reload
4. Check system date/time is correct
5. Review appointment-utils.ts for logic errors
