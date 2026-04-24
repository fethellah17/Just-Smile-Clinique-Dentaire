# Confirmation Logic - Visual Guide

## Modal States

### Initial State (No Changes)
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
│ ○ Empreinte                      │
│   [Marquer]                      │
│                                  │
│ ○ Essai infrastructure           │
│   [Marquer]                      │
│                                  │
├──────────────────────────────────┤
│   2 sur 6 étapes                 │
│                                  │
│ [Annuler]  [Confirmer]           │
│            (disabled)            │
└──────────────────────────────────┘
```

### After Making Changes
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
├──────────────────────────────────┤
│   3 sur 6 étapes                 │
│                                  │
│ [Annuler]  [Confirmer]           │
│            (enabled)             │
└──────────────────────────────────┘
```

## Button States

### Confirmer Button - Disabled
```
┌──────────────┐
│ Confirmer    │ (greyed out)
└──────────────┘
- No changes made
- Cannot click
- Visual feedback
```

### Confirmer Button - Enabled
```
┌──────────────┐
│ Confirmer    │ (burgundy)
└──────────────┘
- Changes made
- Can click
- Burgundy theme
```

## User Workflows

### Workflow 1: Validate and Confirm
```
Initial State
  ↓
User clicks "Marquer" on step 3
  ↓
Draft updated: 3 steps completed
  ↓
"Confirmer" button enabled
  ↓
User clicks "Confirmer"
  ↓
Toast: "Suivi mis à jour avec succès"
  ↓
Modal closes
  ↓
Main table updates
```

### Workflow 2: Make Changes and Cancel
```
Initial State
  ↓
User clicks "Marquer" on step 3
  ↓
Draft updated: 3 steps completed
  ↓
"Confirmer" button enabled
  ↓
User clicks "Annuler"
  ↓
Draft discarded
  ↓
Modal closes
  ↓
Main table unchanged
```

### Workflow 3: Edit Timestamp and Confirm
```
Initial State
  ↓
User clicks timestamp on step 2
  ↓
Edit mode activated
  ↓
User changes time to 09:00
  ↓
User clicks OK
  ↓
Draft updated with new timestamp
  ↓
"Confirmer" button enabled
  ↓
User clicks "Confirmer"
  ↓
Toast: "Suivi mis à jour avec succès"
  ↓
Modal closes
  ↓
Main table updates
```

## Draft vs Actual State

### Before Confirmation
```
Modal (Draft State)          Main Table (Actual State)
┌──────────────────┐        ┌──────────────────┐
│ ✓ Step 1         │        │ ✓ Step 1         │
│ ✓ Step 2         │        │ ✓ Step 2         │
│ ✓ Step 3 (NEW)   │        │ ○ Step 3         │
│ ○ Step 4         │        │ ○ Step 4         │
└──────────────────┘        └──────────────────┘
     (Draft)                    (Unchanged)
```

### After Confirmation
```
Modal (Closed)              Main Table (Updated)
                            ┌──────────────────┐
                            │ ✓ Step 1         │
                            │ ✓ Step 2         │
                            │ ✓ Step 3         │
                            │ ○ Step 4         │
                            └──────────────────┘
                               (Updated)
```

## Toast Notifications

### Success Toast
```
┌─────────────────────────────────────┐
│ ✓ Suivi mis à jour avec succès      │
└─────────────────────────────────────┘
(Shows for 3 seconds, then disappears)
```

### Error Toast
```
┌─────────────────────────────────────┐
│ ✗ Aucune étape complétée            │
└─────────────────────────────────────┘
(Shows if no steps completed)
```

## Button Layout

### Footer with Buttons
```
┌──────────────────────────────────┐
│                                  │
│ ┌────────────────────────────┐   │
│ │ [Annuler]  [Confirmer]     │   │
│ │ (outline)  (burgundy)      │   │
│ └────────────────────────────┘   │
└──────────────────────────────────┘
```

### Button Styling

#### Annuler Button
```
┌──────────┐
│ Annuler  │
└──────────┘
- Outline variant
- Secondary action
- Always enabled
- Discards changes
```

#### Confirmer Button (Disabled)
```
┌──────────┐
│ Confirmer│ (greyed)
└──────────┘
- Burgundy theme
- Primary action
- Disabled initially
- Enabled after changes
```

#### Confirmer Button (Enabled)
```
┌──────────┐
│ Confirmer│ (burgundy)
└──────────┘
- Burgundy theme
- Primary action
- Enabled after changes
- Clickable
```

## Change Detection

