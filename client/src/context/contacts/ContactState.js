import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    CONTACT_ERROR,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        loading: true
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Get Contacts
    const getContacts = async () => {

        
        try {
        
            const res = await axios.get('/api/contacts/')
            console.log(res.data);
        
            dispatch({
                type:GET_CONTACTS,
                payload: res.data
            })
            
        } catch (err) {

            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            })

        }
    };

    // Add Contact
    const addContact = async ({contact}) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        
        try {
        
            const res = await axios.post('/api/contacts/', contact, config)
        
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
            
        } catch (err) {

            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })

        }


    };

    // Delete contact
    const deleteContact = async (id) => {

        try {
        
        await axios.delete(`/api/contacts/${id}`);
        
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
            
        } catch (err) {

            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })

        }

    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    //Clear Contact
    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    } 

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    // Update Contact
    const updateContact = async (contact) => {

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        
        try {
        
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
        
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
            
        } catch (err) {

            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })

        }

    }

    // Filter Contact
    const filterContact = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <contactContext.Provider 
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;