# Paso 1: Empezar con una imagen de Node.js
FROM node:16-alpine as build

# Instalar serve
RUN npm install -g serve

# Establecer el directorio de trabajo
WORKDIR /app

# Copia los archivos de construcción de Angular al contenedor
COPY /dist/parqueadero /app

# Expone el puerto que usará serve
EXPOSE 5000

# Comando para servir la aplicación usando serve
CMD ["serve", "-s", "/app", "-p", "5000"]
