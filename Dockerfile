# Stage 1: Build Stage
FROM node:lts-alpine AS build

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .

EXPOSE 3000

# Specify the build command if necessary
# RUN npm run build

# Stage 2: Production Stage
FROM node:lts-alpine AS production

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app .

# Install only production dependencies
RUN npm install --production

# Set the appropriate command to start the application
CMD ["npm", "run", "start"]

