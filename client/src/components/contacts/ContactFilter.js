import React, {useContext, useEffect, useRef} from 'react';
import ContactContext from '../../context/contacts/contactContext'

const ContactFilter = () => {
    
    const contactContext = useContext(ContactContext);

    const { filterContact,clearFilter, filtered} = contactContext;

    const text = useRef('');

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = (e) => {
        if(text.current.value !== '') {
            filterContact(e.target.value);
        }
        else {
            clearFilter();
        }
    }

    return (
        <form>
            <input type='text' ref={text} placeholder='Filtered Contacts...'
            onChange={onChange} />
        </form>
    )
}

export default ContactFilter
