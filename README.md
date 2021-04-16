# Courses: (A Fullstack React Application with Rest API)

Courses is a simple React Application Library with an API storing information on User Credentials, Courses, Ownership and more. It also utilizes authorizations, so that not all and everyone can go in and modify Courses not owned by them. 

## Installation

Download the code from the Repo, open up and install dependencies for '/client' and '/api'. And then set up the seed for the API like shown below.

```bash
cd /client
npm install
cd ../api
npm install
npm run seed
```

## Additional
If you want to use a more common requirement for the passwords, uncomment the code in 'api/routes/users.js' on line 23-31, and comment out line 33-34.
