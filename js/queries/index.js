'use strict';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


export const allUsers = gql`
  query allUsers {
    users {
      uid
      fullname
    }
  }
`;
export const getUserById = gql`
  query getUserByUid($uid: Int!) {
    user(uid: $uid) {
      uid
      name      
    }
  }
`;
export const getUserByIdAllFields = gql`
  query getUserByUid($uid: Int!) {
    user(uid: $uid) {
      uid
      name
      firstname
      lastname
      position
      phones
      city {
        tid
        name
        fias_aoguid
      }
      mail
    }
  }
`;


