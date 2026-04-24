# Session Authentication Testing Guide

## Quick Start

### Demo Credentials
- **Email**: `dr.souidi@justsmile.dz`
- **Password**: `admin123`

## Test Scenarios

### Scenario 1: Initial Login
1. Open the application
2. You should see the LoginPage with professional design
3. Enter demo credentials
4. Click "Se connecter"
5. Dashboard should load with all data

**Expected Result**: ✓ Dashboard displays with patients, appointments, and debts data

---

### Scenario 2: Page Refresh (Session Reset)
1. After successful login, press F5 or Ctrl+R to refresh
2. You should be redirected to LoginPage
3. Data should still be visible after re-login

**Expected Result**: ✓ Session is cleared, LoginPage appears, data persists

---

### Scenario 3: Logout
1. After login, click the "Déconnexion" button in the sidebar footer
2. You should be redirected to LoginPage
3. Try to access any page directly (e.g., /patients)

**Expected Result**: ✓ Logout clears session, redirects to login, all routes protected

---

### Scenario 4: Data Persistence
1. Login to the application
2. Add a new patient (or modify existing data)
3. Refresh the page (F5)
4. Re-login with credentials
5. Check if the patient you added is still there

**Expected Result**: ✓ Data persists in LocalStorage across refresh

---

### Scenario 5: Invalid Credentials
1. Open LoginPage
2. Enter incorrect email or password
3. Click "Se connecter"

**Expected Result**: ✓ Error message "Email ou mot de passe incorrect" appears

---

### Scenario 6: Tab Closure
1. Login to the application
2. Close the browser tab
3. Open a new tab and navigate to the application
4. You should see LoginPage

**Expected Result**: ✓ SessionStorage is cleared when tab closes, requires re-login

---

### Scenario 7: Protected Routes
1. Without logging in, try to access:
   - `/patients`
   - `/rendez-vous`
   - `/dettes`
   - `/configurations/categories`
2. Each should redirect to LoginPage

**Expected Result**: ✓ All routes are protected and require authentication

---

### Scenario 8: Loading State
1. Open the application
2. You should briefly see a loading spinner
3. Then either LoginPage or Dashboard appears

**Expected Result**: ✓ Loading state prevents flash of content

---

## UI Design Verification

### LoginPage Design Checklist
- [ ] Background is clean white/grey gradient (not colorful)
- [ ] Logo is displayed at the top
- [ ] "Just Smile" title is visible
- [ ] "Clinique Dentaire" subtitle is visible
- [ ] Email input field is present
- [ ] Password input field is present
- [ ] "Se connecter" button is burgundy/amber-900 color
- [ ] No emojis or playful icons visible
- [ ] Demo credentials hint is shown at bottom
- [ ] Professional, serious appearance

---

## Storage Verification

### Check SessionStorage (Authentication)
```javascript
// In browser console:
sessionStorage.getItem('just-smile-session-token')
// Should return "authenticated" when logged in
// Should return null when logged out or after refresh
```

### Check LocalStorage (Data)
```javascript
// In browser console:
localStorage.getItem('just-smile-patients')
localStorage.getItem('just-smile-rendez-vous')
localStorage.getItem('just-smile-actes')
localStorage.getItem('just-smile-categories')
// Should contain data even after logout or refresh
```

---

## Browser DevTools Testing

### Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page while logged in
4. You should see requests for data loading
5. After refresh, you should be redirected to login

### Application Tab
1. Open DevTools (F12)
2. Go to Application tab
3. Check SessionStorage:
   - `just-smile-session-token` should be present when logged in
   - Should be empty when logged out
4. Check LocalStorage:
   - All data keys should persist across sessions

---

## Troubleshooting

### Issue: LoginPage not showing after refresh
- **Solution**: Check browser console for errors, verify SessionStorage is being cleared

### Issue: Data not persisting after refresh
- **Solution**: Check LocalStorage in DevTools, verify data is being saved

### Issue: Can access protected routes without login
- **Solution**: Verify auth context is properly initialized, check isAuthenticated flag

### Issue: Logout button not working
- **Solution**: Check browser console for errors, verify router navigation is working

---

## Performance Notes

- Loading spinner appears briefly during initialization
- No flash of content due to isInitialized check
- SessionStorage operations are instant
- LocalStorage operations are instant
- All routes load data from context (no additional API calls)

---

## Security Verification

✓ Authentication state not persisted to LocalStorage
✓ SessionStorage cleared on page refresh
✓ SessionStorage cleared on tab closure
✓ All routes require authentication
✓ Logout clears session immediately
✓ No sensitive data in LocalStorage
✓ Demo credentials only for testing
