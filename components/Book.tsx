import { BASE_URL } from "@/config";
import { GET_BOOK } from "@/graphlql/queries";
import { DELETE_BOOK } from '@/graphlql/mutations';
import { GET_BOOKS } from '@/graphlql/queries'
import { IBook } from "@/typings";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import React from "react";

type Props = {
	book: IBook;
};

export const Book = ({ book }: Props) => {

	return (
		<article className="flex flex-col p-4 bg-blue-400 dark:bg-gray-800 hover:scale-105 shadow-md hover:shadow-lg hover:bg-blue-500 transition duration-300 ease-out text-gray-800">
	
			{book.image && (
				<div>
					<img
						src={book.image}
						alt={book.title}
						className="h-64 w-full object-cover rounded-lg shadow-md"
					/>
				</div>
			)}
	
			<h1 className="font-semibold text-2xl my-2 text-white">{book.title}</h1>
	
			<p className="text-sm my-2 line-clamp-3 text-gray-900">
				Awesome Book
			</p>
	
			<div className="flex justify-between items-center text-xs mt-auto text-gray-600">
				<p className="text-yellow-600">
					Authors: {book?.authors.length}
				</p>
			</div>
	
		</article>
	);
			};	
	
