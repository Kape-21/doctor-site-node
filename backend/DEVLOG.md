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

---

## Backend Architecture Refactor

### Objective
Begin restructuring backend into a more scalable Node.js architecture before adding complex backend logic.

Goal:
- separate Express app configuration from server startup
- prepare project for future API routes, middleware, authentication, validation, and database integration

### New Backend Structure

backend/
├── node_modules/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── .gitignore
├── package.json
├── package-lock.json

### Purpose of New Folders

| Folder | Purpose |
|---|---|
| routes | API endpoint definitions |
| controllers | Request/response handling logic |
| services | Business logic and database operations |
| middleware | Authentication, validation, error handling |
| config | Application and database configuration |
| utils | Reusable helper functions |

### app.js Created

Purpose:
- initialize and configure Express application
- centralize middleware and route registration

Current responsibilities:
- create Express app
- enable JSON parsing middleware
- define basic test route
- export configured app

### server.js Refactored

Purpose:
- only responsible for starting server listener

Current behavior:
- imports Express app from app.js
- starts server on port 3000

### Important Backend Concepts Learned

#### 1. module.exports and require()

Encountered error:

TypeError: app.listen is not a function

Cause:
- incorrect export/import relationship between app.js and server.js

Resolution:
- corrected:
  module.exports = app

Learning:
- Express app instance must be exported correctly for reuse across files

#### 2. npm Command Execution Context

Encountered error:

npm ERR! enoent Could not read package.json

Cause:
- npm command executed from root project directory instead of backend directory

Resolution:
- navigated into backend/ before running:
  npm run dev

Learning:
- npm commands execute relative to current terminal directory
- package.json location determines available scripts and dependencies

### Current Status

Verified working:
- Express server operational
- app.js and server.js separation functioning
- nodemon auto-reload working
- localhost:3000 accessible successfully

Current response:
Backend running

### Current Architecture Flow

Frontend → Node.js/Express Backend → (future database integration)

Migration away from direct frontend-Supabase communication has officially begun.

---

## Route Modularization Setup

### Objective
Begin separating route definitions from core Express app configuration.

Goal:
- avoid placing all routes directly inside app.js
- prepare scalable routing architecture for future API expansion

### New Route File Created

Created:

src/routes/indexRoutes.js

### indexRoutes.js Responsibilities

Current responsibilities:
- create Express Router instance
- define root GET route
- export router module

Current route:

GET /

Current response:
Backend running

### Express Router Concept Learned

Used:

express.Router()

Purpose:
- create modular route handlers
- separate endpoint definitions into dedicated files
- improve maintainability as backend grows

Important understanding:
- Router is not a separate Express app
- Router acts as a modular grouping system for endpoints

### app.js Refactor

Updated app.js to:
- import route module
- register router using:
  app.use('/' , indexRoutes)

Learning:
- app.use() mounts middleware or route modules into the main Express application

### Current Backend Architecture

backend/
├── node_modules/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   └── indexRoutes.js
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── .gitignore
├── package.json
├── package-lock.json

### Architecture Responsibility Separation

