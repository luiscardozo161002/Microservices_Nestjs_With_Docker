# Dockerfile para un microservicio
# Usar la imagen oficial de Node.js en su versión 18 como base
FROM node:18

# Instalar el cliente de PostgreSQL en el contenedor
# Actualiza la lista de paquetes y luego instala el cliente de PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Configura el directorio de trabajo dentro del contenedor
# Todos los comandos siguientes se ejecutarán en este directorio
WORKDIR /usr/src/app

# Copiar los archivos de dependencias de Node.js (package.json y package-lock.json) al contenedor
COPY package*.json ./

# Instalar las dependencias de Node.js definidas en package.json
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . .

# Definir el comando por defecto para ejecutar la aplicación
# Ejecutar el script "start:dev" para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "start:dev"]
