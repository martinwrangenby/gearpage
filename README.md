# Gearpage
Simple react web app to keep track of your instruments.

:construction: Constantly under construction. More of a playground for working on my react skills and other javascript-related tools/aspects that interests me.

Icon resources from [Font Awesome 4.7](https://fontawesome.com/v4.7.0/).
## Setup env and get started
1. Install dependencies
```
npm install
```
2. Specify/setup backend service :construction:

3. Run the app in dev mode
```
npm start
```
## E2e tests
The e2e test framework is based on [playwright](https://playwright.dev/) and run with [jest](https://jestjs.io/) using [jest-playwright-preset](https://github.com/playwright-community/jest-playwright). Playwright has support for running Chromium, Firefox and Webkit, but only Chromium is used for the e2e tests at this point.  
To execute the e2e tests, run:
```
npm run e2e
```
To run the tests headful, run:
```
npm run test:headful
```
This will also increase the timeout to 10 seconds (5 default) and run the tests serially.  
To start the dev server and execute the tests all in one script, run:
```
npm run:ci
```
When the tests are done, the server will shut down.
### Test results
On test failure, a screenshot will be saved to `e2e/results/`.  
## CI structure
:construction: This is at an early stage. Currently there are no build steps involved in the CI, only rudimentary tests.
### Local hooks
Local git hooks are setup using [husky](https://www.npmjs.com/package/husky)
- Pre-commit: lint check
- Pre-push :construction: when unit tests are setup properly they will be executed here.
### Github actions
Github actions will execute the [tests workflow](.github/workflows/tests.yml) on pull request trigger. the tests workflow runs the e2e tests and stores test artifcts upon failure.
## Boilerplate
The project is bootstrapped with with [Create React App](https://github.com/facebook/create-react-app).  
Create-react-app default readme content below (slightly modified since I've moved from `yarn` to `npm`) :arrow_down:

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

~~`npm run eject`~~

~~**Note: this is a one-way operation. Once you `eject`, you can’t go back!**~~

~~If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.~~

~~Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.~~

~~You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.~~
> Already ejected :collision:

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
