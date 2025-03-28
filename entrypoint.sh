#!/bin/bash
set -e

# Inicia SQL Server en segundo plano
/opt/mssql/bin/sqlservr &

# Esperar a que SQL Server esté listo
sleep 30s

# Ejecutar el script de inicialización si existe
if [ -f /docker-entrypoint-initdb.d/init.sql ]; then
    echo "Ejecutando script de inicialización..."
    /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -i /docker-entrypoint-initdb.d/init.sql
fi

# Mantener el contenedor corriendo
wait
