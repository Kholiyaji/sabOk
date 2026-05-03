# Subok (सुबक) - Safety First

Subok is a safety-ping and family circle application built with Next.js. It allows users to stay connected with their family and trusted contacts, providing real-time status updates and emergency location sharing.

## 🚀 Features

- **Safety Ping**: Quickly update your status to let your family know you're safe.
- **Family Circle**: Keep track of your family members' status and last seen times.
- **Trusted Contacts**: Manage a list of contacts who will be notified if you're inactive.
- **Location Sharing**: Share your current location with your trusted contacts instantly.
- **Multi-language Support**: Fully localized in English and Hindi (सुबक).
- **Do Not Disturb (DND)**: Schedule quiet hours to pause alerts during sleep.
- **Onboarding Flow**: Easy setup for language preferences and emergency contacts.

## 🛠️ Built With

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Context API**: For global state management (language, contacts, status).
- **Styling**: Tailwind CSS (via `globals.css`).

## 📁 Project Structure

- `src/app/`: Next.js App Router pages (Home, Family, Settings, Onboarding).
- `src/components/`: Reusable UI components like Navigation, Header, and Modals.
- `src/context/`: `AppContext` for managing global user state and preferences.
- `src/lib/`: Utility functions and static translations.

## 🚦 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## 📄 License

This project is private and intended for personal/family safety use.
