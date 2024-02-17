import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const DeleteUser = ({show, cancel, deleteUser}) => {
  return (
    <Modal isOpen={show}>
      <ModalHeader>
        <div>Are you sure?</div>
      </ModalHeader>
      <ModalBody>
        <div> Are you sure, you want to delete this user?</div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={cancel} color='secondary'>Cancel</Button>
        <Button onClick={deleteUser} color="danger">Confirm</Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteUser