# Architecture Technique - Just Smile

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── modals/
│   │   ├── NewActeModal.tsx
│   │   ├── NewPatientModal.tsx
│   │   ├── NewRendezVousModal.tsx
│   │   └── PaymentModal.tsx
│   ├── ui/
│   │   └── [Shadcn/UI components]
│   ├── ActesModule.tsx
│   ├── AppLayout.tsx
│   ├── AppSidebar.tsx
│   └── LoginPage.tsx
├── hooks/
│   ├── use-actes.tsx
│   ├── use-patients.tsx
│   ├── use-rendez-vous.tsx
│   └── use-mobile.tsx
├── lib/
│   ├── auth-context.tsx
│   ├── mock-data.ts
│   └── utils.ts
├── routes/
│   ├── actes/
│   │   ├── chirurgie.tsx
│   │   ├── esthetique.tsx
│   │   ├── orthodontie.tsx
│   │   ├── protheses.tsx
│   │   └── soins.tsx
│   ├── __root.tsx
│   ├── dettes.tsx
│   ├── index.tsx
│   ├── patients.tsx
│   ├── patients.$patientId.tsx
│   └── rendez-vous.tsx
├── router.tsx
├── routeTree.gen.ts
└── styles.css
```

## 🔄 Flux de Données

### Architecture Générale

```
Routes (Pages)
    ↓
Hooks (usePatients, useActes, useRendezVous)
    ↓
State (React useState)
    ↓
Mock Data (src/lib/mock-data.ts)
```

### Exemple: Ajouter un Patient

```
1. Utilisateur clique "Nouveau Patient"
2. NewPatientModal s'ouvre
3. Utilisateur remplit le formulaire
4. onSubmit appelle addPatient() du hook
5. Hook met à jour l'état local
6. Composant re-render avec les nouvelles données
```

## 📦 Hooks Personnalisés

### usePatients
```typescript
const { patients, addPatient, updatePatient, deletePatient } = usePatients();
```
- Gère la liste des patients
- Génère automatiquement les IDs
- Ajoute la date de création

### useRendezVous
```typescript
const { rendezVous, addRendezVous, updateRendezVous, deleteRendezVous, toggleStatut } = useRendezVous();
```
- Gère les rendez-vous
- Permet de basculer le statut
- Génère automatiquement les IDs

### useActes
```typescript
const { actes, addActe, updateActe, deleteActe, getActesByPatient, getTotalDebtByPatient } = useActes();
```
- Gère les actes médicaux
- Calcule automatiquement "Reste à payer"
- Fournit des utilitaires pour les requêtes

## 🎯 Composants Modaux

### Structure Commune

```typescript
interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: T) => void;
  // autres props spécifiques
}
```

### Validation

Chaque modal valide:
- Les champs obligatoires
- Les formats (email, téléphone, etc.)
- Les montants (versé ≤ total)
- Les dates

## 🔐 Authentification

### AuthContext
- Stockage en sessionStorage
- Identifiants de démonstration
- Sera remplacé par Supabase Auth

### Flux de Connexion
```
LoginPage → useAuth().login() → sessionStorage → Redirection
```

## 🎨 Système de Design

### Composants Shadcn/UI Utilisés
- Dialog (modales)
- Button
- Input
- Select
- Table
- Card
- Badge
- AlertDialog
- Textarea
- Label

### Tailwind CSS
- Responsive design (mobile-first)
- Couleurs personnalisées
- Spacing cohérent
- Animations fluides

## 📊 Gestion d'État

### État Local vs Global

**État Local (useState)**
- Données des patients, actes, RDV
- État des modales (open/close)
- État des confirmations

**État Global (AuthContext)**
- Authentification
- Informations utilisateur

### Persistance

**Actuellement**: Aucune (session seulement)
**Futur**: Supabase pour la persistance

## 🔄 Cycle de Vie des Données

### Ajout de Données
```
1. Modal ouvre
2. Utilisateur remplit le formulaire
3. Validation
4. Hook ajoute à l'état
5. ID généré automatiquement
6. Timestamp ajouté (si applicable)
7. Modal ferme
8. Composant re-render
```

### Modification de Données
```
1. Utilisateur clique sur une action
2. Modal/Dialog ouvre avec les données
3. Utilisateur modifie
4. Hook met à jour l'état
5. Composant re-render
```

### Suppression de Données
```
1. Utilisateur clique Delete
2. AlertDialog demande confirmation
3. Si confirmé, hook supprime
4. État mis à jour
5. Composant re-render
```

## 🚀 Performance

### Optimisations
- Composants fonctionnels
- Hooks pour la réutilisabilité
- Pas de re-renders inutiles
- Lazy loading des routes

### Taille du Bundle
- Client: ~327 kB (gzip: 104 kB)
- Bien optimisé pour le web

## 🔗 Intégrations Futures

### Supabase
- Base de données PostgreSQL
- Authentification
- Stockage en temps réel
- Backups automatiques

### Fonctionnalités Futures
- Export PDF
- Notifications
- Synchronisation multi-utilisateurs
- Historique complet
- Rapports analytiques

## 🧪 Testabilité

### Hooks Testables
- Logique métier isolée
- Pas de dépendances externes
- Faciles à mocker

### Composants Testables
- Props bien définies
- Pas d'effets secondaires
- Faciles à tester

## 📝 Conventions de Code

### Nommage
- Composants: PascalCase
- Hooks: camelCase avec préfixe "use"
- Fichiers: kebab-case ou PascalCase
- Variables: camelCase

### Structure des Fichiers
- Un composant par fichier
- Imports organisés
- Exports nommés pour les hooks

### Commentaires
- Français pour les commentaires métier
- Anglais pour les commentaires techniques
- JSDoc pour les fonctions publiques

## 🔒 Sécurité

### Actuellement
- Validation client-side
- Pas d'accès backend
- Données locales uniquement

### À Implémenter
- Validation server-side
- Authentification Supabase
- Chiffrement des données sensibles
- Rate limiting
- CORS

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Adaptations
- Navigation responsive
- Tableaux adaptés
- Modales fullscreen sur mobile
- Touches tactiles optimisées

## 🎯 Prochaines Étapes

1. **Phase 1**: Intégration Supabase
2. **Phase 2**: Authentification réelle
3. **Phase 3**: Export/Rapports
4. **Phase 4**: Notifications
5. **Phase 5**: Mobile app native
