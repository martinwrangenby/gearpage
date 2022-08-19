# Gearpage
Simple react web app to keep track of your instruments.

:construction: Constantly under construction. More of a playground for working on my react skills and other javascript-related tools/aspects that interests me.

Icon resources from [Font Awesome 4.7](https://fontawesome.com/v4.7.0/).  

env variables for local setup can be defined in `.env.local`

## Setup env and get started
### Install dependencies
```
npm i
```
### Specify/setup Firebase  
To setup your own firebase project to use with the app locally:
1. Create a new firebase project [here](https://console.firebase.google.com/u/0/). 
2. Setup a Realtime Database for the project wth the following rules:
    ``` json
    {
      "rules": {
        "users":
        {
            "$userId":
            {
                ".read": "auth.uid === $userId",
                ".write": "auth.uid === $userId"
            }
        }
      }
    }
    ```
3. Store the Database base url in env variable `REACT_APP_DB`
4. Setup email/password authentication for the project
5. Create an web app in the Firebase console and connect it to your project
6. Copy the app firebase SDK config and map them to the following env variables:
   - `apiKey` - `REACT_APP_FIREBASE_APIKEY`
   - `authDomain` - `REACT_APP_FIREBASE_AUTHDOMAIN`
   - `databaseURL` - `REACT_APP_FIREBASE_DBURL`
   - `projectId` - `REACT_APP_FIREBASE_PROJECTID`
   - `storageBucket` - `REACT_APP_FIREBASE_STORAGEBUCKET`
   - `messagingSenderId` - `REACT_APP_FIREBASE_MSGSENDERID`
   - `appId` - `REACT_APP_FIREBASE_APPID`
7. Create a user account under project Authentication

To be able to deploy your project (part of the CI pipelines) you also need to setup firebase hosting as well.
Follow the [Firebase Hosting documenation](https://firebase.google.com/docs/hosting).  

Great, now you _should_ be good to go :tada:

### Start the app in dev mode
```
npm start
```
## Tests

### Unit/Component tests
Built using [testing-library](https://testing-library.com/). To execute, run:  
```
npm run test
```

### E2E
The e2e test framework is based on [playwright](https://playwright.dev/). Playwright has support for running Chromium, Firefox and Webkit, but only Chromium is used for the e2e tests at this point. Test will by default run headless with a concurrenct of 4 threads. If run headful, the tests will run in series.  
By default, the tests will target `http://localhost:3000/`, to override this, specify the desired base url in env variable `REACT_APP_FRONTEND`  
The playwright version used is the determined by [browserstack's playwright version support](https://www.browserstack.com/docs/automate/playwright/playwright-browser-compatibility)

#### Setup

##### Project authentication
The framework generates and cleans up test data under the hood by firing requests directly to the db. To setup the authentication for this you need to get the service account JSON file from your Firebase project and store `private_key` in the env variable `FIREBASE_SC_PRIVATE_KEY` and `client_email` in the env variable `FIREBASE_SC_CLIENT_EMAIL`

##### User account credentials
To be able to login to the app, the framework will make use of the following env variables:
- `E2E_TEST_USERNAME` user account email
- `E2E_TEST_PASSWORD` - user account password
- `E2E_TEST_UID` - user account ID
- `BROWSERSTACK_USERNAME` - username for a browserstack account (needed for browserstack execution only)
- `BROWSERSTACK_ACCESS_KEY` - access key for a browserstack account (needed for browserstack execution only)


So if you're running your own firebase project, make sure to create a user for the purpose of running e2e tests and set the env variables listed above.
#### Execution

To execute the e2e tests, run:
```
npm run e2e
```
To run the tests headful, run:
```
npm run test:headful
```
To start the dev server and execute the tests all in one script, run:
```
npm run:ci
```
When the tests are done, the server will shut down.  

The tests can also be executed on browserstack which will run the tests on a number of os/browser combinations (can be viewed/altered in the `playwright.config.broserstack.js` config file). For this you need a browserstack account (see credentials instructions above). Unlike the test execution variants above, browserstack execution will run the tests towards the deployed service (rather that local dev server). To execute, run:
```
npm run e2e:browserstack
```

#### Test results
On test completion, a html report is generated and stored at `e2e/results/html`.  
On test failure, a screenshot will be saved to `e2e/results/`.  
## CI structure

### Local hooks
Local git hooks are setup using [husky](https://www.npmjs.com/package/husky). Active hooks:  
- Pre-commit: lint check
### Github actions

#### Tests & code analysis
##### push trigger
[tests workflow](.github/workflows/tests.yml). The tests workflow runs:  
- component tests
- e2e tests (stores test artifacts upon failure)
##### pull request trigger
[scan workflow](.github/workflows/scan.yml).
The following checks are performed on Pr trigger:

**DangerJS**  
[DangerJS](https://danger.systems/js/) is a tool that performs static code and git/github metadata checks using the [dangerfile](dangerfile.js).  
To try this out locally you need to get hold of the github project's dangerbot access token.  
If you've forked the project, create a bot of your own and then [generate an access token](https://danger.systems/js/guides/getting_started.html#tokens-for-oss-projects) and use that one.  
Then, to run dangerJS locally:
```
DANGER_GITHUB_API_TOKEN=[YOUR_TOKEN_GOES_HERE] npm run danger:local [URL TO EXISTING PR IN PROJECT]
```

**Sonarcloud**  
Tool scanning code for bugs, code smells and potential vulnerabilities. Also calculates code duplication and code coverage.  
If you've forked the project, you can read up on setting up sonarcloud [here](https://sonarcloud.io/github)

#### Deploys
##### Staging
A staging build is deployed on PR-trigger. The URL to the staging deploy can be found in the 
PR comment posted by the gitlab bot when deploy is done.
##### Production
Push to master (merging a PR) triggers a production deploy

#### Scheduled jobs
Apart from being run on pr trigger, sonarcloud and CodeQL are also run daily targeting the master branch.
## Boilerplate
The project is bootstrapped with with [Create React App](https://github.com/facebook/create-react-app).