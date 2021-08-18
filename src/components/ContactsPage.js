import React, { useEffect, useState } from 'react';

import ContactsTable from './ContactsTable';

import {MESSAGES} from '../constants';
import { fetchContactData } from '../utils';

import './ContactsPage.css';

export const useFetchContactData = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetchContactData()
            .then((data) => {
                setContacts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setHasError(true);
            });
    }, []);

    return {contacts, isLoading, hasError};
};

const Notification = ({messageType}) => (
    <div className='notification'>{MESSAGES[messageType]}</div>
);

const ContactsPage = () => {
    const {contacts, isLoading, hasError} = useFetchContactData();

    if (isLoading || hasError) {
        return (
            <Notification messageType={hasError ? 'error' : 'loading'} />
        );
    }

    return (
        <div className="contact-page">
            <h1>ActiveCampaign Contacts List</h1>
            <ContactsTable contacts={contacts} />
        </div>
    );
}

export default ContactsPage;
