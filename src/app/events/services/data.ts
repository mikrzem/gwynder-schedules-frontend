import {BaseData} from '../../common/services/data';

export interface ScheduledEventHeader extends BaseData {

    title: string,
    start: string,
    end: string

}
