# Dockerfile para un microservicio
# Usar la imagen base de Node.js en su versión 18
FROM node:18

# Instalar el cliente de PostgreSQL
# Actualiza la lista de paquetes y luego instala el cliente de PostgreSQL.
# Esto es útil para que tu microservicio pueda interactuar con una base de datos PostgreSQL.
RUN apt-get update && apt-get install -y postgresql-client

# Establecer el directorio de trabajo dentro del contenedor
# Aquí es donde se ejecutarán los comandos y se ubicará la aplicación.
WORKDIR /usr/src/app

# Copiar los archivos de dependencias de Node.js
# Esto incluye el package.json y package-lock.json (si existe) al directorio de trabajo.
# Esto permite que Docker cachee las dependencias y evite reinstalarlas innecesariamente si no han cambiado.
COPY package*.json ./

# Instalar las dependencias de la aplicación
# Ejecuta npm install para instalar todas las dependencias listadas en el package.json.
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
# Esto incluye todos los archivos de tu proyecto, permitiendo que el código fuente esté disponible.
COPY . .

# Comando por defecto para ejecutar la aplicación
# Esto inicia la aplicación en modo desarrollo utilizando el script definido en package.json.
CMD ["npm", "run", "start:dev"]
