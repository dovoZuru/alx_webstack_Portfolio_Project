# Basic Bank Versioned API

 A basic bank versioned API with the ability to signup, sign in, and initiate transfers between accounts.

 This API utilises a refresh token mechanism for re-authenticating users using Redis, and uses MongoDB as the persistent storage. The cache storage is Redis. At least one route(s) requires authentication, and another requires authorisation (2 role types definition is implemented).

 ## Technologies & Frameworks

 - Node.js
 - Express.js
 - MongoDB
 - Redis

## Installation

- Clone this project repository to your local machine.
- Open the project folder in your code editor
- Install the dependencies for this project from the package.json file with the command: `npm install`
- Run the development server with the command: `yarn server` or `npm run server`

**NOTE:** You must have Node.js installed on your local machine to run this program.

## API Test

### User Sign-up

- Endpoint: http://localhost:3000/api/v1/auth/signup/
- Request Method: POST
- Payload:
```
{
	"username": "user", (Optional)
	"password": "****", *(Required!)
	"email": "johndoe@example.com", *(Required!)
	"role": "", (optional)
}
```
### User Login

- Endpoint:  http://localhost:3000/api/v1/auth/login
- Request Method: POST
- Payload:
```
{
	"email": "user@example.com", *(Required!)
	"password": "****" *(Required!)
}
```
- Response Object:
```
{
	"access": "JWT Access Token"
	"refresh": "JWT Refresh Token",
}
```

### Retrieve All User Profiles

- Endpoint:  http://localhost:3000/api/v1/users/
- Request Method: GET
- AUTH-TYPE: Bearer
- TOKEN: JWT Access Token

**NOTE:** Only a user with *'admin'* role can access this endpoint! To create a user with admin role, on the user signup payload, add `"role": "admin"` to request data object.

### Retrieve A User Profiles

- Endpoint: http://localhost:3000/api/v1/users/profile
- Request Method: GET
- AUTH-TYPE: Bearer
- TOKEN: JWT Access Token

**NOTE:** Only a user with *'user'* role can access this endpoint!

### Initiate Transfer

- Endpoint:  http://localhost:3000/api/v1/transfers
- Request Method: POST
- AUTH-TYPE: Bearer
- TOKEN: JWT Access Token
- Payload:
```
{
	"recipient": "recipient@gmail.com",
	"amount": 500
}
```

**NOTE:** Only a user with *'user'* role can access this endpoint!

### Fetch All Transfer Records

- Endpoint:  http://localhost:3000/api/v1/transfers/
- Request Method: GET
- AUTH-TYPE: Bearer
- TOKEN: JWT Access Token

**NOTE:** Only a user with *'admin'* role can access this endpoint! To create a user with admin role, on the user signup payload, add `"role": "admin"` to request data object.


Author: [Favour Onuoha](https://www.linkedin.com/in/dovo)

