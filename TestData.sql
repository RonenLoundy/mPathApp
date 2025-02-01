Insert into dbo.Patients
    (PatientID, FullName, FirstName, LastName)
Values(6547, 'Fred Jones', 'Fred', 'Jones'),
    (9765, 'Hannah Blake', 'Hannah', 'Blake' ),
    (7693, 'John Smith', 'John', 'Smith'),
    (3682, 'Ann Carpenter', 'Ann', 'Carpenter'),
    (6798, 'Caleb Monroe', 'Celeb', 'Monroe'),
    (2134, 'Maria McBride', 'Maria', 'McBride' );

insert into dbo.Recommendations
    (Recommendation)
Values('Allergy Check'),
    ('Screenings'),
    ('Follow-ups');

insert into dbo.PatientsToRecommendations
    (PatientID,RecommendationID)
Values(6547, 1),
    (9765, 2),
    (7693, 3),
    (3682, 1),
    (3682, 3);
