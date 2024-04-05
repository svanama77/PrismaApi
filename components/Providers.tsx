"use client"
import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BASE_URL } from '@/config';

export const Providers = ({children} :{children:React.ReactNode}) => {
   const url = BASE_URL
   console.log(url)
    const client = new ApolloClient({
        uri: `${BASE_URL}`,
        cache: new InMemoryCache(),
      });

  return (

    <ApolloProvider client={client}>
      { children}
    </ApolloProvider>
   

  )

}