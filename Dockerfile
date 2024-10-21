FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

# Build the Svelte application
RUN pnpm build

# Use a lightweight server to serve the app
FROM serve:latest

# Set the working directory for the server
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app/public ./ 

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", ".", "-l", "5000"]

