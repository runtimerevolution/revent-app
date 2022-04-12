# REVENT APP

## Description

In order to be able to support our monthly photo contest, Runtime decided to build an app that allows users to submit and vote on photos.
Since this will be an open source project, it also gives everyone a new free option to support this type on initiatives.

## Prerequisites

[node.js](https://nodejs.org/en/)

## How to Install and Run the Project

Run:

```shell
npm install
```

and

```shell
npm run dev
```

## How the project was created

Install the following:

[nvm](https://github.com/nvm-sh/nvm)

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

[next.js](https://nextjs.org/docs)

```shell
npx create-next-app@latest
```

[jotai](https://jotai.org/docs/introduction)

```shell
npm install jotai
```

[react-hook-form](https://react-hook-form.com/get-started)

```shell
npm install react-hook-form
```

[react-query](https://react-query.tanstack.com/installation)

```shell
npm i react-query
```

In this step, if there are any errors, you might need to downgrade your react version to 17.0.2. To do this go to your `package.json` file and on the dependencies change react and react-dom value to `"17.0.2"`

[jest](https://jestjs.io/docs/getting-started)

```shell
npm install --save-dev jest
```

After the installation is complete:

- Run `npm run dev` to start the development server
- Visit  `http://localhost:3000` to view the application
- Start coding! :)
