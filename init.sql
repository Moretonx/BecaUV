USE master;
GO

PRINT 'Starting database restore process...';
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'becas_uv')
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM sys.sysdevices WHERE name = 'becas_uv')
        BEGIN
            EXEC sp_dropdevice 'becas_uv';
        END
        
        IF EXISTS (SELECT 1 FROM sys.sysdevices WHERE name = 'becas_uv_log')
        BEGIN
            EXEC sp_dropdevice 'becas_uv_log';
        END

        PRINT 'Starting restore from backup file...';
        RESTORE FILELISTONLY FROM DISK = '/var/opt/mssql/backup/BECASUV.bak';
        
        -- Update the logical file names based on the output of RESTORE FILELISTONLY
        RESTORE DATABASE becas_uv
        FROM DISK = '/var/opt/mssql/backup/BECASUV.bak'
        WITH MOVE 'becas_uv' TO '/var/opt/mssql/data/becas_uv.mdf',
             MOVE 'becas_uv_log' TO '/var/opt/mssql/data/becas_uv_log.ldf';
        
        PRINT 'Database restore completed successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred during restore:';
        PRINT ERROR_MESSAGE();
        THROW;
    END CATCH
END
GO
