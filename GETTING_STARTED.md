# Guide de Démarrage - Just Smile

## 🚀 Installation et Lancement

### Prérequis

- Node.js 18+ ou Bun
- npm ou yarn ou bun
- Un navigateur moderne

### Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd smileflow-dental
```

2. **Installer les dépendances**
```bash
npm install
# ou
bun install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
# ou
bun run dev
```

4. **Accéder à l'application**
```
http://localhost:5173
```

### Build pour la Production

```bash
npm run build
# ou
bun run build
```

## 🔐 Connexion

**Identifiants de démonstration:**
- Email: `dr.souidi@justsmile.dz`
- Mot de passe: `admin123`

## 📋 Première Utilisation

### 1. Se Connecter
- Entrer les identifiants ci-dessus
- Cliquer "Se Connecter"

### 2. Explorer le Tableau de Bord
- Voir les statistiques clés
- Vérifier les rendez-vous du jour
- Consulter les créances récentes

### 3. Ajouter un Patient
- Cliquer "Nouveau Patient"
- Remplir le formulaire
- Cliquer "Ajouter Patient"

### 4. Créer un Rendez-vous
- Aller dans "Rendez-vous"
- Cliquer "Nouveau RDV"
- Sélectionner le patient et les détails
- Cliquer "Ajouter RDV"

### 5. Enregistrer un Acte
- Aller dans une catégorie d'actes
- Cliquer "Nouvel Acte"
- Remplir les détails
- Cliquer "Ajouter Acte"

### 6. Enregistrer un Paiement
- Aller dans "Suivi des Dettes"
- Cliquer "Payer" sur un acte
- Entrer le montant
- Cliquer "Confirmer Paiement"

## 📁 Structure du Projet

```
smileflow-dental/
├── src/
│   ├── components/       # Composants React
│   ├── hooks/           # Hooks personnalisés
│   ├── lib/             # Utilitaires et contextes
│   ├── routes/          # Pages de l'application
│   └── styles.css       # Styles globaux
├── public/              # Fichiers statiques
├── package.json         # Dépendances
├── vite.config.ts       # Configuration Vite
├── tsconfig.json        # Configuration TypeScript
└── tailwind.config.ts   # Configuration Tailwind
```

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev              # Lancer le serveur de développement

# Production
npm run build            # Construire pour la production
npm run preview          # Prévisualiser la build

# Linting
npm run lint             # Vérifier le code
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts`:
```typescript
colors: {
  burgundy: '#800020',
  // ...
}
```

### Textes

Tous les textes sont en français. Pour changer la langue:
1. Modifier les textes dans les composants
2. Créer un système de traduction (i18n)

### Données Mock

Les données de démonstration sont dans `src/lib/mock-data.ts`:
```typescript
export const patients: Patient[] = [...]
export const actes: Acte[] = [...]
export const rendezVous: RendezVous[] = [...]
```

## 🔄 Flux de Travail Recommandé

### Développement

1. **Créer une branche**
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

2. **Faire les modifications**
- Modifier les fichiers
- Tester localement

3. **Vérifier le code**
```bash
npm run lint
```

4. **Commiter les changements**
```bash
git add .
git commit -m "Ajouter nouvelle fonctionnalité"
```

5. **Pousser et créer une PR**
```bash
git push origin feature/nouvelle-fonctionnalite
```

## 🧪 Tests

### Actuellement
- Pas de tests automatisés
- Tests manuels recommandés

### À Implémenter
- Tests unitaires (Jest)
- Tests d'intégration (Cypress)
- Tests de performance

## 📦 Dépendances Principales

- **React 19**: Framework UI
- **TanStack Router**: Routage
- **Shadcn/UI**: Composants UI
- **Tailwind CSS**: Styling
- **React Hook Form**: Gestion des formulaires
- **Lucide React**: Icônes
- **Zod**: Validation

## 🚨 Dépannage

### Le serveur ne démarre pas
```bash
# Nettoyer les dépendances
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreurs de compilation
```bash
# Vérifier les erreurs TypeScript
npm run lint

# Reconstruire
npm run build
```

### Les données ne se sauvegardent pas
- C'est normal! Les données sont locales
- Elles seront perdues au rechargement
- Supabase sera intégré pour la persistance

### Port 5173 déjà utilisé
```bash
# Utiliser un autre port
npm run dev -- --port 3000
```

## 📚 Documentation

- **IMPLEMENTATION_NOTES.md**: Guide technique détaillé
- **FEATURES_SUMMARY.md**: Résumé des fonctionnalités
- **USER_GUIDE.md**: Guide d'utilisation
- **TECHNICAL_ARCHITECTURE.md**: Architecture technique
- **CHANGELOG.md**: Historique des changements

## 🔗 Ressources Utiles

- [React Documentation](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [Shadcn/UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 🎯 Prochaines Étapes

1. **Intégration Supabase**
   - Configurer la base de données
   - Implémenter l'authentification
   - Migrer les données

2. **Déploiement**
   - Configurer le CI/CD
   - Déployer sur Vercel/Netlify
   - Configurer le domaine

3. **Monitoring**
   - Ajouter Sentry pour les erreurs
   - Configurer les logs
   - Monitorer les performances

## 💡 Conseils

- Utilisez les DevTools React pour déboguer
- Consultez la console du navigateur pour les erreurs
- Utilisez Prettier pour formater le code
- Suivez les conventions de nommage

## 🆘 Support

Pour toute question:
1. Consultez la documentation
2. Vérifiez les issues GitHub
3. Contactez l'équipe

## 📝 Notes

- L'application utilise des données mock
- Aucune donnée n'est persistée
- Supabase sera intégré prochainement
- L'authentification est de démonstration

## ✅ Checklist de Démarrage

- [ ] Node.js installé
- [ ] Dépendances installées
- [ ] Serveur de développement lancé
- [ ] Application accessible sur localhost:5173
- [ ] Connexion réussie avec les identifiants
- [ ] Tableau de Bord visible
- [ ] Données mock chargées

Bon développement! 🚀
