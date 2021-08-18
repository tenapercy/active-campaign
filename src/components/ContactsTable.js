import React from 'react';

import {TABLE_HEADERS} from '../constants';

import './ContactsTable.css'

const TableHeader = () => (
    <thead>
        <tr>
            {TABLE_HEADERS.map((heading, i) => <th key={i}>{heading}</th>)}
        </tr>
    </thead>
);

const TableRow = ({contact: {dealCount, location, name, tags, totalValue}}) => (
    // I really hate having conditional logic built into JSX and typically would pull it out
    <tbody>
        <tr>
            <td><a href="#">{name}</a></td>
            <td>{totalValue ? totalValue : '-'}</td>
            <td>{location ? location : '-'}</td>
            <td>{dealCount}</td>
            <td>{tags ? tags : '-'}</td>
        </tr>
    </tbody>
);

const TableRows = ({contacts}) => contacts.map((contact) => <TableRow contact={contact} key={contact.id} />);

const ContactsTable = ({contacts}) => (
    <table className="contact-table">
        <TableHeader />
        <TableRows contacts={contacts} />
    </table>
);

export default ContactsTable;
