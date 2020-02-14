import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
      }
      errorMessage
    }
  }
`;
