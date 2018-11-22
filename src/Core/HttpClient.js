import axios from 'axios'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
export class HttpClient {
    clientID = 'c09169ec33e84ba42d9f8fc4dd4472c27bb6ff4b454e9be24eb5a9cd38e4f820';
    secret = '2d91b96dfd513b37f153df9ecbefcd4744a344c0105e82c5eeb8eec662d74237';
    base = 'https://api.unsplash.com';
    get(url, params = {}) {
        return from(axios.get(`${this.base}/${url}`, {
            headers: {
                Authorization: `Client-ID ${this.secret}`
            },
            params: {
                client_id: this.clientID,
                ...params
            }
        })).pipe(map(x => x.data));
    }
}