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

## How to setup graphql with Apollo Client

- Install all the necessary packages ( @apollo/client ).

- Create a new ApolloClient and wrap the app with it using ApolloProvider.

  - Like this:

      ```javascript
        import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
        
        const client = new ApolloClient({
          uri: 'http://127.0.0.1:8000/api/graphql/',
          cache: new InMemoryCache(),
        })

        function MyApp({ Component, pageProps }) {
          return (
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          )
        }
      ```

- Now we just need useQuery or useMutation to apply our [Queries](https://www.apollographql.com/docs/react/data/queries) and [Mutations](https://www.apollographql.com/docs/react/data/mutations/), making a request to our API.

  - Example for useMutation: `const [addPhoto] = useMutation(ADD_PHOTO)`

  - Example for useQuery: `const { loading, error, data } = useQuery(GET_CURRENT_PHOTOS_BY_ID)`
