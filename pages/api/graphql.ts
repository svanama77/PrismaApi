
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client/extension';
import { Context } from 'vm';
import {prisma} from  '../../prisma/db'
export type context = {
   prisma:PrismaClient

};
const typeDefs = `#graphql
type Book {
     id:ID!
     title:String
     image:String
     createdAt:String
     updatedAt:String
     authors:[Author]

}

type Author {
  id:ID!
  name :String
  bookID:String

}

type Genre {
  id: ID!
  name: String
  books: [Book]
}


type Query {
  book(id: ID!): Book
  books:[Book]
}

type Mutation {
 addBook(image: String, title: String):Book
 updateBook(id:ID!, title:String ,image:String) :Book
 deleteBook(id:ID!):Book
 addAuthor(bookId:ID!,name :String):Author
 deleteAuthor(id:ID!):Author

}
`;



const resolvers = {
    Query: {
      books: async (parent: any, args: any, context: Context ) => {
        return await context.prisma.Book.findMany();
      },
      book: async (parent: any, args: any, context: Context ) => {
        return await context.prisma.Book.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    Book: {
      authors: async (parent: any, args: any, context: Context) => {
        return await context.prisma.Author.findMany({
          where: {
            bookId: parent.id,
          },
        });
      },
    },
    Genre: {
      books: async (parent: any, args: any, context: Context) => {
        return await context.prisma.Book.findMany({
          where: {
            genreId: parent.id,
          },
        });
      },
    },
     
    Mutation:{
        addBook:async (parent: any, args: any, context: Context) => {
            return await context.prisma.Book.create({
              data: {
                title: args.title,
                image:args.image,
              }
            });
          },
          updateBook:async (parent: any, args: any, context: Context) => {
            return await context.prisma.Book.update({
                where :{
                    id:args.id,
                },
              data: {
                title: args.title,
                image:args.image,
              }
            });
          },
          deleteBook:async (parent: any, args: any, context: Context) => {
            return await context.prisma.Book.delete({
                where :{
                    id:args.id,
                },
              
            });
          },
          addAuthor:async (parent: any, args: any, context: Context) => {
            return await context.prisma.Author.create({
               data : {
                bookId:args.bookId,
                name:args.name,
               }
              
            });
          },
          deleteAuthor:async (parent: any, args: any, context: Context) => {
            return await context.prisma.Author.delete({
              where:{
                id:args.id,
              },
              
            });
          },
    },

  };


  
  

const apolloserver = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(apolloserver ,{

    context: async(req,res) => ({req,res,prisma})
});