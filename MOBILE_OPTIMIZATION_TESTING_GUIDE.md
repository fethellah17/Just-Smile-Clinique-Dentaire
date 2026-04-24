# Mobile Optimization - Testing Guide

## Pre-Testing Checklist

- [ ] All code changes committed
- [ ] No console errors or warnings
- [ ] Application builds successfully
- [ ] All dependencies installed
- [ ] Browser DevTools available
- [ ] Multiple devices available for testing

## Testing Environments

### 1. Browser DevTools (Chrome/Edge)

#### Setup
1. Open application in Chrome/Edge
2. Press `F12` or `Ctrl+Shift+I` to open DevTools
3. Click device toggle icon (top-left of DevTools)
4. Select mobile device from dropdown

#### Devices to Test
- iPhone 12 (390×844)
- iPhone SE (375×667)
- Pixel 5 (393×851)
- Galaxy S21 (360×800)
- iPad (768×1024)
- iPad Pro (1024×1366)

### 2. Real Device Testing

#### iOS
- iPhone 12/13/14/15
- iPhone SE
- iPad (7th gen or newer)

#### Android
- Pixel 5/6/7
- Samsung Galaxy S21/S22
- OnePlus 9/10

### 3. Responsive Testing Tools
- Chrome DevTools
- Firefox Responsive Design Mode
- Safari Responsive Design Mode
- BrowserStack (cloud testing)

## Test Cases

### Test 1: Mobile Card View Display

**Objective:** Verify cards display correctly on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Cards are displayed (not table)
   - [ ] Each card shows patient name (bold)
   - [ ] Category badge visible
   - [ ] Type de Soin displayed
   - [ ] Étape Actuelle displayed
   - [ ] Age and phone number visible
   - [ ] Montant Total and Montant Payé visible
   - [ ] All action buttons visible

**Expected Result:** All patient information clearly visible in card format

---

### Test 2: Floating Action Button (FAB)

