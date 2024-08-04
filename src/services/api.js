import axios from "axios";

const baseURL = process.env.REACT_APP_CONTACTS_URL

const api = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
    }
})

const fetchContatsList = (signal) => api.get('/contacts?record_type=person', { signal: signal })

export default fetchContatsList