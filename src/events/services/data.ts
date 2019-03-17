import {BaseData} from '../../utils/services/data';

export interface ScheduleEvent extends BaseData {

    StartTime: string;
    EndTime: string;
    Title: string;

}