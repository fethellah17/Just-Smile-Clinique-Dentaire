# Data Persistence - Visual Guide

## The Problem (Before Fix)

```
┌─────────────────────────────────────────────────────────────┐
│                    BROKEN FLOW                              │
└─────────────────────────────────────────────────────────────┘

Session 1:
┌──────────────┐
│ App Starts   │
└──────┬───────┘
       ↓
┌──────────────────────────────────────────┐
│ Check localStorage.getItem('patients')   │
│ → Empty, use mock data                   │
│ Check localStorage.getItem('categories') │
│ → Empty, use mock data                   │
│ Check localStorage.getItem('rendez-vous')│
│ → Empty, use mock data                   │
│ Check localStorage.getItem('actes')      │
│ → Empty, use mock data                   │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ User adds a new patient                  │
│ → Saved to localStorage                  │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ localStorage now has:                    │
│ • patients: [mock + new patient]         │
│ • categories: (empty)                    │
│ • rendez-vous: (empty)                   │
│ • actes: (empty)                         │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ User adds a new category                 │
│ → Saved to localStorage                  │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ localStorage now has:                    │
│ • patients: [mock + new patient]         │
│ • categories: [new category]             │
│ • rendez-vous: (empty)                   │
│ • actes: (empty)                         │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ PAGE REFRESH (F5)                        │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ Check localStorage.getItem('patients')   │
│ → Has data, load it ✓                    │
│ Check localStorage.getItem('categories') │
│ → Empty, use mock data ✗ WRONG!          │
│ Check localStorage.getItem('rendez-vous')│
│ → Empty, use mock data ✗ WRONG!          │
│ Check localStorage.getItem('actes')      │
│ → Empty, use mock data ✗ WRONG!          │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ RESULT: Data is corrupted!               │
│ • New patient: ✓ Still there             │
│ • New category: ✗ LOST!                  │
│ • Mock categories: ✓ Loaded (wrong!)     │
│ • Mock rendez-vous: ✓ Loaded (wrong!)    │
│ • Mock actes: ✓ Loaded (wrong!)          │
└──────────────────────────────────────────┘
```

## The Solution (After Fix)

```
┌─────────────────────────────────────────────────────────────┐
│                    FIXED FLOW                               │
└─────────────────────────────────────────────────────────────┘

Session 1:
┌──────────────┐
│ App Starts   │
└──────┬───────┘
       ↓
┌──────────────────────────────────────────┐
│ Check if ANY localStorage data exists:   │
│ • patients? No                           │
│ • categories? No                         │
│ • rendez-vous? No                        │
│ • actes? No                              │
│ → hasStoredData = false                  │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ Load mock data for all types             │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ User adds a new patient                  │
│ → Saved to localStorage                  │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ localStorage now has:                    │
│ • patients: [mock + new patient]         │
│ • categories: (empty)                    │
│ • rendez-vous: (empty)                   │
│ • actes: (empty)                         │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ User adds a new category                 │
│ → Saved to localStorage                  │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ localStorage now has:                    │
│ • patients: [mock + new patient]         │
│ • categories: [new category]             │
│ • rendez-vous: (empty)                   │
│ • actes: (empty)                         │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ PAGE REFRESH (F5)                        │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ Check if ANY localStorage data exists:   │
│ • patients? Yes ✓                        │
│ → hasStoredData = true                   │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ Load from localStorage ONLY:             │
│ • patients: Load from storage ✓          │
│ • categories: Load from storage ✓        │
│ • rendez-vous: Empty array (not mock) ✓  │
│ • actes: Empty array (not mock) ✓        │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ RESULT: Data is preserved!               │
│ • New patient: ✓ Still there             │
│ • New category: ✓ Still there            │
│ • No mock data: ✓ Correct!               │
└──────────────────────────────────────────┘
```

## State Synchronization Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTOMATIC SYNC FLOW                        │
└─────────────────────────────────────────────────────────────┘

User Action
    ↓
