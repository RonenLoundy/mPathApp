SetUp Instructions<br />

Database Setup:<br />
Enable SQL Server and Windows Authentication Mode in Security Properties<br />
Enable TCP/IP and Named Pipes<br />
Restart Server<br />
Run the Database Setup.sql SQL Script in your SQLServer<br />
Optionally Run the TestData.sql Script<br />

Backend Configuration:<br />
Download and Install .net 9<br />
In ./mPathBackEnd/appsettings.json there are 3 fields that can be customized<br />
Jwt is the JSON Web Token Settings, the Secret Key, Issuer and Audience Fields are customizable there<br />
ConnectionStrings is the variable that allows access to the Database, <br />
    The Database, UserID, and Password are created in the Database SQL script.<br />
    The Server is wherever the Database is hosted, the default is localhost.
Cors and more specially Allowed Origin is the Angular Connection<br />
By default the backend is located at http://localhost:5249/ <br />


Angular Configuration:<br />
Install node.js and Angular<br />
If you wish to change the Angular Hosting it is located at .\mPathAngular\src\server.ts<br />
In mPathAngular/src/environments/environment.ts change the ApiUrl to the whatever the base ApiURL is<br />
By default is http://localhost:4200/ <br />

You can then run Build-and-Launch to start the program<br />
