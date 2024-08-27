# Use the official Node.js image from the Docker Hub
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]