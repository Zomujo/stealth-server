# Use a minimal Node.js Alpine image for running the app
FROM node:24-alpine

# Set the working directory for the build process
WORKDIR /app

# Copy dependency definitions first to leverage Docker layer caching
COPY package.json yarn.lock ./

# Install dependencies securely and clean up cache
RUN yarn install --frozen-lockfile --ignore-scripts \
	&& yarn cache clean

# Copy the remaining application source code
COPY . .

# Compile the application
RUN yarn build && rm -rf src/

# Set defaults for non-sensitive variables
ENV PORT=5500

# Expose the application's port
EXPOSE $PORT

# Define the default command to start the application
CMD ["yarn", "start:prod"]

