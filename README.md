# Quiz Application API

## Base URL 
https://quiz-application-9lf2.onrender.com/

## Endpoints

### Check Server Status

GET /
Response:
{
    "message": "Server is live now!"
}

### User Signup

POST /auth/signup
Request Body:
{
    "email": "abc@123.com",
    "password": "xyzabc"
}
Response:
{
    "message": "Successfully created"
}

### User Signin

POST /auth/signin
Request Body:
{
    "email": "abc@123.com",
    "password": "xyzabc"
}
Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

### Create Quiz

POST /quizzes
Request Body:
{
    "title": "Which is an front-end language?",
    "options": ["Java", "ReactJS", "Go", "JavaScript"],
    "rightAnswer": 2,
    "startDate": "2023-12-22T10:50:00Z",
    "endDate": "2023-12-22T12:00:00Z"
}
Response:
{
    "message": "Quiz created successfully"
}

### Get Active Quizzes

GET /quizzes/active
Response:
[
    {
        "_id": "6585a53c9c15ff9b2dc7682f",
        "title": "front-end language?",
        "options": ["C", "ReactJS", "Go", "JavaScript"],
        "rightAnswer": 2,
        "startDate": "2023-12-22T10:50:00.000Z",
        "endDate": "2023-12-22T12:00:00.000Z",
        "status": "active"
    },
    ...
]

### Get Quiz Result

GET /quizzes/:id/result
Response:
{
    "answer": "JavaScript"
}

### Get All Quizzes

GET /quizzes/all
Response:
[
    {
        "_id": "6585a370ba1881120ea55c53",
        "title": "backend-language language?",
        "options": ["Java", "C++", "Go", "JavaScript"],
        "rightAnswer": 1,
        "startDate": "2023-12-22T09:00:00.000Z",
        "endDate": "2023-12-22T10:00:00.000Z",
        "status": "finished"
    },
    ...
]

### JWT Errors

No Token:
{
    "error": "No token found"
}

Invalid Token:
{
    "message": "invalid token"
}

Expired Token:
{
    "message": "jwt expired"
}
