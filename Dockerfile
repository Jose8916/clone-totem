# Usa la imagen oficial de Node como base para construir tu aplicación
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto (asegúrate de incluir los archivos necesarios)
COPY package*.json ./
RUN npm install

# Copia el código fuente e inicia la construcción de producción
COPY . .
RUN npm run build

# Inicia la etapa de producción utilizando Nginx
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Agrega la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# El puerto 80 es el puerto predeterminado para HTTP en Nginx
EXPOSE 80

# Inicia Nginx al iniciar el contenedor
CMD ["nginx", "-g", "daemon off;"]