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
        <a href="https://app.buddy.works/andresmweber-1/mdlive-test/pipelines/pipeline/222273/executions">
            <img src="https://app.buddy.works/andresmweber-1/mdlive-test/pipelines/pipeline/222273/badge.svg?token=168aae22848dad7a759a7845801a9396dcc8ea8d8bc9176f7c64d672740e1bd5" />
        </a>
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
</div>

## 📝 Table of Contents
- [About](#about)
- [Setup](#setup)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Built Using](#built_using)
- [Authors](#authors)

## 📙 About <a name = "about"></a>

#### Process
1. Started with express-generate and removed as much of the unnecessary scaffolding as I could.
1. Implemented all necessary scripts in package.json to test, seed the db and deploy
1. Added my own custom database connection, seed, and seed-helper functions to populate the database efficiently with the test data.
1. Added the model for the app
1. Added ```CircleCI``` and ```CodeClimate``` configurations to automate the testing of the project.
1. Created the endpoint and set up the manual pagination.
1. Added as many test cases as I could think of, some boundary tests and tested the examples provided in the instructions.
1. Deployed to Heroku and set up a persistent MongoDB Database on Atlas


### Notes
#### Pagination Implementation
From the challenge description it seemed that this implementation had a few unique characteristics: 
1. It had a nested query string, some options include a stringified Object form, bracket notated nested query params (e.g. range[by]) and a dot notated set of nested query params (e.g. range.by)
1. The pagination could start based on finding matches for the start value, not just an index value.

For the first I chose to write my own query parameter parser that would create an object based on a given key prefix, for example ```?range.by=id&range.start=5``` would become ```{"range": {"by": "id", "start"=5}}```

For the second I created a helper function ```searchArrayByProperty``` which attempted to find the matches given by the query string start/end parameters within the array. 

Finally for the more traditional sorting I chose to use a switch statement which incorporated ascending and descending functions for both primitive data types we expected.  This was so our sort/reverse could run in ```O(n log n)``` instead of adding another ```O(n)``` to the runtime complexity.

#### Query Parameter Structure
I chose to interpret the query as a nested query string in the form of ```?key.subkey=value```.
This way I was able to parse the query parameters for the key and store all the subkey values in an object.

Another way of doing this would be to have the query parameter be called range and ```JSON.stringify``` an object with all the required key/value pairs then on the backend use ```JSON.parse```.  This would be easier on the backend but harder to type into the browser address bar, although it could be easier to send from the frontend as an object.  I chose to have it easier to type in the browser address bar since it would be easier to quickly test manually.

#### Improvement Considerations
- **non-determinism:** There is an inherent issue with using ```by=name&start=my-app-001```: we are lucky that they match up directly with their inherent index, however if they had more unique names and the database was not static this would cause us to get different results per query.  It also makes finding the next/previous pagination set harder since it's non trivial to determine the next start query's look up name if the names were unique and you did not want to parse the names as they are currently. 
- **pagination:** Based on the problem set and the aforementioned non-determinism it seems like it would be more effective to return an object with next/previous pagination parameters and possibly some type of trace back for the query itself.
- **mongoose queries:** I assumed that due to the restriction of not being able to use a library to perform the pagination that we could not use mongoose to perform anything other than finding all of the model's documents and ignore any optimized database query methods we had available.  If that were not the case, I would highly prefer to not query the entire set of model documents and instead pass the calculated pagination settings to native mongoose queries like ```Model.limit```, ```Model.find```, ```Model.skip```, and ```Model.sort```.  The only native call that I used was ```Model.lean``` in order to speed up the overall query by roughly 4x since we are not using any of the mongoose Model functionality and that did not effect the pagination.

## ⚙️ Setup <a name = "setup"></a>

### Installation

*   Clone the [repo]('https://github.com/AndresMWeber/mdlive-test/')
*   Install the server dependencies with: ```npm install``` or ```yarn install```
*   Install *MongoDB* to make sure you have the daemon running (or just connect to a *MongoDB Cluster* you created in the optional **Environment** step)
*   Seed the database by running ```yarn seed``` or ```npm run seed``` in the root directory
*   Run the local backend server using ```npm start``` or ```yarn start```
*   Open ```http://localhost:3000``` and Have fun!

### Environment Variables
*   Set the following environment variables on | [mac](https://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion) | [windows](https://superuser.com/questions/1334129/setting-an-environment-variable-in-windows-10-gpodder) | [linux](https://stackoverflow.com/questions/45502996/how-to-set-environment-variable-in-linux-permanently) | or just create a ```.env``` file in the root directory
*   (optional) Create a [Mongo DB Cluster](https://cloud.mongodb.com/) to have a persistent hosted database

| Environment Variables        | Description                                         | Default   |
| ---------------------------- |:--------------------------------------------------- |:----------|
| PORT                         | Port for the backend express server                 | 3000      |
| MONGODB_URI                  | URI to log into mongodb                             | mongodb://localhost/please-set-process-env-mongodb-uri |
| MONGODB_LOCAL                | override for localhost mongodb database name        | undefined |

## 📡 Endpoints <a name = "endpoints"></a>
### <span style="color:green">**GET**</span> /apps
Returns the json list of apps matching the query params.

| Example Queries |
| --- |
| https://mdlive-test.herokuapp.com/apps |
| https://mdlive-test.herokuapp.com/apps?range.by=id |
| https://mdlive-test.herokuapp.com/apps?range.start=5&range.end=28&range.max=25 |
| https://mdlive-test.herokuapp.com/apps?range.by=name&range.order=asc&range.start=my-app-150 |
| https://mdlive-test.herokuapp.com/apps?range.by=name&range.order=desc&range.start=my-app-150&range.end=my-app-120 |


| Query Parameters | Type | Default | Description |
|:--- | :--- | :--- | :--- |
| range<i></i>.by | ```String``` | ```"id"``` |Only supports querying by "id" or "name".  <p> **NOTE:** *Must use ```String``` for range.start and range.end if specifying "name"*</p> |
| range.max | ```Number``` | ```50``` |Maximum number of entries to return. |
| range.order | ```String``` | ```"asc"``` | Sets Either 'asc' for ascending order or 'desc' for descending order. |
| range.start | ```String``` or ```Integer``` | ```50``` or ```"my-app-001"``` | Identifier to match the start entry's range<i></i>.by property |
| range.end | ```String``` or ```Integer``` | ```null``` | Identifier to match the end entry's range<i></i>.by property |

| Response | Type |
|:--- | :--- |
| ```200``` | ```JSON ```  |

## 🧪 Testing <a name = "testing"></a>
*  Run ```yarn test``` to run the test suite. 
    - *Note: You do not have to ```yarn seed``` in order to test the database but you DO have to have mongodb installed.*
*  It will automatically connect to a local mongoose database named mdlive-test if you want to check out the database state after the test suite runs.

## ⛏️ Built Using <a name = "built_using"></a>
- [NodeJS](https://nodejs.org/) - Backend Code
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/) - Database
- [Express.js](https://expressjs.com/) - Web Framework
- [Jest](https://jestjs.io/) - Testing
- [Supertest](https://www.npmjs.com/package/supertest) - API Testing
- [CircleCI](https://circleci.com) - Continuous Integration
- [CodeClimate](https://d341kum51qu34d.cloudfront.net/images/2019-04-redesign/code_climate_logo-a046042f.svg) - Code Health Metrics

# ✍️ Authors <a name = "authors"></a>
* [Andres Weber](https://github.com/AndresMWeber)
