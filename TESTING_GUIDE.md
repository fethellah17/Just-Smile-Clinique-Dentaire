# Guide de Test - Just Smile

## 🧪 Scénarios de Test

### Authentification

#### Test 1: Connexion Réussie
1. Accéder à l'application
2. Entrer: `dr.souidi@justsmile.dz`
3. Entrer: `admin123`
4. Cliquer "Se Connecter"
5. ✅ Redirection vers le Tableau de Bord

#### Test 2: Connexion Échouée
1. Entrer un email incorrect
2. Entrer un mot de passe incorrect
3. Cliquer "Se Connecter"
4. ✅ Message d'erreur affiché

#### Test 3: Déconnexion
1. Cliquer sur le menu utilisateur
2. Cliquer "Déconnexion"
3. ✅ Redirection vers la page de connexion

### Tableau de Bord

#### Test 4: Affichage des Statistiques
1. Se connecter
2. Vérifier les statistiques affichées:
   - Rendez-vous aujourd'hui: 2
   - Total patients: 5
   - Total créances: 82000 DA
3. ✅ Tous les chiffres corrects

#### Test 5: Rendez-vous du Jour
1. Vérifier la section "Rendez-vous du jour"
2. ✅ Affiche les RDV d'aujourd'hui
3. ✅ Affiche l'heure et le motif

#### Test 6: Statut Cliquable
1. Cliquer sur un badge de statut
2. ✅ Le statut bascule (Confirmé ↔ En attente)
3. Cliquer à nouveau
4. ✅ Le statut revient à l'état précédent

#### Test 7: Boutons Rapides
1. Cliquer "Nouveau Patient"
2. ✅ Modal s'ouvre
3. Cliquer "Ajouter" (Créances)
4. ✅ Modal RDV s'ouvre

### Gestion des Patients

#### Test 8: Recherche Fonctionnelle
1. Aller dans "Patients"
2. Taper "Benali" dans la recherche
3. ✅ Affiche uniquement Benali Fatima
4. Taper "0551234567"
5. ✅ Affiche le patient avec ce téléphone
6. Effacer la recherche
7. ✅ Affiche tous les patients

#### Test 9: Ajouter un Patient
1. Cliquer "Nouveau Patient"
2. Remplir:
   - Nom: "Dupont"
   - Prénom: "Jean"
   - Âge: "45"
   - Téléphone: "0612345678"
   - Antécédents: "Aucun"
3. Cliquer "Ajouter Patient"
4. ✅ Modal ferme
5. ✅ Nouveau patient visible dans la liste
6. ✅ Compteur augmente à 6

#### Test 10: Voir le Dossier
1. Cliquer sur un nom de patient
2. ✅ Redirection vers le dossier
3. ✅ Affiche les informations du patient

#### Test 11: Supprimer un Patient
1. Cliquer l'icône Corbeille
2. ✅ AlertDialog s'ouvre
3. Cliquer "Annuler"
4. ✅ Patient toujours visible
5. Cliquer l'icône Corbeille à nouveau
6. Cliquer "Supprimer"
7. ✅ Patient supprimé de la liste

### Dossier Patient

#### Test 12: Affichage des Informations
1. Aller dans un dossier patient
2. ✅ Affiche les informations personnelles
3. ✅ Affiche le total versé
4. ✅ Affiche le reste à payer

#### Test 13: Historique des Actes
1. Vérifier la section "Historique des Soins"
2. ✅ Affiche tous les actes du patient
3. ✅ Affiche les montants corrects
4. ✅ Affiche les dates

#### Test 14: Ajouter un Acte
1. Cliquer "Nouvel Acte"
2. Remplir:
   - Patient: Pré-sélectionné
   - Catégorie: "Soins de base"
   - Type: "Nettoyage"
   - Date: Aujourd'hui
   - Montant Total: "3000"
   - Montant Versé: "1000"
3. ✅ Reste à payer: 2000 DA
4. Cliquer "Ajouter Acte"
5. ✅ Acte visible dans l'historique

#### Test 15: Paiement d'un Acte
1. Trouver un acte avec solde impayé
2. Cliquer "Payer"
3. ✅ Modal de paiement s'ouvre
4. Entrer un montant valide
5. Cliquer "Confirmer Paiement"
6. ✅ Montant versé augmente
7. ✅ Reste à payer diminue

#### Test 16: Validation du Paiement
1. Cliquer "Payer"
2. Entrer un montant > reste à payer
3. Cliquer "Confirmer Paiement"
4. ✅ Message d'erreur affiché
5. Entrer un montant valide
6. ✅ Paiement accepté

#### Test 17: Supprimer un Acte
1. Cliquer l'icône Corbeille sur un acte
2. ✅ AlertDialog s'ouvre
3. Cliquer "Supprimer"
4. ✅ Acte supprimé
5. ✅ Totaux mis à jour

### Rendez-vous

#### Test 18: Ajouter un RDV
1. Aller dans "Rendez-vous"
2. Cliquer "Nouveau RDV"
3. Remplir:
   - Patient: "Benali Fatima"
   - Date: Demain
   - Heure: "10:00"
   - Type: "Détartrage"
4. Cliquer "Ajouter RDV"
5. ✅ RDV visible dans la liste

