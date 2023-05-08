import { IDateProvider } from "../IDateProvider";
import  dayjs  from 'dayjs';


class DaysjsDateProvider implements IDateProvider {

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
}


export { DaysjsDateProvider }