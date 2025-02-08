import { Location } from './location';
import dayjs from 'dayjs';

export class Cube {
    id: string;
    start: Date;
    end: Date;
    location: Location;
    eventStatus: string;
    swissTransferLink: string | null;
    swissTransferLinkEnd: Date | null;
    previousEvent: Cube | null = null;

    constructor(id: string, start: Date, end: Date, location: Location, eventStatus: string, swissTransferLink: string, swissTransferLinkEnd: Date) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.location = location;  
        this.eventStatus = eventStatus;
        this.swissTransferLink = swissTransferLink;
        this.swissTransferLinkEnd = swissTransferLinkEnd;
    }

    getMonthAbbreviation(): string {
        const abbreviationMap = {
            1: "Jan",
            2: "Feb",
            3: "Mär",
            4: "Apr",
            5: "Mai",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Okt",
            11: "Nov",
            12: "Dez",
        };

        // @ts-ignore
        return abbreviationMap[this.start.getMonth() + 1];
    }

    getWeekday(): string {
        const weekdays = [
            "Sonntag",
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag"
        ];

        return weekdays[this.start.getDay()];
    }

    getDay(): number {
        return this.start.getDate();
    }

    getDateInSwissFormat(): string {
        return this.start.toLocaleDateString("de-CH");
    }

    getStartTime(): string {
        return this.start.toLocaleTimeString("de-CH", {hour: '2-digit', minute:'2-digit'});
    }

    getEndTime(): string {
        return this.end.toLocaleTimeString("de-CH", {hour: '2-digit', minute:'2-digit'});
    }

    isFutureEvent(): boolean {
        return this.getNow() <= this.start;
    }

    isNextEventComingUp(): boolean {
        const now = this.getNow();
        const noPreviousEventOrInThePast = (this.previousEvent === null || this.previousEvent.start < now);
        const isEventInFuture = this.start >= now;

        return noPreviousEventOrInThePast && isEventInFuture;
    }

    getEventStatusDisplayText(): string {
        if (this.eventStatus === "in-planning") {
          return "Noch nicht bestätigt";
        }   
        if (this.eventStatus === "cancelled") {
          return "Abgesagt";
        }   
        return "hoi";
    }

    isInPlanningOrCancelled(): boolean {
        return this.eventStatus === "in-planning" || this.eventStatus === "cancelled";
    }

    isConfirmed(): boolean {
        return !this.isInPlanningOrCancelled();
    }

    isCancelled(): boolean {
        return this.eventStatus === "cancelled";
    }

    getNow(): Date {
        return new Date();
    }

    getDaysUntilSwissTransferLinkExpired(): number | null {
        if (!this.swissTransferLink || !this.swissTransferLinkEnd) {
            return null;
        }

        const now = dayjs();
        const expiryDate = dayjs(this.swissTransferLinkEnd);
        return expiryDate.diff(now, 'day');
    }

    hasActiveSwissTransferlink(): boolean {
        const daysuntilExpired = this.getDaysUntilSwissTransferLinkExpired();
        return !!this.swissTransferLink && !!this.swissTransferLinkEnd && daysuntilExpired !== null && daysuntilExpired > 0;
    }
}
