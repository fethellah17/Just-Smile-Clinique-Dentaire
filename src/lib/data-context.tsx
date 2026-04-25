import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Patient, RendezVous, Acte, Category, PaymentRecord, PassageDirect } from "@/lib/mock-data";
import { patients as initialPatients, rendezVous as initialRendezVous, actes as initialActes, categories as initialCategories, passagesDirects as initialPassagesDirects } from "@/lib/mock-data";

interface DataContextType {
  patients: Patient[];
  rendezVous: RendezVous[];
  passagesDirects: PassageDirect[];
  actes: Acte[];
  categories: Category[];
  isLoaded: boolean;
  
  // Patient operations
  addPatient: (patient: Omit<Patient, "id" | "dateCreation">) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  
  // Payment operations
  addPayment: (patientId: string, payment: Omit<PaymentRecord, "id" | "locked">) => PaymentRecord;
  
  // RendezVous operations
  addRendezVous: (rdv: Omit<RendezVous, "id">) => RendezVous;
  updateRendezVous: (id: string, updates: Partial<RendezVous>) => void;
  deleteRendezVous: (id: string) => void;
  toggleRendezVousStatut: (id: string) => void;
  archiveRendezVousByDate: (date: string) => void;
  
  // PassageDirect operations
  addPassageDirect: (passage: Omit<PassageDirect, "id">) => PassageDirect;
  updatePassageDirect: (id: string, updates: Partial<PassageDirect>) => void;
  deletePassageDirect: (id: string) => void;
  
  // Acte operations
  addActe: (acte: Omit<Acte, "id" | "resteAPayer">) => Acte;
  updateActe: (id: string, updates: Partial<Acte>) => void;
  deleteActe: (id: string) => void;
  
  // Category operations
  addCategory: (category: Omit<Category, "id">) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Initialize with mock data only - no localStorage persistence
  const [patients, setPatients] = useState<Patient[]>(initialPatients ?? []);
  const [rendezVous, setRendezVous] = useState<RendezVous[]>(initialRendezVous ?? []);
  const [passagesDirects, setPassagesDirects] = useState<PassageDirect[]>(initialPassagesDirects ?? []);
  const [actes, setActes] = useState<Acte[]>(initialActes ?? []);
  const [categories, setCategories] = useState<Category[]>(initialCategories ?? []);
  const [isLoaded] = useState(true);

  // Auto-clear passages directs when all are processed
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const todayPassages = (passagesDirects || []).filter((p) => p.date === todayStr);
    const pendingPassages = todayPassages.filter((p) => p.statut === "en attente");
    
    // If there are passages today but none pending, clear all today's passages
    if (todayPassages.length > 0 && pendingPassages.length === 0) {
      setPassagesDirects((prev) => (prev || []).filter((p) => p.date !== todayStr));
    }
  }, [passagesDirects]);

  // Patient operations
  const addPatient = (patient: Omit<Patient, "id" | "dateCreation">) => {
    const newPatient: Patient = {
      ...patient,
      stepsCompleted: patient.stepsCompleted || [],
      id: String(Math.max(...(patients?.map(p => parseInt(p.id)) ?? [0]), 0) + 1),
      dateCreation: new Date().toISOString().split('T')[0],
    };
    // Unshift new patient to the beginning (newest first)
    setPatients([newPatient, ...(patients ?? [])]);
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((patients ?? []).map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePatient = (id: string) => {
    setPatients((patients ?? []).filter(p => p.id !== id));
  };

  // Payment operations
  const addPayment = (patientId: string, payment: Omit<PaymentRecord, "id" | "locked">) => {
    const paymentRecord: PaymentRecord = {
      ...payment,
      id: `payment-${Date.now()}`,
      locked: true, // Always locked when created
    };

    setPatients((patients ?? []).map(p => {
      if (p.id === patientId) {
        const newMontantPaye = (p.montantPaye || 0) + payment.amount;
        return {
          ...p,
          montantPaye: newMontantPaye,
          paymentHistory: [...(p.paymentHistory || []), paymentRecord],
        };
      }
      return p;
    }));

    return paymentRecord;
  };

  // RendezVous operations
  const addRendezVous = (rdv: Omit<RendezVous, "id">) => {
    const newRdv: RendezVous = {
      ...rdv,
      id: String(Math.max(...(rendezVous?.map(r => parseInt(r.id)) ?? [0]), 0) + 1),
    };
    setRendezVous([...(rendezVous ?? []), newRdv]);
    return newRdv;
  };

  const updateRendezVous = (id: string, updates: Partial<RendezVous>) => {
    setRendezVous((rendezVous ?? []).map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteRendezVous = (id: string) => {
    setRendezVous((rendezVous ?? []).filter(r => r.id !== id));
  };

  const toggleRendezVousStatut = (id: string) => {
    setRendezVous((rendezVous ?? []).map(r => {
      if (r.id === id) {
        return {
          ...r,
          statut: r.statut === "confirmé" ? "en attente" : "confirmé",
        };
      }
      return r;
    }));
  };

  const archiveRendezVousByDate = (date: string) => {
    setRendezVous((rendezVous ?? []).map(r => {
      if (r.date === date && !r.archived) {
        return { ...r, archived: true };
      }
      return r;
    }));
  };

  // PassageDirect operations
  const addPassageDirect = (passage: Omit<PassageDirect, "id">) => {
    const newPassage: PassageDirect = {
      ...passage,
      id: String(Math.max(...(passagesDirects?.map(p => parseInt(p.id)) ?? [0]), 0) + 1),
    };
    setPassagesDirects([...(passagesDirects ?? []), newPassage]);
    return newPassage;
  };

  const updatePassageDirect = (id: string, updates: Partial<PassageDirect>) => {
    setPassagesDirects((passagesDirects ?? []).map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePassageDirect = (id: string) => {
    setPassagesDirects((passagesDirects ?? []).filter(p => p.id !== id));
  };

  // Acte operations
  const addActe = (acte: Omit<Acte, "id" | "resteAPayer">) => {
    const newActe: Acte = {
      ...acte,
      id: String(Math.max(...(actes?.map(a => parseInt(a.id)) ?? [0]), 0) + 1),
      resteAPayer: acte.montantTotal - acte.montantVerse,
    };
    setActes([...(actes ?? []), newActe]);
    return newActe;
  };

  const updateActe = (id: string, updates: Partial<Acte>) => {
    setActes((actes ?? []).map(a => {
      if (a.id === id) {
        const updated = { ...a, ...updates };
        return {
          ...updated,
          resteAPayer: updated.montantTotal - updated.montantVerse,
        };
      }
      return a;
    }));
  };

  const deleteActe = (id: string) => {
    setActes((actes ?? []).filter(a => a.id !== id));
  };

  // Category operations
  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...category,
      id: String(Math.max(...(categories?.map(c => parseInt(c.id)) ?? [0]), 0) + 1),
    };
    setCategories([...(categories ?? []), newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((categories ?? []).map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories((categories ?? []).filter(c => c.id !== id));
  };

  const value: DataContextType = {
    patients: patients ?? [],
    rendezVous: rendezVous ?? [],
    passagesDirects: passagesDirects ?? [],
    actes: actes ?? [],
    categories: categories ?? [],
    isLoaded,
    addPatient,
    updatePatient,
    deletePatient,
    addPayment,
    addRendezVous,
    updateRendezVous,
    deleteRendezVous,
    toggleRendezVousStatut,
    archiveRendezVousByDate,
    addPassageDirect,
    updatePassageDirect,
    deletePassageDirect,
    addActe,
    updateActe,
    deleteActe,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
