const isBrowser = typeof window !== 'undefined';

const env = isBrowser
    ? {...window['env']}
    : {...process.env}
    
window.env = {
    "PATH_API": 'http://localhost:8081',
    // "REACT_APP_CLIENT_ID": "localhost",
    // "REACT_APP_OPENID_API_URL": 'Localhost',
    // "REACT_APP_EMAIL_CONTACT": 'soporteboti@buenosaires.gob.ar'
}

export { env };


