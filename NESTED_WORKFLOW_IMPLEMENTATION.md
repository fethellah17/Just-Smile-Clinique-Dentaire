# Nested Workflow Implementation - Complete Guide

## Overview

The nested workflow system implements a hierarchical structure: **Category → Type → Specific Steps**

This allows each treatment type to have its own specific workflow steps, providing precise progress tracking for each patient's treatment.

---

## 1. Data Structure Refactoring ✅

### New Type Definitions

```typescript
// Each Type now has its own specific steps
export interface TypeStep {
  id: string;
  name: string;
  order: number;
}

export interface CategoryType {
  id: string;
  name: string;
  steps: TypeStep[];  // ← NEW: Each type has its own steps
}

// Acte now tracks step-by-step progress
export interface ActeStepProgress {
  stepId: string;
  stepName: string;
  completed: boolean;
  completedDate?: string;
}

export interface Acte {
  id: string;
  patientId: string;
  type: string;
  typeId: string;           // ← NEW: Reference to type
  categorie: string;
  categoryId: string;       // ← NEW: Reference to category
  description: string;
  date: string;
  stepProgress: ActeStepProgress[];  // ← NEW: Track each step
  montantTotal: number;
  montantVerse: number;
  resteAPayer: number;
}
```

### Example Data Structure

**Bridge (Prothèse Fixe):**
- Consultation
- Taillage des piliers
- Empreinte
- Essai infrastructure
- Essai céramique
- Pose définitive

**Appareil amovible (Orthodontie):**
- Consultation
- Empreinte primaire
- Empreinte secondaire
- Essai cire
- Livraison
- Suivi mensuel

---

## 2. Dynamic Form Logic ✅

### NewActeModal - Cascading Selection

**File:** `src/components/modals/NewActeModal.tsx`

**Flow:**
1. **Select Category** → Shows all categories
2. **Select Type** → Filtered by selected category
3. **Preview Steps** → Automatically displays the specific steps for the selected type

**Features:**
- Steps are shown as a preview in the form
- Each step is numbered and displayed in order
- Steps are automatically initialized when the acte is created
- All steps start as "not completed"

**Code Highlights:**
```typescript
// Initialize step progress when creating an acte
const stepProgress: ActeStepProgress[] = selectedType?.steps.map(step => ({
  stepId: step.id,
  stepName: step.name,
  completed: false,
})) || [];
```

---

## 3. Progress Tracking in Patient Profile ✅

### Patient Detail Page - Step Management

**File:** `src/routes/patients.$patientId.tsx`

**Features:**

#### Visual Progress Display
- **Progress Bar:** Shows percentage completion (e.g., 3/6 steps = 50%)
- **Step List:** Each step shows:
  - Step number (1, 2, 3...)
  - Step name
  - Completion status (green checkmark or gray circle)
  - Completion date (if completed)

#### Interactive Step Management
- **"Gérer les Étapes" Button:** Opens step management modal
- Doctors can check/uncheck steps individually
- Completion date is automatically recorded
- Progress updates in real-time

### ManageStepsModal Component

**File:** `src/components/modals/ManageStepsModal.tsx`

**Features:**
- Clean checkbox interface for each step
- Shows overall progress percentage
- Visual progress bar
- Records completion date automatically
- Professional, minimalist design

**Usage:**
```typescript
<ManageStepsModal
  open={true}
  onOpenChange={setManageStepsOpen}
  acte={selectedActe}
  onUpdate={handleUpdateSteps}
/>
```

---

## 4. Configuration Management ✅

### Category Configuration Page

**File:** `src/routes/configurations.categories.tsx`

**Features:**
- Expandable category cards
- Shows types with their step counts
- Each type displays its specific steps
- Clean, hierarchical view

### ManageCategoryModal - Type & Step Editor

**File:** `src/components/modals/ManageCategoryModal.tsx`

**Features:**

#### Type Management
- Add/remove types
- Each type is expandable to show its steps
- Shows step count for each type

#### Step Management (Per Type)
- Add steps to specific types
- Reorder steps (↑ ↓ buttons)
- Remove steps
- Each step is numbered automatically

**Validation:**
- Category name is required
- At least one type is required
- Each type must have at least one step

**UI Flow:**
1. Enter category name
2. Add types (e.g., "Bridge", "Couronne")
3. Expand each type
4. Add specific steps for that type
5. Reorder steps as needed

---

## 5. Professional & Minimalist UI ✅

### Design Principles Applied

#### Color Scheme
- **Success (Completed):** Green checkmarks and progress bars
- **Pending:** Gray circles and muted text
- **Borders:** Subtle border-border color
- **Backgrounds:** Muted backgrounds (muted/20, muted/30)

#### Typography
- **No emojis** - Professional text only
- **Clear hierarchy** - Font sizes and weights differentiate importance
- **Readable spacing** - Adequate padding and gaps

#### Components
- **Checkboxes:** Simple, clean checkboxes for step completion
- **Progress Bars:** Minimal, smooth progress indicators
- **Numbered Steps:** Clear visual ordering (1, 2, 3...)
- **Subtle Hover States:** Professional interaction feedback

#### Layout
- **Card-based design** - Clean separation of content
- **Collapsible sections** - Reduce visual clutter
- **Consistent spacing** - Professional alignment

