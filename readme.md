# Ejecutar App

Crear la carpeta dist en el cliente (compila el código)
```js
npm run build
```

Ejecutar la aplicación
```js
npm run start
```

## Variables de entorno necesarias para el funcionamiento

Estas variables sirven para que la app funcione correctamente.
En producción cambia la URL

```js
MONGODB_URI={Clave Mongo cluster}
UPLOADTHING_SECRET={Uploadthing secret}
UPLOADTHING_APP_ID={Uploadthing app id}
PORT=8080
APP_URL=http://localhost:8080
NODE_ENV=development
```

## Desplegar en GCLOUD

```
gcloud run deploy
```

(Elegir 14 para desplegar en madrid)
(Elegir 15 para desplegar en la otra rama)




