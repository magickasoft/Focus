import ApolloClient, { createNetworkInterface } from 'apollo-client';

const apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'http://192.168.0.12:3000/graphql' }),
    // dataIdFromObject: o => `${o.__typename}:${o.id},`,
    shouldBatch: true,
});

export default apolloClient;