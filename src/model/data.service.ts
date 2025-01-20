export class DataService {
    async findManyEvent() {
        return fetch("./data/event.json").then(data => data.json());
    }

    async findManyCity() {
        return fetch("./data/city.json").then(data => data.json());
    }

    async findManyLocation() {
        return fetch("./data/location.json").then(data => data.json());
    }
}