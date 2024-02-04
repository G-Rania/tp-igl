FROM node:18.17.1

# Set the working directory to /tp-igl
WORKDIR /tp-warafi

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install react-date-range
RUN npm install axios
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose port 3000 for the npm development server
EXPOSE 3000

# Command to start the development server
CMD ["npm", "start"]