# High-Usability Mobile Redesign - Testing Guide

## Pre-Testing Checklist

- [ ] All code changes committed
- [ ] No console errors or warnings
- [ ] Application builds successfully
- [ ] All dependencies installed
- [ ] Browser DevTools available
- [ ] Multiple devices available for testing

## Test Cases

### Test 1: Patient Card Typography

**Objective:** Verify typography is large and readable

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Patient names are 18px (text-lg)
   - [ ] Patient names are bold (font-bold)
   - [ ] Type de Soin is 16px (text-base)
   - [ ] Étape Actuelle is 16px (text-base)
   - [ ] Labels are 12px uppercase
   - [ ] Financial amounts are 18px bold
   - [ ] All text is readable without zooming

**Expected Result:** All typography is large and clearly readable

---

### Test 2: Card Padding & Spacing

**Objective:** Verify cards have generous spacing

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Card padding is 24px (p-6)
   - [ ] Section gaps are 20px (space-y-5)
   - [ ] Elements don't feel "squashed"
   - [ ] Breathing room between sections
   - [ ] Clear visual separation

**Expected Result:** Cards have generous, professional spacing

---

### Test 3: Card Visual Appearance

**Objective:** Verify cards look clean and elevated

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Cards have white background (bg-white)
   - [ ] Cards have subtle shadow (shadow-sm)
   - [ ] Shadow increases on hover (hover:shadow-md)
   - [ ] Cards appear elevated from background
   - [ ] Border is subtle (1px solid)
   - [ ] Category badge is large and readable

**Expected Result:** Cards look clean, elevated, and professional

---

### Test 4: Financial Information Display

**Objective:** Verify financial info stands out

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Montant Total in highlighted box (bg-slate-50)
   - [ ] Montant Payé in green box (bg-green-50)
   - [ ] Both amounts are 18px bold
   - [ ] High contrast with background
   - [ ] Easy to scan and read
   - [ ] Green color for paid amount

**Expected Result:** Financial info is prominent and easy to read

---

### Test 5: Action Button Layout

**Objective:** Verify 2x2 grid layout for buttons

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Buttons arranged in 2x2 grid
   - [ ] Each button is 48px height (h-12)
   - [ ] Buttons have icons and labels
   - [ ] Icons are 20px (h-5 w-5)
   - [ ] Labels are 12px (text-xs)
   - [ ] Buttons have distinct colors
   - [ ] Gap between buttons is 12px (gap-3)

**Expected Result:** Buttons are large, clearly labeled, and easy to tap

---

### Test 6: Action Button Touch Targets

**Objective:** Verify buttons meet touch target requirements

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Measure button sizes:
   - [ ] Payment button: 48px height
   - [ ] History button: 48px height
   - [ ] Edit button: 48px height
   - [ ] Delete button: 48px height
   - [ ] All buttons: Full width in grid
   - [ ] Spacing between buttons: 12px

**Expected Result:** All buttons meet 48px minimum (exceeds 44px WCAG AA)

---

### Test 7: Button Colors & Styling

