@echo off

:: Step 1: Build and Launch the Angular Frontend
echo Building Angular frontend...
cd mPathAngular
start ng serve

:: Step 2: Build and Launch the .NET Backend
echo Building .NET backend...
cd ..
cd mPathBackEnd
start dotnet run

echo Both frontend and backend are launched.
