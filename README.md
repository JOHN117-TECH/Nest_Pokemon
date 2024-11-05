<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Descargar y montar la base de datos

```
docker-compose up -d
```

5. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v2/seed
```

6. Agregar esta depencia para conectarme de nest a mongoDB

```
npm i @nestjs/mongoose mongoose
```

7. Clonar el archivo `.env.template` y renombar la copia a `
.env`

8. Llenar las variables de entorno definidas en el `.env`

9. Validar que un objecto luzca de manera esperaba

```
npm i joi
```

# Production Build

1. Crear el archivo `.env.prod`
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

10. Ejecutar la aplicación en dev:

```
yarn start:dev
```

## Stack usado

- MongoDB
- Nest
