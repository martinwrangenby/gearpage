# Gearpage
Simple react web app to keep track of your instruments.

:construction: Constantly under construction. More of a playground for working on my react skills and other javascript-related tools/aspects that interests me.

Icon resources from [Font Awesome 4.7](https://fontawesome.com/v4.7.0/).
## Setup env and get started
1. Install dependencies
```
npm i
```
2. Specify/setup backend service :construction:

3. Run the app in dev mode
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
#### Test results
On test completion, a html report is generated and stored at `e2e/results/html`.  
On test failure, a screenshot will be saved to `e2e/results/`.  
## CI structure
:construction: This is at an early stage. Currently there are no build steps involved in the CI, only rudimentary tests.
### Local hooks
Local git hooks are setup using [husky](https://www.npmjs.com/package/husky)
- Pre-commit: lint check
- Pre-push :construction: when unit tests are setup properly they will be executed here.
### Github actions
#### push trigger
- [tests workflow](.github/workflows/tests.yml). The tests workflow runs the e2e tests and stores test artifacts upon failure.
#### pull request trigger
[CodeQL workflow](.github/workflows/tests.yml)
## Boilerplate
The project is bootstrapped with with [Create React App](https://github.com/facebook/create-react-app).