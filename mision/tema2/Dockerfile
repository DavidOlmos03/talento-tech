# Usa la imagen oficial de SQL Server en Linux desde Microsoft
FROM mcr.microsoft.com/mssql/server:2019-latest

# Configura las variables de entorno necesarias para SQL Server
ENV MSSQL_PID=Express
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=Anarchy_1729

# Exponer el puerto por defecto de SQL Server
EXPOSE 1433

# Comando para iniciar SQL Server
CMD ["/opt/mssql/bin/sqlservr"]

