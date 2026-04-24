# Payment System - Quick Reference

## Key Components

### 1. Payment Modal (`PaymentModal.tsx`)
- Opens when clicking Wallet icon in patient row
- Shows payment summary (Total, Paid, Remaining)
- Displays locked payment history
- Allows adding new payments with two-step verification

### 2. Payment Data Structure
```typescript
// In Patient object:
montantTotal: number              // Total treatment cost
montantPaye: number               // Total paid so far
paymentHistory: PaymentRecord[]   // Immutable audit log

// PaymentRecord:
{
  id: string                      // Unique ID
  amount: number                  // Payment amount
  date: string                    // ISO timestamp
  locked: true                    // Always locked
}
```

### 3. Table Columns
- **Montant Total:** Shows total treatment cost
- **Montant Payé:** Shows amount paid (green text)
- **Paiement Icon:** Wallet button to open payment modal

## User Workflows

### Workflow 1: Create Patient with Initial Payment
```
1. Click "Nouveau Patient"
2. Fill form (nom, prenom, age, telephone, etc.)
3. Enter "Montant Total" (e.g., 45000 DA)
4. Enter "Montant Payé" (e.g., 10000 DA)
5. Submit
→ Patient created with payment history initialized
```

### Workflow 2: Record New Payment
```
1. Click Wallet icon in patient row
2. Payment modal opens
3. See: Total (45000), Paid (10000), Remaining (35000)
4. Enter new payment (e.g., 15000)
5. See real-time calculation: Remaining becomes 20000
6. Click "Vérifier le Paiement"
7. Review confirmation message
8. Click "Confirmer le Paiement"
→ Payment locked and added to history
```

### Workflow 3: View Payment History
```
1. Click Wallet icon in patient row
2. Scroll through "Historique des Paiements"
3. Each payment shows:
   - Amount (green text)
   - Date/Time (formatted)
   - Lock badge (immutable indicator)
→ Cannot edit or delete locked payments
```

## Security Features

| Feature | Implementation |
|---------|-----------------|
| **Immutable Records** | `locked: true` on all saved payments |
| **Two-Step Verification** | Verify → Confirm flow |
| **Audit Trail** | ISO timestamp on every payment |
| **Overpayment Prevention** | Validation prevents amount > remaining |
| **Visual Indicators** | Lock icon, green/red colors |

## Color Coding

| Element | Color | Meaning |
|---------|-------|---------|
| Montant Payé | Green (#22c55e) | Completed payment |
| Reste à Payer | Red (#dc2626) | Outstanding balance |
| Lock Icon | Muted | Payment is immutable |
| Wallet Button | Green | Payment management |

## API Reference

### Data Context Methods
```typescript
// Add payment to patient
addPayment(patientId: string, payment: Omit<PaymentRecord, "id" | "locked">)
→ Returns: PaymentRecord (with id and locked: true)

// Update patient (includes payment fields)
updatePatient(id: string, updates: Partial<Patient>)
```

### Component Props
```typescript
// PaymentModal
interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patient: Patient | null
  onPaymentSaved: (paymentRecord: PaymentRecord) => void
}
```

## Common Tasks

### Task: Add Payment to Patient
```typescript
const handlePaymentSaved = (patientId: string, paymentRecord: PaymentRecord) => {
  const patient = patients.find(p => p.id === patientId);
  if (patient) {
    const newMontantPaye = (patient.montantPaye || 0) + paymentRecord.amount;
    updatePatient(patientId, {
      montantPaye: newMontantPaye,
      paymentHistory: [...(patient.paymentHistory || []), paymentRecord],
    });
  }
};
```

### Task: Calculate Remaining Balance
```typescript
const resteAPayer = patient.montantTotal - patient.montantPaye;
```

### Task: Get Payment History for Patient
```typescript
const paymentHistory = patient.paymentHistory || [];
const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
```

## Validation Rules

1. **Payment Amount:**
   - Must be > 0
   - Cannot exceed remaining balance
   - Must be a valid number

2. **Patient Data:**
   - montantTotal must be set
   - montantPaye cannot exceed montantTotal
   - paymentHistory must be array

3. **Payment Record:**
   - Always locked when created
   - Cannot be modified after creation
   - Must have unique ID

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Payment not saving | Check if amount > 0 and ≤ remaining |
| Modal not opening | Verify patient has montantTotal set |
| History not showing | Check paymentHistory array exists |
| Lock icon missing | Verify locked: true on payment record |

## Files Overview

| File | Purpose |
|------|---------|
| `PaymentModal.tsx` | Payment UI and logic |
| `patients.tsx` | Table integration and state |
| `mock-data.ts` | Data models and interfaces |
| `data-context.tsx` | Payment operations |
| `NewPatientModal.tsx` | Initial payment setup |

## Next Steps

1. Test payment creation workflow
2. Verify two-step confirmation works
3. Check payment history displays correctly
4. Test overpayment prevention
5. Verify table columns show correctly
