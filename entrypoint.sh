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
    # Ensure only one repository is added
    if [ ! -f /etc/apt/sources.list.d/msprod.list ]; then
        curl -s https://packages.microsoft.com/config/ubuntu/20.04/prod.list | tee /etc/apt/sources.list.d/msprod.list
    fi
    apt-get update
    apt-get install -y mssql-tools unixodbc-dev
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
    source ~/.bashrc
fi

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Function to check if SQL Server is ready
wait_for_sql_server() {
    echo "Waiting for SQL Server to be ready..."
    for i in {1..30}; do
        /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT 1" &> /dev/null && return 0
        echo "SQL Server is not ready yet. Retrying in 2 seconds..."
        sleep 2
    done
    echo "SQL Server did not become ready in time."
    exit 1
}

# Wait for SQL Server to be ready
wait_for_sql_server

# Run the setup script
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i /docker-entrypoint-initdb.d/init.sql

# Keep container running
tail -f /dev/null
