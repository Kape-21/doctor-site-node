# Doctor Site Node - Development Log

## Day 1 - Initial Setup

### Goals
- Start migration from frontend-only architecture to Node.js backend architecture
- Separate frontend and backend properly

### Actions Taken
- Created GitHub repository
- Created project structure:
  - frontend/
  - backend/
- Uploaded frontend files
- Initialized backend Node.js project using:
  npm init -y

### Current Backend State
- package.json created
- Node.js version: v24.x
- npm working correctly

### Notes
- Using VS Code terminal
- GitHub repo connected successfully

---

## Backend Initialization

### Installed Packages
- express

Command used:
npm install express

### Backend Structure Created

backend/
├── node_modules/
├── src/
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json

### .gitignore Contents

node_modules
.env

### First Express Server

Created:
src/server.js

Features:
- Express app initialized
- Server runs on port 3000
- GET route `/` created

Test URL:
http://localhost:3000

Result:
Backend server is running

---

## Development Workflow Setup

### Installed Dev Dependency
- nodemon

Command used:
npm install --save-dev nodemon

### Purpose of Nodemon
Nodemon automatically restarts the Node.js server whenever backend files are changed and saved during development.

This avoids manually stopping and restarting the server after every edit.

### Updated package.json Scripts

"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}

### Run Commands

Production mode:
npm start

Development mode:
npm run dev

### Nodemon Test
Modified server response text in:
src/server.js

Observed:
- server restarted automatically
- browser reflected updated response successfully

### Current Backend Capabilities
- Express server operational
- Route handling working
- Auto-reload development workflow configured