**Objective:** Verify button colors are distinct and accessible

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Payment button: Green (bg-green-600)
   - [ ] History button: Red (bg-[#800020])
   - [ ] Edit button: Blue (bg-blue-600)
   - [ ] Delete button: Red (bg-red-600)
   - [ ] Hover colors are darker
   - [ ] Color contrast is sufficient
   - [ ] Icons are white on colored background

**Expected Result:** Buttons are color-coded and accessible

---

### Test 8: Search Bar Sizing

**Objective:** Verify search bar is large and easy to use

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Search bar height is 48px (h-12)
   - [ ] Search bar width is 100%
   - [ ] Icon is 20px (h-5 w-5)
   - [ ] Padding left is 48px (pl-12)
   - [ ] Border is 2px solid
   - [ ] Font size is 16px (text-base)
   - [ ] Easy to tap and type

**Expected Result:** Search bar is large and easy to use

---

### Test 9: Filter Dropdown Sizing

**Objective:** Verify filter dropdown is large and easy to use

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Filter height is 48px (h-12)
   - [ ] Filter width is 100%
   - [ ] Border is 2px solid
   - [ ] Font size is 16px (text-base)
   - [ ] Dropdown opens on tap
   - [ ] Options are readable
   - [ ] Easy to select category

**Expected Result:** Filter dropdown is large and easy to use

---

### Test 10: Header Spacing

**Objective:** Verify breathing room between header and cards

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Gap between header and first card is 16px (gap-4)
   - [ ] Visual separation is clear
   - [ ] Header doesn't feel cramped
   - [ ] Cards don't feel cramped
   - [ ] Professional spacing

**Expected Result:** Header and cards have proper spacing

---

### Test 11: Modal Full-Screen on Mobile

**Objective:** Verify modals are full-screen on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Click "Paiement" button
4. Verify:
   - [ ] Modal takes full screen width
   - [ ] Modal takes full screen height
   - [ ] No rounded corners (rounded-none)
   - [ ] Header is sticky at top
   - [ ] Content is scrollable
   - [ ] Buttons are sticky at bottom
   - [ ] Easy to interact with

**Expected Result:** Modal is full-screen and easy to use

---

### Test 12: Modal Header Styling

**Objective:** Verify modal header is sticky and readable

**Steps:**
1. Set viewport to mobile (< 768px)
2. Open Payment modal
3. Scroll down
4. Verify:
   - [ ] Header stays at top (sticky top-0)
   - [ ] Header has background color
   - [ ] Title is 18px (text-lg)
   - [ ] Subtitle is readable
   - [ ] Header doesn't overlap content

**Expected Result:** Modal header is sticky and readable

---

### Test 13: Modal Button Sizing

**Objective:** Verify modal buttons are large and easy to tap

**Steps:**
1. Set viewport to mobile (< 768px)
2. Open Payment modal
3. Scroll to bottom
4. Verify:
   - [ ] Buttons are 48px height (h-12)
   - [ ] Buttons are sticky at bottom
   - [ ] Font size is 16px (text-base)
   - [ ] Font weight is semibold
   - [ ] Buttons are full width or flex-1
   - [ ] Easy to tap with thumb

**Expected Result:** Modal buttons are large and easy to tap

---

### Test 14: Modal Input Sizing

**Objective:** Verify modal inputs are large and easy to use

**Steps:**
1. Set viewport to mobile (< 768px)
2. Open Payment modal
3. Verify:
   - [ ] Input height is 48px (h-12)
   - [ ] Input font size is 16px (text-base)
   - [ ] Input padding is adequate
   - [ ] Input border is 2px solid
   - [ ] Easy to tap and type
   - [ ] Keyboard appears on tap

**Expected Result:** Modal inputs are large and easy to use

---

### Test 15: Treatment History Modal

**Objective:** Verify treatment history modal is full-screen and usable

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Click "Historique" button
4. Verify:
   - [ ] Modal is full-screen
   - [ ] Header is sticky
   - [ ] Step indicators are large (w-8 h-8)
   - [ ] Step names are 16px (text-base)
   - [ ] Buttons are 48px height (h-10 on mobile)
   - [ ] Footer buttons are sticky
   - [ ] Easy to interact with

**Expected Result:** Treatment history modal is full-screen and usable

---

### Test 16: Responsive Transitions

**Objective:** Verify layout changes smoothly at breakpoint

**Steps:**
1. Open DevTools with responsive mode
2. Start at 375px (mobile)
3. Verify:
   - [ ] Cards displayed with large typography
   - [ ] Buttons are 48px height
   - [ ] Search bar is 48px height
   - [ ] Modals are full-screen

4. Resize to 768px (breakpoint)
5. Verify:
   - [ ] Layout transitions smoothly
   - [ ] No layout shift or jank
   - [ ] Typography adjusts
   - [ ] Buttons become 40px height
   - [ ] Search bar becomes 40px height

6. Resize to 1024px (desktop)
7. Verify:
   - [ ] Desktop layout correct
   - [ ] All elements properly sized
   - [ ] No horizontal scroll

**Expected Result:** Smooth transitions at breakpoints

---

### Test 17: Typography Readability

**Objective:** Verify all text is readable on mobile

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Verify:
   - [ ] Patient names readable (18px)
   - [ ] Primary info readable (16px)
   - [ ] Labels readable (12px)
   - [ ] Financial info readable (18px)
   - [ ] No text overflow
   - [ ] Line height appropriate
   - [ ] Color contrast sufficient
   - [ ] No zooming required

**Expected Result:** All text is readable without zooming

---

### Test 18: Color Contrast

**Objective:** Verify color contrast meets WCAG AA

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Check contrast ratios:
   - [ ] Patient names: Sufficient contrast
   - [ ] Primary info: Sufficient contrast
   - [ ] Financial info: Sufficient contrast
   - [ ] Button text: Sufficient contrast
   - [ ] Labels: Sufficient contrast

**Expected Result:** All text meets WCAG AA contrast requirements

---

### Test 19: Touch Interaction

**Objective:** Verify all interactive elements are easy to tap

**Steps:**
1. Set viewport to mobile (< 768px)
2. Navigate to `/patients`
3. Test interactions:
   - [ ] Can tap patient name easily
   - [ ] Can tap action buttons easily
   - [ ] Can tap search bar easily
   - [ ] Can tap filter dropdown easily
   - [ ] No accidental taps on nearby elements
   - [ ] Feedback is immediate

**Expected Result:** All interactive elements are easy to tap

---

### Test 20: Cross-Device Testing

**Objective:** Verify design works on various devices

**Test on:**
- [ ] iPhone 12 Pro (390×844)
- [ ] iPhone SE (375×667)
- [ ] Pixel 5 (393×851)
- [ ] Galaxy S21 (360×800)
- [ ] iPad (768×1024)
- [ ] iPad Pro (1024×1366)

**For each device verify:**
- [ ] Typography is readable
- [ ] Buttons are easy to tap
- [ ] No horizontal scrolling
- [ ] Layout is appropriate
- [ ] Modals are full-screen on mobile
- [ ] All functionality works

**Expected Result:** Design works well on all devices

---

## Performance Testing

### Metrics to Monitor

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

---

## Accessibility Testing

### Keyboard Navigation

- [ ] Tab through all buttons
- [ ] Enter activates buttons
- [ ] Escape closes modals
- [ ] Focus visible on all elements
- [ ] Logical tab order

### Screen Reader Testing

- [ ] Page title announced
- [ ] Patient names announced
- [ ] Button labels announced
- [ ] Form labels announced
- [ ] Error messages announced

### Visual Testing

- [ ] Color contrast sufficient
- [ ] Touch targets ≥ 48px
- [ ] No color-only information
- [ ] Text is readable
- [ ] Icons have labels

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

---

## Sign-Off Checklist

- [ ] All test cases passed
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] Accessibility verified
- [ ] Cross-device tested
- [ ] Typography verified
- [ ] Spacing verified
- [ ] Button sizing verified
- [ ] Modal sizing verified
- [ ] Ready for production

---

## Notes

- Test on real devices when possible
- Test with slow network (Slow 4G)
- Test with various screen sizes
- Test with different orientations
- Test with different zoom levels
- Test with different font sizes
- Verify all interactions work smoothly
- Check for any layout shifts or jank
