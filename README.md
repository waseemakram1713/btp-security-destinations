# SAP BTP Security & Destinations (CAP Node.js)

## 🏗️ Architecture Overview
This project demonstrates a secure, enterprise-grade SAP CAP service that integrates local business logic with external REST APIs via the SAP BTP Destination Service.



## 🔐 Security Flow (RBAC & S2S)
I implemented a multi-tiered security strategy:
1. **User Authentication**: Mocked XSUAA login for local development.
2. **Role-Based Access Control (RBAC)**: 
   - **Admins**: Full access to all data and sensitive fields (Stock).
   - **Viewers**: Masked data access with specific "Public View" labels.
3. **Service-to-Service (S2S)**: A technical user pattern (`SystemAPI` role) for automated machine-to-machine communication.



## 🌐 Destination & Connectivity
Instead of hardcoding URLs, this app uses **Logical Destinations**.
- **Local Dev**: Uses `[development]` profile to point to a mock REST API.
- **Production**: Uses `[production]` profile to bind to the SAP BTP Destination Service.
- **Resilience**: Integrated `@sap-cloud-sdk/resilience` to handle timeouts and retries.

## 🚀 DevOps & CI/CD
- **MTA**: Multi-Target Application configuration for Cloud Foundry.
- **GitHub Actions**: Automated build pipeline to verify `.mtar` generation on every push.

## 💡 Lessons Learned
- **Decoupling is Key**: Using `cds.connect.to` allowed me to swap the data source without changing my business logic.
- **Environment Parity**: Managing `package.json` profiles is essential for a smooth "local-to-cloud" transition.
- **JWT Inspection**: Understanding how CAP handles the `req.user` object is vital for custom security requirements.

graph TD
    User((User/System)) -->|JWT/Auth| AppRouter[App Router / Entry]
    AppRouter -->|Authorized Request| CAP[CAP Service]
    CAP -->|req.user.is| AuthLogic{Auth Logic}
    AuthLogic -->|Admin| FullData[Full Data]
    AuthLogic -->|Viewer| MaskedData[Masked Data]
    CAP -->|cds.connect| Dest[Destination Service]
    Dest -->|REST Call| ExtAPI((External API))