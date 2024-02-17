import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const AddUser = ({show, closeModal, addUser}) => {
  const [validate, setValidate] = useState({});
  const [saveDisabled, setSaveDisabled] = useState(true);
  const formRef = useRef();

  const validateEmail = (e) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = {}
    if (emailRegex.test(e.target.value)) {
      valid.emailState = true;
    } else {
      valid.emailState = false;
    }

    setValidate(prev => ({...prev, ...valid}));
  }

  const validateDescription = (e) => {
    const valid = {}
    valid.descriptionState = e.target.value.length >=6;
    setValidate(prev => ({...prev, ...valid}));
  }

  const validateUserName = (e) => {
    const valid = {}
    valid.usernameState = e.target.value.length > 0;
    setValidate(prev => ({...prev, ...valid}));
  }

  const validatePhone = (e) => {
    const valid = {}
    valid.phoneState = e.target.value.length === 10;
    setValidate(prev => ({...prev, ...valid}));
  }

  useEffect(() => {
    const keys = Object.keys(validate);
    if(keys.length === 0) {
      setSaveDisabled(true);
      return;
    }
    const isInvalid = keys.filter(val => validate[val] === false);
    if(isInvalid.length > 0) {
      setSaveDisabled(true);
      return;
    }
    const requiredField = ['emailState', 'descriptionState', 'usernameState']
    const required = requiredField.filter(val => validate[val] === true)
    if(required.length < requiredField.length) {
      setSaveDisabled(true);
      return;
    }

    setSaveDisabled(false);
  }, [validate])

  const handleAddUser = (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, description, role, username } = e.target;
    const user = {
      firstName: firstName.value,
      lastName: lastName.value, 
      phone: phone.value,
      email: email.value,
      description: description.value,
      role: role.value,
      username: username.value
    }

    addUser(user);
  }

  const handleClose = () =>{
    setValidate({});
    setSaveDisabled(true);
    closeModal();
  }

  return (
    <Modal isOpen={show}>
       <Form ref={formRef} onSubmit={handleAddUser} id="add-user">
      <ModalHeader>
        <div>Add User</div>
      </ModalHeader>
      <ModalBody>
          <FormGroup>
            <Input type="text" placeholder='First Name' name="firstName" className='w-100 my-2' />
          </FormGroup>
          <FormGroup>
            <Input type="text" placeholder='Last Name' className='w-100 my-2' name="lastName" />
          </FormGroup>
          <FormGroup>
            <Input type="text" placeholder='User Name' className='w-100 my-2' name="username" valid={validate.usernameState === true} invalid={validate.usernameState === false} onChange={validateUserName} />
            <FormFeedback>
              Enter a valid username
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input type="text" placeholder='Email' className='w-100 my-2' name="email" valid={validate.emailState === true} invalid={validate.emailState === false} onChange={validateEmail} />
            <FormFeedback>
              Enter a valid email
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input type="text" placeholder='Phone number' className='w-100 my-2' name="phone" valid={validate.phoneState === true} invalid={validate.phoneState === false} onChange={validatePhone} />
            <FormFeedback>
              Enter a valid phone number
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input type="text" placeholder='Role' className='w-100 my-2' name="role" />
          </FormGroup>
          <FormGroup>
            <Input rows={5} type="textarea" placeholder='Description' name="description" className='w-100 my-2' valid={validate.descriptionState === true} invalid={validate.descriptionState === false} onChange={validateDescription} />
            <FormFeedback>
              Enter a valid description
            </FormFeedback>
          </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button disabled={saveDisabled} type="submit" color='primary' className='cursor-pointer'>Add</Button>
      </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddUser