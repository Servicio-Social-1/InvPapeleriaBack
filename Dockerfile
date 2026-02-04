# Use the official Node.js image as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Use the official Apache HTTP Server image as the base image for serving the app
FROM httpd:2.4

# Copy the built application to the Apache server's web directory
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Expose port 8081
EXPOSE 8081

# Start the Apache server
CMD ["httpd-foreground"]