# Project Name

This project is a full-stack application built with React (using Vite) for the frontend and FastAPI for the backend.

## Prerequisites

- Node.js and npm (for React app)
- Python 3.8+ (for FastAPI backend)
- pip (Python package manager)

## Setup

### Backend (FastAPI)

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the development server:**
   ```bash
   uvicorn main:app --reload
   ```

### Frontend (React with Vite)

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Update the Backend URL:**

   - Go to frontend/src/Const.ts
   - Update the value of "backendURL" with the URL of the backend

4. **Run the development server:**

   ```bash
   npm run dev
   ```
