FROM mcr.microsoft.com/playwright:v1.42.1-focal

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Install Playwright browsers (already in base image, but ensure)
RUN npx playwright install chromium firefox

# Run tests by default
CMD ["npx", "playwright", "test"]
