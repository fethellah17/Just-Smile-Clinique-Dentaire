# Payment System - Architecture & Technical Details

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Patients Page (patients.tsx)              │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Patients Table                          │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Nom │ Prenom │ Age │ ... │ Montant Total │    │  │   │
│  │  │                          │ Montant Payé  │    │  │   │
│  │  │                          │ [Wallet Icon] │    │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                   │
│                    Click Wallet Icon                          │
│                           │                                   │
│                           ▼                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         PaymentModal Component                       │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Suivi des Paiements - [Patient Name]          │  │   │
│  │  │                                                │  │   │
│  │  │ ┌──────────┬──────────┬──────────┐            │  │   │
│  │  │ │ Total    │ Payé     │ Restant  │            │  │   │
│  │  │ │ 50000 DA │ 15000 DA │ 35000 DA │            │  │   │
│  │  │ └──────────┴──────────┴──────────┘            │  │   │
│  │  │                                                │  │   │
│  │  │ Historique des Paiements:                     │  │   │
│  │  │ ┌────────────────────────────────────────┐   │  │   │
│  │  │ │ 15000 DA | 2024-06-05 09:00 | 🔒      │   │  │   │
│  │  │ │ 10000 DA | 2024-06-12 14:30 | 🔒      │   │  │   │
│  │  │ └────────────────────────────────────────┘   │  │   │
│  │  │                                                │  │   │
│  │  │ Nouveau Versement:                           │  │   │
│  │  │ [Input: ________] DA                         │  │   │
│  │  │                                                │  │   │
│  │  │ Reste à payer: 35000 DA                      │  │   │
│  │  │                                                │  │   │
│  │  │ [Vérifier le Paiement]                       │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
User Action: Click Wallet Icon
        │
        ▼
handleOpenPayment(patientId)
        │
        ├─ setSelectedPatientId(patientId)
        ├─ setPaymentOpen(true)
        │
        ▼
PaymentModal Opens
        │
        ├─ Display patient data
        ├─ Calculate montantTotal, montantPaye, resteAPayer
        ├─ Display paymentHistory
        │
        ▼
User Enters Payment Amount
        │
        ├─ Real-time validation
        ├─ Calculate totalAfterPayment
        ├─ Calculate remainingAfterPayment
        │
        ▼
User Clicks "Vérifier le Paiement"
        │
        ├─ handleAddPayment()
        ├─ Validate amount > 0
        ├─ Validate amount ≤ resteAPayer
        ├─ setVerificationStep(true)
        │
        ▼
Confirmation Screen Appears
        │
        ├─ Display warning message
        ├─ Show payment details
        │
        ▼
User Clicks "Confirmer le Paiement"
        │
        ├─ handleConfirmPayment()
        ├─ Create PaymentRecord
        ├─ Set locked: true
        ├─ onPaymentSaved(paymentRecord)
        │
        ▼
handlePaymentSaved(patientId, paymentRecord)
        │
        ├─ Calculate newMontantPaye
        ├─ Update paymentHistory
        ├─ updatePatient()
        │
        ▼
Data Context Updates
        │
        ├─ Update patient.montantPaye
        ├─ Update patient.paymentHistory
        │
        ▼
UI Re-renders
        │
        ├─ Table updates with new montantPaye
        ├─ Payment history shows new locked payment
        ├─ Toast notification shown
        ├─ Modal closes
```

---

## Component Hierarchy

```
PatientsPage (src/routes/patients.tsx)
├── AppLayout
├── Card (Search & Filter)
├── Table
│   ├── TableHeader
│   │   └── TableRow (Column Headers)
│   │       ├── "Nom"
│   │       ├── "Prenom"
│   │       ├── "Montant Total" ← NEW
│   │       ├── "Montant Payé" ← NEW
│   │       └── "Actions"
│   │
│   └── TableBody
│       └── TableRow (for each patient)
│           ├── TableCell (Nom)
│           ├── TableCell (Prenom)
│           ├── TableCell (Montant Total) ← NEW
│           ├── TableCell (Montant Payé) ← NEW
│           │
│           └── TableCell (Actions)
│               ├── Button (Wallet Icon) ← NEW
│               │   └── onClick: handleOpenPayment()
│               ├── Button (History Icon)
│               ├── Button (Edit Icon)
│               └── Button (Delete Icon)
│
├── NewPatientModal
│   ├── Input (Montant Total) ← NEW
│   └── Input (Montant Payé) ← NEW
│
├── EditPatientModal
├── TreatmentHistoryModal
│
└── PaymentModal ← NEW COMPONENT
    ├── DialogHeader
    │   └── DialogTitle
    │
    ├── Card (Montant Total)
    ├── Card (Montant Payé)
    ├── Card (Reste à Payer)
    │
    ├── Payment History Section
    │   └── PaymentRecord Items (locked)
    │
    └── New Payment Section
        ├── Input (Nouveau Versement)
        ├── Calculation Display
        ├── Button (Vérifier le Paiement)
        │
        └── Confirmation Section
            ├── Warning Message
            ├── Button (Annuler)
            └── Button (Confirmer le Paiement)
