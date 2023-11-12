# Use the official Node.js image as a base image
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Compila el proyecto (puedes personalizar esta parte según tu proyecto)
RUN npm run build

# Expón el puerto en el que tu aplicación escucha
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
