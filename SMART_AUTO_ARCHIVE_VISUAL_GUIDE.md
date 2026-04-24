# Smart Auto-Archive Visual Guide

## UI Layout

### Active View (Always Visible)

```
┌─────────────────────────────────────────────────────────────┐
│ Gestion des Rendez-vous                    [+ Nouveau RDV]  │
│ 5 rendez-vous actifs • 12 archivés                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📅 Aujourd'hui, 18 avril 2026                               │
├─────────────────────────────────────────────────────────────┤
│ 09:00 │ Benali Fatima          │ Contrôle    │ [En attente] │
│ 10:30 │ Khelifi Ahmed          │ Suite       │ [Confirmé]   │
│ 14:00 │ Boumediene Sara        │ Détartrage  │ [En attente] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📅 Demain, 19 avril 2026                                    │
├─────────────────────────────────────────────────────────────┤
│ 09:30 │ Zerrouki Amina         │ Contrôle    │ [En attente] │
│ 11:00 │ Messaoudi Karim        │ Contrôle    │ [En attente] │
└─────────────────────────────────────────────────────────────┘
```

### Archive View (Collapsible)

```
┌─────────────────────────────────────────────────────────────┐
│ ▼ Voir l'historique des rendez-vous                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📅 Hier, 17 avril 2026                                      │
├─────────────────────────────────────────────────────────────┤
│ 09:00 │ Patient 1              │ Motif       │ [Confirmé]   │
│ 10:30 │ Patient 2              │ Motif       │ [Annulé]     │
│ 14:00 │ Patient 3              │ Motif       │ [Confirmé]   │
└─────────────────────────────────────────────────────────────┘
(Faded appearance - 75% opacity)
```

## State Transitions

### Scenario 1: Confirming Last Pending Appointment

```
BEFORE:
┌─────────────────────────────────────────────────────────────┐
│ 📅 20 avril 2026                                            │
├─────────────────────────────────────────────────────────────┤
│ 09:00 │ Patient A              │ Motif       │ [Confirmé]   │
│ 10:30 │ Patient B              │ Motif       │ [En attente] │ ← Click to confirm
└─────────────────────────────────────────────────────────────┘

                    ↓ User confirms appointment ↓

AFTER:
(Date moves to archive section)

┌─────────────────────────────────────────────────────────────┐
│ ▼ Voir l'historique des rendez-vous                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📅 20 avril 2026                                            │
├─────────────────────────────────────────────────────────────┤
│ 09:00 │ Patient A              │ Motif       │ [Confirmé]   │
│ 10:30 │ Patient B              │ Motif       │ [Confirmé]   │
└─────────────────────────────────────────────────────────────┘
(Faded appearance - 75% opacity)
```

### Scenario 2: Empty Active View

```
BEFORE:
┌─────────────────────────────────────────────────────────────┐
│ 📅 21 avril 2026                                            │
├─────────────────────────────────────────────────────────────┤
│ 09:00 │ Patient C              │ Motif       │ [En attente] │ ← Last one
└─────────────────────────────────────────────────────────────┘

                    ↓ User confirms last appointment ↓

AFTER:
┌─────────────────────────────────────────────────────────────┐
│ Aucun rendez-vous en attente                                │
│ Tous les rendez-vous ont été traités                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ▼ Voir l'historique des rendez-vous                         │
└─────────────────────────────────────────────────────────────┘
```

## Date Sorting Priority

```
Today (18 avril)
    ↓
Tomorrow (19 avril)
    ↓
Next Day (20 avril)
    ↓
Future Dates (sorted chronologically)
```

### Example with Multiple Dates

```
ACTIVE VIEW (Sorted):
1. 📅 Aujourd'hui, 18 avril 2026 (Today - always first)
2. 📅 Demain, 19 avril 2026 (Tomorrow)
3. 📅 Vendredi, 20 avril 2026 (Next)
4. 📅 Samedi, 21 avril 2026 (Then)

ARCHIVE VIEW (Also sorted):
1. 📅 Hier, 17 avril 2026 (Most recent archived)
2. 📅 Mercredi, 16 avril 2026
3. 📅 Mardi, 15 avril 2026
```

