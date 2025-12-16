# Telegram Chat Frontend - Deploy to Render

This guide explains how to deploy the Telegram Chat frontend to Render, a cloud platform for hosting web applications.

## Prerequisites

- A Render account
- Access to the GitHub repository
- Understanding of environment variables needed for the application

## Deployment Steps

1. Fork or use the existing repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Use the Docker environment for deployment
5. Set the appropriate environment variables:
   - `NODE_ENV`: production
   - `VITE_API_URL`: Backend API URL
   - `PORT`: 10000 (or any port in the range 10000-20000)

## Known Issue and Fix

Previously, the deployment was failing with a "Permission denied" error when trying to run the `vite` command during the build process. This was fixed by modifying the Dockerfile to use `npx` for executing the build commands directly instead of relying on the npm script that may have had permission issues in the deployment environment.

The updated Dockerfile now runs:
```
RUN npx tsc && npx vite build
```
Instead of:
```
RUN npm run build
```

This ensures that the build tools are properly accessed through npx without permission issues.