┌──────────────────────────────────────────┐
│ CRUD Function Called                     │
│ • addPatient()                           │
│ • updateCategory()                       │
│ • deleteRendezVous()                     │
│ • etc.                                   │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ setState() called                        │
│ setPatients([...patients, newPatient])   │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ React re-renders component               │
│ State is updated in memory               │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ useEffect hook triggered                 │
│ Dependency: [patients, isLoaded]         │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ Check: isLoaded === true?                │
│ (Prevents saving during initial load)    │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ localStorage.setItem() called            │
│ 'just-smile-patients' = JSON.stringify() │
└──────┬───────────────────────────────────┘
       ↓
┌──────────────────────────────────────────┐
│ Data persisted to browser storage        │
│ Survives page refresh                    │
└──────────────────────────────────────────┘
```

## Initialization Decision Tree

```
                    App Starts
                        ↓
        ┌───────────────────────────────┐
        │ Check localStorage for data   │
        └───────────────────────────────┘
                    ↙           ↘
            Has Data?        No Data?
                ↓                ↓
        ┌──────────────┐  ┌──────────────┐
        │ Load from    │  │ Load mock    │
        │ localStorage │  │ data         │
        └──────┬───────┘  └──────┬───────┘
               ↓                 ↓
        ┌──────────────────────────────┐
        │ Display data to user         │
        └──────────────────────────────┘
               ↓
        ┌──────────────────────────────┐
        │ Set isLoaded = true          │
        │ (Enable auto-save)           │
        └──────────────────────────────┘
```

## localStorage Structure

```
Browser LocalStorage
├── just-smile-patients
│   └── [
│       { id: "1", nom: "Benali", ... },
│       { id: "2", nom: "Khelifi", ... },
│       ...
│     ]
├── just-smile-categories
│   └── [
│       { id: "1", name: "Chirurgie", types: [...], stages: [...] },
│       { id: "2", name: "Prothèse Fixe", types: [...], stages: [...] },
│       ...
│     ]
├── just-smile-rendez-vous
│   └── [
│       { id: "1", patientId: "1", date: "2026-04-14", ... },
│       ...
│     ]
└── just-smile-actes
    └── [
        { id: "1", patientId: "1", type: "Détartrage", ... },
        ...
      ]
```

## Comparison: Before vs After

| Scenario | Before Fix | After Fix |
|----------|-----------|-----------|
| Add patient, refresh | ✗ Lost | ✓ Persists |
| Add category, refresh | ✗ Lost | ✓ Persists |
| Add type to category, refresh | ✗ Lost | ✓ Persists |
| Clear localStorage, refresh | ✓ Mock loads | ✓ Mock loads |
| Navigate between pages | ✗ Data resets | ✓ Data persists |
| Update existing data, refresh | ✗ Lost | ✓ Persists |
| Delete data, refresh | ✗ Reappears | ✓ Stays deleted |

## Key Insight

```
┌─────────────────────────────────────────────────────────────┐
│                    THE KEY DIFFERENCE                       │
└─────────────────────────────────────────────────────────────┘

BEFORE:
  Check each key individually
  → If key is empty, use mock data for that key
  → Result: Mix of old and new data

AFTER:
  Check if ANY key has data
  → If yes, load from localStorage exclusively
  → If no, load mock data for all keys
  → Result: Consistent, predictable behavior
```

## Testing Scenarios

### Scenario 1: First Time User
```
1. App starts
2. localStorage is empty
3. hasStoredData = false
4. Mock data loads
5. User sees 6 patients, 6 categories, etc.
✓ Correct behavior
```

### Scenario 2: Returning User
```
1. App starts
2. localStorage has data
3. hasStoredData = true
4. Data loads from localStorage
5. User sees their saved data
✓ Correct behavior
```

### Scenario 3: User Adds Data
```
1. User adds a patient
2. setState() called
3. useEffect triggered
4. localStorage.setItem() called
5. Data persisted
6. User refreshes
7. Data still there
✓ Correct behavior
```

### Scenario 4: User Clears Storage
```
1. User clears localStorage manually
2. App refreshes
3. localStorage is empty
4. hasStoredData = false
5. Mock data loads
✓ Correct behavior
```
