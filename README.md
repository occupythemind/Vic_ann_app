# Vic_ann_app — Django README (Terminal-focused)

Quick terminal-first instructions to set up and run this Django project.

Prerequisites
- Python 3.8+ installed and available as `python3`
- Git (optional)
- pip available
- (Optional) PostgreSQL, Redis, or other services if used by project

Clone (if needed)
```bash
git clone <repo-url> .
```

1) Create & activate a virtual environment
```bash
# from project root
python3 -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows (PowerShell)
.venv\Scripts\Activate.ps1
```

2) Upgrade pip and install dependencies
```bash
pip install --upgrade pip
# If a requirements file exists:
pip install -r requirements.txt
# Otherwise install Django and extras:
pip install django
```

3) Environment configuration
- Create a `.env` or export variables in the shell for local development. Typical vars:
    - SECRET_KEY
    - DEBUG=True
    - ALLOWED_HOSTS=localhost,127.0.0.1
    - DATABASE_URL or DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT
Example (export in terminal):
```bash
export SECRET_KEY="replace-with-secure-key"
export DEBUG="True"
export ALLOWED_HOSTS="127.0.0.1,localhost"
```
If using a `.env` loader (django-environ or python-dotenv), create `.env` with the above keys.

4) Database setup
```bash
# Run migrations
python manage.py migrate

# (Optional) Create a superuser
python manage.py createsuperuser
```

5) Run development server
```bash
python manage.py runserver 0.0.0.0:8000
# Open http://127.0.0.1:8000
```

6) Static files (for production or manual collection)
```bash
# collect static to STATIC_ROOT
python manage.py collectstatic --noinput
```

7) Tests & linting
```bash
# run tests
python manage.py test

# linting example (if flake8 installed)
flake8 .
```

8) Create/refresh requirements
```bash
pip freeze > requirements.txt
```

9) Common deployment notes (brief)
- Use a production WSGI server (gunicorn/uvicorn) behind a web server (nginx).
- Set DEBUG=False, configure ALLOWED_HOSTS and a secure SECRET_KEY.
- Use a production DB (Postgres) and configure secure credentials.
- Configure static/media serving (nginx + collectstatic or cloud storage).
- Run migrations and collectstatic during deploy.

Useful commands cheat-sheet
```bash
# activate venv
source .venv/bin/activate

# install deps
pip install -r requirements.txt

# apply DB changes
python manage.py makemigrations
python manage.py migrate

# create admin
python manage.py createsuperuser

# run dev server
python manage.py runserver

# run tests
python manage.py test
```

If additional project-specific setup is required (external services, special settings, or scripts), add those instructions below this file.