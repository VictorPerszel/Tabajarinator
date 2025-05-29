# Tabajarinator

Study project to evaluate my football colleagues and to separate the teams automatically!

# How to run

## Prerequisites

Before running the project, ensure you have the following installed:

- [Python](https://www.python.org/downloads/) (version X.X or higher)
- [Node.js](https://nodejs.org/) (includes npm, version X.X or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (version X.X or higher)
- [React](https://reactjs.org/) (will be installed via npm)

## Setup Instructions

### Backend Setup (Django)

1. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

2. **Install Python dependencies**:
    ```bash
    pip install django djangorestframework django-allauth django-cors-headers psycopg2-binary
    
3. **Database setup**:
    Create a PostgreSQL database for the project
    Update the database settings in settings.py with your credentials
4. **Run migrations**:
    ```bash
    python manage.py makemigrations
    python manage.py migrate


### Frontend Setup (React)

1. **IInstall Node.js dependencies**:
    ```bash
    npm install
2. **IInstall Tailwind CSS and dependencies**:
    ```bash
    npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

### Running the Project

1. **Start the Django development server**:
    ```bash
    python manage.py runserver
2. **Start the React development server (in a separate terminal)**:
    ```bash
    npm run dev

Access the application at:
Frontend: http://localhost:3000
Backend: http://localhost:8000
