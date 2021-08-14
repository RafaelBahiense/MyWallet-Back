# MyWallet Backend
### Financial management control Web App.

<p align="center">
  <img src="https://github.com/RafaelBahiense/MyWallet-Front/blob/main/public/imgs/screenshot.png">
</p>

<p align="center">
   <a href="https://my-wallet-front-six.vercel.app/">Click here</a> to acess the App
</p>

## About

This is an web application which helps people meet their life goals through the proper management of financial resources. Below are the implemented features:

- Sign Up
- Login
- Deposit
- Withdrawal
- History
- Account balance

[Project repo]

## Technologies


### The following tools and frameworks were used in the construction of the project:
|NodeJS|ExpressJS|TypeScript|PostgreSQL|
|-|-|-|-|
|[<p align="center"><img alt="Node" width="70px" src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" /></p>][node]|[<p align="center"><img alt="Express" width="120px" src="https://cdn.worldvectorlogo.com/logos/express-109.svg" /></p>][express]|[<p align="center"><img alt="Typescript" width="60px" src="https://static.cdnlogo.com/logos/t/96/typescript.svg" /></p>][typescript]|[<p align="center"><img alt="TypeOrm" width="80px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/540px-Postgresql_elephant.svg.png" /></p>][postgresql]|
|Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine|Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications|TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions|PostgreSQL is a powerful, open source object-relational database|


[node]: https://nodejs.org/en/
[express]: https://expressjs.com/
[typescript]: https://www.typescriptlang.org/
[postgresql]: https://www.postgresql.org/
[Project repo]: https://github.com/RafaelBahiense/Pokedex


## How to run

1. Clone this repository
2. Clone the [Frontend repository]
3. Follow instructions [to run the Frontend]
4. Install dependencies
```bash
npm i
```
5. Create a PostgresSQL database "your_database_dev" and "your_database_test"
6. rename `example.local.dev.env` -> `local.dev.env` and `example.local.test.env` -> `local.test.env`
7. Config .env files as indicated
8. Run the Backend with
```bash
npm run dev
```
9. Finally access http://localhost:4000/api/"desired-route" on your favorite API Client 
or run the Frontend and access http://localhost:3000 on your favorite browser

[Frontend repository]: https://github.com/RafaelBahiense/MyWallet-Front
[to run the Frontend]: https://github.com/RafaelBahiense/MyWallet-Front#how-to-run