```

---

## State Management

### Component State (PaymentModal.tsx)
```typescript
const [newPayment, setNewPayment] = useState("");
// User input for new payment amount

const [verificationStep, setVerificationStep] = useState(false);
// Toggle between input and confirmation screens

const [isProcessing, setIsProcessing] = useState(false);
// Prevent double-submission during processing
```

### Component State (patients.tsx)
```typescript
const [paymentOpen, setPaymentOpen] = useState(false);
// Control payment modal visibility

const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
// Track which patient's payment modal is open
```

### Global State (data-context.tsx)
```typescript
const [patients, setPatients] = useState<Patient[]>(initialPatients);
// All patient data including payment information

// Patient object structure:
{
  id: string;
  nom: string;
  prenom: string;
  // ... other fields ...
  montantTotal: number;           // Total treatment cost
  montantPaye: number;            // Total paid
  paymentHistory: PaymentRecord[]; // All payments
}
```

---

## Data Persistence Flow

```
User Creates Patient
        │
        ▼
NewPatientModal.handleSubmit()
        │
        ├─ Create paymentHistory array
        ├─ If montantPaye > 0:
        │   └─ Add initial PaymentRecord
        │       ├─ id: `payment-${Date.now()}`
        │       ├─ amount: montantPaye
        │       ├─ date: new Date().toISOString()
        │       └─ locked: true
        │
        ▼
addPatient(patientData)
        │
        ├─ DataContext.addPatient()
        ├─ Create new Patient object
        ├─ setPatients([...patients, newPatient])
        │
        ▼
State Updated
        │
        ├─ Patient appears in table
        ├─ Payment data persists in state
        │
        ▼
User Adds Payment
        │
        ├─ PaymentModal.handleConfirmPayment()
        ├─ Create new PaymentRecord
        ├─ onPaymentSaved(paymentRecord)
        │
        ▼
handlePaymentSaved()
        │
        ├─ Calculate newMontantPaye
        ├─ Create updatedPaymentHistory
        ├─ updatePatient(patientId, updates)
        │
        ▼
DataContext.updatePatient()
        │
        ├─ setPatients(patients.map(...))
        ├─ Update patient.montantPaye
        ├─ Update patient.paymentHistory
        │
        ▼
State Updated
        │
        ├─ Table re-renders with new montantPaye
        ├─ Payment history updated
        ├─ All data persists in state
```

---

## Validation Rules

### Payment Amount Validation
```typescript
// Rule 1: Amount must be positive
if (!newPayment || newPaymentAmount <= 0) {
  toast.error("Veuillez entrer un montant valide");
  return;
}

// Rule 2: Amount cannot exceed remaining balance
if (newPaymentAmount > resteAPayer) {
  toast.error(`Le montant ne peut pas dépasser le reste à payer (${resteAPayer.toLocaleString()} DA)`);
  return;
}
```

### Patient Data Validation
```typescript
// Rule 1: montantTotal must be set
if (!patient.montantTotal) {
  // Cannot open payment modal
}

// Rule 2: montantPaye cannot exceed montantTotal
if (patient.montantPaye > patient.montantTotal) {
  // Data integrity error
}

// Rule 3: paymentHistory must be array
if (!Array.isArray(patient.paymentHistory)) {
  // Initialize as empty array
}
```

### Payment Record Validation
```typescript
// Rule 1: Payment must be locked
if (!paymentRecord.locked) {
  // Error: payment should be locked
}

// Rule 2: Payment must have unique ID
if (!paymentRecord.id) {
  // Error: missing ID
}

// Rule 3: Payment must have timestamp
if (!paymentRecord.date) {
  // Error: missing timestamp
}
```

---

## Security Implementation

### Immutability
```typescript
// Payments are locked immediately
const paymentRecord: PaymentRecord = {
  id: `payment-${Date.now()}`,
  amount: newPaymentAmount,
  date: new Date().toISOString(),
  locked: true, // ← Always true
};

// No edit/delete operations available for locked payments
// UI does not provide edit/delete buttons
// Backend would reject any modification attempts
```

### Two-Step Verification
```typescript
// Step 1: Verify
handleAddPayment() {
  // Validate input
  // Show verification screen
  setVerificationStep(true);
}

