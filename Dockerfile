# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

ENV MONGODB_URI=mongodb+srv://travel-ease:Speedcuber282@cluster0.3w5br5m.mongodb.net/travel-ease?retryWrites=true&w=majority
ENV JWT_SECRET_KEY=travelease
ENV GOOGLE_API_KEY=AIzaSyC1GDs86spPY_yXzohd0CNZ0fjlYH4XBvE

# Start the server using the production build
CMD [ "node", "dist/main" ]