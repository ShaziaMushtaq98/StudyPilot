# Study Pilot

[![CI Pipeline](https://github.com/ShaziaMushtaq98/StudyPilot/actions/workflows/ci.yml/badge.svg)](https://github.com/ShaziaMushtaq98/StudyPilot/actions)
![Methodology](https://img.shields.io/badge/Methodology-Agile%20%2F%20Scrum-blue)
![Version](https://img.shields.io/badge/Deliverable-D1%20Submission-green)

> **Final Year Design Project (FYDP-DSE)**  
> Department of Software Engineering (DSE)  
> Faculty of Computing and Information Technology (FCIT), University of the Punjab, Lahore.

---

## 📌 Project Overview

**Study Pilot** is an AI-powered academic companion and tracking platform designed to help students work through their homework while giving parents and instructors visibility into their progress.

- **Problem Statement:** Existing academic platforms lack real-time automated progress tracking and intelligent schedule assistance, resulting in communication gaps between instructors, parents, and students.
- **Target Audience:** University and school students, faculty instructors, and parents.
- **Solution:** A unified web platform providing continuous progress tracking, automated learning assistance, and responsive scheduling metrics.

---

## 👥 Group & Supervision Details

- **Group ID:** BSEF23-59
- **Degree Program:** BS Software Engineering (2023–2027)

### **Team Members**
| Name | Roll Number |
| :--- | :--- |
| **Shazia Mushtaq** | BSEF23M551 |
| **Fatima Tahir** | BSEF23M537 |

### **Project Supervision**
- **Primary Supervisor:** Dr. Muddassira Arshad, *Assistant Professor*

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** ASP.NET Core
- **Database:** PostgreSQL
- **AI Integration:** Azure OpenAI / OpenAI
- **Version Control & CI/CD:** Docker, Git, GitHub Actions (`.github/workflows/ci.yml`)
- **Design Tools:** Figma (UI/UX Prototypes)

---

## 🌿 Git Branching Strategy & Workflow

This repository strictly adheres to standard Agile software engineering practices:

- `main` — Contains stable, production-ready code for evaluation builds.
- `develop` — Acts as the integration branch for ongoing sprint features.
- `feature/<feature-name>` — Dedicated isolated branches for distinct functional stories (e.g., `feature/login-ui`, `feature/database-schema`).

### **Contribution Pipeline**
1. Checkout a dedicated feature branch from `develop`.
2. Commit granular changes with descriptive messages.
3. Open a **Pull Request (PR)** against `develop` for peer review prior to merging into `main`.

---

## 📋 Definition of Done (DoD)

A feature/story is marked as **Done** when:
- [x] Source code is pushed to the respective `feature/` branch and merged via Pull Request.
- [x] Implementation meets predefined story Acceptance Criteria.
- [x] Code contains zero critical runtime errors or build blockers.
- [x] Automated CI build workflow completes successfully.
- [x] Basic UI/UX or API endpoint functionality is ready for demonstration.