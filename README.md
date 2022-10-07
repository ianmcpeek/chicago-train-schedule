# Chicago Train Schedule

A small demo app to demonstrate browser persistance using an html table. Implementation uses localStorage and the `uuid` package to persist records across browser sessions. UUID is used to prevent id collisions as this value is used as a key prop for table rows.

The table can be sorted by column in descending or ascending order with paginated results up to 5 items.

To get started there are 2 options:
* Navigating to the hosted example running on AWS S3 as a static website. Click on the link to give it a try: http://wellspring-chicago-train-schedules.s3-website-us-west-2.amazonaws.com/

* To build the app yourself you will need a [current version of Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and run `npm install` in the project directory. Continue reading to run the app locally.

Photo available under the Unsplash License, courtesy of [Jeremiah Higgins](https://unsplash.com/photos/lzBHm2sbJPM)


## Available Scripts

In the project directory, you can run:

### `npm start`
### `npm run build`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
