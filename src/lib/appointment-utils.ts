import { RendezVous } from "./mock-data";

/**
 * Checks if a date has any pending appointments
 */
export function hasActivePendingAppointments(
  date: string,
  appointments: RendezVous[]
): boolean {
  return appointments
    .filter((rdv) => rdv.date === date)
    .some((rdv) => rdv.statut === "en attente");
}

/**
 * Separates appointments into active (with pending) and archived (all confirmed/rejected)
 */
export function separateActiveAndArchived(appointments: RendezVous[]): {
  active: RendezVous[];
  archived: RendezVous[];
} {
  const active: RendezVous[] = [];
  const archived: RendezVous[] = [];

  // Group by date
  const grouped = appointments.reduce<Record<string, RendezVous[]>>(
    (acc, rdv) => {
      if (!acc[rdv.date]) acc[rdv.date] = [];
      acc[rdv.date].push(rdv);
      return acc;
    },
    {}
  );

  // Separate based on whether date has pending appointments
  Object.entries(grouped).forEach(([date, rdvs]) => {
    const hasPending = rdvs.some((rdv) => rdv.statut === "en attente");
    if (hasPending) {
      active.push(...rdvs);
    } else {
      archived.push(...rdvs);
    }
  });

  return { active, archived };
}

/**
 * Gets today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

/**
 * Sorts dates with today first, then ascending order
 */
export function sortDatesWithTodayFirst(dates: string[]): string[] {
  const today = getTodayDate();

  return dates.sort((a, b) => {
    // Today comes first
    if (a === today) return -1;
    if (b === today) return 1;

    // Then sort by date ascending (nearest future dates first)
    return a.localeCompare(b);
  });
}

/**
 * Groups appointments by date and returns sorted date keys
 */
export function groupAndSortAppointments(
  appointments: RendezVous[]
): {
  grouped: Record<string, RendezVous[]>;
  sortedDates: string[];
} {
  const grouped = appointments.reduce<Record<string, RendezVous[]>>(
    (acc, rdv) => {
      if (!acc[rdv.date]) acc[rdv.date] = [];
      acc[rdv.date].push(rdv);
      return acc;
    },
    {}
  );

  const sortedDates = sortDatesWithTodayFirst(Object.keys(grouped));

  return { grouped, sortedDates };
}

/**
 * Checks if there are any active appointments (with pending status)
 */
export function hasAnyActiveAppointments(appointments: RendezVous[]): boolean {
  return appointments.some((rdv) => rdv.statut === "en attente");
}
