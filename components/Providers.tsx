"use client"
import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const Providers = ({children} :{children:React.ReactNode}) => {
    const client = new ApolloClient({
        uri: process.env.NEXT_SERVER_URL,
        cache: new InMemoryCache(),
      });

  return (

    <ApolloProvider client={client}>
      { children}
    </ApolloProvider>
   

  )

}