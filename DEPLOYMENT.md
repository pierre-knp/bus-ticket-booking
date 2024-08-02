# Deployment Guide

## Overview

This document provides instructions on how to deploy the frontend and backend applications both with and without Docker for local development.

## Local Development Without Docker

### Frontend

1. **Navigate to the Frontend Directory**

    ```bash
    cd frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Run the Development Server**

    ```bash
    npm start
    ```

    - The frontend will be accessible at `http://localhost:3000`.

4. **Build for Production** (optional)

    ```bash
    npm run build
    ```

    - This will create static files in the `build` directory.

### Backend

1. **Navigate to the Backend Directory**

    ```bash
    cd backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Run the Development Server**

    ```bash
    npm start
    ```

    - The backend will be accessible at `http://localhost:8080`.

4. **Build for Production** (optional)

    ```bash
    npm run build
    ```

5. **Set Up Environment Variables**

    - Ensure to configure any necessary environment variables using `.env` files or directly in your development environment.

## Local Development With Docker

### Docker Setup

1. **Create Dockerfiles**

    **Frontend Dockerfile** (`frontend/Dockerfile`):

    ```dockerfile
    # Stage 1: Build the React application
    FROM node:14 AS build

    WORKDIR /app

    COPY package.json package-lock.json ./
    RUN npm install
    COPY . ./
    RUN npm run build

    # Stage 2: Serve the React application using Nginx
    FROM nginx:alpine

    COPY --from=build /app/build /usr/share/nginx/html

    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```

    **Backend Dockerfile** (`backend/Dockerfile`):

    ```dockerfile
    FROM node:14

    WORKDIR /app

    COPY package.json package-lock.json ./
    RUN npm install

    COPY . ./
    RUN npm run build # Optional, if you have a build step

    EXPOSE 8080
    CMD ["node", "bin/www"]
    ```

2. **Create `docker-compose.yml` File**

    **`docker-compose.yml`**:

    ```yaml
    version: '3.8'

    services:
      frontend:
        build:
          context: ./frontend
        ports:
          - "80:80"

      backend:
        build:
          context: ./backend
        ports:
          - "8081:8080"
    ```

3. **Build and Run Containers**

    Run Docker Compose to build and start the containers:

    ```bash
    sudo docker-compose up --build
    ```

    - **Frontend**: Accessible at `http://localhost`.
    - **Backend**: Accessible at `http://localhost:8081`.

4. **Stop and Remove Containers**

    To stop and remove the containers:

    ```bash
    sudo docker-compose down
    ```

## Summary

- **Without Docker**: Install dependencies and run development servers for frontend and backend separately.
- **With Docker**: Use Dockerfiles and Docker Compose for building images and managing containers.
