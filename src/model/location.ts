import { City } from './city';

export class Location {
    id: string;
    name: string;
    googleMapsLocationKey: string;
    googleMapsLink: string;
    meetingPointSummary: string;
    city: City;

    constructor(id: string, name: string, googleMapsLocationKey: string, googleMapsLink: string, meetingPointSummary: string, city: City) {
        this.id = id;
        this.name = name;
        this.googleMapsLocationKey = googleMapsLocationKey;
        this.googleMapsLink = googleMapsLink;
        this.meetingPointSummary = meetingPointSummary;
        this.city = city;
    }
}