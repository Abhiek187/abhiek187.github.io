# My Website

[![Node.js CI](https://github.com/Abhiek187/abhiek187.github.io/actions/workflows/node.js.yml/badge.svg)](https://github.com/Abhiek187/abhiek187.github.io/actions/workflows/node.js.yml)
[![CodeQL](https://github.com/Abhiek187/abhiek187.github.io/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Abhiek187/abhiek187.github.io/actions/workflows/codeql-analysis.yml)

![Screenshot of my website](screenshot.png)

## About

This is my portfolio website created in React, inspired by Udacity's Front-End Web Development course. It showcases the projects I'm most passionate about with the creative freedom of developing a website. This repo will always be updated as I learn more about the best web practices and come up with ideas to further improve the website. You can check out [my website](https://abhiek187.github.io) to learn more and get in touch with me.

## Features

- React as the web framework
- TypeScript for added type safety
- SCSS for enhanced CSS syntax
- Bootstrap to improve the UI
- Light and dark mode
- 40+ tests for the 5 main views using the React Testing Library
- Accessible and responsive web design
- Best practices for Progressive Web Apps
- Efficient delivery of static content by utilizing WebP images and WebM videos
- Search Engine Optimization (SEO)
- CI/CD workflows after every commit or PR to main
- Vite for the development server
- SWC, a Rust-based compiler for bundling the website
- Continuous updates and improvements

## Dependencies

This project was bootstrapped with [Vite](https://vitejs.dev/).<br>
[React Router](https://reacttraining.com/react-router) was used to create the single-page experience.<br>
[gh-pages](https://github.com/tschaub/gh-pages) was used to deploy the website to the gh-pages branch.<br>
The [GitHub API](https://docs.github.com/en/rest) was used to get the watchers, forks, and stars from each repo.

To create a local copy, you'll need the following command-line programs:

- git: `apt-get install git`
- npm (part of Node.js):

```bash
sudo apt update
sudo apt install nodejs npm
```

## Running the Program

Click on [this link](https://abhiek187.github.io) to view my website on GitHub Pages.

-OR-

Start by setting up the local environment:

```bash
git clone https://github.com/Abhiek187/abhiek187.github.io.git
cd abhiek187.github.io
npm install
```

Make sure to keep in the mind the [branches](#branches) when doing development work. If just running the program, stick to the **main** branch.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open http://localhost:5173/ to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Note: Service workers (aka offline functionality) will not work in development mode.

### `npm test`

Runs all tests using Vitest.<br>
See the section about [running tests](https://vitest.dev/) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [building](https://vitejs.dev/guide/build.html) for more information.

### `npm run serve`

Runs the production build locally. Open http://localhost:4173/ to view it in the browser.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://react.dev/).

## Branches

Due to the way GitHub Pages is set up for user pages, this project has been split into 2 branches:

### main

This is the default branch for this repo, where all production code is held. See [Contributing](https://github.com/Abhiek187/abhiek187.github.io/blob/main/CONTRIBUTING.md) for info on how to create the other branches.

### gh-pages

This is the default branch gh-pages uses for deployment. It has all the minified content needed to properly deploy this on [abhiek187.github.io](https://abhiek187.github.io).

## Miscellaneous

- [Code of conduct](https://github.com/Abhiek187/abhiek187.github.io/blob/main/CODE_OF_CONDUCT.md)
- [Contributing](https://github.com/Abhiek187/abhiek187.github.io/blob/main/CONTRIBUTING.md)
- [License](https://github.com/Abhiek187/abhiek187.github.io/blob/main/LICENSE)
- [Issue templates](https://github.com/Abhiek187/abhiek187.github.io/tree/main/.github/ISSUE_TEMPLATE)
- [Pull request template](https://github.com/Abhiek187/abhiek187.github.io/blob/main/PULL_REQUEST_TEMPLATE.md)
