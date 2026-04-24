# Guide d'Utilisation - Just Smile

## 🔐 Connexion

**Identifiants de démonstration:**
- Email: `dr.souidi@justsmile.dz`
- Mot de passe: `admin123`

## 📱 Navigation Principale

### Tableau de Bord (Accueil)
- Vue d'ensemble des statistiques clés
- Rendez-vous du jour
- Créances récentes
- Accès rapide aux fonctionnalités principales

### Gestion des Patients
- Liste de tous les patients
- Recherche par nom ou téléphone
- Cliquer sur un nom pour voir le dossier complet
- Ajouter un nouveau patient

### Dossier Médical
- Informations complètes du patient
- Historique de tous les actes
- Suivi des paiements
- Ajouter un nouvel acte
- Enregistrer un paiement

### Gestion des Rendez-vous
- Vue par date
- Statut des rendez-vous (Confirmé/En attente)
- Cliquer sur le statut pour le modifier
- Ajouter un nouveau rendez-vous

### Suivi des Dettes
- Vue d'ensemble des créances
- Détail par patient
- Enregistrer un paiement directement

### Actes par Catégorie
- Chirurgie & Extractions
- Bridge céramique & Prothèse Fixe
- Prothèse Amovible
- Blanchiment & Soins Esthétiques
- ODF (Orthodontie)
- Soins de base

## 🎯 Tâches Courantes

### Ajouter un Nouveau Patient

1. Cliquer sur "Nouveau Patient" (Tableau de Bord ou Patients)
2. Remplir les champs:
   - **Nom**: Nom de famille
   - **Prénom**: Prénom
   - **Âge**: Âge en années
   - **Téléphone**: Numéro de contact
   - **Antécédents**: Conditions médicales (optionnel)
3. Cliquer "Ajouter Patient"

### Créer un Rendez-vous

1. Cliquer sur "Nouveau RDV" (Tableau de Bord ou Rendez-vous)
2. Sélectionner le patient
3. Choisir la date et l'heure
4. Entrer le type de soin
5. Cliquer "Ajouter RDV"

### Enregistrer un Acte Médical

**Option 1: Depuis le Dossier Patient**
1. Aller dans Patients → Cliquer sur le patient
2. Cliquer "Nouvel Acte"
3. Remplir les détails

**Option 2: Depuis une Catégorie**
1. Aller dans Actes → Sélectionner une catégorie
2. Cliquer "Nouvel Acte"
3. La catégorie est pré-remplie

**Champs à remplir:**
- **Patient**: Sélectionner dans la liste
- **Catégorie**: Type de traitement
- **Type**: Nom du traitement (ex: Détartrage)
- **Description**: Détails (optionnel)
- **Date**: Date du traitement
- **Montant Total**: Prix total en DA
- **Montant Versé**: Montant payé (optionnel)

Le "Reste à payer" se calcule automatiquement.

### Enregistrer un Paiement

**Option 1: Depuis le Dossier Patient**
1. Aller dans Patients → Cliquer sur le patient
2. Trouver l'acte avec solde impayé
3. Cliquer "Payer"
4. Entrer le montant
5. Cliquer "Confirmer Paiement"

**Option 2: Depuis Suivi des Dettes**
1. Aller dans Suivi des Dettes
2. Trouver le patient
3. Cliquer "Payer" sur l'acte
4. Entrer le montant
5. Cliquer "Confirmer Paiement"

### Modifier le Statut d'un Rendez-vous

1. Aller dans Rendez-vous ou Tableau de Bord
2. Cliquer sur le badge de statut (Confirmé/En attente)
3. Le statut bascule automatiquement

### Supprimer une Entrée

1. Cliquer sur l'icône Corbeille (🗑️)
2. Confirmer la suppression
3. L'entrée est supprimée

### Rechercher un Patient

1. Aller dans Patients
2. Utiliser la barre de recherche
3. Taper le nom ou le téléphone
4. Les résultats se filtrent en temps réel

## 💰 Gestion Financière

### Comprendre les Montants

- **Montant Total**: Prix total du traitement
- **Montant Versé**: Argent reçu du patient
- **Reste à Payer**: Montant dû (Total - Versé)

### Suivi des Dettes

1. Aller dans "Suivi des Dettes"
2. Voir le total des créances
3. Voir le détail par patient
4. Enregistrer les paiements directement

### Dossier Patient Complet

1. Aller dans Patients
2. Cliquer sur le nom du patient
3. Voir:
   - Informations personnelles
   - Total versé
   - Reste à payer
   - Historique complet des actes

## 🎨 Interface

### Couleurs et Significations

- **Burgundy (#800020)**: Boutons primaires, actions principales
- **Vert**: Montants versés, statuts confirmés
- **Rouge**: Montants restants, actions destructives
- **Gris**: Textes secondaires, informations

### Icônes Courantes

- 👁️ **Oeil**: Voir le dossier
- ✏️ **Crayon**: Éditer (désactivé pour le moment)
- 🗑️ **Corbeille**: Supprimer
- ➕ **Plus**: Ajouter
- 📅 **Calendrier**: Rendez-vous
- 👥 **Personnes**: Patients
- 💳 **Carte**: Paiements

## ⚠️ Validations

L'application valide automatiquement:
- Les champs obligatoires
- Les montants (versé ≤ total)
- Les dates valides
- Les numéros de téléphone

## 🔄 Flux Recommandé

1. **Matin**: Vérifier les rendez-vous du jour
2. **Pendant la journée**: Enregistrer les actes
3. **Fin de journée**: Enregistrer les paiements
4. **Hebdomadaire**: Vérifier le suivi des dettes

## 💡 Conseils

- Utilisez la recherche pour trouver rapidement un patient
- Cliquez sur les statuts pour les modifier rapidement
- Enregistrez les paiements immédiatement après réception
- Consultez régulièrement le suivi des dettes
- Utilisez les dossiers patients pour l'historique complet

## 🆘 Dépannage

### Je ne peux pas me connecter
- Vérifier l'email: `dr.souidi@justsmile.dz`
- Vérifier le mot de passe: `admin123`

### Les données ne se sauvegardent pas
- Les données sont sauvegardées localement pendant la session
- Elles seront perdues si vous fermez le navigateur
- (Supabase sera intégré pour la persistance)

### Je ne vois pas mon patient
- Utiliser la recherche pour le trouver
- Vérifier l'orthographe du nom
- Vérifier le numéro de téléphone

## 📞 Support

Pour toute question ou problème, contactez l'équipe Just Smile.
