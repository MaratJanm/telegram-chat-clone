FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build tools)
RUN npm ci

COPY . .

# Set the API URL from environment variable
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

# Run the build command using npx to ensure Vite is accessible
RUN npx tsc && npx vite build

FROM nginx:alpine

# Copy the default nginx configuration
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port specified by Render environment variable
EXPOSE $PORT

CMD ["sh", "-c", "nginx -g 'daemon off;'"]