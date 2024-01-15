## Project Structure
backend: Node.js backend using Sequelize for MySQL interactions.
frontend: React frontend using Vite for development.

This guide provides step-by-step instructions for setting up a project using Vite for React on the frontend and Node.js with Sequelize for MySQL Workbench on the backend.

## Prerequisites

- Node.js and npm installed
- MySQL Workbench installed
- Git installed(optional)

## Getting Started

### Backend Setup (Node.js with Sequelize)

1. Clone the repository or just download the zip file from github repository and unzip it:

   git clone <repository-url>

2. cd server
3. npm install
Configure the database:

Open server/config/config.json and update the development database configuration with your MySQL credentials.
Create the database:

npx sequelize-cli db:create

npx sequelize-cli db:migrate

4. npm start  The backend will be accessible at http://localhost:8000


## Frontend Setup (Vite for React)
Navigate to the frontend folder:

1. cd client
Install dependencies:

2. npm install
Start the Vite development server:

3. npm run dev
The frontend will be accessible at http://localhost:5173



