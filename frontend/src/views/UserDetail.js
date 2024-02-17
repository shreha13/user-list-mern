import React, { useEffect, useState } from 'react'
import { deleteUser, getUserById } from '../api/users.api';
import { useNavigate, useParams } from 'react-router';
import { Button } from 'reactstrap';
import DeleteUser from '../components/DeleteUser';

const UserDetail = () => {
  const {userId} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const getUser = async() => {
    try {
      const resp = await getUserById(userId);
      setUser(resp.data)
    } catch(err) {
      window.alert(err.message?? "Something went wrong")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleShowDelete = () => setShowDelete(true);

  const handleCancel = () => setShowDelete(false);

  const deleteUserById = async () => {
    try {
      const resp = await deleteUser(userId);
      if(resp) {
        window.alert("Deleted successfully");
        navigate('/');
      }
    } catch(err) {
      window.alert(err.message?? "Something went wrong")
    }
  }

  return (
    <div className='m-4'>
      <div className='shadow-md p-4 border rounded'>
        <div className='fw-bold mb-4'>Profile Details</div>
        <div className='d-flex flex-column flex-md-row'>
          <div className='me-2 details-1'>
            <div className='d-flex justify-content-center'><img className='avatar-url' src={"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="avatar" /></div>
            <div className='text-center'>{user.role}</div>
            <div>{user.description}</div>
          </div>
          <div className='me-2'>
            <div className='mb-2'><b>First Name: </b>{user.first_name}</div>
            <div className='mb-2'><b>Last Name: </b>{user.first_name}</div>
            <div className='mb-2'><b>Username: </b>{user.username}</div>
            <div className='mb-2 mt-4'><i class="fa-solid fa-envelope"></i> {user.email}</div>
            <div className='mb-2'><i class="fa-solid fa-phone"></i> {user.phone}</div>
          </div>
        </div>
        
      </div>
      <div>
        <Button className='mt-4 float-end' color="danger" onClick={handleShowDelete}>Delete User</Button>
      </div>
      <DeleteUser show={showDelete} cancel={handleCancel} deleteUser={deleteUserById}></DeleteUser>
    </div>
  )
}

export default UserDetail