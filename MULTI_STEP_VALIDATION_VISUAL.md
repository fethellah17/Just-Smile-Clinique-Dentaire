# Multi-Step Validation - Visual Guide

## Multi-Step Validation in One Session

### Initial State
```
┌──────────────────────────────────┐
│ Suivi du Traitement              │
│ Ahmed Khelifi • Bridge           │
│                                  │
│ ○ Consultation                   │
│   [Marquer]                      │
│                                  │
│ ○ Taillage des piliers           │
│   [Marquer]                      │
│                                  │
│ ○ Empreinte                      │
│   [Marquer]                      │
│                                  │
│ ○ Essai infrastructure           │
│   [Marquer]                      │
│                                  │
│ ○ Essai céramique                │
│   [Marquer]                      │
│                                  │
│ ○ Pose définitive                │
│   [Marquer]                      │
│                                  │
├──────────────────────────────────┤
│   0 sur 6 étapes                 │
└──────────────────────────────────┘
```

### After Validating Step 1
```
┌──────────────────────────────────┐
│ Suivi du Traitement              │
│ Ahmed Khelifi • Bridge           │
│                                  │
│ ✓ Consultation                   │
│   05/06/2024 à 10:00      [X]    │
│                                  │
│ ○ Taillage des piliers           │
│   [Marquer]                      │
│                                  │
│ ○ Empreinte                      │
│   [Marquer]                      │
│                                  │
│ ○ Essai infrastructure           │
│   [Marquer]                      │
│                                  │
│ ○ Essai céramique                │
│   [Marquer]                      │
│                                  │
│ ○ Pose définitive                │
│   [Marquer]                      │
│                                  │
├──────────────────────────────────┤
│   1 sur 6 étapes                 │
└──────────────────────────────────┘
```

### After Validating Steps 1-3
```
┌──────────────────────────────────┐
│ Suivi du Traitement              │
│ Ahmed Khelifi • Bridge           │
│                                  │
│ ✓ Consultation                   │
│   05/06/2024 à 10:00      [X]    │
│                                  │
│ ✓ Taillage des piliers           │
│   05/06/2024 à 10:15      [X]    │
│                                  │
│ ✓ Empreinte                      │
│   05/06/2024 à 10:30      [X]    │
│                                  │
│ ○ Essai infrastructure           │
│   [Marquer]                      │
│                                  │
│ ○ Essai céramique                │
│   [Marquer]                      │
│                                  │
│ ○ Pose définitive                │
│   [Marquer]                      │
│                                  │
├──────────────────────────────────┤
│   3 sur 6 étapes                 │
└──────────────────────────────────┘
```

## Editable Timestamps

### Normal View (Completed Step)
```
✓ Consultation
  05/06/2024 à 10:00  [✏]
  ↑ Clickable         ↑ Pencil icon
```

### Edit Mode
```
✓ Consultation
  [2024-06-05T10:00] [OK]
  ↑ datetime-local    ↑ Save button
```

### After Editing
```
✓ Consultation
  05/06/2024 à 14:30  [✏]
  ↑ Updated time
```

## Cascading Reversal

### Before Reversal
```
✓ Consultation (Step 1)
  05/06/2024 à 10:00  [X]

✓ Taillage des piliers (Step 2)
  05/06/2024 à 10:15  [X]

✓ Empreinte (Step 3)
  05/06/2024 à 10:30  [X]

○ Essai infrastructure (Step 4)
  [Marquer]
```

### Doctor Clicks X on Step 2
```
User clicks X on "Taillage des piliers"
        ↓
Steps 2 and 3 removed (cascade)
        ↓
Step 2 becomes current
```

### After Reversal
```
✓ Consultation (Step 1)
  05/06/2024 à 10:00  [X]

○ Taillage des piliers (Step 2)
  [Marquer]

○ Empreinte (Step 3)
  [Marquer]

○ Essai infrastructure (Step 4)
  [Marquer]
```

## Current Step Detection

### Logic
```
Completed Steps: [Step 1, Step 2, Step 3]
All Steps:       [Step 1, Step 2, Step 3, Step 4, Step 5, Step 6]

First Pending Step = Step 4
Current Step = Step 4

Step 4 shows "Marquer" button
Steps 5, 6 also show "Marquer" buttons
```

