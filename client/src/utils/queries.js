import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user {
    user {
      username
      email
      password
      savedBooks {
        bookId
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
      }
    }
  }
`;