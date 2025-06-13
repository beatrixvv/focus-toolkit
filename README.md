## Focus Toolkit
This React-based productivity app combines several focus-enhancing tools in one interface, including a to-do list, stopwatch, hydration reminders, and a YouTube player. 

## 📦 Features
- ✅ To-Do List: Organize and track your daily tasks
- ⏱️ Stopwatch: Measure your focused work sessions
- 💧 Drink Reminder: Get alerts to stay hydrated at regular intervals
- 🎵 YouTube Player: Play background music or videos while working
- 🌈 Dynamic Background: Smoothly transitioning background colors to keep the interface lively

Tech Stack
React with TypeScript

CSS

Bootstrap Icons

Getting Started
Prerequisites
Node.js and npm

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/focus-toolkit.git
cd focus-toolkit
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
or if you're using Create React App:

bash
Copy
Edit
npm start
Project Structure
App.tsx – Main container that brings together all components.

ToDo.tsx – Handles task creation and management.

MyStopwatch.tsx – Stopwatch component with control callbacks.

DrinkReminder.tsx – Plays audio reminders based on stopwatch activity.

YouTube.tsx – Embedded YouTube player.

backgroundColor.ts – Function that returns the current background color.

Notes
The background color changes every 10 seconds using a linear transition.

The drink reminder audio only plays when the stopwatch is running.

Make sure to include audio files (e.g., water-break.mp3) in the correct location and formats.