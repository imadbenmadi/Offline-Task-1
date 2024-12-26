# Dockerfile
FROM node:18

# Set the working directory
WORKDIR /server

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend
CMD ["npm", "start"]
