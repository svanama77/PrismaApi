import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
	mutation AddBook($image: String, $title: String) {
		addBook(image: $image, title: $title) {
			authors {
				id
				name
				bookID
			}
			createdAt
			id
			image
			title
			updatedAt
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation deleteBook($id: ID!) {
		deleteBook(id: $id) {
			id
			title
			image
		}
	}
`;

export const UPDATE_BOOK = gql`
	mutation UpdateBook($id: ID!, $title: String, $image: String) {
		updateBook(id: $id, title: $title, image: $image) {
			id
			image
			title
		}
	}
`;

export const ADD_AUTHOR = gql`
	mutation Mutation($bookID: ID!, $name: String) {
		addAuthor(bookID: $bookID, name: $name) {
			id
			name
			bookID
		}
	}
`;

export const DELETE_AUTHOR = gql`
	mutation Mutation($id: ID!) {
		deleteAuthor(id: $id) {
			id
			name
			bookID
		}
	}
`;