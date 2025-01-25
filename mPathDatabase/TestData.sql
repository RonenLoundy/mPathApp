Insert into dbo.Patients
    (PatientID, FirstName, LastName)
Values(6547, 'Fred', 'Jones'),
    (9765, 'Hannah', 'Blake'),
    (7693, 'John', 'Smith'),
    (3682, 'Ann', 'Carpenter'),
    (6798, 'Celeb', 'Monroe'),
    (2134, 'Maria', 'McBride');

insert into dbo.Recommendations
    (Recommendation)
Values('Allergy Check'),
    ('Screenings'),
    ('Follow-ups');

insert into dbo.PatientsToRecommendations (PatientID,RecommendationID)
Values(6547, 1), (9765, 2), (7693,3), (3682, 1), (3682, 3);