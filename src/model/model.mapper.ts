import { Location } from './location';
import { Cube } from './cube';
import { City } from './city';
import { CubeDto } from './cube.dto';
import { CityDto } from './city.dto';
import { LocationDto } from './location.dto';


export class ModelMapper {
    mapFromData(cubes: CubeDto[], cities: CityDto[], locations: LocationDto[]): Cube[] {

        const locationsAsMap = this.convertArrayToIdObjectMap(locations);
        const citiesAsMap = this.convertArrayToIdObjectMap(cities);
        const cubesAsMap = this.convertArrayToIdObjectMap(cubes);

        // let's make sure we only work with a copy so we do not modify params via reference, leading to side effects
        const locationsCopy = this.makeDeepCopyOfArrayOrObject(locationsAsMap);
        const citiesCopy = this.makeDeepCopyOfArrayOrObject(citiesAsMap);

        const mappedEvents = cubes.map(({id, start, end, locationId, status, swissTransferLink, swissTransferLinkEnd}) => {
            const mappedLocation = this.mapLocation(locationsCopy[locationId], citiesCopy);
            const startDateAsCET = new Date(start.slice(0, -1));
            const endDateAsCET = new Date(end.slice(0, -1));
            return new Cube(id, new Date(startDateAsCET), new Date(endDateAsCET), mappedLocation, status, swissTransferLink, swissTransferLinkEnd);
        });

        const sortedEvents = this.sortEventsByStartDateAsc(mappedEvents);

        return sortedEvents.map((event: Cube, index: number) => {
            if (index > 0) {
                event.previousEvent = sortedEvents[index - 1];
            }

            return event;
        });
    }

    private sortEventsByStartDateAsc(events: Cube[]): Cube[] {
        return events.sort((a, b) => {
            //@ts-ignore
            return new Date(a.start) - new Date(b.start);
        });
    }

    private mapLocation(location: LocationDto, cities: {[id: string]: CityDto}): Location {
        const {id: cityId, name: cityName} = cities[location.cityId];
        const city = new City(cityId, cityName);
        return new Location(location.id, location.name, location.googleMapsLink, city);
    }

    private makeDeepCopyOfArrayOrObject<T>(arr: T): T {
        return JSON.parse(JSON.stringify(arr));
    }

    private convertArrayToIdObjectMap<T extends { id: string }>(array: T[]): { [key: string]: T } {
        const map = {} as { [key: string]: T };
        array.forEach(element => {
            map[element.id] = element;
        });

        return map;
    }
}
