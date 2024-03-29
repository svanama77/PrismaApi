import { ADD_BOOK } from '@/graphlql/mutations'
import { GET_BOOKS } from '@/graphlql/queries'
import { IBook } from '@/typings'
import { useMutation, useQuery } from '@apollo/client'
import React, { FormEvent, useState } from 'react'
import { Book } from './Book'

export const Books = () => {
   
 
  const [title ,setTitle] =useState("");
  const [image ,setImage] =useState("");

  const {data,loading,error} = useQuery(GET_BOOKS);

  const [addBook] = useMutation(ADD_BOOK, {
		variables: { image, title },
		refetchQueries: [{ query: GET_BOOKS }],
	});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (image === "" || title === "") return alert("Enter fields");

		addBook({ variables: { image, title } });
		setTitle("");
		setImage("");
	};

  if(loading) return <p>loading...</p>;
  if(error) return <p>error...</p>;

  const books :IBook[] =data ?.books;

  return (
    <div className="mt-8">
        <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter title"
                className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                type="text"
                placeholder="Enter Image url"
                className="bg-gray-800 border border-gray-600 text-white p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                Add Book
            </button>
        </form>
        <div className="grid grid-cols-4 gap-4">
            {books.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
    </div>
);
            };


