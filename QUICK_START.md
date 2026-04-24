# Démarrage Rapide - Just Smile

## 🚀 En 3 Étapes

### 1️⃣ Installer et Lancer
```bash
npm install
npm run dev
```

### 2️⃣ Se Connecter
- Email: `dr.souidi@justsmile.dz`
- Mot de passe: `admin123`

### 3️⃣ Commencer à Utiliser
- Accéder à http://localhost:5173
- Cliquer sur \"Nouveau Patient\" pour ajouter un patient
- Cliquer sur \"Nouveau RDV\" pour créer un rendez-vous
- Cliquer sur \"Nouvel Acte\" pour enregistrer un acte

## 📱 Navigation Principale

```
Tableau de Bord (/)
├── Patients (/patients)
│   └── Dossier Patient (/patients/$patientId)
├── Rendez-vous (/rendez-vous)
├── Suivi des Dettes (/dettes)
└── Actes par Catégorie (/actes/*)
    ├── Soins de base
    ├── Chirurgie
    ├── Prothèses
    ├── Esthétique
    └── Orthodontie
```

## 🎯 Tâches Courantes

### Ajouter un Patient
1. Cliquer \"Nouveau Patient\"
2. Remplir le formulaire
3. Cliquer \"Ajouter Patient\"

### Créer un Rendez-vous
1. Aller dans \"Rendez-vous\"
2. Cliquer \"Nouveau RDV\"
3. Sélectionner le patient et les détails
4. Cliquer \"Ajouter RDV\"

### Enregistrer un Acte
1. Aller dans une catégorie d'actes
2. Cliquer \"Nouvel Acte\"
3. Remplir les détails
4. Cliquer \"Ajouter Acte\"

### Enregistrer un Paiement
1. Aller dans \"Suivi des Dettes\"
2. Cliquer \"Payer\" sur un acte
3. Entrer le montant
4. Cliquer \"Confirmer Paiement\"

## 🎨 Couleurs

- **Burgundy**: #800020 (boutons primaires)
- **Vert**: Montants versés
- **Rouge**: Montants restants

## 📊 Données Mock

- 5 patients
- 6 actes
- 5 rendez-vous

## 🔄 Fonctionnalités Clés

✅ Recherche fonctionnelle
✅ Calcul automatique du reste à payer
✅ Statuts cliquables
✅ Confirmations de suppression
✅ Design responsive
✅ Tous les textes en français

## 📚 Documentation

- **USER_GUIDE.md**: Guide d'utilisation complet
- **TESTING_GUIDE.md**: 37 scénarios de test
- **TECHNICAL_ARCHITECTURE.md**: Architecture technique
- **GETTING_STARTED.md**: Guide de démarrage détaillé

## 🆘 Aide Rapide

### Le serveur ne démarre pas
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Les données ne se sauvegardent pas
C'est normal! Les données sont locales. Supabase sera intégré pour la persistance.

### Je ne peux pas me connecter
Vérifiez les identifiants:
- Email: `dr.souidi@justsmile.dz`
- Mot de passe: `admin123`

## ✅ Checklist

- [ ] Node.js installé
- [ ] Dépendances installées
- [ ] Serveur lancé
- [ ] Application accessible
- [ ] Connexion réussie
- [ ] Données visibles

## 🎉 Prêt!

L'application est prête pour la démonstration et les tests utilisateur.

Pour plus d'informations, consultez la documentation complète.
