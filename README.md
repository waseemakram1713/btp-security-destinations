# SAP BTP Security & Destinations (CAP Node.js)

A production-grade implementation of the SAP Cloud Application Programming Model (CAP) focusing on security and external connectivity.

## 🌟 Key Features
- **Phase 1: Authentication**: XSUAA-style login using `mocked-auth`.
- **Phase 2: RBAC**: Role-based access control (Admin vs. Viewer) using `@restrict` and custom logic.
- **Phase 3: Destinations**: External API consumption via SAP BTP Destination Service.
- **Phase 4: S2S Security**: Service-to-Service security patterns using technical users.
- **Phase 5: Cloud Ready**: Fully configured `mta.yaml` for SAP BTP Cloud Foundry.

## 🛠️ Tech Stack
- SAP CAP (Node.js)
- SAP Cloud SDK
- SQLite (Local) / SAP HANA (Production)
- XSUAA (Security)

## 🚦 How to run locally
1. `npm install`
2. `cds watch`
3. Use `tests.http` to test different roles (Alice, Bob, Internal-Tool).