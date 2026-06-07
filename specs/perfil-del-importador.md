# Importer Profile Specification

## Purpose

The Importer Profile allows iTrace to personalize import simulations according to the user's operational and fiscal situation.

The profile is collected once and reused across all simulations during the active session.

This is a simplified MVP model for the hackathon and does not represent the complete Argentine import regulatory framework.

---

# Functional Goals

The importer profile is used to:

* Personalize regulatory requirements.
* Personalize import restrictions.
* Adjust the Import Readiness Score.
* Pre-fill future managed import service requests.
* Associate simulations with a specific importer profile.

---

# Profile Data

## User Type

The user must select one option.

```ts
type ImporterType =
  | "consumer"
  | "monotributista"
  | "responsable_inscripto"
  | "empresa";
```

Display labels:

| Value                 | Label                 |
| --------------------- | --------------------- |
| consumer              | Consumidor Final      |
| monotributista        | Monotributista        |
| responsable_inscripto | Responsable Inscripto |
| empresa               | Empresa               |

Notes:

* Categories are simplified.
* Categories are used only for simulation purposes.

---

## Economic Activity

The user must select one activity.

Available options:

```ts
type EconomicActivity =
  | "technology"
  | "electronics"
  | "home"
  | "textile"
  | "food"
  | "pharma"
  | "construction"
  | "other";
```

Display labels:

* Tecnología
* Electrónica
* Hogar
* Textil
* Alimentos
* Farmacia
* Construcción
* Otros

---

## Country of Operation

For MVP:

```ts
country = "Argentina"
```

The field is visible but currently fixed.

Future versions may support additional countries.

---

## Fiscal Information

Required fields:

```ts
{
  taxId: string;
  taxCondition: string;
}
```

Display labels:

* CUIT / CUIL
* Condición Fiscal

Example conditions:

* Consumidor Final
* Monotributista
* Responsable Inscripto

Validation may be simplified for MVP.

---

# Profile Completion Rules

A profile is considered complete when:

* User Type selected
* Economic Activity selected
* Country selected
* Tax ID provided
* Tax Condition provided

Otherwise:

```ts
profile.isComplete = false
```

---

# Import Readiness Score Integration

Base score rules remain unchanged.

Additional profile-based deductions:

| Condition              | Penalty |
| ---------------------- | ------- |
| Incomplete profile     | -20     |
| Consumer profile       | -15     |
| Monotributista profile | -5      |
| Responsable Inscripto  | 0       |
| Empresa                | 0       |

Example:

Base score: 100

Consumer:
100 - 15 = 85

Consumer + incomplete profile:
100 - 15 - 20 = 65

---

# Permission Ownership

The profile can declare existing permissions.

For MVP:

```ts
ownedPermissions: string[]
```

Example:

```ts
["PE1"]
```

Rule:

If the importer already owns a required permission:

* Do not apply the missing-permission penalty.
* Show the permission as already available.

---

# Simulation Integration

Every simulation must be linked to the active importer profile.

```ts
simulation.importerProfileId
```

For MVP, a single active profile exists.

---

# Persistence

The profile is stored in localStorage.

Example key:

```ts
itrace.importerProfile
```

Rules:

* Only one profile can exist.
* No authentication required.
* Data survives page refresh.
* Data survives browser restart.

---

# User Flow

1. User enters platform.
2. User completes importer profile.
3. User searches product.
4. User runs simulation.
5. System calculates:

   * Costs
   * Logistics
   * Taxes
   * Permissions
   * Risks
   * Import Readiness Score
6. User reviews report.
7. User may request managed import service.

---

# Managed Service Integration

Not implemented in MVP.

The importer profile must be reusable in future managed-service workflows.

No payment processing required.

No document submission required.

No real regulatory validation required.

---

# UI Requirements

The profile screen should follow the existing SaaS design language.

Visual references:

* Stripe
* Linear
* Notion

Requirements:

* Clean card layout
* Minimal visual noise
* Responsive design
* Clear form validation
* Progress indicator for profile completion

Example:

Profile Completion: 80%

This completion percentage may be reused in the Import Readiness Score screen.
