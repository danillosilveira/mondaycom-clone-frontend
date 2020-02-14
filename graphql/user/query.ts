import { gql } from "apollo-boost";

export const ACTIVE_USER = gql`
  query($id: String) {
    activeUser(id: $id) {
      user {
        id
        fullName
        email
        createdAt
      }
      errorMessage
    }
  }
`;
