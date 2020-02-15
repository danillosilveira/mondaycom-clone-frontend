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

export const SIGN_UP = gql`
  mutation(
    $fullName: String!
    $email: String!
    $password: String!
    $teamName: String!
  ) {
    register(
      data: {
        fullName: $fullName
        email: $email
        password: $password
        teamName: $teamName
      }
    ) {
      user {
        id
      }
      errorMessage
    }
  }
`;
