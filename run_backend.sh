echo "setting up backend"
cd backend_env
source bin/activate
cd ../backend
python3 manage.py runserver
