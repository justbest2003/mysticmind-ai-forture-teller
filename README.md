# MysticMind (AI Fortune Teller)

A web application for fortune-telling powered by AI (Google Gemini) with a history tracking system using Firebase.

## Tech Stack
- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Framer Motion
- **Form:** React Hook Form + Zod
- **Routing:** React Router v7
- **AI/LLM:** Google Gemini API (gemini-flash-lite-latest) supporting Streaming Response and AI Safety Guardrails
- **Database & Auth:** Firebase (Firestore + Google Auth)

## Features
- Categorized fortune predictions (Summary, Career, Finance, Relationship, Advice)
- Streaming Response for a typewriter-like real-time reading experience
- Google Account Authentication
- Personalized fortune-telling history page
- Modern, beautiful "Mystic" themed UI design

---

## Local Development Setup

1. Clone this repository or open the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the required API keys:
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   VITE_FIREBASE_API_KEY=...
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

## Running with Docker

If you have Docker installed, you can easily run the project using Docker Compose:

1. Ensure all values in your `.env` file are properly configured.
2. Run the following command:
   ```bash
   docker-compose up --build -d
   ```
3. Open your browser and navigate to `http://localhost:8080`

---

## Development Approach
- **React + Vite:** Chosen for rapid development and excellent performance.
- **Tailwind CSS + shadcn/ui:** Utilized for building beautiful, modern UI components quickly while maintaining high customizability to fit the mystical theme.
- **Prompt Engineering:** The prompt for the **Gemini API** is strictly designed to return structured JSON, allowing the application to display categorized data beautifully using UI Cards.
- **Streaming API:** Implemented to enhance UX, eliminating long wait times while the AI generates responses.
- **Separation of Concerns:** Clear architectural boundaries between UI Components, Pages, Custom Hooks (Logic), and Services (API/DB).
- **AI Safety & Edge Cases:** Implemented rigorous Prompt Guardrails to prevent misuse (e.g., profanity, gambling, predicting death, prompt injection) and proactively prevent junk data from being saved to the database.
