# Smart Auto-Archive Quick Reference

## What Changed?

The appointment management view now automatically separates active and completed appointments with intelligent sorting.

## Key Features at a Glance

### 🎯 Active View (Main Section)
- Shows only appointments with pending status ("En attente")
- Today's appointments always appear first
- Remaining dates sorted chronologically
- Interactive - click to confirm/reject appointments

### 📦 Archive View (Collapsible Section)
- Shows dates where ALL appointments are confirmed or rejected
- Toggle with "Voir l'historique des rendez-vous" button
- Displayed with reduced opacity to indicate completion
- Still allows deletion if needed

### ⚡ Real-Time Updates
- Confirming the last pending appointment on a date instantly moves it to archive
- No page refresh needed
- Smooth transitions between active and archived states

## How It Works

```
Appointment Status Changes
        ↓
Check if date has any pending appointments
        ↓
    YES → Stays in Active View
    NO  → Moves to Archive View
```

## User Actions

| Action | Result |
|--------|--------|
| Confirm appointment | Status → "Confirmé", date may move to archive |
| Reject appointment | Status → "Annulé", date may move to archive |
| Click "Voir l'historique" | Archive section expands/collapses |
| Add new appointment | Appears in active view with "En attente" status |
| Delete appointment | Removed from view (active or archived) |

## Visual Indicators

### Active Appointments
- Full opacity
- Hover effect (background highlight)
- Interactive cursor
- Status badges: "En attente" (warning), "Confirmé" (success), "Annulé" (destructive)

### Archived Appointments
- 75% opacity (faded appearance)
- No hover effect
- Non-interactive
- Status badges: "Confirmé" (success), "Annulé" (destructive)

## Empty State

When all appointments are processed:
- Main view shows: "Aucun rendez-vous en attente"
- Subtitle: "Tous les rendez-vous ont été traités"
- Archive button still available to review completed appointments

## Header Information

Shows:
- Number of active appointments
- Number of archived appointments (if any)
- Example: "5 rendez-vous actifs • 12 archivés"

## Files Modified

- `src/routes/rendez-vous.tsx` - Main appointment view
- `src/lib/appointment-utils.ts` - New utility functions

## Utility Functions

Located in `src/lib/appointment-utils.ts`:

```typescript
// Separate appointments into active and archived
separateActiveAndArchived(appointments)

// Sort dates with today first
sortDatesWithTodayFirst(dates)

// Group appointments by date
groupAndSortAppointments(appointments)

// Check for pending appointments
hasActivePendingAppointments(date, appointments)
hasAnyActiveAppointments(appointments)
```

## Performance

- Instant updates when status changes
- Efficient sorting algorithm (O(n) complexity)
- No polling or background processes
- Event-driven architecture

## Testing Tips

1. **Test Today Priority**: Create appointments for today and tomorrow, verify today appears first
2. **Test Auto-Archive**: Confirm last pending appointment on a date, verify it moves to archive
3. **Test Toggle**: Click archive button multiple times, verify smooth expand/collapse
4. **Test Empty State**: Confirm all appointments, verify empty state message appears
5. **Test Sorting**: Create appointments on multiple dates, verify correct chronological order

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Date not moving to archive | Check if all appointments on that date are confirmed/rejected |
| Today not appearing first | Verify date format is YYYY-MM-DD and matches system date |
| Archive button not showing | Verify there are archived appointments (all confirmed/rejected) |
| Empty state not showing | Check if any "En attente" appointments exist |

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support
