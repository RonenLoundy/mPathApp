
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'mPathDatabase')
BEGIN
    CREATE DATABASE mPathDatabase;
END
GO

USE master;
GO

IF NOT EXISTS (SELECT * FROM SYS.server_principals WHERE name = 'myAppLogin')
BEGIN
    CREATE LOGIN myAppLogin WITH PASSWORD = 'TestPassword';
	ALTER ROLE db_datareader ADD MEMBER myAppLogin;
    ALTER ROLE db_datawriter ADD MEMBER myAppLogin;
END
GO

USE mPathDatabase;
GO
IF NOT EXISTS (SELECT * FROM SYS.database_principals WHERE name = 'myAppUser')
BEGIN
    CREATE USER myAppUser FOR LOGIN myAppLogin;
    ALTER ROLE db_datareader ADD MEMBER myAppUser;
    ALTER ROLE db_datawriter ADD MEMBER myAppUser;
    GRANT EXECUTE TO myAppUser;
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Patients')
BEGIN
    CREATE TABLE dbo.Patients
    (
        PatientId INT NOT NULL PRIMARY KEY,
        FullName VARCHAR(255) NOT NULL,
        FirstName VARCHAR(25) NOT NULL,
        LastName VARCHAR(30) NOT NULL,
        DateOfBirth DATE NOT NULL DEFAULT GETDATE()
    );
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Recommendations')
BEGIN
    CREATE TABLE dbo.Recommendations
    (
        RecommendationId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        Recommendation VARCHAR(50) NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PatientsToRecommendations')
BEGIN
    CREATE TABLE dbo.PatientsToRecommendations
    (
        Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        PatientID INT NOT NULL,
        RecommendationID INT NOT NULL,
        RecommendationStatus VARCHAR(10) DEFAULT 'Incomplete'
    );
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
BEGIN
    CREATE TABLE dbo.Users
    (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Username NVARCHAR(255) UNIQUE NOT NULL,
        PasswordHash NVARCHAR(255) NOT NULL,
        Authority NVARCHAR(15) NOT NULL,
        CreatedAt DATETIME DEFAULT GETDATE()
    );
END
GO
