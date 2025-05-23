# Use an official Node.js runtime as a base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]