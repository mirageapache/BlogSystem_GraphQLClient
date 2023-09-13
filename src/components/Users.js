import React from 'react'
// import { Query } from 'react-apollo';
import { gql, useQuery } from "@apollo/client";

const getUserQuery = gql`
  query GetUserQuery{
    users {
      id
      name
      email
      age
    }
  }
`;

function Users(props) {

  const {data, loading, error} = useQuery(getUserQuery);

  if(loading) return "Loading...";
  if(error) return <pre>{error.message}</pre>
  if(data) {
    const lists = data.users.map(user => 
      <li key={user.id}>{user.name}</li>
    )
    return (
      <div>
        <ul>{lists}</ul>
      </div>
    )
  }
}

export default Users
