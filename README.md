# README

## Prerequisites

[node.js](https://nodejs.org/en/)

## Local Setup

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

## How to setup graphql Client

- Install all the necessary packages ( @apollo/client )

- Create a new ApolloClient and wrap the app with it using ApolloProvider.

- Now we just need useQuery or useMutation to apply our Queries and Mutations, making a request to our API.

Example for Mutation:
`const [addPhoto] = useMutation(ADD_PHOTO)`

Example for Query:
`const { loading, error, data } = useQuery(GET_CURRENT_PHOTOS)`
