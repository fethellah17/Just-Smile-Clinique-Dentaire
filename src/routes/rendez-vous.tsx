import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/lib/auth-context";
import { LoginPage } from "@/components/LoginPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Trash2, ChevronDown, ChevronUp, Phone } from "lucide-react";
import { useState } from "react";
import { useRendezVous } from "@/hooks/use-rendez-vous";
import { usePatients } from "@/hooks/use-patients";
import { useCategories } from "@/hooks/use-categories";
import { NewRendezVousModal } from "@/components/modals/NewRendezVousModal";
import { AppointmentActionModal } from "@/components/modals/AppointmentActionModal";
import { NewPatientModal } from "@/components/modals/NewPatientModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type RendezVous } from "@/lib/mock-data";
import {
  separateActiveAndArchived,
  groupAndSortAppointments,
  hasAnyActiveAppointments,
} from "@/lib/appointment-utils";

export const Route = createFileRoute("/rendez-vous")({
  component: RendezVousPage,
  head: () => ({
    meta: [{ title: "Rendez-vous - Just Smile" }],
  }),
});

function RendezVousPage() {
  const { isAuthenticated, isInitialized } = useAuth();
  
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-900"></div>
          <p className="mt-4 text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <LoginPage />;

  const { rendezVous, addRendezVous, updateRendezVous, deleteRendezVous } = useRendezVous();
  const { addPatient } = usePatients();
  const { categories } = useCategories();
  const [newRdvOpen, setNewRdvOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<RendezVous | null>(null);
  const [appointmentActionOpen, setAppointmentActionOpen] = useState(false);
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [appointmentToConvert, setAppointmentToConvert] = useState<RendezVous | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showArchive, setShowArchive] = useState(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConfirmAppointment = (appointment: RendezVous) => {
    // Mark as confirmed
    updateRendezVous(appointment.id, { statut: "confirmé" });

    // Store appointment data for patient conversion
    setAppointmentToConvert(appointment);
    
    // Close action modal
    setAppointmentActionOpen(false);
    
    // Open patient modal for conversion
    setNewPatientOpen(true);
  };

  const handleRejectAppointment = (appointmentId: string) => {
    updateRendezVous(appointmentId, { statut: "annulé" });
    showToast("Rendez-vous rejeté");
  };

  const handleNewPatientSubmit = (patientData: any) => {
    const newPatient = addPatient(patientData);
    
    // Update appointment with patient ID
    if (appointmentToConvert) {
      updateRendezVous(appointmentToConvert.id, {
        patientId: newPatient.id,
        patientNom: `${newPatient.nom} ${newPatient.prenom}`,
      });
    }

    showToast("Rendez-vous confirmé. Veuillez compléter le dossier du patient.");
    setNewPatientOpen(false);
    setAppointmentToConvert(null);
  };

  const handleAddRendezVous = (rdvData: any) => {
    // Add the appointment with all fields including telephone and age
    addRendezVous({
      patientId: "",
      patientNom: rdvData.patientNom,
      date: rdvData.date,
      heure: rdvData.heure,
      motif: rdvData.motif,
      statut: "en attente",
      telephone: rdvData.telephone,
      age: rdvData.age,
    });
    
    showToast("Rendez-vous ajouté à la liste d'attente");
  };

  // Separate active and archived appointments
  const { active: activeAppointments, archived: archivedAppointments } =
    separateActiveAndArchived(rendezVous);

  // Group and sort active appointments
  const { grouped: activeGrouped, sortedDates: activeSortedDates } =
    groupAndSortAppointments(activeAppointments);

  // Group and sort archived appointments
  const { grouped: archivedGrouped, sortedDates: archivedSortedDates } =
    groupAndSortAppointments(archivedAppointments);

  const hasActiveAppointments = hasAnyActiveAppointments(rendezVous);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des Rendez-vous</h1>
            <p className="text-sm text-muted-foreground">
              {activeAppointments.length} rendez-vous actifs
              {archivedAppointments.length > 0 && ` • ${archivedAppointments.length} archivés`}
            </p>
          </div>
          <Button onClick={() => setNewRdvOpen(true)} className="bg-[#800020] hover:bg-[#600018]">
            <Plus className="h-4 w-4 mr-2" /> Nouveau RDV
          </Button>
        </div>

        {/* Archive History Link - Top Position */}
        {archivedAppointments.length > 0 && (
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            {showArchive ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Masquer l'historique
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Voir l'historique des rendez-vous
              </>
            )}
          </button>
        )}

        {toast && (
          <div className={`p-3 rounded-lg text-sm font-medium ${
            toast.type === "success" 
              ? "bg-success/10 text-success border border-success/20" 
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}>
            {toast.message}
          </div>
        )}

        {/* Active Appointments Section */}
        <div className="space-y-4">
          {!hasActiveAppointments ? (
            <Card className="border border-border">
              <CardContent className="pt-8 pb-8 text-center">
                <p className="text-muted-foreground">Aucun rendez-vous en attente</p>
                <p className="text-sm text-muted-foreground mt-1">Tous les rendez-vous ont été traités</p>
              </CardContent>
            </Card>
          ) : (
            activeSortedDates?.map((date) => (
              <Card key={date} className="border border-border">
                <CardHeader className="pb-3 bg-muted/30 border-b border-border">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    {new Date(date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {activeGrouped[date]
                      ?.sort((a, b) => a.heure.localeCompare(b.heure))
                      ?.map((rdv) => (
                        <div
                          key={rdv.id}
                          className={`flex items-center justify-between rounded border border-border p-2 sm:p-3 transition-colors ${
                            rdv.statut === "annulé"
                              ? "opacity-60"
                              : "hover:bg-muted/30"
                          }`}
                        >
                          {/* Contact Icon - Mobile Priority with Large Touch Target */}
                          <div className="flex-shrink-0 w-10 h-10 sm:w-12 flex items-center justify-center mr-2 sm:mr-0">
                            {rdv.telephone ? (
                              <a
                                href={`tel:${rdv.telephone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95"
                                style={{
                                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                                  color: '#25D366',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.1)';
                                }}
                                title={`Appeler ${rdv.telephone}`}
                              >
                                <Phone className="h-5 w-5" />
                              </a>
                            ) : (
                              <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                                <Phone className="h-5 w-5 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>

                          {/* Time and Patient Info */}
                          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                            <div className="text-sm sm:text-base font-semibold text-primary w-12 sm:w-16 tabular-nums flex-shrink-0">{rdv.heure}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <p className="font-medium text-sm text-foreground truncate">{rdv.patientNom}</p>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{rdv.motif}</p>
                            </div>
                          </div>

                          {/* Status Badge, Confirm Button, and Delete Button */}
                          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                            {/* Clickable Status Badge for Pending, Static Badge for Others */}
                            {rdv.statut === "en attente" ? (
                              <button
                                onClick={() => {
                                  setSelectedAppointment(rdv);
                                  setAppointmentActionOpen(true);
                                }}
                                className="px-2 sm:px-3 py-1 rounded border border-warning/30 bg-warning/5 text-warning hover:bg-warning/10 transition-colors cursor-pointer text-xs sm:text-sm font-normal"
                                title="Cliquez pour confirmer ou rejeter"
                              >
                                En attente
                              </button>
                            ) : (
                              <Badge
                                variant="outline"
                                className={`font-normal text-xs sm:text-sm ${
                                  rdv.statut === "confirmé" 
                                    ? "border-success/30 bg-success/5 text-success" 
                                    : "border-destructive/30 bg-destructive/5 text-destructive"
                                }`}
                              >
                                {rdv.statut === "confirmé" ? "Confirmé" : "Annulé"}
                              </Badge>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(rdv.id);
                              }}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0 flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )) ?? null
          )}
        </div>

        {/* Archive Section - Only shown when toggled */}
        {archivedAppointments.length > 0 && showArchive && (
          <div className="space-y-4 opacity-75">
                {archivedSortedDates?.map((date) => (
                  <Card key={date} className="border border-border">
                    <CardHeader className="pb-3 bg-muted/30 border-b border-border">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        {archivedGrouped[date]
                          ?.sort((a, b) => a.heure.localeCompare(b.heure))
                          ?.map((rdv) => (
                            <div
                              key={rdv.id}
                              className="flex items-center justify-between rounded border border-border p-2 sm:p-3 opacity-60"
                            >
                              {/* Contact Icon - Mobile Priority with Large Touch Target */}
                              <div className="flex-shrink-0 w-10 h-10 sm:w-12 flex items-center justify-center mr-2 sm:mr-0">
                                {rdv.telephone ? (
                                  <a
                                    href={`tel:${rdv.telephone}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 active:scale-95"
                                    style={{
                                      backgroundColor: 'rgba(37, 211, 102, 0.1)',
                                      color: '#25D366',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.1)';
                                    }}
                                    title={`Appeler ${rdv.telephone}`}
                                  >
                                    <Phone className="h-5 w-5" />
                                  </a>
                                ) : (
                                  <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                                    <Phone className="h-5 w-5 text-muted-foreground/30" />
                                  </div>
                                )}
                              </div>

                              {/* Time and Patient Info */}
                              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                <div className="text-sm sm:text-base font-semibold text-muted-foreground w-12 sm:w-16 tabular-nums flex-shrink-0">{rdv.heure}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1 sm:gap-2">
                                    <p className="font-medium text-sm text-foreground truncate">{rdv.patientNom}</p>
                                  </div>
                                  <p className="text-xs text-muted-foreground truncate">{rdv.motif}</p>
                                </div>
                              </div>

                              {/* Status Badge and Delete Button */}
                              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                                <Badge
                                  variant="outline"
                                  className={`font-normal text-xs sm:text-sm ${
                                    rdv.statut === "confirmé" 
                                      ? "border-success/30 bg-success/5 text-success" 
                                      : "border-destructive/30 bg-destructive/5 text-destructive"
                                  }`}
                                >
                                  {rdv.statut === "confirmé" ? "Confirmé" : "Annulé"}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteConfirm(rdv.id)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0 flex-shrink-0"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )) ?? null}
            </div>
        )}
      </div>

      <NewRendezVousModal
        open={newRdvOpen}
        onOpenChange={setNewRdvOpen}
        categories={categories}
        onSubmit={handleAddRendezVous}
      />

      <AppointmentActionModal
        open={appointmentActionOpen}
        onOpenChange={setAppointmentActionOpen}
        appointment={selectedAppointment}
        categories={categories}
        onConfirm={handleConfirmAppointment}
        onReject={handleRejectAppointment}
      />

      <NewPatientModal
        open={newPatientOpen}
        onOpenChange={setNewPatientOpen}
        categories={categories}
        onSubmit={handleNewPatientSubmit}
        prefilledData={appointmentToConvert ? {
          nom: appointmentToConvert.patientNom.split(' ')[0] || "",
          prenom: appointmentToConvert.patientNom.split(' ').slice(1).join(' ') || "",
          telephone: appointmentToConvert.telephone,
          age: appointmentToConvert.age,
          categorie: appointmentToConvert.motif || "",
        } : undefined}
      />

      <AlertDialog open={deleteConfirm !== null} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le rendez-vous</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && deleteRendezVous(deleteConfirm)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