| File | Responsibility |
|---|---|
| server.js | Starts HTTP server |
| app.js | Configures Express app |
| routes/*.js | Defines endpoints/routes |

### Verification

Tested successfully:
- nodemon reload functioning
- route modularization functioning
- localhost:3000 accessible
- GET / route responding correctly

### Current Architecture Flow

Frontend → Express App → Route Module → (future controller/service/database layers)

### Next Planned Direction

Future upcoming steps may include:
- API route namespaces
- JSON responses
- controllers
- request validation
- database integration
- appointment APIs
- authentication architecture


---

## API Namespace Expansion and Controller Layer Introduction

### Objective

Continue backend architecture refactoring by:

* testing all modular API routes
* verifying endpoint mounting behavior
* introducing controller architecture
* separating route definitions from request handling logic

Goal:

* establish scalable backend structure gradually before database integration

---

## Route Endpoint Testing

### Tested Endpoints

Verified working:

* GET /
* GET /api/availability
* GET /api/appointments
* GET /api/inquiries
* GET /api/admin

### Verification Results

Confirmed:

* route modules loading correctly
* app.use() namespace mounting functioning
* Express JSON responses functioning
* nodemon auto reload functioning
* backend server operational on port 3000

---

## Backend Debugging and Route Testing Concepts Learned

### 1. Route Mounting Path Behavior

Learned:

Final API endpoint path is determined by:

Mounted Base Path + Router Path

Example:

app.use("/api/admin", adminRoutes)

combined with:

router.get("/", ...)

creates:

/api/admin

Important understanding:

* mounted path in app.js becomes route namespace
* router.get("/") becomes relative to mounted namespace

---

### 2. Express Route Isolation Debugging

Encountered issue:

Cannot GET /api/admin

Resolution process:

* verified route imports
* verified route exports
* added temporary console logging
* isolated route loading behavior
* confirmed proper route mounting

Learning:

* backend debugging should isolate route loading and mounting behavior incrementally

---

## Controller Layer Introduction

### Objective

Separate request handling logic from route modules.

Previous architecture:

Frontend
→ Express App
→ Route Modules
→ Response

Updated architecture:

Frontend
→ Express App
→ Route Modules
→ Controllers
→ Response

---

## New Controllers Created

Created:

src/controllers/

Controller files created:

* availabilityController.js
* appointmentController.js
* inquiryController.js
* adminController.js

---

## Route Refactoring

### Previous Route Pattern

Routes directly handled responses:

router.get("/", (req, res) => {
...
})

### Updated Route Pattern

Routes now delegate handling to controllers:

router.get("/", getAvailability)

Learning:

* route files should remain lightweight
* controllers handle request/response logic

---

## Controller Integration Completed

Successfully connected:

| Route File            | Controller File           |
| --------------------- | ------------------------- |
| availabilityRoutes.js | availabilityController.js |
| appointmentRoutes.js  | appointmentController.js  |
| inquiryRoutes.js      | inquiryController.js      |
| adminRoutes.js        | adminController.js        |

---

## Node.js Import/Export Debugging

### Major Error Encountered

TypeError: argument handler must be a function

Cause:

* import/export mismatch between controller files and route files

Example issue:

module.exports = getAvailability

combined with:

const { getAvailability } = require(...)

Result:

* imported value became undefined
* Express router expected function handler but received undefined

---

## Resolution

Standardized export/import pattern across backend.

Chosen structure:

### Controller Export Pattern

module.exports = {
getAvailability,
}

### Route Import Pattern

const {
getAvailability,
} = require("../controllers/availabilityController")

Learning:

* export/import consistency is critical in modular Node.js architecture

---

## Important Backend Concepts Learned

### 1. Separation of Concerns

Routes:

* define endpoints
* connect middleware/controllers

Controllers:

* process requests
* generate responses

---

### 2. Express Route Handlers

Express router methods require valid callback functions.

Example:

router.get("/", handlerFunction)

Undefined handlers crash backend startup.

---

### 3. Modular Backend Refactoring

Refactored one module at a time:

1. availability
2. appointments
3. inquiries
4. admin

Learning:

* gradual refactoring simplifies debugging
* easier architecture understanding
* safer backend evolution

---

## Current Backend Architecture

Frontend
→ Express App
→ Route Modules
→ Controllers
→ Response

---

## Current Backend Status

Verified working:

* route modularization
* controller layer integration
* route-controller connections
* endpoint testing
* JSON API responses
* nodemon auto reload
* import/export consistency

Current backend domains:

* index
* availability
* appointments
* inquiries
* admin

---

## Future Planned Direction

Upcoming backend stages may include:

* standardized API response structure
* service layer introduction
* request validation middleware
* async error handling
* PostgreSQL integration
* Prisma ORM setup
* scheduling business logic
* appointment creation APIs
* admin scheduling controls
* authentication architecture
