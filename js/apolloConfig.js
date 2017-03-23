import { ApolloClient, createNetworkInterface } from 'react-apollo';

const apolloClient = new ApolloClient({
    //networkInterface: createNetworkInterface({ uri: 'http://192.168.0.12:3000/graphql' }), // test
    networkInterface: createNetworkInterface({ uri: 'http://192.168.0.12:80/c_graphql',opts: {method: 'POST'} }), // local
    // dataIdFromObject: o => `${o.__typename}:${o.id},`,
    //shouldBatch: true,
});

export default apolloClient;