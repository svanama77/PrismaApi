import { gql } from '@apollo/client/'

export const GET_BOOKS = gql`

query Books {
    books {
      authors {
        bookID
        id
        name
      }
      createdAt
      id
      image
      title
      updatedAt
    }
  }

`;

export const GET_BOOK = gql`
	query Book($id: ID!) {
		book(id: $id) {
			authors {
				id
				name
				bookID
			}
			id
			image
			title
		}
	}
`;
