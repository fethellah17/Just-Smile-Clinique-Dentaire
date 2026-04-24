# Workflow Tracking - Visual Summary

## Table Structure

```
┌─────────┬────────┬─────┬──────────────┬──────────────┬─────────────────┬───────────┬──────────────┬─────────┐
│ Nom     │ Prénom │ Âge │ Catégorie    │ Type de Soin │ Étape Actuelle  │ Téléphone │ Antécédents  │ Actions │
├─────────┼────────┼─────┼──────────────┼──────────────┼─────────────────┼───────────┼──────────────┼─────────┤
│ Benali  │ Fatima │ 34  │ Soins base   │ Détartrage   │ [Polissage ▼]   │ 0551234567│ Diabète      │ 👁 ✎ 🗑 │
│ Khelifi │ Ahmed  │ 45  │ Prothèse Fixe│ Bridge       │ [Essai infra ▼] │ 0662345678│ Hypertension │ 👁 ✎ 🗑 │
│ Boumed. │ Sara   │ 28  │ Esthétique   │ Blanchiment  │ [Contrôle ▼]    │ 0773456789│ Aucun        │ 👁 ✎ 🗑 │
└─────────┴────────┴─────┴──────────────┴──────────────┴─────────────────┴───────────┴──────────────┴─────────┘
```

## Dropdown Menu Example

When clicking on "Étape Actuelle" button:

```
┌─────────────────────────────────┐
│ Étapes disponibles              │
├─────────────────────────────────┤
│ 1. Consultation                 │
│ 2. Taillage des piliers         │
│ 3. Empreinte                    │
│ 4. Essai infrastructure    ✓    │
│ 5. Essai céramique              │
│ 6. Pose définitive              │
└─────────────────────────────────┘
```

## New Patient Registration Flow

### Step 1: Basic Info
```
┌─────────────────────────────────┐
│ Nouveau Patient                 │
├─────────────────────────────────┤
│ Nom: [Dupont]                   │
│ Prénom: [Jean]                  │
│ Âge: [42]                       │
│ Téléphone: [0612345678]         │
│ Antécédents: [Aucun]            │
└─────────────────────────────────┘
```

### Step 2: Category Selection
```
┌─────────────────────────────────┐
│ Catégorie: [Prothèse Fixe ▼]    │
└─────────────────────────────────┘
```

### Step 3: Type Selection (Auto-appears)
```
┌─────────────────────────────────┐
│ Type: [Bridge ▼]                │
└─────────────────────────────────┘
```

### Step 4: Workflow Preview (Auto-appears)
```
┌─────────────────────────────────┐
│ Aperçu du workflow              │
│ Les étapes suivantes seront     │
│ associées à ce patient:         │
│                                 │
│ [1] → Consultation              │
│ [2] → Taillage des piliers      │
│ [3] → Empreinte                 │
│ [4] → Essai infrastructure      │
│ [5] → Essai céramique           │
│ [6] → Pose définitive           │
└─────────────────────────────────┘
```

## Color Scheme

- **Burgundy (#800020)**: Primary action color for workflow elements
- **Light Burgundy (#800020/5)**: Hover state background
- **Border Burgundy (#800020/30)**: Subtle borders
- **Muted Gray**: Secondary text and disabled states

## Component Hierarchy

```
PatientsPage
├── Table Header
│   ├── Nom
│   ├── Prénom
│   ├── Âge
│   ├── Catégorie
│   ├── Type de Soin (NEW)
│   ├── Étape Actuelle (NEW)
│   ├── Téléphone
│   ├── Antécédents
│   └── Actions
│
├── Table Body
│   └── TableRow (for each patient)
│       ├── Nom (Link)
│       ├── Prénom (Link)
│       ├── Âge
│       ├── Catégorie (Badge)
│       ├── Type de Soin (Text)
│       ├── Étape Actuelle (WorkflowStepSelector)
│       │   └── DropdownMenu
│       │       └── DropdownMenuItems (steps)
│       ├── Téléphone
│       ├── Antécédents
│       └── Actions (Eye, Edit, Delete)
│
└── NewPatientModal
    ├── Basic Info Fields
    ├── Category Select
    ├── Type Select (conditional)
    └── Workflow Preview (conditional)
```

## State Management Flow

```
Patient Object
├── id: string
├── nom: string
├── prenom: string
├── age: number
├── telephone: string
├── antecedents: string
├── categorie: string
├── typeSoin?: string (NEW)
├── typeSoinId?: string (NEW)
├── etapeActuelle?: string (NEW)
└── dateCreation: string

DataContext
├── patients: Patient[]
├── updatePatient(id, updates)
└── addPatient(patient)
```

## Interaction Flow

```
User clicks step dropdown
        ↓
WorkflowStepSelector opens
        ↓
User selects new step
        ↓
onStepChange callback triggered
        ↓
handleStepChange called
        ↓
updatePatient(patientId, { etapeActuelle: newStep })
        ↓
State updated in DataContext
        ↓
Component re-renders
        ↓
Table shows new step
```

## Mobile Responsiveness

- Dropdown menu positioned to prevent overflow
- Button text truncated with ellipsis for long step names
- Touch-friendly button sizing (h-7 = 28px)
- Proper spacing maintained on small screens
- Table scrolls horizontally if needed

## Key Features

✓ **Dynamic Linking**: Steps shown are specific to selected type
✓ **Inline Selection**: No modal needed for step changes
✓ **Professional Styling**: Medical-themed burgundy color scheme
✓ **Mobile Optimized**: Responsive dropdown positioning
✓ **State Persistence**: Changes persist during session navigation
✓ **Clean Reset**: Full page refresh resets to initial state
✓ **Workflow Preview**: Users see all steps during registration
✓ **Auto-initialization**: First step automatically set on type selection
