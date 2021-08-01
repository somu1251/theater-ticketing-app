
# Theater App
Ticket Management for theatres APIs
  
## Prerequisite

```

Install Nodejs(version >= 14)

Download and run mongodb(version 5.x) with port 27017.

```

## Technical stack

 - node js 
 - hapi js framework
 - mongodb with mongoose
 - Lab JS for testcases
 - hapi-seagger for swagger documentation

## instalation

Clone the repo from github.

cd redirect to theaterapp

>  \> cd theaterapp
 

### go to /config/default.json and change the mondodb's hosts's hostIp and (auth)


### install package dependencies

>  \> npm install

### Run eslint Rules

>  \> npm run lint


### Run app

>  \> npm start

application is running on 3000 port  

### API documentation

open any browser and enter below url


```

http://localhost:3000/app/explorer

```

### configure auth token

static auth token `c2NyZXRwYXNzd29yZA==`
configure about token in swagger documentation and run APIs

## Run test cases

> \>  npm run test

if you run above command lcov.info test report file will be generated

