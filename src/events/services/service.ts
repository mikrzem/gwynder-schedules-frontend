import moment from 'moment';
import {Subject} from 'rxjs';
import {httpClient} from '../../utils/services/http';
import {ScheduleEvent} from './data';

const BASE = 'events';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';

export class ScheduleEventService {

    public readonly changes = new Subject();

    public async select(from: moment.Moment, to: moment.Moment): Promise<ScheduleEvent[]> {
        const paramFrom = moment(from || moment()).startOf('day');
        const paramTo = moment(to || moment()).endOf('day');
        return await httpClient.get(BASE)
            .param(PARAM_FROM, paramFrom.format())
            .param(PARAM_TO, paramTo.format())
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