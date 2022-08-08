import type { AxiosResponse } from 'axios'
import axios from 'axios'

// example of creating axios client
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const res = error.response
    if (res.status == 401) {
      window.location.href = '/'
    }
    console.error(`Error. Status Code: ${res.status}`)
    return Promise.reject(error)
  }
)

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false

export async function getRequest<T>(URL: string): Promise<AxiosResponse<T, any>> {
  return axiosClient.get<T>(`/${URL}`).then((response) => response)
}

export async function postRequest<T>(URL: string, payload: any) {
  return axiosClient.post<T>(`/${URL}`, payload).then((response) => response)
}

export async function putRequest<T>(URL: string, payload: any) {
  return axiosClient.put<T>(`/${URL}`, payload).then((response) => response)
}

export async function deleteRequest<T>(URL: string) {
  return axiosClient.delete<T>(`/${URL}`).then((response) => response)
}
