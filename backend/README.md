# React Around Backend 
This project implements user registration and authorization for the React image sharing app [frontend](https://github.com/olivcamj/react-around-api-full/tree/main/frontend). 
The backend also allows a user to edit (create, update and delete) 'cards'. The final product was set up as a virtual machine (Ubuntu 20.0.4) with Nginx and delployed to Google Cloud Platform.


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [Getting Started](#getting-started)
    - [Running the server](#my-process)
    - [Endpoints Summary](#endpoints)
    - [Testing locally](#testing-locally)
    - [Built with](#built-with)
- [Author](#author)

## Getting Started
Very easy and simple setup. 
To get started go ahead and clone a copy to your local machine and have a look around the code.

## Running the server
First you will need to make sure you have node, you can simple run the command \
` node -v `

it is also a good idea to make sure package.json is up to date \
` npm install `

To run this project locally you will need to run \
`npm start ` 

this command executes the script object

<h2 id="endpoints">Endpoint Summary</h2>


| Endpoints        |     Description                   |  Method |                   Headers                                     | Request Body [^1] |
| :---:            |         :---:                     | :---:   |                     :---                                      |       :---:  |
| `/signup`        |    user registration              | POST    |  "Content-Type": "application/json"                           |name, email & password |
| `/signin`        |    user authorization             | POST    |  "Content-Type": "application/json"                           |email & password | 
| `/users/me`      |  get current user                 | GET     |  { <br> &nbsp; &nbsp;  "Content-Type": "application/json", <br> &nbsp; &nbsp;  "Authorization" : `Bearer ${Your JWT}` <br>}   | token (from signing in) |
| `/`              | get all cards liked by the user   | GET     |                                                               |                           |
| `/`              | create a card                     | POST    |                                                               |name & link |
| `/:cardId/likes` | use a card id to *like* a card    | PUT     |                                                               |token (from signing in) |
| `/:cardId/likes` | use a card id to *dislike* a card | DELETE  |                                                               |token (from signing in) |
| `/:cardId`       | delete a card based on the id     | DELETE  |                                                               |  | 

[^1]: This is the data (json format) that needs to be included when make a request. (Use this information when creating json objects)


<details>
  <summary>Example of an HTTP request using Postman</summary>
  <br>
  
  This is an example of user registration. 
  
  <img alt="Example of an HTTP request using Postman" src="https://user-images.githubusercontent.com/34360644/138309180-27431595-8ec0-4ac2-9965-5cf49d88d3a0.png" width="425">

 </details>
 
 ## Testing locally 
 ### Base URL
 You can use the base url: http://localhost:3000 and then add the endpoint for a final result of http://localhost:3000/signup \
 :warning: However, if you are also running the frontend you will need to change the PORT number for the backend, you can either run the command in the terminal like this `PORT=3001 npm start` or you can change the command in the scripts object (located in the package.json file) to
 ```json
 "scripts": {
   "start" : "PORT=3001 node app.js",
 }
 ```
 
 ### Method
 You will be using the POST method for both endpoints 
 ### Request Body 
 ```json
 "name": "userName",
 "password": "somepassword",
 "email": "myName@email.com" 
```
### Successful Response Examples
For registration: 
```json
{
   "data": {
        "_id": "5a2204f532178dcaa1b5cbf6",
        "email": "myName@email.com"
    }
}
```
For authorization: 
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
}
```

## Testing the server 
The only difference from testing locally will be the base url. The [endpoints](#endpoints) and methods will remain the same.

### Base URL 
https://nomoreparties.com

### Built with

- Node.js
- Mongodb
- Express
- JOI and Celebrate
- Winston, Rate-Limiter

## Author

- GitHub - [@olivcamj](https://www.github.com/olivcamj)
- Twitter - [@WhatOliviaLoves](https://www.twitter.com/WhatOliviaLoves)
