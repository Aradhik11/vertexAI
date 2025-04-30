# Creator Dashboard

A full-stack application for content creators to manage their content, credits, and user interactions.

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Role-based access control

- **Content Management**
  - Feed system for content sharing
  - Credit system for user interactions
  - User profile management

- **Dashboard Features**
  - Real-time updates
  - Responsive design
  - Modern UI with Tailwind CSS

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB Atlas account

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Aradhik11/vertexAI.git
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   cd server
   npm install
   cd ..
   ```

3. Create a `.env` file in the server directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. In a new terminal, start the backend server:
   ```bash
   cd server
   npm start
   ```

The application will be available at `http://localhost:5173`

## Deployment to Google Cloud Run

### Prerequisites
- Google Cloud account
- Google Cloud project
- GitHub repository

### Deployment Steps

1. **Prepare the Application**
   - Ensure all code is pushed to GitHub
   - Verify the Dockerfile and .dockerignore are in place
   - Check that environment variables are properly configured

2. **Google Cloud Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Cloud Run API
   - Enable Cloud Build API

3. **Deploy to Cloud Run**
   - Go to Cloud Run in the console
   - Click "Create Service"
   - Choose "Continuously deploy new revisions from a source repository"
   - Connect your GitHub repository
   - Configure the service:
     - Service name: your-app-name
     - Region: us-central1
     - Memory: 512Mi
     - CPU: 1
     - Container port: 8080
   - Add environment variables:
     - MONGODB_URI: your_mongodb_connection_string
     - JWT_SECRET: your_jwt_secret
     - PORT: 8080

4. **Post-Deployment**
   - Your application will be available at: `https://your-app-name-xxxxx-uc.a.run.app`
   - Monitor the deployment in Cloud Run dashboard
   - Set up custom domain (optional)

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 8080)

## Build Context Directory
The build context directory is the root directory of your project (where the Dockerfile is located). This directory contains:
- Frontend source code
- Backend server code
- Package files
- Configuration files

When building the Docker image, all files in this directory (except those in .dockerignore) will be sent to the Docker daemon. 