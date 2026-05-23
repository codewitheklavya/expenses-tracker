import axios from "axios"

const API = axios.create({
    baseURL: "https://expenses-tracker-ig38.onrender.com/api"
});

export default API;