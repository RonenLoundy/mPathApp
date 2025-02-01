DROP TABLE IF EXISTS dbo.Patients
DROP TABLE IF EXISTS dbo.Recommendations
DROP TABLE IF EXISTS dbo.PatientsToRecommendations


USE master;
GO
CREATE LOGIN myAppLogin WITH PASSWORD = 'TestPassword';
GO
USE mPathDatabase;
GO
CREATE USER myAppUser FOR LOGIN myAppLogin;
GO
ALTER ROLE db_datareader ADD MEMBER myAppUser;
ALTER ROLE db_datawriter ADD MEMBER myAppUser;
GRANT EXECUTE TO myAppUser;

CREATE TABLE dbo.Patients
(
  PatientId INT NOT NULL PRIMARY KEY,
  FullName VARCHAR(255) NOT NULL,
  FirstName VARCHAR(25) NOT NULL,
  LastName VARCHAR(30) NOT NULL,
  DateOfBirth DATE NOT NULL DEFAULT GETDATE()

)
CREATE TABLE dbo.Recommendations
(
  RecommendationId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  Recommendation VARCHAR(50) NOT NULL
)

CREATE TABLE dbo.PatientsToRecommendations
(
  Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  PatientID INT NOT NULL,
  RecommendationID INT NOT NULL,
  RecommendationStatus VARCHAR(10) DEFAULT 'Incomplete'
)
CREATE TABLE dbo.Users
(
  Id INT PRIMARY KEY IDENTITY(1,1),
  Username NVARCHAR(255) UNIQUE NOT NULL,
  PasswordHash NVARCHAR(255) NOT NULL,
  Authority NVARCHAR(15) NOT NULL,
  CreatedAt DATETIME DEFAULT GETDATE()
);