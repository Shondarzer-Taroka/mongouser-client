import axios from "axios"


export const getData=async (api) => {
    let resp=await axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
    return resp.data
 }