## Status Badge Colors

### Active Appointments

```
┌──────────────────────────────────────────────────────────┐
│ Status Badge Colors in Active View                       │
├──────────────────────────────────────────────────────────┤
│ [En attente]  → Yellow/Warning (requires action)         │
│ [Confirmé]    → Green/Success (confirmed)                │
│ [Annulé]      → Red/Destructive (rejected)               │
└──────────────────────────────────────────────────────────┘
```

### Archived Appointments

```
┌──────────────────────────────────────────────────────────┐
│ Status Badge Colors in Archive View                      │
├──────────────────────────────────────────────────────────┤
│ [Confirmé]    → Green/Success (confirmed)                │
│ [Annulé]      → Red/Destructive (rejected)               │
│ (No "En attente" in archive - by definition)             │
└──────────────────────────────────────────────────────────┘
```

## Interaction Flow

```
User Opens Appointment View
        ↓
System separates appointments:
├─ Active (has pending)
└─ Archived (all confirmed/rejected)
        ↓
Display active appointments sorted by date
        ↓
User clicks appointment
        ├─ If "En attente" → Show action modal
        ├─ If "Confirmé" → Open patient modal
        └─ If "Annulé" → Do nothing
        ↓
User confirms/rejects appointment
        ↓
System updates status
        ↓
Check if date still has pending
├─ YES → Stay in active view
└─ NO → Move to archive
        ↓
UI updates automatically
```

## Header Information Display

```
┌─────────────────────────────────────────────────────────────┐
│ Gestion des Rendez-vous                    [+ Nouveau RDV]  │
│ 5 rendez-vous actifs • 12 archivés                          │
└─────────────────────────────────────────────────────────────┘

Active count: Number of appointments with "En attente" status
Archived count: Number of appointments with "Confirmé" or "Annulé"
              (where all appointments on that date are confirmed/rejected)
```

## Toggle Button States

```
COLLAPSED STATE:
┌─────────────────────────────────────────────────────────────┐
│ ▼ Voir l'historique des rendez-vous                         │
└─────────────────────────────────────────────────────────────┘

EXPANDED STATE:
┌─────────────────────────────────────────────────────────────┐
│ ▲ Masquer l'historique des rendez-vous                      │
└─────────────────────────────────────────────────────────────┘
(Archive section visible below)
```

## Mobile Responsive Layout

```
DESKTOP (Full Width):
┌─────────────────────────────────────────────────────────────┐
│ Title                                      [+ Button]        │
│ Subtitle                                                    │
├─────────────────────────────────────────────────────────────┤
│ 📅 Date                                                     │
│ Time │ Patient │ Reason │ Status │ [Delete]                │
└─────────────────────────────────────────────────────────────┘

MOBILE (Stacked):
┌──────────────────────────────┐
│ Title                         │
│ [+ Button]                    │
│ Subtitle                      │
├──────────────────────────────┤
│ 📅 Date                       │
│ Time │ Patient │ Status       │
│ Reason                        │
│ [Delete]                      │
└──────────────────────────────┘
```

## Performance Indicators

```
Real-time Updates:
✓ Instant status change
✓ Immediate archive movement
✓ No page refresh needed
✓ Smooth transitions

Sorting Performance:
✓ O(n) time complexity
✓ Instant sorting
✓ No noticeable delay
```

## Empty States

### No Active Appointments

```
┌─────────────────────────────────────────────────────────────┐
│ Aucun rendez-vous en attente                                │
│ Tous les rendez-vous ont été traités                        │
└─────────────────────────────────────────────────────────────┘
```

### No Archived Appointments

```
(Archive toggle button not shown)
(Only appears when there are archived appointments)
```

### No Appointments at All

```
┌─────────────────────────────────────────────────────────────┐
│ Aucun rendez-vous en attente                                │
│ Tous les rendez-vous ont été traités                        │
└─────────────────────────────────────────────────────────────┘
(No archive button shown)
```
