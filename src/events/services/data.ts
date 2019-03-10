import {BaseData} from '../../utils/data';

export interface ScheduleEvent extends BaseData {

    StartTime: string;
    EndTime: string;
    Title: string;

}