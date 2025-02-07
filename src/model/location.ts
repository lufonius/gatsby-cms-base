import { City } from './city';

export class Location {
    id: string;
    name: string;
    googleMapsLink: string;
    meetingPointSummary: string;
    city: City;

    constructor(id: string, name: string, googleMapsLink: string, meetingPointSummary: string, city: City) {
        this.id = id;
        this.name = name;
        this.googleMapsLink = googleMapsLink;
        this.meetingPointSummary = meetingPointSummary;
        this.city = city;
    }
}