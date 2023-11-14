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
MONGODB_URI=mongodb+srv://gnez:gnez@cluster0.43kwtts.mongodb.net/sistema?retryWrites=true&w=majority
UPLOADTHING_SECRET=sk_live_cb86d0d2bfb8ff1ca1f13cbac28e801e86aa411f1fead0a10a420b7aa630658c
UPLOADTHING_APP_ID=4n1ivgmtmq
PORT=8080
APP_URL=http://localhost:8080
```

## Desplegar en GCLOUD

```
gcloud run deploy
```

(Elegir 14 para desplegar en madrid)
(Elegir 15 para desplegar en la otra rama)