### Visual
```
✓ Step 1 (completed)
✓ Step 2 (completed)
✓ Step 3 (completed)
○ Step 4 (current) [Marquer]  ← First pending
○ Step 5 (pending) [Marquer]  ← Can validate
○ Step 6 (pending) [Marquer]  ← Can validate
```

## Workflow Comparison

### Before (Single-Step)
```
1. Open modal
2. Click "Marquer" on current step
3. Step validated
4. Modal shows next step
5. Close modal
6. Reopen modal
7. Click "Marquer" on next step
8. Repeat for each step
```

### After (Multi-Step)
```
1. Open modal
2. Click "Marquer" on step 1
3. Step 1 validated
4. Step 2 shows "Marquer" button
5. Click "Marquer" on step 2
6. Step 2 validated
7. Step 3 shows "Marquer" button
8. Continue without closing modal
```

## Timestamp Editing Workflow

### Scenario: Recording Past Action
```
1. Doctor realizes they did step 1 at 09:00
2. But recorded it at 10:00
3. Opens modal
4. Clicks timestamp "10:00"
5. datetime-local input appears
6. Changes to "09:00"
7. Clicks OK
8. Timestamp updated to "09:00"
```

## Button Display Logic

### All Pending Steps Show "Marquer"
```
Status: completed  → Show X button
Status: current    → Show "Marquer" button
Status: pending    → Show "Marquer" button
```

### Before (Only Current)
```
Status: completed  → Show X button
Status: current    → Show "Marquer" button
Status: pending    → No button
```

## State Transitions

### Validation Sequence
```
Step 1: pending → [Marquer] → completed
Step 2: pending → [Marquer] → completed
Step 3: pending → [Marquer] → completed
Step 4: pending → [Marquer] → completed
```

### Reversal Sequence
```
Steps 1-4: completed
User clicks X on Step 2
        ↓
Steps 2-4: removed (cascade)
        ↓
Step 2: pending → [Marquer]
Step 3: pending → [Marquer]
Step 4: pending → [Marquer]
```

## UI Elements

### "Marquer" Button
```
┌──────────┐
│ Marquer  │
└──────────┘
- Burgundy background
- White text
- 28px height
- Compact width
- Shows for all pending steps
```

### Reverse Button (X)
```
┌───┐
│ X │
└───┘
- Ghost variant
- 28px square
- Muted grey
- Red on hover
- Shows for completed steps
```

### Pencil Icon
```
[✏]
- 12px size
- Muted grey
- Shows next to timestamp
- Clickable to edit
```

### datetime-local Input
```
[2024-06-05T10:00]
- Compact size
- Border styling
- Easy to edit
- Standard HTML input
```

## Progress Indicator

### Before
```
0 sur 6 étapes
```

### After Step 1
```
1 sur 6 étapes
```

### After Step 3
```
3 sur 6 étapes
```

### After All Steps
```
6 sur 6 étapes
```

## Mobile View

### Multi-Step on Mobile
```
┌──────────────────┐
│ Suivi du Trait.  │
│ Ahmed K. • Brid. │
│                  │
│ ✓ Consultation   │
│   05/06 10:00 [X]│
│                  │
│ ○ Taillage       │
│   [Marquer]      │
│                  │
│ ○ Empreinte      │
│   [Marquer]      │
│                  │
│ ○ Essai infra    │
│   [Marquer]      │
│                  │
├──────────────────┤
│ 1 sur 6 étapes   │
└──────────────────┘
```

### Timestamp Edit on Mobile
```
┌──────────────────┐
│ ✓ Consultation   │
│ [2024-06-05T10:00]
│ [OK]             │
└──────────────────┘
```

## Key Improvements

### Efficiency
- ✓ No modal close/reopen
- ✓ Faster workflow
- ✓ Multiple steps in one session
- ✓ Reduced clicks

### Flexibility
- ✓ Editable timestamps
- ✓ Adjust past actions
- ✓ Accurate recording
- ✓ Error correction

### Reliability
- ✓ Cascading reversal
- ✓ Maintains sequence
- ✓ No orphaned steps
- ✓ Consistent state

### Usability
- ✓ Clear visual feedback
- ✓ Intuitive interactions
- ✓ Mobile friendly
- ✓ Accessible
