# Data Persistence - Quick Start Guide

## The Fix in One Sentence
**Only use mock data if localStorage is completely empty. Otherwise, always load from localStorage.**

## What Was Wrong
```typescript
// ❌ WRONG - Falls back to mock data for each key individually
const storedPatients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
setPatients(storedPatients ? JSON.parse(storedPatients) : initialPatients);
// This means if you had patients but no categories, it would load mock categories
```

## What's Fixed
```typescript
// ✅ CORRECT - Check if ANY data exists first
const hasStoredData = 
  localStorage.getItem(STORAGE_KEYS.PATIENTS) ||
  localStorage.getItem(STORAGE_KEYS.RENDEZ_VOUS) ||
  localStorage.getItem(STORAGE_KEYS.ACTES) ||
  localStorage.getItem(STORAGE_KEYS.CATEGORIES);

if (hasStoredData) {
  // Load from localStorage (use empty arrays if specific key missing)
  const storedPatients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
  setPatients(storedPatients ? JSON.parse(storedPatients) : []);
} else {
  // Only use mock data if localStorage is completely empty
  setPatients(initialPatients ?? []);
}
```

## How It Works Now

### On First Load (Empty localStorage)
1. App checks if localStorage has any data
2. It doesn't → Uses mock data
3. Mock data is displayed
4. User makes changes
5. Changes are saved to localStorage

### On Subsequent Loads (localStorage has data)
1. App checks if localStorage has any data
2. It does → Loads from localStorage
3. User's data is displayed
4. User makes changes
5. Changes are saved to localStorage

### On Every CRUD Operation
```
User Action → setState() → useEffect triggers → localStorage.setItem()
```

## Storage Keys
```
just-smile-patients
just-smile-rendez-vous
just-smile-actes
just-smile-categories
```

## Testing
```bash
# Test 1: Add data and refresh
1. Add a patient
2. Press F5
3. Patient should still be there ✅

# Test 2: Clear storage and refresh
1. Open DevTools (F12)
2. Application → LocalStorage → Delete all just-smile-* keys
3. Press F5
4. Mock data should load ✅

# Test 3: Navigate without losing data
1. Add a patient
2. Go to Settings
3. Go back to Patients
4. Patient should still be there ✅
```

## Common Issues & Solutions

### Issue: Data disappears on refresh
**Solution:** Check browser DevTools → Application → LocalStorage. If "just-smile-*" keys are empty, the fix is working (mock data should load). If keys have data but it's not showing, clear cache and refresh.

### Issue: Mock data keeps loading
**Solution:** This is correct behavior if localStorage is empty. Add some data and refresh - it should persist.

### Issue: Old data mixed with new data
**Solution:** This shouldn't happen with the fix. If it does, clear localStorage and start fresh.

## For Developers

### Adding a New Data Type
1. Add to mock-data.ts
2. Add storage key to STORAGE_KEYS
3. Add useState hook in DataProvider
4. Add initialization logic in useEffect
5. Add auto-save useEffect
6. Add CRUD functions
7. Export from useData hook

### Debugging
```javascript
// In browser console:
localStorage.getItem('just-smile-patients')
localStorage.getItem('just-smile-categories')
localStorage.getItem('just-smile-rendez-vous')
localStorage.getItem('just-smile-actes')
```

## Key Principle
**State and localStorage are always in sync.** When state changes, localStorage updates automatically. When the app loads, it reads from localStorage first.
