DROP TABLE IF EXISTS dbo.Patients
DROP TABLE IF EXISTS dbo.Recommendations
DROP TABLE IF EXISTS dbo.PatientsToRecommendations

CREATE TABLE dbo.Patients
(
  PatientId INT NOT NULL PRIMARY KEY,
  FirstName VARCHAR(25) NOT NULL,
  LastName VARCHAR(30) NOT NULL,

)
CREATE TABLE dbo.Recommendations
(
  RecommendationId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  Recommendation VARCHAR(50) NOT NULL
)

CREATE TABLE dbo.PatientsToRecommendations
(
  [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  [PatientID] INT NOT NULL,
  [RecommendationID] INT NOT NULL
)