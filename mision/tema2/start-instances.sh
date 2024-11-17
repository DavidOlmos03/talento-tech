#!/bin/bash

# Nombre del contenedor
CONTAINER_NAME="ANALISIS"

# Contraseña para el usuario 'sa'
SA_PASSWORD="Anarchy_1729"

# Ejecuta el contenedor de SQL Server en modo detached (-d)
docker run -e "ACCEPT_EULA=Y" \
           -e "MSSQL_SA_PASSWORD=$SA_PASSWORD" \
           -e "MSSQL_PID=Express" \
           --name $CONTAINER_NAME \
	   -v ./sqlserver:/var/opt/mssql/sqlserver.conf \
           -p 1435:1435 \
           -d mcr.microsoft.com/mssql/server:2019-latest
           
echo "Instancia de SQL Server '$CONTAINER_NAME' iniciada con éxito."
