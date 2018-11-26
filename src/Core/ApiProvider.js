export class ApiProvider {
    constructor(
        httpClient
    ) {
        this.httpClient = httpClient;
    }

    getPhotosByQuery(query) {
        return this.httpClient.get('search/photos', query)
    }

    getPhotoById(id) {
        return this.httpClient.get(`photos/${id}`)
    }
}