---

## 6. Key Features Summary

### ✅ Hierarchical Structure
- Category contains multiple Types
- Each Type has its own specific Steps
- Steps are ordered and numbered

### ✅ Dynamic Forms
- Cascading selection (Category → Type)
- Automatic step preview
- Type-specific workflow initialization

### ✅ Progress Tracking
- Visual progress bars with percentages
- Step-by-step completion tracking
- Completion date recording
- Real-time updates

### ✅ Step Management
- Interactive checkbox interface
- Individual step completion
- Reorderable steps in configuration
- Professional modal design

### ✅ Configuration Interface
- Intuitive type and step editor
- Expandable/collapsible sections
- Add/remove/reorder functionality
- Validation and error handling

---

## 7. Usage Examples

### Creating a New Treatment Type

1. Go to **Configurations → Catégories de Soins**
2. Click **"Nouvelle Catégorie"** or edit existing
3. Add a type (e.g., "Bridge")
4. Expand the type
5. Add steps:
   - Consultation
   - Taillage des piliers
   - Empreinte
   - Essai infrastructure
   - Essai céramique
   - Pose définitive
6. Save

### Creating a New Acte with Steps

1. Go to patient profile
2. Click **"Nouvel Acte"**
3. Select Category: "Prothèse Fixe"
4. Select Type: "Bridge"
5. See preview of 6 steps
6. Fill in other details
7. Submit → All steps initialized as "not completed"

### Tracking Treatment Progress

1. Open patient profile
2. View **"Progression des Traitements"** card
3. See progress bar (e.g., 3/6 steps = 50%)
4. Click **"Gérer les Étapes"**
5. Check completed steps
6. Save → Progress updates automatically

---

## 8. Technical Implementation Details

### State Management
- Uses React hooks (useState)
- Local state for forms and modals
- Parent-child communication via callbacks

### Data Flow
```
Categories (mock-data.ts)
    ↓
useCategories hook
    ↓
NewActeModal (select category/type)
    ↓
Initialize stepProgress
    ↓
Patient Profile (display progress)
    ↓
ManageStepsModal (update steps)
    ↓
useActes hook (persist changes)
```

### Key Functions

**Initialize Steps:**
```typescript
const stepProgress: ActeStepProgress[] = selectedType?.steps.map(step => ({
  stepId: step.id,
  stepName: step.name,
  completed: false,
})) || [];
```

**Update Step Completion:**
```typescript
const handleToggleStep = (stepId: string) => {
  setStepProgress(prev => prev.map(step => {
    if (step.stepId === stepId) {
      return {
        ...step,
        completed: !step.completed,
        completedDate: !step.completed ? new Date().toISOString().split('T')[0] : undefined,
      };
    }
    return step;
  }));
};
```

**Calculate Progress:**
```typescript
const completedSteps = acte.stepProgress.filter(s => s.completed).length;
const totalSteps = acte.stepProgress.length;
const progressPercentage = (completedSteps / totalSteps) * 100;
```

---

## 9. Files Modified

### Core Data
- ✅ `src/lib/mock-data.ts` - Added TypeStep, updated interfaces

### Components
- ✅ `src/components/modals/NewActeModal.tsx` - Dynamic type/step selection
- ✅ `src/components/modals/ManageStepsModal.tsx` - NEW: Step management
- ✅ `src/components/modals/ManageCategoryModal.tsx` - Type-specific step editor

### Pages
- ✅ `src/routes/patients.$patientId.tsx` - Progress tracking display
- ✅ `src/routes/configurations.categories.tsx` - Hierarchical view

---

## 10. Testing Checklist

### Configuration
- [ ] Create new category with types and steps
- [ ] Edit existing category
- [ ] Add steps to a type
- [ ] Reorder steps within a type
- [ ] Delete steps from a type
- [ ] Validation: Ensure types have steps

### Acte Creation
- [ ] Select category → types filter correctly
- [ ] Select type → steps preview appears
- [ ] Create acte → steps initialized
- [ ] Verify step data in patient profile

### Progress Tracking
- [ ] View progress bars in patient profile
- [ ] Open step management modal
- [ ] Check/uncheck steps
- [ ] Verify completion dates
- [ ] Confirm progress percentage updates

### UI/UX
- [ ] Professional appearance (no emojis)
- [ ] Clean, minimalist design
- [ ] Responsive layout
- [ ] Smooth interactions
- [ ] Clear visual hierarchy

---

## 11. Future Enhancements (Optional)

- **Step Templates:** Predefined step sets for common treatments
- **Step Notes:** Add notes to each completed step
- **Step Duration:** Track time between steps
- **Notifications:** Remind doctors of pending steps
- **Reports:** Generate treatment progress reports
- **Step Dependencies:** Mark steps that require previous steps

---

## Conclusion

The nested workflow system is fully implemented with:
- ✅ Hierarchical data structure (Category → Type → Steps)
- ✅ Dynamic cascading forms
- ✅ Real-time progress tracking
- ✅ Interactive step management
- ✅ Professional, minimalist UI
- ✅ Intuitive configuration interface

The system provides precise, type-specific workflow tracking while maintaining a clean, professional medical interface.
