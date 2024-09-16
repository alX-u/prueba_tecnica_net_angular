@echo off

:: Muestra un mensaje de inicio
echo Configurando el proyecto...

:: Entrar en la carpeta del backend
cd PruebaTecnicaBackend\PruebaTecnicaBackend.API

:: Ejecutar el comando para actualizar la base de datos
echo Actualizando la base de datos usando dotnet-ef...
dotnet-ef database update
if %errorlevel% neq 0 (
    echo Error al actualizar la base de datos. Verifica que dotnet-ef esté instalado y configurado correctamente.
    pause
    exit /b %errorlevel%
)

:: Ejecutar el servidor de la API
echo Iniciando el servidor API...
start dotnet run
if %errorlevel% neq 0 (
    echo Error al iniciar el servidor API. Verifica que el servidor esté configurado correctamente.
    pause
    exit /b %errorlevel%
)

:: Volver atrás dos carpetas
cd ..\..

:: Entrar en la carpeta del frontend Angular
cd PruebaTecnicaNetAngularFrontend

:: Ejecutar el comando para iniciar Angular
echo Iniciando el servidor Angular...
start ng serve -o
if %errorlevel% neq 0 (
    echo Error al iniciar el servidor Angular. Verifica que Angular CLI esté instalado y configurado correctamente.
    pause
    exit /b %errorlevel%
)

:: Mensaje final
echo Proyecto configurado correctamente.
pause
