import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Paper } from '@mui/material';

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
        <h1>User List</h1>
        <ul>{lists}</ul>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    )
  }
}

export default Users
