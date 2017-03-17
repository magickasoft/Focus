'use strict';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


export const allUsers = gql`
  query allUsers5 {
    usersList {
      id,
      name,
      friends {
        id,
        name
      }
    }
  }
`;
