# Fight Atlas

A full-stack UFC-inspired fighter directory built with React, Vite, and Django REST Framework.

## Project structure

- `frontend/` - React + Vite single-page app
- `backend/` - Django REST API

## Run locally

### Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_fighters
python manage.py runserver
```

The API is available at `http://127.0.0.1:8000/api/`.

### Frontend

Install Node.js 20+ first, then:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend uses bundled demo data when the API is unavailable.

