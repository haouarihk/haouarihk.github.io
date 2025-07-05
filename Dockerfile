ARG NODE_VERSION=18.18.2
 
################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

RUN apk update
RUN apk add xdg-utils

# Set working directory for all build stages.
WORKDIR /usr/src/app
 
################################################################################
# Create a stage for installing production dependencies.
FROM base as deps
 


RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-lock.yaml
COPY package.json package.json

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage bind mounts to package.json and yarn.lock to avoid having to copy them
# into this layer.
RUN pnpm install --force 
 
################################################################################
# Create a stage for building the application.
FROM deps as build
 
# Use production node environment by default.
ENV NODE_ENV production


# Copy the rest of the source files into the image.
COPY . .
 
# Run the build script.
RUN pnpm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run start:host
