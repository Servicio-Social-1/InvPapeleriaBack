<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Gestión papelería API

1. Clonar proyecto

2. 
```
npm install
```

3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

4. Cambiar las variables de entorno

5. Levantar postgresql
```
docker-compose up -d
```
6. Crear la base de datos con el valor de DB_NAME del archivo .env (falta validarlo, a veces no es necesario)
```
docker container ls
docker exec -it container_name psql -U postgres
CREATE DATABASE DB_NAME;
exit;
```
7. Levantar: ```npm start:dev```
6. Ejecutar SEED (get)
```
http://localhost:3000/api/seed
```