# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the .env file into the container
COPY .env .env

# Expose the port your server runs on
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
