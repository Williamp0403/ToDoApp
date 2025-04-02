import axios  from "./axios.js"

export const registerRequest = (data) => axios.post('/register', data)

export const loginRequest = (data) => axios.post('/login', data)

export const logoutRequest = () => axios.post('/logout')

export const verifyRequest = () => axios.get('/verify-token')

export const updateProfileRequest = (data) => axios.put('/update-profile', data)