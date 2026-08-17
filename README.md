# Citizens Charter Monitoring

Citizens Charter Monitoring is a full-stack application for postal service operations, complaint handling, and parcel lifecycle tracking.

## Project Structure

- `Backend/` - Spring Boot REST API with JWT-based authentication and MySQL persistence
- `Frontend/citizens-charter-monitoring-system/` - React + Vite web client

## Core Features

- Citizen registration and login
- Postal staff, official, and admin login
- Parcel creation and shipment tracking
- Complaint registration and complaint reporting views
- Dashboard views for clerk, manager, and admin workflows

## Tech Stack

### Backend

- Java 21
- Spring Boot (Web, Security, Data JPA)
- MySQL
- JWT (`jjwt`)

### Frontend

- React 19
- Vite
- React Router
- Material UI + Tailwind CSS

## Prerequisites

- Java 21+
- Maven (or use `./mvnw`)
- Node.js 18+
- npm
- MySQL instance

## Backend Setup

From:

`/home/runner/work/citizens-charter-monitoring/citizens-charter-monitoring/Backend`

Set environment variables used by `application.properties`:

- `DB_driver_class` (example: `com.mysql.cj.jdbc.Driver`)
- `DB_URL` (example: `jdbc:mysql://localhost:3306/charter_monitoring`)
- `DB_username`
- `DB_password`

Run the API:

```bash
./mvnw spring-boot:run
```

## Frontend Setup

From:

`/home/runner/work/citizens-charter-monitoring/citizens-charter-monitoring/Frontend/citizens-charter-monitoring-system`

Create a `.env` file:

```env
VITE_API_END_POINT=http://localhost:8080
```

Install and run:

```bash
npm install
npm run dev
```

## Common API Routes

- `POST /api/citizen/register`
- `POST /api/citizen/login`
- `POST /api/postalstaff/login`
- `POST /api/official/login`
- `POST /api/admin/login`
- `POST /api/v1/parcel/create`
- `GET /api/v1/parcel/track/{trackingId}`
- `POST /api/v1/complaints/create`

## Frontend Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build
