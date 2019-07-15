# auto-mart
### Online marketplace for automobiles of diverse makes, model or body type.

[![Build Status](https://travis-ci.com/victorex27/auto-mart.svg?branch=develop)](https://travis-ci.com/victorex27/auto-mart) [![Maintainability](https://api.codeclimate.com/v1/badges/4ea0e4fc841f776f38b5/maintainability)](https://codeclimate.com/github/victorex27/auto-mart/maintainability) [![Coverage Status](https://coveralls.io/repos/github/victorex27/auto-mart/badge.svg?branch=develop)](https://coveralls.io/github/victorex27/auto-mart?branch=develop)


## Getting Started

```
git clone https://github.com/victorex27/auto-mart.git

cd auto-mart

npm install
```

### Prerequisites

- A browser
- A text editor
- Good internet connection
- Install Node js and npm

### Installing

After you must have cloned the repo, use the following command to test the app

```
git clone https://github.com/victorex27/auto-mart.git

cd auto-mart

npm install
```

- To build
```
    npm run build
```
- To Run in dev mode
```
    npm run start:dev
```
- To start
```
    npm run start
```

## Running the tests

- To run test
```
    npm run test
```

- To run coveralls
```
    npm run coveralls
```

- Travis was used in monitoring the build 
- Coverall was used in monitoring code coverage
- Code Climate was used in monitoring the maintainability of the code.

To run sample test on deployed app Run [https://quiet-earth-51065.herokuapp.com/api/v1/auth/signin](https://quiet-earth-51065.herokuapp.com/api/v1/auth/signin) on Postman.

- Result 
```
{
    "status": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhb2Jpa29iZUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTk0OTQ3NzYsImV4cCI6MTU1OTUwMTk3Nn0.wF1Dzi-Bk7_hse1Qb213jSStwIk5NsC_tTBAE_JZ-Pg",
        "id": 1,
        "email": "aobikobe@gmail.com",
        "firstName": "Amaobi",
        "lastName": "Obikobe",
        "password": "********",
        "address": " 33 abak road, uyo , Akwa Ibom",
        "isAdmin": true
    }
}
```


## Deployment

- Create an acoount on heroku
- Install heroku on your system
- Run to access heroku from your cli
```
    heroku --version
    heroku login
    heroku create
```
- use this to push from your develop branch to your account on heroku
```
    git push heroku develop:master
```

A url will be displayed to you were you can use the app
## END POINTS

- GET /api/v1/car
- GET /api/v1/car?status=available
- GET /api/v1/car?status=available&manufacturer=xxxx
- GET /api/v1/car?status=available&min_price=xxxx&max_price=xxxx
- GET /api/v1/car?status=available&state=new
- GET /api/v1/car?status=available&state=used
- GET /api/v1/car?body_type=xxxx
- GET /api/v1/order/seller
- GET /api/v1/order/buyer
- GET /api/v1/car/:carId
- POST /api/v1/auth/signin
- POST /api/v1/auth/signup
- POST /api/v1/flag
- PACTH /api/v1/order/:orderId/:price
- PACTH /api/v1/car/:carId/:price
- PACTH /api/v1/car/:carId/sold
- DELETE /api/v1/car/:carId

## Documentation
View Documentation [Auto-Mart](https://quiet-earth-51065.herokuapp.com/api-docs)
Vist home page on [Auto-Mart](https://quiet-earth-51065.herokuapp.com/)
## Built With

* [Nodejs](https://nodejs.org/en/) -  JavaScript runtime built on Chrome's V8 JavaScript engine
* [Expressjs](https://expressjs.com/) -  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Es6](https://es6.io/) - ECMA Script programming language
* [Nodemon](https://nodemon.io/) - Used  for restarting the node application when file changes in the directory
* [Code Climate](https://codeclimate.com/) - Used to test code maintainability
* [Coverall](https://coveralls.io/) - Used to coverage history and statistics
* [Travis](https://travis-ci.org/) - Used to test code
* [Mocha](https://mochajs.org/) 
* [Chai](https://www.chaijs.com/) - Used to generate RSS Feeds
* [Istanbul](https://istanbul.js.org/) - Javascript test coverage tool
* [Heroku](https://www.heroku.com/) - Cloud application platform used for app deployment
* [Postgres](https://www.postgresql.org/) - the world's most advanced open source database
* [cloudinary](https://cloudinary.com/) - Manage web and mobile media assets with the leading cloud service

## Contributing

Please raise a pull request.

## Versioning

Version 1.0.0 

## Authors

* **Obikobe Amaobi** - *Initial work* - [Auto-mart](https://github.com/victorex27/auto-mart)



## Acknowledgments
* [Andela](https://andela.com/)
* [unsplash](https://unsplash.com)
* Hat tip to anyone whose code was used
* Inspiration