**Objective:** Verify FAB appears and functions correctly

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] FAB appears in bottom-right corner
   - [ ] FAB is red (#800020)
   - [ ] FAB has "+" icon
   - [ ] FAB is not hidden by other elements
   - [ ] FAB remains visible while scrolling
   - [ ] FAB is clickable
   - [ ] Clicking FAB opens "Nouveau Patient" modal

**Expected Result:** FAB visible, accessible, and functional

**Desktop Test:**
1. Set viewport to desktop (≥ 768px)
2. Verify:
   - [ ] FAB is hidden (md:hidden)
   - [ ] "Nouveau Patient" button visible in header

---

### Test 3: Sticky Header

**Objective:** Verify search and filter bar stays at top

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Scroll down through patient list
4. Verify:
   - [ ] Search bar remains at top
   - [ ] Filter dropdown remains at top
   - [ ] Header has backdrop blur effect
   - [ ] Header doesn't overlap content
   - [ ] Search functionality works while sticky
   - [ ] Filter functionality works while sticky

**Expected Result:** Header stays visible and functional while scrolling

**Desktop Test:**
1. Set viewport to desktop (≥ 768px)
2. Verify:
   - [ ] Header is not sticky
   - [ ] Header scrolls with content

---

### Test 4: Touch-Friendly Buttons

**Objective:** Verify buttons are touch-friendly

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify button sizes:
   - [ ] Payment button: 40px height
   - [ ] History button: 40px height
   - [ ] Edit button: 40px height
   - [ ] Delete button: 40px height
   - [ ] Icons: 20px (h-5 w-5)
   - [ ] Spacing between buttons: 8px (gap-2)

**Expected Result:** All buttons meet 44px minimum touch target size

**Desktop Test:**
1. Set viewport to desktop (≥ 768px)
2. Verify:
   - [ ] Buttons are smaller (32px height)
   - [ ] Icons are smaller (16px)

---

### Test 5: Search Functionality

**Objective:** Verify search works on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Click search input
4. Type patient name (e.g., "Ahmed")
5. Verify:
   - [ ] Search input is full-width
   - [ ] Keyboard appears on mobile
   - [ ] Results filter in real-time
   - [ ] Only matching patients display
   - [ ] Search works with phone numbers
   - [ ] Clear search shows all patients

**Expected Result:** Search filters patients correctly

---

### Test 6: Filter Functionality

**Objective:** Verify category filter works on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Click filter dropdown
4. Select a category
5. Verify:
   - [ ] Dropdown opens on mobile
   - [ ] Only selected category patients display
   - [ ] "Toutes les catégories" option works
   - [ ] Filter persists while scrolling
   - [ ] Filter works with search

**Expected Result:** Filter displays correct patients

---

### Test 7: Card Actions

**Objective:** Verify action buttons work on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Test each action:

**Payment Button:**
- [ ] Click payment button
- [ ] Payment modal opens
- [ ] Modal takes full screen
- [ ] Can enter payment amount
- [ ] Can save payment
- [ ] Modal closes after save

**History Button:**
- [ ] Click history button
- [ ] Treatment history modal opens
- [ ] Modal takes full screen
- [ ] Can view treatment steps
- [ ] Can validate/reverse steps
- [ ] Modal closes properly

**Edit Button:**
- [ ] Click edit button
- [ ] Edit patient modal opens
- [ ] Modal takes full screen
- [ ] Can edit patient info
- [ ] Can save changes
- [ ] Modal closes after save

**Delete Button:**
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Can confirm or cancel
- [ ] Patient deleted on confirm
- [ ] Card removed from list

**Expected Result:** All actions work correctly on mobile

---

### Test 8: Patient Card Navigation

**Objective:** Verify clicking patient name navigates to detail page

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Click patient name in card
4. Verify:
   - [ ] Navigates to patient detail page
   - [ ] Patient ID in URL is correct
   - [ ] Patient details load correctly
   - [ ] Back button works

**Expected Result:** Navigation works correctly

---

### Test 9: Responsive Layout Transitions

**Objective:** Verify layout changes at breakpoint

**Steps:**
1. Open DevTools with responsive mode
2. Start at 375px (mobile)
3. Verify:
   - [ ] Cards displayed
   - [ ] FAB visible
   - [ ] Sticky header active
   - [ ] Full-width search

4. Resize to 768px (breakpoint)
5. Verify:
   - [ ] Layout transitions smoothly
   - [ ] No layout shift or jank
   - [ ] Table appears
   - [ ] FAB disappears
   - [ ] Sticky header deactivates

6. Resize to 1024px (desktop)
7. Verify:
   - [ ] Table fully visible
   - [ ] All columns visible
   - [ ] No horizontal scroll
   - [ ] Desktop layout correct

**Expected Result:** Smooth transitions at breakpoints

---

### Test 10: No Horizontal Scrolling

**Objective:** Verify no horizontal overflow on any device

**Steps:**
1. Test on multiple viewport widths:
   - [ ] 320px (small phone)
   - [ ] 375px (iPhone)
   - [ ] 480px (large phone)
   - [ ] 768px (tablet)
   - [ ] 1024px (desktop)

2. For each width:
   - [ ] No horizontal scrollbar
   - [ ] All content visible
   - [ ] Text wraps properly
   - [ ] Cards fit screen width

**Expected Result:** No horizontal scrolling on any device

---

### Test 11: Typography Readability

**Objective:** Verify text is readable on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Patient names readable (text-base)
   - [ ] Labels readable (text-xs)
   - [ ] Values readable (text-sm)
   - [ ] No text overflow
   - [ ] Line height appropriate
   - [ ] Color contrast sufficient

**Expected Result:** All text readable without zooming

---

### Test 12: Modal Full-Screen on Mobile

**Objective:** Verify modals take full screen on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Open "Nouveau Patient" modal
3. Verify:
   - [ ] Modal takes full screen
   - [ ] No content hidden
   - [ ] Can scroll form if needed
   - [ ] Close button accessible
   - [ ] Submit button accessible

4. Repeat for:
   - [ ] Edit Patient modal
   - [ ] Payment modal
   - [ ] Treatment History modal

**Expected Result:** All modals full-screen on mobile

---

### Test 13: Performance on Mobile

**Objective:** Verify performance on mobile devices

**Steps:**
1. Open Chrome DevTools
2. Go to Performance tab
3. Set throttling to "Slow 4G"
4. Navigate to `/patients`
5. Verify:
   - [ ] Page loads within 3 seconds
   - [ ] No layout shift (CLS < 0.1)
   - [ ] Smooth scrolling
   - [ ] No jank or stuttering
   - [ ] Interactions responsive

**Expected Result:** Good performance on slow networks

---

### Test 14: Accessibility on Mobile

**Objective:** Verify accessibility features

**Steps:**
1. Set viewport to mobile (< 768px)
2. Test keyboard navigation:
   - [ ] Tab through all buttons
   - [ ] Enter activates buttons
   - [ ] Escape closes modals
   - [ ] Focus visible on all elements

3. Test screen reader (if available):
   - [ ] Page title announced
   - [ ] Patient names announced
   - [ ] Button labels announced
   - [ ] Form labels announced

4. Verify:
   - [ ] Color contrast sufficient
   - [ ] Touch targets ≥ 44px
   - [ ] No color-only information

**Expected Result:** Accessible on mobile

---

### Test 15: Cross-Browser Testing

**Objective:** Verify compatibility across browsers

**Test on:**
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile (Android)
- [ ] Edge Mobile (Android)

**For each browser verify:**
- [ ] Cards display correctly
- [ ] FAB visible and functional
- [ ] Sticky header works
- [ ] All buttons functional
- [ ] Modals work
- [ ] No console errors

**Expected Result:** Works on all major mobile browsers

---

## Bug Report Template

```
**Title:** [Brief description]

**Environment:**
- Device: [iPhone 12, Pixel 5, etc.]
- Browser: [Chrome, Safari, Firefox]
- OS: [iOS 15, Android 12]
- Viewport: [375×667, etc.]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshots:**
[Attach screenshots if possible]

**Console Errors:**
[Any JavaScript errors]
```

## Performance Metrics

### Target Metrics

| Metric | Target | Tool |
|--------|--------|------|
| FCP | < 1.8s | Lighthouse |
| LCP | < 2.5s | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| INP | < 200ms | Lighthouse |
| Mobile Score | 90+ | Lighthouse |

### How to Measure

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Mobile"
4. Click "Analyze page load"
5. Review metrics

## Regression Testing

After any changes, verify:
- [ ] Cards still display on mobile
- [ ] FAB still visible and functional
- [ ] Sticky header still works
- [ ] All buttons still functional
- [ ] No new console errors
- [ ] Performance metrics maintained

## Sign-Off Checklist

- [ ] All test cases passed
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Ready for production

## Notes

- Test on real devices when possible
- Test with slow network (Slow 4G)
- Test with various screen sizes
- Test with different orientations
- Test with different zoom levels
- Test with different font sizes
