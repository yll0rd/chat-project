# Chat Application project
> This folder contains the backend for [Chat Application](../client). It is built using Django REST Framework for the endpoints. 
  
## Endpoints  
The main endpoints are:  
### Contacts  
```
GET /contacts/: Returns a list of all contacts for the authenticated user.
```

### Authentication 
```
POST /signin/: Logs a user in and returns a JWT token. Expects username and password in request body.
Returns 201 on success with the token and user data. Sets JWT cookie. Returns 400 on invalid credentials.  

POST /signup/: Creates a new user account. Expects username, email, password in request body.
Returns 201 on success with the user data. Returns 400 on validation error.

POST /signout/: Logs the user out by deleting their refresh and access tokens.
Logs the user out by deleting their JWT cookie.

POST /forgot-pass/: Sends a password reset email. Expects email in request body.
```  

### Check Login
```
GET /check-login/: Checks if user is authenticated by decoding the JWT cookie.
Returns 200 with isLoggedIn: true if valid, 401 if no/invalid cookie.
```
### Messaging
```
GET /messages/<room_id>: Fetches all messages for a chat room. Returns paginated results.
```
## Features
* User authentication and authorization. 
* Real-time messaging between users in a chat room.  
* User-friendly interface.  

## Installation
1. Create a virtual environment
```sh
python3 -m venv venv
```

2. Install dependencies  
```sh
pip3 install -r requirements.txt
```  

3. Copy the .env.example file to .env and fill in the values in the .env file.  
```sh
cp .env.example .env
```

4. Apply database migrations 
```sh
python3 manage.py migrate
```

5. Run the server
```sh
python3 manage.py runserver
```

## Contributing
Contributions are always welcome! If you have any bug reports, feature requests, or pull requests, please feel free to submit them.
