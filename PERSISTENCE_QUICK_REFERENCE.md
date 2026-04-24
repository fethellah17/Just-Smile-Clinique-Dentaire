# Global Data Persistence - Quick Reference

## What Changed?
All data (Patients, Rendez-vous, Actes, Categories) is now automatically saved to LocalStorage and synchronized across the entire app.

## How to Use (No Changes Required!)

### Using Hooks (Same as Before)
```tsx
import { usePatients } from "@/hooks/use-patients";

function MyComponent() {
  const { patients, addPatient, updatePatient, deletePatient } = usePatients();
  
  // Use exactly as before - data is now persistent!
  return (
    <div>
      {patients.map(p => <div key={p.id}>{p.nom}</div>)}
    </div>
  );
}
```

### All Available Hooks
```tsx
// Patients
const { patients, addPatient, updatePatient, deletePatient } = usePatients();

// Rendez-vous
const { rendezVous, addRendezVous, updateRendezVous, deleteRendezVous, toggleStatut } = useRendezVous();

// Actes
const { actes, addActe, updateActe, deleteActe, getActesByPatient, getTotalDebtByPatient } = useActes();

// Categories
const { categories, addCategory, updateCategory, deleteCategory, getCategoryByName, deleteCategoryByName, isLoaded } = useCategories();
```

## Key Behaviors

### ✅ Automatic Persistence
```tsx
const { addPatient } = usePatients();
addPatient({ nom: "Dupont", ... });
// Automatically saved to LocalStorage!
```

### ✅ Cross-Page Synchronization
```tsx
// Page 1: Add patient
const { addPatient } = usePatients();
addPatient({ nom: "Dupont", ... });

// Page 2: Patient appears immediately
const { patients } = usePatients();
// patients includes the newly added patient!
```

### ✅ Data Persists on Refresh
```tsx
// Add data
addPatient({ nom: "Dupont", ... });

// Refresh browser (F5)
// Data is still there!
```

### ✅ Safe Array Access
```tsx
// No more "Cannot read property 'map' of undefined"
const { patients } = usePatients();
patients.map(p => ...) // Always safe, never undefined
```

## LocalStorage Keys
```
just-smile-patients
just-smile-rendez-vous
just-smile-actes
just-smile-categories
```

## Debugging

### Check Stored Data
```javascript
// In browser console
localStorage.getItem('just-smile-patients')
localStorage.getItem('just-smile-rendez-vous')
localStorage.getItem('just-smile-actes')
localStorage.getItem('just-smile-categories')
```

### Clear All Data
```javascript
// In browser console
localStorage.removeItem('just-smile-patients');
localStorage.removeItem('just-smile-rendez-vous');
localStorage.removeItem('just-smile-actes');
localStorage.removeItem('just-smile-categories');
// Refresh page to restore initial data
```

### Monitor Changes
```tsx
import { useData } from "@/lib/data-context";

function DebugComponent() {
  const { patients, isLoaded } = useData();
  
  useEffect(() => {
    console.log("Patients updated:", patients);
  }, [patients]);
  
  return <div>Loaded: {isLoaded ? "Yes" : "No"}</div>;
}
```

## Common Patterns

### Add and Immediately Use
```tsx
const { patients, addPatient } = usePatients();

const handleAddPatient = (data) => {
  const newPatient = addPatient(data);
  console.log("Added:", newPatient); // Available immediately
};
```

### Update and Verify
```tsx
const { updatePatient, patients } = usePatients();

updatePatient("1", { telephone: "0661234567" });
// Patient is updated in state and LocalStorage
```

### Delete and Sync
```tsx
const { deletePatient, patients } = usePatients();

deletePatient("1");
// Removed from all pages automatically
```

## Architecture (For Reference)

```
┌─────────────────────────────────────┐
│      React Component                │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│    usePatients() / useRendezVous()  │
│    useActes() / useCategories()     │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│      DataContext (Global State)     │
│  - patients                         │
│  - rendezVous                       │
│  - actes                            │
│  - categories                       │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│      LocalStorage (Persistence)     │
│  - just-smile-patients              │
│  - just-smile-rendez-vous           │
│  - just-smile-actes                 │
│  - just-smile-categories            │
└─────────────────────────────────────┘
```

## No Breaking Changes!
- All existing code continues to work
- Hook APIs are unchanged
- Just use the hooks as before
- Data is now persistent automatically

## Questions?
Refer to `GLOBAL_DATA_PERSISTENCE_IMPLEMENTATION.md` for detailed documentation.
