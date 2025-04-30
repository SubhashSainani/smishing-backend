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

# Expose the port your app runs on (use your specified port if needed)
EXPOSE 3000

# Start the app (use npm run dev as you've specified for local development)
CMD ["npm", "run", "dev"]