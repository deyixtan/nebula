# Nebula

A full stack web project to emulate container-related services seen in popular cloud platforms.

## Requirements

- Python 3.10
- Node.JS
- Docker

## Environment Set up

### Clone the repository

```
git clone https://github.com/deyixtan/nebula
```

### Install Redis

```
sudo apt install redis
```

### Update backend's .env file

- Rename the `.env.sample` file to `.env`
- The file can be found in `./backend/.env.sample`

### Update frontend and backend config file

- The frontend config file can be found in `./frontend/src/config.jsx`
- The backend config file can be found in `./backend/config.jsx`

### Run the project

**Note: Ensure Docker is running**

1. Start the backend by navigating to `./backend` and run `python3 run.py`
2. Start the frontend by navigating to `./frontend` and run `npm run dev`
