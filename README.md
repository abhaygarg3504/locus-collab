# CollabDoc

## Overview
CollabDoc is a collaborative document editing application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows multiple users to edit documents in real-time, making it ideal for team collaboration.

## Architecture
The application is structured into two main parts: the **frontend** and the **backend**.

### Frontend
- **Framework**: React
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

#### Key Components:
- **App.jsx**: The main application component that renders the routing and layout.
- **Pages**: Contains different pages like AuthPage, Dashboard, and EditorPage.
- **Components**: Reusable components such as Navbar, Login, Register, and Editor.
- **Services**: API service for making HTTP requests and socket service for real-time communication.

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB

#### Key Features:
- **Controllers**: Handle the business logic for authentication and document management.
- **Routes**: Define the API endpoints for user authentication and document operations.
- **Middleware**: Authentication middleware to protect routes.
- **Sockets**: Real-time document editing using WebSockets.

## API Endpoints
### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.

### Documents
- `GET /api/documents`: Retrieve all documents for the authenticated user.
- `POST /api/documents`: Create a new document.
- `PUT /api/documents/:id`: Update an existing document.
- `DELETE /api/documents/:id`: Delete a document.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/abhaygarg3504/locus-collab.git
   ```
2. Navigate to the frontend and backend directories and install dependencies:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
4. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.