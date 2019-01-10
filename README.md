# My Website

### Due to the way GitHub Pages is set up for user pages, this project has been split into 4 branches:

### dev
This is the default branch for this repo, where all developmental work takes place.

### backup
A backup branch in case something goes wrong in dev (i.e. trying to migrate all files away from master).

### master
Since this is a user page, GitHub Pages must be deployed in the master branch. As such, developmental work was hard to manage on this branch, so I switched over to working in **dev** as my "master" branch. This branch now has all the minified content needed to properly deploy this on [abhiek187.github.io](https://abhiek187.github.io).

### gh-pages
Normally, this would be the branch GitHub Pages would deploy your site in, but because this is a user page, it doesn't do anything. Instead, think of this as a backup for master.

## About
This is my own personal website created using React. Inspired by Udacity's Front-End Web Development Course, I decided to use my React skills to create a website that encapsulates what I've accomplished over the years in an environment I have a passion for. It is responsive and accessible. You can check out [this site](https://abhiek187.github.io) to learn more and get in contact with me.

## Dependencies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>
[React Router](https://reacttraining.com/react-router) was used to create the single-page experience.<br>
[gh-pages](https://github.com/tschaub/gh-pages) was used to deploy the website in the master branch.

To create a local copy, you'll need the following command line programs:
- git: `apt-get install git`
- npm (part of Node.js):
```
sudo apt update
sudo apt install nodejs npm
```
- serve: `npm i serve`

## Running the Program
Click on [this link](https://abhiek187.github.io) to view my website on GitHub Pages.

-OR-

Start by setting up the local environment:
```
git clone https://github.com/Abhiek187/abhiek187.github.io.git)
cd abhiek187.github.io
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Note: Service workers (aka offline functionality) will not work in development mode.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

To run the production build, run `serve -s build` and open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Miscellaneous
- [Code of conduct](https://github.com/Abhiek187/abhiek187.github.io/blob/dev/CODE_OF_CONDUCT.md)
- [Contributing](https://github.com/Abhiek187/abhiek187.github.io/blob/dev/CONTRIBUTING.md)
- [License](https://github.com/Abhiek187/abhiek187.github.io/blob/dev/LICENSE)
- [Issue templates](https://github.com/Abhiek187/abhiek187.github.io/tree/dev/.github/ISSUE_TEMPLATE)
- [Pull request template](https://github.com/Abhiek187/abhiek187.github.io/blob/dev/PULL_REQUEST_TEMPLATE.md)
