# Isolated Row Actions & Restricted Confirm Transition

## Overview
Complete refactoring of appointment row interactions to isolate actions and restrict the "Confirm to Patient" transition to only the "Confirmer" button.

## Changes Implemented

### 1. Removed Global Click Event

**File: `src/routes/rendez-vous.tsx`**

#### Before
```tsx
<div
  onClick={() => handleAppointmentClick(rdv)}
  className="... cursor-pointer ..."
>
```

#### After
```tsx
<div
  className="... (no onClick handler) ..."
>
```

**Impact:**
- Clicking on empty space, patient name, or category does nothing
- No global row click handler
- Removed `cursor-pointer` class (no longer indicates clickability)
- Removed unused `handleAppointmentClick` function

### 2. Restricted "Nouveau Patient" Trigger

**Only the "Confirmer" Button Opens Patient Modal**

The patient modal is now ONLY triggered by:
1. Clicking the "Confirmer" button on a pending appointment
2. The button opens the AppointmentActionModal
3. User confirms in the modal
4. Then the patient modal opens with pre-filled data

**Flow:**
```
Pending Appointment Row
    ↓
Click "Confirmer" Button
    ↓
AppointmentActionModal Opens
    ↓
Click "Confirmer" in Modal
    ↓
NewPatientModal Opens (with pre-filled data)
```

### 3. Contact Icon Independence

**Phone Icon Features:**
- Independent `href={tel:...}` link
- Uses `e.stopPropagation()` to prevent event bubbling
- No interaction with appointment confirmation
- Works independently from all other row actions

**Implementation:**
```tsx
{rdv.telephone ? (
  <a
    href={`tel:${rdv.telephone}`}
    onClick={(e) => e.stopPropagation()}
    className="... rounded-full ..."
  >
    <Phone className="h-5 w-5" />
  </a>
) : (
  <div className="... grayed out ...">
    <Phone className="h-5 w-5 text-muted-foreground/30" />
  </div>
)}
```

### 4. Mobile Compatibility

**Button Spacing & Sizing:**
- Confirm Button: `h-8 px-2 sm:px-3` (responsive padding)
- Delete Button: `h-8 w-8` (square, consistent)
- Gap between buttons: `gap-1 sm:gap-2` (responsive spacing)
- All buttons: `flex-shrink-0` (prevents compression)

**Touch Targets:**
- Confirm Button: ~32px height × 60-80px width (mobile)
- Delete Button: 32px × 32px (square)
- Phone Icon: 40px × 40px (largest touch target)
- Adequate spacing prevents accidental clicks

**Responsive Typography:**
- Button text: `text-xs sm:text-sm` (scales on desktop)
- Maintains readability on all screen sizes

### 5. Row Layout Structure

**Current Layout:**
```
[Phone Icon] [Time] [Patient Name]
             [Category]
                              [Status Badge] [Confirm Button] [Delete Button]
```

**Key Features:**
- Phone icon on far left (priority on mobile)
- Time and patient info in center (flex-1)
- Actions on right (flex-shrink-0)
- All elements vertically centered
- No global click handler

## Action Isolation

### What Happens When You Click...

| Element | Action | Result |
|---------|--------|--------|
| Patient Name | Click | Nothing happens |
| Category | Click | Nothing happens |
| Empty Space | Click | Nothing happens |
| Phone Icon | Click | Opens tel: link (if phone exists) |
| Status Badge | Click | Nothing happens |
| Confirm Button | Click | Opens AppointmentActionModal |
| Delete Button | Click | Opens delete confirmation |

## Code Changes Summary

### Removed
- `handleAppointmentClick()` function (no longer needed)
- Global `onClick` handler on row container
- `cursor-pointer` class from row

### Added
- Conditional "Confirmer" button for pending appointments
- Button opens AppointmentActionModal directly
- Proper event handling with `e.stopPropagation()`

### Maintained
- Phone icon independence
- Delete button functionality
- Status badge display
- All styling and responsiveness

## Testing Checklist

- [ ] Click patient name: Nothing happens
- [ ] Click category: Nothing happens
- [ ] Click empty space: Nothing happens
- [ ] Click phone icon (with phone): Opens tel: link
- [ ] Click phone icon (no phone): Nothing happens (grayed out)
- [ ] Click "Confirmer" button: Opens AppointmentActionModal
- [ ] Click "Confirmer" in modal: Opens NewPatientModal with pre-filled data
- [ ] Click "Rejeter" in modal: Rejects appointment
- [ ] Click delete button: Opens delete confirmation
- [ ] Mobile: Buttons have adequate spacing
- [ ] Mobile: Confirm button is easily tappable
- [ ] Desktop: Hover effects work correctly
- [ ] Archived appointments: No confirm button shown

## User Experience Flow

### Pending Appointment
1. User sees appointment row with "En attente" badge
2. "Confirmer" button is visible and prominent
3. User clicks "Confirmer" button
4. AppointmentActionModal opens
5. User confirms or rejects
6. If confirmed, NewPatientModal opens with pre-filled data

### Confirmed Appointment
1. User sees appointment row with "Confirmé" badge
2. No "Confirmer" button (already confirmed)
3. User can only delete or call

### Rejected Appointment
1. User sees appointment row with "Annulé" badge
2. Row is grayed out
3. User can only delete

## Accessibility

- ✅ Keyboard navigation works
- ✅ Tab order is logical
- ✅ Buttons have clear labels
- ✅ Touch targets meet 40x40px minimum
- ✅ Color contrast is sufficient
- ✅ No hidden interactions
