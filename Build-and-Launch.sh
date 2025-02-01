#!/bin/bash

# Step 1: Build and Launch the Angular Frontend
echo "Building Angular frontend..."
cd mPathAngular
ng build --prod &  # Build Angular in production mode (runs in the background)

# Step 2: Build and Launch the .NET Backend
echo "Building .NET backend..."
cd..
cd mPathBackEnd
dotnet build &  # Build .NET backend in the background

# Step 3: Wait for both processes to complete
wait

echo "Both frontend and backend are built and running."
