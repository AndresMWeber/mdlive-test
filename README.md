<div align=center>
    <h1 align=center>
        <br>
        MDLive QA Challenge
        <br>
        <img width="100px" align=center src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" alt="NodeJS logo">
        <img width="100px" align=center src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" alt="MongoDB logo">
        <img width="100px" align=center src="https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67" alt="express logo"> 
        <img width="100px" align=center src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8yWEpBmr0xgBOMcYdpdEFieBMIP6hlUJbYTIVtqUdnquhyK0S" alt="jest logo">
        <img width="100px" align=center src="https://assets.brandfolder.com/po873r-7udt4w-b3x13z/view@2x.png?v=1552347719" alt="circleci logo">
        <img width="100px" align=center src="https://firebounty.com/image/352-codeclimate-code-climate-security" alt="codeclimate logo">
    </h1>
    <h1 align=center>
        <a href="https://circleci.com/gh/AndresMWeber/mdlive-test">
            <img src="https://circleci.com/gh/AndresMWeber/mdlive-test.svg?style=svg" />
        </a>
        <a href="https://codeclimate.com/github/AndresMWeber/mdlive-test/maintainability">
            <img src="https://api.codeclimate.com/v1/badges/398646c86e86af9159ec/maintainability" />
        </a>
        <a href="https://codeclimate.com/github/AndresMWeber/mdlive-test/test_coverage">
            <img src="https://api.codeclimate.com/v1/badges/398646c86e86af9159ec/test_coverage" />
        </a>
    </h1>
    <h3>Live Test Searches</h3>
    <h4><a href="https://mdlive-test.herokuapp.com/apps">https://mdlive-test.herokuapp.com/apps</a><br>
        <a href="https://mdlive-test.herokuapp.com/apps?range.by=id">https://mdlive-test.herokuapp.com/apps?range.by=id</a><br>
        <a href="https://mdlive-test.herokuapp.com/apps?range.start=5&range.end=28&range.max=25">https://mdlive-test.herokuapp.com/apps?range.start=5&range.end=28&range.max=25</a><br>
        <a href="https://mdlive-test.herokuapp.com/apps?range.by=name&range.order=asc&range.start=my-app-150">https://mdlive-test.herokuapp.com/apps?range.by=name&range.order=asc&range.start=my-app-150</a><br>
        <a href="https://mdlive-test.herokuapp.com/apps?range.by=name&range.order=desc&range.start=my-app-150">https://mdlive-test.herokuapp.com/apps?range.by=name&range.order=desc&range.start=my-app-150</a>
    </h4>
</div>

## 📝 Table of Contents
- [About](#about)
- [Setup](#setup)
- [Testing](#testing)
- [Built Using](#built_using)
- [Authors](#authors)

## ⚙️ Setup <a name = "setup"></a>

### Installation

*   Clone the [repo]('https://github.com/AndresMWeber/mdlive-test/')
*   Install the server dependencies with: ```npm install``` or ```yarn install```
*   Seed the database by running ```yarn seed``` or ```npm run seed``` in the root directory
*   Run the local backend server using ```npm start``` or ```yarn start```
*   Open ```http://localhost:3000``` and Have fun!

### Environment Variables
*   (optional) Create a [Mongo DB Cluster](https://cloud.mongodb.com/)
*   Set the following environment variables on | [mac](https://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion) | [windows](https://superuser.com/questions/1334129/setting-an-environment-variable-in-windows-10-gpodder) | [linux](https://stackoverflow.com/questions/45502996/how-to-set-environment-variable-in-linux-permanently) | or just create a ```.env``` file in the root directory

| Environment Variables        | Description                                         | Default   |
| ---------------------------- |:--------------------------------------------------- |:----------|
| PORT                         | Port for the backend express server                 | 3000      |
| MONGODB_URI                  | URI to log into mongodb                             | mongodb://localhost/please-set-process-env-mongodb-uri |
| MONGODB_LOCAL                | override for localhost mongodb database name        | undefined |

## 🧪 Testing <a name = "testing"></a>
*  Run ```yarn test``` to run the test suite.
*  It will automatically connect to a local mongoose database named mdlive-test if you want to check out the database state after the test suite runs.

## ⛏️ Built Using <a name = "built_using"></a>
- [JavaScript](https://www.javascript.com/) - Front End
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/) - Database
- [Express.js](https://expressjs.com/) - Backend
- [Jest](https://jestjs.io/) - Testing
- [Supertest](https://www.npmjs.com/package/supertest) - API Testing
- [CircleCI](https://circleci.com) - Continuous Integration
- [CodeClimate](https://d341kum51qu34d.cloudfront.net/images/2019-04-redesign/code_climate_logo-a046042f.svg) - Code Health Metrics

# ✍️ Authors <a name = "authors"></a>
* [Andres Weber](https://github.com/AndresMWeber)
