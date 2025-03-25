#!/bin/bash
set -e

# Install curl and gnupg if not already installed
apt-get update
apt-get install -y curl gnupg

# Install SQL Server tools if not already installed
if ! command -v sqlcmd &> /dev/null
then
    echo "Installing SQL Server tools..."
    curl -s https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
    curl -s https://packages.microsoft.com/config/ubuntu/20.04/prod.list | tee /etc/apt/sources.list.d/msprod.list
    apt-get update
    apt-get install -y mssql-tools unixodbc-dev
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
    source ~/.bashrc
fi

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start
sleep 30s

# Run the setup script
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i /docker-entrypoint-initdb.d/init.sql

# Keep container running
tail -f /dev/null
