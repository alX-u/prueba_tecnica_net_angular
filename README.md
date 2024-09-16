# prueba_tecnica_net_angular
Prueba técnica realizada en .NET y Angular

## Cómo configurar y ejecutar el proyecto
Dentro de los archivos del repositorio se incluyó un archivo .bat, el cual contiene los comandos necesarios para configurar y abrir el servidor y el frontend del proyecto. Este incluye comando de entity-framework para el seetup de la base de datos y comandos para inicializar el server de .NET y la servir la página de Angular.

Este proyecto fue realizado con SQL Server, por lo que es **necesario** que este se encuentre instalado para la correcta creación de la base de datos al utilizar el archivo .bat.

## Características del proyecto

El servidor de la API corre en el puerto 5175 y la BD es creada con algunos datos por defecto, como lo son los roles y un usuario **Admin** cuyas credenciales son:

email: admin@gmail.com
password: admin123

Este es el que tiene el poder de realizar todo el CRUD de tareas y usuarios, es decir, el que podrá cambiar roles al resto de usuarios pues por defecto, el registro crea usuarios sin rol.

Una vez creados los usuarios y tengan un rol asignado por el admin, ya se podrá revisar las distintas funcionalidades de la página dependientes del rol del usuario logeado.

## Estructura del proyecto
Para la estructura del proyecto se decidió utilizar Clean Architecture. En el caso del back tenemos capas de Domain, Data, Controllers, Services, etc., utilizando interfaces para moldear entidades y servicios. En el caso del front algo parecido, con una capa de Data, Domain, y Pages (Presentation), donde tenemos definimos las diferentes partes de la página, dividiendo lo referente a endpoints y casos de uso, con la parte más client-side.