### No Changes
```
Initial State = Draft State
        ↓
hasChanges = false
        ↓
"Confirmer" button disabled
```

### Changes Made
```
Initial State ≠ Draft State
        ↓
hasChanges = true
        ↓
"Confirmer" button enabled
```

### Changes Canceled
```
Draft State = Initial State
        ↓
hasChanges = false
        ↓
"Confirmer" button disabled
```

## Confirmation Flow Diagram

```
┌─────────────────────────────────────┐
│ User Opens Modal                    │
│ Draft = Patient.stepsCompleted      │
│ hasChanges = false                  │
└──────────────┬──────────────────────┘
               │
        ┌──────▼──────┐
        │ User Action │
        └──────┬──────┘
               │
        ┌──────┴──────────────────┐
        │                         │
   ┌────▼────┐            ┌──────▼──────┐
   │ Marquer  │            │ Annuler     │
   │ Reverse  │            │             │
   │ Edit     │            │ Discard     │
   └────┬────┘            │ Draft       │
        │                 │             │
   ┌────▼────────┐        └──────┬──────┘
   │ Draft       │               │
   │ Updated     │        ┌──────▼──────┐
   │ hasChanges  │        │ Modal Close  │
   │ = true      │        │ No Changes   │
   └────┬────────┘        └──────────────┘
        │
   ┌────▼──────────┐
   │ Confirmer     │
   │ Enabled       │
   └────┬──────────┘
        │
   ┌────▼──────────────┐
   │ User Clicks       │
   │ Confirmer         │
   └────┬──────────────┘
        │
   ┌────▼──────────────┐
   │ Apply Changes     │
   │ Show Toast        │
   │ Close Modal       │
   │ Update Table      │
   └───────────────────┘
```

## State Transitions

### Initial → Changes Made
```
┌─────────────────────────────────────┐
│ Initial State                       │
│ - Draft = Patient.stepsCompleted    │
│ - hasChanges = false                │
│ - "Confirmer" disabled              │
└──────────────┬──────────────────────┘
               │ User clicks "Marquer"
               ▼
┌─────────────────────────────────────┐
│ Changes Made                        │
│ - Draft updated                     │
│ - hasChanges = true                 │
│ - "Confirmer" enabled               │
└─────────────────────────────────────┘
```

### Changes Made → Confirmed
```
┌─────────────────────────────────────┐
│ Changes Made                        │
│ - Draft updated                     │
│ - hasChanges = true                 │
│ - "Confirmer" enabled               │
└──────────────┬──────────────────────┘
               │ User clicks "Confirmer"
               ▼
┌─────────────────────────────────────┐
│ Confirmed                           │
│ - Changes applied                   │
│ - Toast shown                       │
│ - Modal closed                      │
│ - Table updated                     │
└─────────────────────────────────────┘
```

### Changes Made → Canceled
```
┌─────────────────────────────────────┐
│ Changes Made                        │
│ - Draft updated                     │
│ - hasChanges = true                 │
│ - "Confirmer" enabled               │
└──────────────┬──────────────────────┘
               │ User clicks "Annuler"
               ▼
┌─────────────────────────────────────┐
│ Canceled                            │
│ - Draft discarded                   │
│ - hasChanges = false                │
│ - Modal closed                      │
│ - Table unchanged                   │
└─────────────────────────────────────┘
```

## Key Visual Elements

### Progress Counter
```
2 sur 6 étapes
↑ Updates in real-time
  as steps are marked
```

### Button Footer
```
┌──────────────────────────────────┐
│ Border separator                 │
├──────────────────────────────────┤
│ [Annuler]  [Confirmer]           │
│ (outline)  (burgundy/disabled)   │
└──────────────────────────────────┘
```

### Color Scheme
```
Burgundy (#800020): Confirmer button (enabled)
Outline: Annuler button
Disabled: Confirmer button (no changes)
Muted: Disabled state text
```

## Mobile View

### Mobile Modal
```
┌──────────────────┐
│ Suivi du Trait.  │
│ Ahmed K. • Brid. │
│                  │
│ ✓ Consultation   │
│   05/06 10:00 [X]│
│                  │
│ ○ Empreinte      │
│   [Marquer]      │
│                  │
├──────────────────┤
│ 1 sur 6 étapes   │
│                  │
│ [Annuler]        │
│ [Confirmer]      │
│ (stacked)        │
└──────────────────┘
```

## Summary

The confirmation logic provides:
- ✓ Draft state for safe editing
- ✓ Change detection for button state
- ✓ Clear action buttons
- ✓ Success feedback
- ✓ Professional workflow