#### Test 19: Groupement par Date
1. Vérifier que les RDV sont groupés par date
2. ✅ Chaque date a sa propre section
3. ✅ Les RDV sont triés par heure

#### Test 20: Toggle Statut
1. Cliquer sur un badge de statut
2. ✅ Statut bascule
3. Vérifier que le changement persiste

#### Test 21: Supprimer un RDV
1. Cliquer l'icône Corbeille
2. ✅ AlertDialog s'ouvre
3. Cliquer "Supprimer"
4. ✅ RDV supprimé

### Suivi des Dettes

#### Test 22: Affichage des Créances
1. Aller dans "Suivi des Dettes"
2. ✅ Affiche le total des créances
3. ✅ Affiche le détail par patient

#### Test 23: Paiement depuis Dettes
1. Trouver un acte impayé
2. Cliquer "Payer"
3. ✅ Modal s'ouvre
4. Entrer un montant
5. Cliquer "Confirmer Paiement"
6. ✅ Montant versé augmente
7. ✅ Reste à payer diminue

#### Test 24: Mise à Jour en Temps Réel
1. Enregistrer un paiement
2. ✅ Les totaux se mettent à jour immédiatement
3. ✅ Les actes payés disparaissent

### Actes par Catégorie

#### Test 25: Affichage des Actes
1. Aller dans "Actes" → "Soins de base"
2. ✅ Affiche tous les actes de cette catégorie
3. ✅ Affiche les colonnes correctes

#### Test 26: Ajouter un Acte
1. Clicker "Nouvel Acte"
2. ✅ Catégorie pré-remplie
3. Remplir les autres champs
4. Cliquer "Ajouter Acte"
5. ✅ Acte visible dans le tableau

#### Test 27: Supprimer un Acte
1. Cliquer l'icône Corbeille
2. ✅ AlertDialog s'ouvre
3. Cliquer "Supprimer"
4. ✅ Acte supprimé

### Validations

#### Test 28: Champs Obligatoires
1. Ouvrir une modal
2. Laisser les champs vides
3. Cliquer "Ajouter"
4. ✅ Message d'erreur affiché

#### Test 29: Montants Invalides
1. Ouvrir "Nouvel Acte"
2. Entrer Montant Versé > Montant Total
3. Cliquer "Ajouter Acte"
4. ✅ Message d'erreur affiché

#### Test 30: Dates Valides
1. Ouvrir une modal avec date
2. Sélectionner une date valide
3. ✅ Acceptée
4. Essayer une date invalide
5. ✅ Rejetée

### UI/UX

#### Test 31: Couleur Burgundy
1. Vérifier tous les boutons primaires
2. ✅ Couleur #800020
3. ✅ Hover: #600018

#### Test 32: Responsive Design
1. Ouvrir l'application sur mobile
2. ✅ Interface adaptée
3. ✅ Tous les éléments visibles
4. ✅ Pas de débordement

#### Test 33: Icônes
1. Vérifier toutes les icônes
2. ✅ Cohérentes
3. ✅ Significatives
4. ✅ Bien alignées

#### Test 34: Textes en Français
1. Vérifier tous les textes
2. ✅ Tous en français
3. ✅ Pas de texte anglais
4. ✅ Bien formatés

### Performance

#### Test 35: Temps de Chargement
1. Ouvrir l'application
2. ✅ Charge rapidement
3. ✅ Pas de lag

#### Test 36: Interactions Fluides
1. Cliquer sur les boutons
2. ✅ Réponse immédiate
3. ✅ Pas de délai

#### Test 37: Recherche Rapide
1. Taper dans la recherche
2. ✅ Résultats instantanés
3. ✅ Pas de lag

## 📋 Checklist de Test

- [ ] Authentification fonctionne
- [ ] Tableau de Bord affiche les données
- [ ] Recherche fonctionne
- [ ] Modales s'ouvrent et se ferment
- [ ] Ajout de données fonctionne
- [ ] Suppression avec confirmation fonctionne
- [ ] Calculs automatiques corrects
- [ ] Statuts cliquables fonctionnent
- [ ] Paiements enregistrés correctement
- [ ] Validations fonctionnent
- [ ] Couleurs correctes
- [ ] Design responsive
- [ ] Textes en français
- [ ] Icônes cohérentes
- [ ] Performance acceptable

## 🐛 Rapports de Bug

Si vous trouvez un bug:
1. Notez les étapes pour le reproduire
2. Décrivez le comportement attendu
3. Décrivez le comportement réel
4. Prenez une capture d'écran
5. Signalez-le à l'équipe

## ✅ Résultats Attendus

Tous les tests doivent passer avec succès. Si un test échoue, vérifiez:
1. Les données mock sont chargées
2. L'authentification est correcte
3. Le navigateur est à jour
4. Pas d'erreurs dans la console

## 📊 Rapport de Test

Après avoir exécuté tous les tests:
- Nombre total de tests: 37
- Tests réussis: ✅
- Tests échoués: ❌
- Taux de réussite: %

## 🎯 Conclusion

Si tous les tests passent, l'application est prête pour:
- Démonstration
- Présentation client
- Tests utilisateur
- Déploiement
