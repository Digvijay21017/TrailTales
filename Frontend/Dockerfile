# Stage 1: Build React App
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Set the build argument for environment variable
ARG VITE_GOOGLE_OAUTH_CLIENT_ID
ENV VITE_GOOGLE_OAUTH_CLIENT_ID=$VITE_GOOGLE_OAUTH_CLIENT_ID

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Optional: List build contents to verify
RUN ls -la /app/dist


# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy the built React app to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default port
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
