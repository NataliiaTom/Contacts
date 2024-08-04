import axios from "axios";
import fetchContatsList from '../services/api';
import { useState, useEffect, useMemo, useRef } from "react";
import ContactDetailsCard from './ContactDetailsCard'


const ContactsList = () => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    // const [page, setPage] = useState(0);

    const effectRun = useRef(false);

    const getContacts = useMemo(() => (signal) => {
        setIsLoading(true);
        try {
            fetchContatsList(signal).then((res) => {
                const contacts = (res);
                console.log(contacts.data.resources)
                setContacts(contacts.data.resources);

            })
        } catch (e) {
            if (e.name === "AbortError") {
                console.log("Aborted");
                return;
            }
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        if (effectRun.current) {
            getContacts(controller.signal);
        }
        return () => { controller.abort(); effectRun.current = true; };
    }, [getContacts]);

    if (error) {
        return <div>Something went wrong! Please try again.</div>;
    }

    return (
        <div className="tutorial">
            <h1 className="mb-4 text-2xl">Contacts</h1>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <ul>
                    {contacts.map((contact) => {
                        return <>
                            <ContactDetailsCard imageSrc={contact.avatar_url} firstName={contact.fields['first name'][0].value} lastName={contact.fields['last name'][0].value}
                                email={contact.fields.email ? contact.fields.email[0].value : 'no email'} tag={contact["tags2"].length > 0 ? contact.tags2 : ''} />
                            {/* <div key={contact.id}>{contact.fields['first name'][0].value} {contact.fields['last name'][0].value}  </div>
                            {contact.fields.email ? <div> {contact.fields.email[0].value}</div> : 'no email'}
                            {contact["tags2"].length > 0 ? <div >{contact.tags2}</div> : 'no tag'}
                            <img src={contact.avatar_url} /> */}
                        </>
                    })}
                </ul>
            )}
        </div>
    );
};

export default ContactsList