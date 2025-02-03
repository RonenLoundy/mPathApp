SetUp Instructions

Run the Database Setup.sql SQL Script in your SQLServer
Optionally Run the TestData.sql Script

Backend Configuration:
In ./mPathBackEnd/appsettings.json there are 3 fields that can be customized
Jwt is the JSON Web Token Settings, the Secret Key, Issuer and Audience Fields are customizable there
ConnectionStrings is the variable that allows access to the Database, 
    The Database, UserID, and Password are created in the Database SQL script.
    The Server is wherever the Database is hosted, the default is localhost.
Cors and more specially Allowed Origin is the Angular Connection


Angular Configuration:
If you wish to change the Angular Hosting it is located at .\mPathAngular\src\server.ts
In mPathAngular/src/environments/environment.ts change the ApiUrl to the whatever the base ApiURL is
By default it is http://localhost:5249/

You can then run Build-and-Launch to start the program
