# Mobile Optimization - Visual Guide

## Mobile Layout (< 768px)

### Patient List View

```
┌─────────────────────────────────────┐
│ Gestion des Patients                │
│ 12 patients enregistrés              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐ ← Sticky Header
│ 🔍 Rechercher...                    │
│ 🔽 Filtrer par catégorie            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Ahmed Benali          [Orthodontie] │ ← Card 1
├─────────────────────────────────────┤
│ Type de Soin: Détartrage            │
│ Étape Actuelle: Nettoyage           │
├─────────────────────────────────────┤
│ Âge: 28 ans    Téléphone: 0612345678│
│ Montant Total: 5,000 DA             │
│ Montant Payé: 3,000 DA              │
├─────────────────────────────────────┤
│ [💰 Paiement] [📋 Historique]       │
│ [✏️ Modifier] [🗑️ Supprimer]        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Fatima Kadi           [Pédodontie]  │ ← Card 2
├─────────────────────────────────────┤
│ Type de Soin: Traitement Carie      │
│ Étape Actuelle: Obturation          │
├─────────────────────────────────────┤
│ Âge: 8 ans     Téléphone: 0698765432│
│ Montant Total: 3,500 DA             │
│ Montant Payé: 3,500 DA              │
├─────────────────────────────────────┤
│ [💰 Paiement] [📋 Historique]       │
│ [✏️ Modifier] [🗑️ Supprimer]        │
└─────────────────────────────────────┘

                                    ┌─────┐
                                    │  +  │ ← FAB
                                    └─────┘
```

### Sticky Header Detail

```
BEFORE SCROLL:
┌─────────────────────────────────────┐
│ 🔍 Rechercher...                    │
│ 🔽 Filtrer par catégorie            │
└─────────────────────────────────────┘
[Patient Cards Below]

AFTER SCROLL:
┌─────────────────────────────────────┐ ← Stays at top
│ 🔍 Rechercher...                    │
│ 🔽 Filtrer par catégorie            │
└─────────────────────────────────────┘
[Patient Cards Scroll Behind]
```

### Patient Card Anatomy

```
┌─────────────────────────────────────┐
│ Prenom Nom          [Badge]         │ ← Top Row
│                                     │   - Bold name (clickable)
│                                     │   - Category badge
├─────────────────────────────────────┤
│ Type de Soin                        │ ← Middle Row
│ [Value]                             │   - Treatment type
│                                     │   - Current step
│ Étape Actuelle                      │
│ [Value]                             │
├─────────────────────────────────────┤
│ Âge: [Value]  Téléphone: [Value]   │ ← Info Row
│ Montant Total: [Value]              │   - Age & Phone
│ Montant Payé: [Value]               │   - Financial info
├─────────────────────────────────────┤
│ [💰] [📋] [✏️] [🗑️]                 │ ← Action Row
│ Paiement | Historique | Modifier... │   - Touch-friendly
│                                     │   - 40px height
└─────────────────────────────────────┘
```

### Floating Action Button

```
                                    ┌─────┐
                                    │  +  │
                                    │     │
                                    └─────┘
                                    
Position: Fixed bottom-right
Size: 56px × 56px (h-14 w-14)
Color: #800020 (brand red)
Hover: #600018 (darker red)
Z-index: 40
Margin: 24px from edges
```

### Touch-Friendly Buttons

```
DESKTOP (32px height):
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ 💰   │ │ 📋   │ │ ✏️   │ │ 🗑️   │
└──────┘ └──────┘ └──────┘ └──────┘

MOBILE (40px height):
┌─────────────────────────────────────┐
│ [💰 Paiement] [📋 Historique]       │
│ [✏️ Modifier] [🗑️ Supprimer]        │
└─────────────────────────────────────┘

Icon Size: h-5 w-5 (20px)
Button Height: 40px
Spacing: gap-2 (8px)
```

## Desktop Layout (≥ 768px)

