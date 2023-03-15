## Backend App
### Do share the repository link, deployed link on any platform such as Heroku/Netlify/Vercel etc. and the documentation link (use either Postman or Swagger to document the APIs).

Build a user authentication and management application with the following endpoints.

1. **User signup** - 

    The payload must include the basic details of the user such as the 
    - Email
    - Mobile Number
    - Full Name
    - Initial Password
    
    Once the data is received at the backend, all **PII (Personally identifiable data)** such as 
    - email
    - mobile number
    - full name 

    *Are to be encrypted using a strong public key.*
    
    The password must be stored in a hashed format.

2. **Reset Password** - Accept old and new passwords from the user, verify if the old password is correct, and if it is correct - store the new password in a hashed format.


3. **Login** - Accept the user's email address and password, and return a JWT(JSON web token) with the user ID, email, and mobile number as the token payload


4. **Update User details** - Accept new user details fields to update and store the updated data in an encrypted format.
Please note again that the data has to be encrypted in transit and when it is received at the backend, it has to be decrypted. 
