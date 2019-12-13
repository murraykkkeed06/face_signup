FROM node:10

# Create app directory
WORKDIR /app
   
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./  
 
COPY face-api.js ./face-api.js
COPY webcamjs-master ./webcamjs-master

RUN npm install   
# If you are buil ding your code for production
# RUN npm ci --ony=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
