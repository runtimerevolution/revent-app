import axios, { AxiosError } from 'axios';





const URL = process.env.API_URL;
export default class ZettlorService {
    private requestConfig;


    constructor(token = null) {
        this.requestConfig = { headers: { 'Content-Type': 'application/json' } };
        if (token) this.requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    async exchangeToken(token: any): Promise<any> {
        try {
            const { data, status } = await axios.post(`${URL}auth/token/exchange/`, token, this.requestConfig);
            return status === 200 ? data : false;
        } catch (error) {
            // const err = error as AxiosError;
            console.log('Error: ');
            return false;
        }
    }

}