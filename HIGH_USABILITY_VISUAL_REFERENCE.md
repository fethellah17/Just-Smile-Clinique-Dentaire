# High-Usability Mobile Redesign - Visual Reference

## Patient Card Layout

### Mobile (< 768px)

```
┌─────────────────────────────────────────────────┐
│ Ahmed Benali              [Orthodontie]         │ ← 18px bold name
│                                                 │   12px badge
├─────────────────────────────────────────────────┤
│ TYPE DE SOIN                                    │ ← 12px uppercase label
│ Détartrage                                      │ ← 16px semibold value
│                                                 │
│ ÉTAPE ACTUELLE                                  │ ← 12px uppercase label
│ Nettoyage                                       │ ← 16px semibold value
├─────────────────────────────────────────────────┤
│ ┌──────────────────┐ ┌──────────────────┐      │
│ │ MONTANT TOTAL    │ │ MONTANT PAYÉ     │      │ ← Highlighted boxes
│ │ 5,000 DA         │ │ 3,000 DA         │      │ ← 18px bold
│ └──────────────────┘ └──────────────────┘      │
├─────────────────────────────────────────────────┤
│ ┌──────────────────┐ ┌──────────────────┐      │
│ │ ÂGE              │ │ TÉLÉPHONE        │      │ ← 12px labels
│ │ 28 ans           │ │ 0612345678       │      │ ← 16px values
│ └──────────────────┘ └──────────────────┘      │
├─────────────────────────────────────────────────┤
│ ┌──────────────────┐ ┌──────────────────┐      │
│ │ 💰 Paiement      │ │ 📋 Historique    │      │ ← 48px height
│ └──────────────────┘ └──────────────────┘      │ ← 2x2 grid
│ ┌──────────────────┐ ┌──────────────────┐      │
│ │ ✏️ Modifier      │ │ 🗑️ Supprimer     │      │
│ └──────────────────┘ └──────────────────┘      │
└─────────────────────────────────────────────────┘

Padding: 24px (p-6)
Section Gap: 20px (space-y-5)
Button Height: 48px (h-12)
Button Gap: 12px (gap-3)
```

### Desktop (≥ 768px)

```
┌─────────────────────────────────────────────────┐
│ Ahmed Benali          [Orthodontie]             │ ← 16px bold name
│                                                 │   12px badge
├─────────────────────────────────────────────────┤
│ TYPE DE SOIN: Détartrage                        │ ← 14px
│ ÉTAPE ACTUELLE: Nettoyage                       │
├─────────────────────────────────────────────────┤
│ Montant Total: 5,000 DA | Montant Payé: 3,000 DA
├─────────────────────────────────────────────────┤
│ [💰] [📋] [✏️] [🗑️]                             │ ← 40px height
└─────────────────────────────────────────────────┘

Padding: 16px (p-4)
Section Gap: 12px (space-y-3)
Button Height: 40px (h-10)
```

## Search & Filter Bar

### Mobile (< 768px)

```
┌─────────────────────────────────────────────────┐
│ 🔍 Rechercher par nom ou téléphone...           │ ← 48px height
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ 🔽 Filtrer par catégorie                        │ ← 48px height
└─────────────────────────────────────────────────┘

Height: 48px (h-12)
Width: 100%
Icon Size: 20px (h-5 w-5)
Padding: pl-12 (48px for icon)
Border: 2px solid
```

### Desktop (≥ 768px)

```
┌──────────────────────────────┐ ┌──────────────────┐
│ 🔍 Rechercher...             │ │ 🔽 Filtrer...    │
└──────────────────────────────┘ └──────────────────┘

Height: 40px (h-10)
Search Width: max-w-sm
Filter Width: w-48
```

## Modal Layout

### Mobile (< 768px) - Full Screen

```
┌─────────────────────────────────────────────────┐
│ Suivi des Paiements - Ahmed Benali              │ ← Sticky header
├─────────────────────────────────────────────────┤
│                                                 │
│ [Payment Summary Cards]                         │
│                                                 │
│ [Payment History]                               │
│                                                 │
│ [New Payment Section]                           │
│                                                 │
│ (scrollable content)                            │
│                                                 │
├─────────────────────────────────────────────────┤
│ [Annuler]              [Confirmer]              │ ← Sticky footer
│ (48px height buttons)                           │
└─────────────────────────────────────────────────┘

Width: 100% (w-full)
Height: 100% (inset-0)
Position: Fixed
Border Radius: None (rounded-none)
Header: Sticky top-0
Footer: Sticky bottom-0
```

### Desktop (≥ 768px) - Centered

```
                    ┌─────────────────────────────┐
                    │ Suivi des Paiements         │
                    ├─────────────────────────────┤
                    │ [Content]                   │
                    │                             │
                    │ [Buttons]                   │
                    └─────────────────────────────┘

Width: max-w-2xl
Height: max-h-[90vh]
Position: Centered (top-1/2 left-1/2)
Border Radius: lg (8px)
```

## Typography Scale

### Mobile (< 768px)

```
Patient Name:        18px (text-lg) font-bold
Primary Info:        16px (text-base) font-semibold
Labels:              12px (text-xs) font-semibold uppercase
Financial:           18px (text-lg) font-bold
Secondary:           14px (text-sm) font-medium
Tertiary:            12px (text-xs) font-medium
```

