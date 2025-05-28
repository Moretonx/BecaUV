#!/bin/bash

echo 'Esperando a que SQL Server esté listo...'
for i in {1..60}; do
  echo "Intento $i de 60..."
  if /opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -Q 'SELECT 1;' &>/dev/null; then
    echo 'SQL Server está listo.'
    break
  fi
  if [ $i -eq 60 ]; then
    echo 'Error: SQL Server no está respondiendo después de múltiples intentos.'
    exit 1
  fi
  echo 'SQL Server aún no está listo. Esperando...'
  sleep 5
done

echo 'Creando base de datos si no existe...'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -Q "
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'becas_uv')
BEGIN
    CREATE DATABASE becas_uv;
    PRINT 'Base de datos becas_uv creada correctamente.';
END
ELSE
BEGIN
    PRINT 'La base de datos becas_uv ya existe.';
END
"

echo 'Verificando estado de la base de datos...'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -Q "SELECT name, state_desc FROM sys.databases WHERE name = 'becas_uv'"

echo 'Listando tablas en la base de datos restaurada:'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -d becas_uv -Q "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME"

echo 'Configurando tabla users...'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -d becas_uv -Q "
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
BEGIN
    CREATE TABLE users (
        userID INT IDENTITY(1,1) PRIMARY KEY,
        usuario VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) NOT NULL,
        casino TEXT NOT NULL
    );
    PRINT 'Tabla users creada.';
END
"

echo 'Configurando tabla casinos...'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -d becas_uv -Q "
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'casinos')
BEGIN
    CREATE TABLE casinos (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre TEXT NULL,
        cantidad INT NULL
    );
END
"

echo 'Configurando tabla alumnos...'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -d becas_uv -Q "
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'alumnos')
BEGIN
    CREATE TABLE alumnos (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(100) NULL,
        rut VARCHAR(20) NULL,
        cantidad INT NULL,
        canje INT NULL,
        fecha CHAR(20) NULL
    );
END
"

echo 'Insertando usuarios predeterminados...'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -d becas_uv -Q "
IF NOT EXISTS (SELECT * FROM users WHERE usuario = 'Administrador')
BEGIN
    INSERT INTO users (usuario, password, role, casino) VALUES ('Administrador', '\$2b\$10\$GCjHUE6tloultpDc7PPkqufYj8slF3D17wtYf.af0GbQjjH0NoFgC', 'Administrador', 'Sin Casino');
END
"

echo 'Mostrando usuarios:'
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P M4sK@2025! -d becas_uv -Q "SELECT * FROM users"