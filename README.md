# ada-project

Sistema de gestión de clientes, suscripciones, facturación recurrente y conciliación bancaria.

## Diagramas de Clases

El diagrama de clases principal se encuentra en [`doc/src/class-diagrams/ClassDiagram.pu`](doc/src/class-diagrams/ClassDiagram.pu) (renderizado en [`doc/class-diagrams/ClassDiagram.png`](doc/class-diagrams/ClassDiagram.png) y [`doc/class-diagrams/ClassDiagram.svg`](doc/class-diagrams/ClassDiagram.svg)).

Está diseñado como **un único diagrama legible** centrado en el flujo principal del sistema bajo una arquitectura por capas (Presentation, Application, Domain e Infrastructure):

1. **Presentation (`com.invoicingsystem.presentation`):** Vistas de entrada (`PortalDashboardView`, `CustomerManagementView`, `InvoicingView`, `ReconciliationView`) que delegan las acciones del usuario en los controladores de aplicación.
2. **Application (`com.invoicingsystem.application`):** Controladores con responsabilidad única (`AccessController`, `CustomerController`, `SubscriptionController`, `InvoicingController`, `FinancialPeriodController`, `ReconciliationController`) que orquestan los casos de uso troncales.
3. **Domain (`com.invoicingsystem.domain`):**
   - **Acceso:** `User` y `AccessRole` para control de permisos.
   - **CRM y Suscripciones:** `Customer`, `Contact`, `BillingPlan` y `Subscription` modelan el alta de empresas, sus contactos y los acuerdos de facturación recurrente.
   - **Facturación y Períodos:** `Invoice`, `InvoiceLine` y `FinancialPeriod` gestionan el ciclo de vida de facturas recurrentes/manuales y el cierre contable.
   - **Conciliación y Notificaciones:** `BankTransaction`, `PaymentAllocation` y `Notification` enlazan los cobros bancarios con las facturas y los avisos al cliente o usuario.
   - **Puertos (`<<interface>>`):** `BankingPaymentGateway`, `NotificationGateway` y `BusinessCalendarService`.
4. **Infrastructure (`com.invoicingsystem.infrastructure`):** Adaptadores concretos (`BankingApiAdapter`, `SmtpNotificationAdapter`, `RegionalCalendarAdapter`) que implementan los puertos del dominio.

### Renderizado de diagramas

```bash
node scripts/render-diagrams.js --svg
```
