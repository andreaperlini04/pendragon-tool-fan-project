# ⚔️ Pendragon Campaign Tracker (Fan Project)

A modern full-stack web application designed to help Game Masters and players manage their tabletop RPG adventures in the world of **Pendragon**. This tool allows you to track sessions, characters, NPCs, and quests in one intuitive platform.

> **⚖️ Legal Disclaimer:** This is a fan-made project created for educational purposes and for my personal portfolio. It is not affiliated with, endorsed by, or supported by Chaosium Inc. or the copyright holders of *King Arthur Pendragon*. All trademarks belong to their respective owners.

---

## ✨ Features

- **Dashboard**: A quick overview of the current state of your campaign.
- **Session Management**: Detailed logs of events, dates, and outcomes.
- **Character & NPC Registry**: A comprehensive database for knights, allies, and enemies.
- **Quest Tracking**: Manage active and completed objectives with ease.

## 🛠️ Tech Stack

This project leverages a modern, scalable architecture:

### Frontend (React)
- **Framework**: React 18 with Vite (TypeScript).
- **UI Components**: shadcn/ui & Tailwind CSS for a responsive, royal-themed design.
- **Data Fetching**: TanStack Query (React Query) for seamless server synchronization.
- **Icons**: Lucide React.

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.5.7 (Java 17).
- **Persistence**: Spring Data JPA with PostgreSQL driver.
- **Security**: Spring Security for protected API endpoints.
- **Utilities**: Lombok to reduce boilerplate code.

## 📁 Project Structure

The repository is organized as a polyglot monorepo:

```text
pendragon-tool-fan-project/
├── frontend/             # React Application (Vite + TS)
│   ├── src/components/   # Reusable UI components
│   ├── src/pages/        # Dashboard, Characters, Sessions, etc.
│   └── package.json
├── backend/              # Spring Boot API
│   ├── src/main/java/    # Business logic, Controllers, and Models
│   ├── src/main/resources/ # Configuration (application.yaml)
│   └── pom.xml           # Maven dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [JDK 17](https://www.oracle.com/java/technologies/downloads/) or higher
- [Maven](https://maven.apache.org/)

### Backend Setup
1. Navigate to the `backend` directory.
2. Configure your PostgreSQL database in `src/main/resources/application.yaml`.
3. Run the server:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development environment:
   ```sh
   npm run dev
   ```

---

## 🎨 Design System
The application's aesthetic is inspired by epic chivalric themes, utilizing custom HSL CSS variables (such as `--gradient-royal` and `--shadow-card`) to ensure visual consistency and support for Dark/Light modes.

## 📜 License & Credits
- **Code**: Licensed under the MIT License (free for educational consultation).
- **Pendragon Content**: Inspired by the roleplaying game by Chaosium Inc. Please support the original game by visiting their official website.

---
*Developed with ❤️ for the RPG community.*
```
