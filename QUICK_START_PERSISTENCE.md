# Global Data Persistence - Quick Start Guide

## What's New? 🎯

Your app now **automatically saves all data** to the browser. No more data loss on refresh!

## How to Use (No Changes Needed!)

### Using the Hooks - Exactly the Same as Before

```tsx
import { usePatients } from "@/hooks/use-patients";

function MyComponent() {
  const { patients, addPatient } = usePatients();
  
  // Use exactly as before - data is now persistent!
  return (
    <div>
      {patients.map(p => <div key={p.id}>{p.nom}</div>)}
    </div>
  );
}
```

## Test It Out (2 Minutes)

### Step 1: Add a Patient
1. Go to **Patients** page
2. Click **"Nouveau Patient"**
3. Fill in the form
4. Click **"Ajouter"**

### Step 2: Refresh the Page
1. Press **F5** to refresh
2. Patient is still there! ✅

### Step 3: Test Cross-Page Sync
1. Go to **Rendez-vous** page
2. Click **"Ajouter"**
3. Patient appears in selection list ✅

## What's Saved?

```
✅ Patients
✅ Rendez-vous
✅ Actes
✅ Categories
```

All automatically saved to LocalStorage!

## Check What's Saved

### In Browser DevTools
1. Press **F12** to open DevTools
2. Go to **Application** tab
3. Click **LocalStorage**
4. Look for `just-smile-*` keys
5. Click to see the data

### In Browser Console
```javascript
// Paste in console (F12)
localStorage.getItem('just-smile-patients')
```

## Clear All Data

```javascript
// Paste in console (F12)
localStorage.removeItem('just-smile-patients');
localStorage.removeItem('just-smile-rendez-vous');
localStorage.removeItem('just-smile-actes');
localStorage.removeItem('just-smile-categories');
location.reload();
```

## Common Tasks

### Add a Patient
```tsx
const { addPatient } = usePatients();
addPatient({
  nom: "Dupont",
  prenom: "Jean",
  age: 35,
  telephone: "0551234567",
  antecedents: "Aucun",
  categorie: "Soins de base"
});
// Automatically saved!
```

### Get All Patients
```tsx
const { patients } = usePatients();
console.log(patients); // All patients, including new ones
```

### Update a Patient
```tsx
const { updatePatient } = usePatients();
updatePatient("1", { telephone: "0661234567" });
// Automatically saved!
```

### Delete a Patient
```tsx
const { deletePatient } = usePatients();
deletePatient("1");
// Automatically saved!
```

## All Available Hooks

### usePatients()
```tsx
const { patients, addPatient, updatePatient, deletePatient } = usePatients();
```

### useRendezVous()
```tsx
const { rendezVous, addRendezVous, updateRendezVous, deleteRendezVous, toggleStatut } = useRendezVous();
```

### useActes()
```tsx
const { actes, addActe, updateActe, deleteActe, getActesByPatient, getTotalDebtByPatient } = useActes();
```

### useCategories()
```tsx
const { categories, addCategory, updateCategory, deleteCategory, getCategoryByName, deleteCategoryByName, isLoaded } = useCategories();
```

## Troubleshooting

### Data Not Saving?
1. Check if LocalStorage is enabled
2. Open DevTools (F12)
3. Check Application → LocalStorage
4. Look for `just-smile-*` keys

### Data Not Appearing After Refresh?
1. Check browser console for errors (F12)
2. Check if LocalStorage has the data
3. Try clearing cache and refreshing

### "Cannot read property 'map' of undefined"?
1. This should not happen
2. All arrays default to []
3. If it occurs, check browser console for errors

## Documentation

### Quick Reference
**File**: `PERSISTENCE_QUICK_REFERENCE.md`
- Common patterns
- Debugging tips
- LocalStorage keys

### Detailed Guide
**File**: `IMPLEMENTATION_GUIDE.md`
- Full implementation details
- Usage examples
- Testing procedures

### Visual Guide
**File**: `PERSISTENCE_VISUAL_GUIDE.md`
- Architecture diagrams
- Data flow diagrams

### Complete Index
**File**: `PERSISTENCE_DOCUMENTATION_INDEX.md`
- All documentation files
- How to find what you need

## Key Points

✅ **Automatic**: Data saves automatically  
✅ **Instant**: Changes appear everywhere instantly  
✅ **Safe**: No undefined errors  
✅ **Professional**: UI unchanged  
✅ **Compatible**: All existing code works  

## That's It!

Your app now has automatic data persistence. Just use the hooks as before, and data will be saved automatically!

---

**Questions?** Check `PERSISTENCE_DOCUMENTATION_INDEX.md` for all documentation.

**Ready to deploy?** Check `DEPLOYMENT_CHECKLIST.md`.

Happy coding! 🚀
