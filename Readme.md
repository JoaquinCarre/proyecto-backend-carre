# Desafío 15 - Servidor con Balance de Carga

## Configuración

1) Crear un archivo .env y agregar los siguientes parámetros:

```
ENV=local
MONGO_PASS=c8ng0KHkvS7xqhCB
```

2) Ejecutar MySQL y escribir los siguientes comandos para acceder a la base de datos 'mibase':

```
CREATE SCHEMA mibase;
USE mibase;
```

3) Iniciar NGINX con la configuración que se encuentra en "/nginx-1.23.3/conf/nginx.conf". Solo se debe cambiar la ruta del root de este archivo y dirigirla hacia la carpeta 'public'

4) Ejecutar los siguientes comandos para las distintas consignas pedidas (los comandos de cada consigna están escritos en package.json dentro de los scripts):

* NODEMON

```
npm run consigna1a
npm run consigna1b
```

* FOREVER

```
npm i -g forever
```

```
npm run consigna2a
npm run consigna2b
npm run consigna2c
```

El último comando que ejecuta el script 'consigna2c' es para listar todos los procesos activos

* PM2

```
npm i -g pm2
```
```
npm run consigna3a
npm run consigna3b
npm run consigna3c
```

El último comando que ejecuta el script 'consigna3c' es para monitorear todos los procesos activos

* Consigna 1ra parte

```
npm run consigna4a
npm run consigna4b
```

* Consigna 2da parte

```
npm run consigna5a
npm run consigna5b
npm run consigna5c
npm run consigna5d
npm run consigna5e
```

## Anexo

Se modifica, respecto del Desafío 14, que si no se aclara la cantidad para el query de 'cant' para la ruta /api/randoms, solo cargarán 20 números en vez de 100.000.000, y además se agrega a lo último información sobre el puerto y el modo en el que corre el servidor.