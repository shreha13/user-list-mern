import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import UserList from '../components/UserList';
import AddUser from '../components/AddUser';
import { createUser, deleteUser, getUsers } from '../api/users.api';
import DeleteUser from '../components/DeleteUser';

const User = () => {
  const [users,setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userId, setUserId] = useState()

  const userListApi = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList.data);
    } catch(err) {
      window.alert(err.message?? "Something went wrong");
    }
  }

  useEffect(() => {
    userListApi();
  }, []);

  const handleShowModal = () => setShowAddUser(true);
  
  const closeModal = () => setShowAddUser(false);

  const handleShowDelete = (deleteUserId) => {
    setShowDelete(true);
    setUserId(deleteUserId)
  }

  const handleCancel = () => setShowDelete(false);

  const deleteUserById = async () => {
    try {
      const resp = await deleteUser(userId);
      if(resp) {
        window.alert('deleted successfully')
        
        userListApi();
      }
    } catch(err) {
      window.alert(err.message?? "Something went wrong");
    } finally {
      handleCancel();
    }
  }

  const addUser = async (userDetails) => {
    try {
      debugger;
      const resp = await createUser(userDetails);
      if(resp.data) {
        window.alert("User added successfully");
        userListApi();
      }
    } catch(err) {
      window.alert(err.message?? "Something went wrong")
    } finally {
      closeModal();
    }
  }

  return (
    <div className='m-5'>
      <div>
        <Button onClick={handleShowModal} type="button" color='primary' className='mb-3 float-end'>Add New User</Button>
      </div>
      <UserList users={users} handleShowDelete={handleShowDelete} />
      {showAddUser && <AddUser show={showAddUser} closeModal={closeModal} addUser={addUser} />}
      <DeleteUser show={showDelete} cancel={handleCancel} deleteUser={deleteUserById}></DeleteUser>
    </div>
  )
}

export default User