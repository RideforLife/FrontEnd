import React, {useState} from 'react';
import {Alert} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import { updateDriver } from '../../actions/actions';
import {decode} from '../decode';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    h1 {
        font-size: 4rem;
    }

    h4 {
        font-size: 3rem;
    }

    .bio {
        min-width: 80%;
        min-height: 100px;
    }

    .edit {
        font-family: 'Roboto', sans-serif;
        font-size: 2rem;
        &:hover {
            opacity: 0.5;
        }
    }
`

const Input = styled.input `
    width: 90%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
    font-family: 'Roboto', sans-serif;
`

const Textarea = styled.textarea `
    width: 90%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
    font-family: 'Roboto', sans-serif;
`

const Available = styled.div `
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    margin: 2rem;
    input {
        transform: scale(2)
    }

`



const Submit = {
    margin: '2%',
}

const Warning = {
    fontSize: '20px',
}


const UpdateDriverForm = ({driver}) => {
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const [password, setPassword, handlePassword] = useInput('');
    const [name, setName, handleName] = useInput(driver.name);
    const [location, setLocation, handleLocation] = useInput(driver.location);
    const [newPassword, setNewPassword, handleNewPassword] = useInput('');
    const [available, setAvailable] = useState(driver.available);
    const [bio, setBio, handleBio] = useInput(driver.bio);
    const [price, setPrice, handlePrice] = useInput(driver.price);
    const [edit, setEdit] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        const id = decode(localStorage.getItem('bfl-token')).subject;
        const driver = {password, name, location, available: available.toString(), price, bio};
        dispatch(updateDriver(id, newPassword ? {...driver, newPassword} : driver));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FlexColumn>
                    {error && <Alert color="warning"><h2 style={Warning}>{error}</h2></Alert>}
                    <h1>Your Account Details</h1>
                    {!edit && <div className='edit' onClick={() => setEdit(true)}>Edit <FontAwesomeIcon icon={faPencilAlt} className='fa-1x'/></div>}
                    
                    <Input disabled={!edit} type='text' value={name} placeholder='Name' onChange={e => handleName(e.target.value)} required/>
                    
                    
                    <Input disabled={!edit} type='text' value={location} placeholder='Location' onChange={e => handleLocation(e.target.value)} required/>
                  
                    
                    <Textarea disabled={!edit} className='bio' wrap='soft' value={bio} placeholder='Bio' onChange={e => handleBio(e.target.value)} required/>
                 
                    <Input disabled={!edit} type='text' value={price} placeholder='Price' onChange={e => handlePrice(e.target.value)} required/>
               
                    <Available>Available: <input disabled={!edit} type='checkbox' checked={available} onChange={() => setAvailable(!available)}/></Available>
              
                    {edit && <>
                    <Input type='password' placeholder='Current Password' onChange={e => handlePassword(e.target.value)} required/>
                
                    <Input type='password' placeholder='New Password?' onChange={e => handleNewPassword(e.target.value)}/>
                   
                    <button style={Submit} type='submit'>Submit</button></>}
                </FlexColumn>
            </form>
        </div>
    );
}

export default UpdateDriverForm;