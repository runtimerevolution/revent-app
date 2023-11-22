import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
