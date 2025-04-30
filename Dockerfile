# Build stage for frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy backend files
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy built frontend
COPY --from=frontend-builder /app/dist ./dist
COPY server ./server

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the server
WORKDIR /app/server
CMD ["node", "index.js"] 