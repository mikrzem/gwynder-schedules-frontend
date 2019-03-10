import {httpClient} from '../../utils/http';
import {ScheduleEvent} from './data';
import {Subject} from 'rxjs';

const BASE = 'events';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';

export class ScheduleEventService {

    public readonly changes = new Subject();

    public async select(from: Date, to: Date): Promise<ScheduleEvent[]> {
        const paramFrom = (from || new Date());
        paramFrom.setHours(0, 0, 0);
        const paramTo = (to || new Date());
        paramTo.setHours(23, 59, 59);
        return await httpClient.get(BASE)
            .param(PARAM_FROM, paramFrom.toISOString())
            .param(PARAM_TO, paramTo.toISOString())
            .execute();
    }

    public async get(id: number): Promise<ScheduleEvent> {
        return await httpClient.get(BASE, id).execute();
    }

    public async create(event: ScheduleEvent): Promise<ScheduleEvent> {
        const result = await httpClient.post(BASE).body(event).execute<ScheduleEvent>();
        this.changes.next();
        return result;
    }

    public async update(event: ScheduleEvent): Promise<ScheduleEvent> {
        const result = await httpClient.put(BASE, event.ID).body(event).execute<ScheduleEvent>();
        this.changes.next();
        return result;
    }

    public async remove(event: ScheduleEvent): Promise<any> {
        await httpClient.delete(BASE, event.ID).executeVoid();
        this.changes.next();
    }

}

export const eventService = new ScheduleEventService();