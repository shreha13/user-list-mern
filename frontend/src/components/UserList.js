import React from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

const UserList = ({users, handleShowDelete}) => {
  return (
    <Table bordered striped={users.length>0}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0? users.map(user => (
           <tr>
              <td><Link to={`/${user._id}`}>{user.username}</Link></td>
              <td>{user.email}</td>
              <td>{user.description}</td>
              <td className='text-center'><i class="fa-solid fa-trash" onClick={() => handleShowDelete(user._id)}></i></td>
            </tr>   
          )) : <tr><td colSpan={4} className='text-center'>No users found!</td></tr> }
        
      </tbody>
    </Table>
  )
}

export default UserList