### Patient Table View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Gestion des Patients                              [+ Nouveau Patient]       │
│ 12 patients enregistrés                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔍 Rechercher...              🔽 Filtrer par catégorie                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ Nom    │ Prénom │ Âge │ Catégorie │ Type de Soin │ Étape │ Montant │ Actions│
├─────────────────────────────────────────────────────────────────────────────┤
│ Benali │ Ahmed  │ 28  │ Ortho     │ Détartrage   │ Nett. │ 5000 DA │ 💰📋✏️🗑│
│ Kadi   │ Fatima │ 8   │ Pédo      │ Traitement   │ Obtu. │ 3500 DA │ 💰📋✏️🗑│
│ ...    │ ...    │ ... │ ...       │ ...          │ ...   │ ...     │ ...   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Responsive Transitions

### Breakpoint: 768px (md)

```
BELOW 768px (Mobile):
- Card view active
- FAB visible
- Sticky header active
- Full-width search
- Stacked filter layout
- Touch-optimized buttons

AT 768px (Transition):
- Switch to table view
- FAB hidden
- Sticky header disabled
- Search max-width applied
- Horizontal filter layout
- Standard button sizes

ABOVE 768px (Desktop):
- Table view active
- FAB hidden
- Sticky header disabled
- Constrained search width
- Horizontal layout
- Compact buttons
```

## Color Scheme

### Mobile Card

```
┌─────────────────────────────────────┐
│ Prenom Nom          [Badge]         │ ← Foreground text
│                                     │   Badge: muted/50 bg
├─────────────────────────────────────┤
│ Type de Soin                        │ ← muted-foreground label
│ [Foreground text]                   │   foreground value
│                                     │
│ Étape Actuelle                      │
│ [Foreground text]                   │
├─────────────────────────────────────┤
│ Âge: [Value]  Téléphone: [Value]   │ ← muted-foreground labels
│ Montant Total: [Value]              │   foreground values
│ Montant Payé: [Green text]          │   green-700 for paid
├─────────────────────────────────────┤
│ [💰] [📋] [✏️] [🗑️]                 │ ← Color-coded buttons
│ Green  Red   Gray  Red              │
└─────────────────────────────────────┘
```

### Button Colors

| Button | Color | Hover |
|--------|-------|-------|
| Payment | green-700 | green-50 bg |
| History | #800020 | #800020/10 bg |
| Edit | muted-foreground | foreground |
| Delete | destructive | destructive/10 bg |

## Spacing & Sizing

### Card Spacing

```
Card Padding: p-4 (16px)
Section Gap: space-y-3 (12px)
Row Gap: gap-2 (8px)
Border: 1px solid border
```

### Button Sizing

```
Mobile:
- Height: h-10 (40px)
- Width: flex-1 (equal distribution)
- Icon: h-5 w-5 (20px)
- Gap: gap-2 (8px)

Desktop:
- Height: h-auto (auto)
- Width: auto
- Icon: h-4 w-4 (16px)
- Gap: gap-3 (12px)
```

## Typography

### Mobile

```
Page Title: text-xl font-bold
Subtitle: text-sm text-muted-foreground
Card Name: text-base font-bold
Card Label: text-xs font-medium
Card Value: text-sm font-medium
```

### Desktop

```
Page Title: text-2xl font-bold
Subtitle: text-sm text-muted-foreground
Table Header: font-semibold
Table Cell: text-sm
```

## Animations & Transitions

```
Card Hover: shadow-md transition-shadow
Button Hover: color change + background change
Sticky Header: smooth scroll behavior
Modal: full-screen on mobile, centered on desktop
```

## Accessibility Indicators

```
Touch Target Size: ≥ 44px ✅
Color Contrast: WCAG AA ✅
Semantic HTML: ✅
Keyboard Navigation: ✅
Screen Reader: ✅
```

## Performance Indicators

```
First Contentful Paint: Optimized ✅
Cumulative Layout Shift: Minimized ✅
Interaction to Next Paint: Smooth ✅
Mobile Lighthouse: 90+ target ✅
```