### Desktop (≥ 768px)

```
Patient Name:        16px (text-base) font-bold
Primary Info:        14px (text-sm) font-semibold
Labels:              12px (text-xs) font-semibold
Financial:           14px (text-sm) font-bold
Secondary:           12px (text-xs) font-medium
Tertiary:            11px (text-xs) font-medium
```

## Color Scheme

### Action Buttons

```
Payment:    Green (bg-green-600 hover:bg-green-700)
History:    Red (bg-[#800020] hover:bg-[#600018])
Edit:       Blue (bg-blue-600 hover:bg-blue-700)
Delete:     Red (bg-red-600 hover:bg-red-700)
```

### Financial Info

```
Montant Total:  Dark background (bg-slate-50)
                Dark text (text-slate-700)

Montant Payé:   Green background (bg-green-50)
                Green text (text-green-700)
```

### Card Styling

```
Background:     White (bg-white)
Border:         1px solid border-border
Shadow:         Subtle (shadow-sm)
Hover Shadow:   Medium (hover:shadow-md)
```

## Spacing Reference

### Card Spacing

```
Card Padding:           24px (p-6)
Section Gap:            20px (space-y-5)
Row Gap:                16px (gap-4)
Button Gap:             12px (gap-3)
Header Padding:         16px (py-4)
```

### Button Sizing

```
Mobile:
  Height:               48px (h-12)
  Icon Size:            20px (h-5 w-5)
  Font Size:            12px (text-xs)
  Padding:              Flex-1 (equal width)

Desktop:
  Height:               40px (h-10)
  Icon Size:            20px (h-5 w-5)
  Font Size:            12px (text-xs)
  Padding:              Auto
```

### Input Sizing

```
Mobile:
  Height:               48px (h-12)
  Font Size:            16px (text-base)
  Padding Left:         48px (pl-12)
  Border:               2px solid

Desktop:
  Height:               40px (h-10)
  Font Size:            14px (text-sm)
  Padding Left:         40px (pl-10)
  Border:               1px solid
```

## Touch Target Sizes

```
Minimum WCAG AA:        44px × 44px
Mobile Implementation:  48px × 48px (exceeds minimum)
Desktop Implementation: 40px × 40px (standard)

All buttons, inputs, and interactive elements meet or exceed
the 44px minimum touch target size on mobile devices.
```

## Responsive Breakpoints

```
Mobile:     < 768px (md breakpoint)
  - Large typography
  - Generous padding
  - Large buttons (48px)
  - Full-width inputs
  - Full-screen modals
  - Stacked layout

Desktop:    ≥ 768px (md breakpoint)
  - Standard typography
  - Standard padding
  - Standard buttons (40px)
  - Constrained widths
  - Centered modals
  - Horizontal layout
```

## Before & After Comparison

### Patient Card

**BEFORE:**
```
┌─────────────────────────────────┐
│ Name          [Badge]           │ ← 14px
├─────────────────────────────────┤
│ Type: Value                     │ ← Cramped
│ Step: Value                     │
├─────────────────────────────────┤
│ [💰] [📋] [✏️] [🗑️]             │ ← 32px buttons
└─────────────────────────────────┘
```

**AFTER:**
```
┌─────────────────────────────────┐
│ Name              [Badge]       │ ← 18px
│                                 │
├─────────────────────────────────┤
│ Type: Value                     │ ← Generous spacing
│ Step: Value                     │
├─────────────────────────────────┤
│ [💰 Paiement] [📋 Historique]   │ ← 48px buttons
│ [✏️ Modifier] [🗑️ Supprimer]    │
└─────────────────────────────────┘
```

### Search Bar

**BEFORE:**
```
[🔍 Search...] (32px height)
```

**AFTER:**
```
[🔍 Search...                    ] (48px height)
```

### Modal

**BEFORE:**
```
┌─────────────────────────────────┐
│ Title                           │
├─────────────────────────────────┤
│ Content...                      │
│ [Small buttons]                 │
└─────────────────────────────────┘
```

**AFTER:**
```
┌─────────────────────────────────┐
│ Title                           │ ← Sticky
├─────────────────────────────────┤
│ Content...                      │
│ (scrollable)                    │
│                                 │
│ [Large buttons]                 │ ← Sticky
│ (48px height)                   │
└─────────────────────────────────┘
```

## Key Improvements

1. **Typography:** 18px patient names (vs 14px before)
2. **Spacing:** 24px card padding (vs 16px before)
3. **Buttons:** 48px height (vs 32px before)
4. **Layout:** 2x2 grid for actions (vs 4 in a row)
5. **Modals:** Full-screen on mobile (vs centered)
6. **Financial:** Highlighted boxes with colors
7. **Inputs:** 48px height for easy interaction
8. **Headers:** Sticky for easy access

## Accessibility Metrics

- ✅ Touch targets: 48px (exceeds 44px minimum)
- ✅ Typography: Large and readable
- ✅ Color contrast: WCAG AA compliant
- ✅ Spacing: Generous and clear
- ✅ Hierarchy: Clear visual structure
- ✅ Keyboard: Full navigation support
- ✅ Screen reader: Semantic HTML

---

**Visual Reference Version:** 1.0
**Last Updated:** April 18, 2026