// Step 2: Confirm
handleConfirmPayment() {
  // Create payment record
  // Update patient data
  // Close modal
}
```

### Audit Trail
```typescript
// Every payment has timestamp
date: new Date().toISOString()
// Example: "2024-06-05T09:30:00.000Z"

// Stored in immutable array
paymentHistory: PaymentRecord[]

// Cannot be modified via UI
// Provides complete audit trail
```

---

## Error Handling

### User Input Errors
```typescript
// Empty input
if (!newPayment) {
  toast.error("Veuillez entrer un montant valide");
}

// Invalid amount
if (newPaymentAmount <= 0) {
  toast.error("Veuillez entrer un montant valide");
}

// Overpayment
if (newPaymentAmount > resteAPayer) {
  toast.error(`Le montant ne peut pas dépasser le reste à payer`);
}
```

### Data Errors
```typescript
// Patient not found
if (!patient) {
  toast.error("Patient non trouvé");
}

// Payment save failed
try {
  onPaymentSaved(paymentRecord);
} catch (error) {
  toast.error("Erreur lors de l'enregistrement du paiement");
}
```

---

## Performance Optimization

### Real-Time Calculations
```typescript
// Calculated on every render (no expensive operations)
const montantTotal = patient.montantTotal || 0;
const montantPaye = patient.montantPaye || 0;
const resteAPayer = montantTotal - montantPaye;
const newPaymentAmount = parseFloat(newPayment) || 0;
const totalAfterPayment = montantPaye + newPaymentAmount;
const remainingAfterPayment = montantTotal - totalAfterPayment;

// All calculations are O(1) - constant time
```

### Memoization Opportunities
```typescript
// Could memoize payment history calculations
// But typically small arrays (< 100 payments per patient)
// Not necessary for current scale
```

### Rendering Optimization
```typescript
// Payment history uses scrollable container
// Prevents rendering all payments at once
// max-h-48 overflow-y-auto

// Table uses virtualization (if needed)
// Currently renders all patients
// Could implement virtual scrolling for 1000+ patients
```

---

## Testing Strategy

### Unit Tests
- Payment amount validation
- Calculation accuracy
- Data model integrity

### Integration Tests
- Payment modal integration
- Table column updates
- Data persistence

### E2E Tests
- Complete payment workflow
- Two-step verification
- Payment history display

### Security Tests
- Overpayment prevention
- Lock status verification
- Audit trail integrity

---

## Deployment Considerations

### Database Migration
```sql
-- Add payment fields to patients table
ALTER TABLE patients ADD COLUMN montantTotal DECIMAL(10,2);
ALTER TABLE patients ADD COLUMN montantPaye DECIMAL(10,2);
ALTER TABLE patients ADD COLUMN paymentHistory JSON;
```

### Backward Compatibility
```typescript
// Handle patients without payment data
const montantTotal = patient.montantTotal || 0;
const montantPaye = patient.montantPaye || 0;
const paymentHistory = patient.paymentHistory || [];
```

### Migration Script
```typescript
// Migrate existing patients
patients.forEach(patient => {
  if (!patient.montantTotal) {
    patient.montantTotal = 0;
    patient.montantPaye = 0;
    patient.paymentHistory = [];
  }
});
```

---

## Future Scalability

### Current Limitations
- Payment history stored in memory
- No pagination for large histories
- No payment search/filtering

### Scalability Improvements
1. Move to database backend
2. Implement pagination
3. Add payment search
4. Add payment filtering
5. Add payment analytics
6. Add payment reports

### Architecture for Scale
```
Frontend (React)
    │
    ├─ PaymentModal (UI)
    ├─ PatientsTable (UI)
    │
    ▼
API Layer
    │
    ├─ POST /api/payments (create)
    ├─ GET /api/payments/:patientId (read)
    ├─ PUT /api/payments/:id (update - disabled)
    ├─ DELETE /api/payments/:id (delete - disabled)
    │
    ▼
Backend Service
    │
    ├─ Payment validation
    ├─ Audit logging
    ├─ Database operations
    │
    ▼
Database
    │
    ├─ patients table
    ├─ payments table
    ├─ payment_audit_log table
```

---

## Conclusion

The payment system is architected for:
- ✅ Security (immutable records, two-step verification)
- ✅ Usability (intuitive interface, real-time feedback)
- ✅ Scalability (can migrate to backend)
- ✅ Maintainability (clear code structure, comprehensive documentation)
- ✅ Performance (efficient calculations, optimized rendering)
