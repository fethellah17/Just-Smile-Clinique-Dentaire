import { useData } from "@/lib/data-context";

export function useRendezVous() {
  const { rendezVous, addRendezVous, updateRendezVous, deleteRendezVous, toggleRendezVousStatut } = useData();
  return { rendezVous, addRendezVous, updateRendezVous, deleteRendezVous, toggleStatut: toggleRendezVousStatut };
}
