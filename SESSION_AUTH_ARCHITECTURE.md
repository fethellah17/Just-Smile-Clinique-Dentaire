# Session Authentication Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Just Smile Application                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  AuthProvider    │
                    │  (auth-context)  │
                    └──────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
        ┌──────────────┐          ┌──────────────────┐
        │ SessionStorage│          │  DataProvider    │
        │              │          │  (data-context)  │
        │ Auth Token   │          └──────────────────┘
        │ (cleared on  │                   │
        │  refresh)    │          ┌────────┴────────┐
        └──────────────┘          ▼                 ▼
                            ┌──────────┐    ┌──────────────┐
                            │LocalStorage   │  Mock Data   │
                            │              │              │
                            │ Patients     │ (fallback)   │
                            │ Appointments │              │
                            │ Actes        │              │
                            │ Categories   │              │
                            └──────────────┘    └──────────────┘
```

## Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    App Initialization                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ AuthProvider     │
                    │ initializes      │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Check            │
                    │ SessionStorage   │
                    │ for token        │
                    └──────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌──────────────┐          ┌──────────────┐
        │ Token Found  │          │ No Token     │
        │              │          │              │
        │ isAuth=true  │          │ isAuth=false │
        │ isInit=true  │          │ isInit=true  │
        └──────────────┘          └──────────────┘
                │                           │
                ▼                           ▼
        ┌──────────────┐          ┌──────────────┐
        │ Show         │          │ Show         │
        │ Dashboard    │          │ LoginPage    │
        └──────────────┘          └──────────────┘
```

## Login Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    LoginPage Component                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ User enters      │
                    │ credentials      │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Click            │
                    │ "Se connecter"   │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Validate         │
                    │ credentials      │
                    └──────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌──────────────┐          ┌──────────────┐
        │ Valid        │          │ Invalid      │
        │              │          │              │
        │ Set token in │          │ Show error   │
        │ SessionStorage          │ message      │
        │              │          │              │
        │ Redirect to  │          │ Clear form   │
        │ Dashboard    │          │              │
        └──────────────┘          └──────────────┘
```

## Page Refresh Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Presses F5                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Browser clears   │
                    │ SessionStorage   │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ App reloads      │
                    │ AuthProvider     │
                    │ initializes      │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Check            │
                    │ SessionStorage   │
                    │ (empty)          │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ isAuth = false   │
                    │ isInit = true    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Show LoginPage   │
                    │                  │
                    │ LocalStorage     │
                    │ data still there │
                    └──────────────────┘
```

## Logout Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Clicks Logout                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ handleLogout()   │
                    │ called           │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ logout()         │
                    │ from useAuth()   │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Clear            │
                    │ SessionStorage   │
                    │ token            │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Set              │
                    │ isAuth = false   │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ router.navigate  │
                    │ to "/"           │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Show LoginPage   │
                    │ (no auth token)  │
                    └──────────────────┘
```

## Data Persistence Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    DataProvider Context                      │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌──────────────┐          ┌──────────────┐
        │ On Mount     │          │ On Change    │
        │              │          │              │
        │ Load from    │          │ Save to      │
        │ LocalStorage │          │ LocalStorage │
        │              │          │              │
        │ If empty:    │          │ Patients     │
        │ Use mock     │          │ Appointments │
        │ data         │          │ Actes        │
        │              │          │ Categories   │
        └──────────────┘          └──────────────┘
                │                           │
                └─────────────┬─────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Data available   │
                    │ in context       │
                    │                  │
                    │ Persists across: │
                    │ - Refresh        │
                    │ - Logout         │
                    │ - Tab close      │
                    └──────────────────┘
```

## Storage Separation Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Storage                           │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌──────────────┐          ┌──────────────┐
        │ SessionStorage           │ LocalStorage │
        │              │          │              │
        │ Auth Token   │          │ Patients     │
        │ (temporary)  │          │ Appointments │
        │              │          │ Actes        │
        │ Cleared on:  │          │ Categories   │
        │ - Refresh    │          │              │
        │ - Tab close  │          │ Persists on: │
        │ - Logout     │          │ - Refresh    │
        │              │          │ - Tab close  │
        │              │          │ - Logout     │
        └──────────────┘          └──────────────┘
```

## Route Protection Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Route Access                              │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌──────────────┐          ┌──────────────┐
        │ Authenticated            │ Not Authenticated
        │              │          │              │
        │ ✓ /          │          │ → LoginPage  │
        │ ✓ /patients  │          │              │
        │ ✓ /rendez-vous          │ ✓ /          │
        │ ✓ /dettes    │          │ (shows login)│
        │ ✓ /config    │          │              │
        │              │          │              │
        │ Show content │          │ Show login   │
        │ Load data    │          │ form         │
        └──────────────┘          └──────────────┘
```

## Component Hierarchy

```
App
├── AuthProvider
│   ├── isAuthenticated
│   ├── isInitialized
│   ├── login()
│   └── logout()
│
├── DataProvider
│   ├── patients
│   ├── rendezVous
│   ├── actes
│   ├── categories
│   └── CRUD operations
│
└── Routes
    ├── / (Dashboard)
    │   └── Check: isInitialized && isAuthenticated
    ├── /patients
    │   └── Check: isInitialized && isAuthenticated
    ├── /rendez-vous
    │   └── Check: isInitialized && isAuthenticated
    ├── /dettes
    │   └── Check: isInitialized && isAuthenticated
    └── /configurations/categories
        └── Check: isInitialized && isAuthenticated
```

## State Management

```
AuthContext
├── isAuthenticated: boolean
│   └── Determines if user can access protected routes
├── isInitialized: boolean
│   └── Prevents flash of content during initialization
└── login/logout functions
    └── Manage SessionStorage token

DataContext
├── patients: Patient[]
├── rendezVous: RendezVous[]
├── actes: Acte[]
├── categories: Category[]
└── CRUD operations
    └── Automatically sync with LocalStorage
```

---

**Key Principle**: Authentication is temporary (SessionStorage), Data is permanent (LocalStorage)
