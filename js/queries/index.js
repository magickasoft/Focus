'use strict';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// export const allUsers = gql`
//   query allUsers {
//     usersList {
//       id,
//       name,
//       friends {
//         id,
//         name
//       }
//     }
//     hello
//   }
// `;
// export const getUserById = gql`
//   query getUserById($uid: String!) {
//     user(id: $uid) {
//       id
//       name
//       friends {
//         id
//         name
//       }
//     }
//   }
// `;
// export const getUserByIdAllFields = gql`
//   query getUserById($uid: String!) {
//     user(id: $uid) {
//       id
//       name
//       descript
//       friends {
//         id
//         name
//         descript
//       }
//     }
//   }
// `;
//
// export const hello = gql`
//   query hello {
//     hello
//
//   }
//
// `;

export const allUsers = gql`query allUsers {
            users {
              uid
              name
              fullname
              lastname
              city {
                tid
                name
                fias_aoguid
              }
            }
          }`;

export const getUserById = gql`query getUserByUid($uid: Int!) {
    user(uid: $uid) {
      uid
      name
    }
  }`;
export const getUserByIdAllFields = gql`query getUserByUid($uid: Int!) {
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
  }`;


