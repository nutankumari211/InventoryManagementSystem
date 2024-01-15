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


scrrenshots of my website
1. Before login UI
  ![Screenshot (508)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/72ceb572-cc98-4768-8bb9-639955702788)

 ![Screenshot (509)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/35f609ca-dfd0-465a-bdd0-9b48127f8797)


![Screenshot (510)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/2c32810b-9a11-4032-bd7c-f64701a93c1a) 

![Screenshot (511)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/30f02278-1d28-423a-8d55-1d3f8e94fd0b)

2. After Login UI  
![Screenshot (512)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/aa9e0fa3-538e-4e9d-b9a0-290278accd42)

![Screenshot (513)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/094e279d-d9c8-460d-a0ef-a0943c556d5c)

![Screenshot (514)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/a26fc8a0-8215-44af-a562-23fe0bb86e60)

![Screenshot (515)](https://github.com/nutankumari211/InventoryManagementSystem/assets/31533479/33534724-5d90-44d6-bb87-3ac2581c5bd2)

