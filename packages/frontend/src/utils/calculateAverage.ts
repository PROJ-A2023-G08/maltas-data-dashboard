import { ChartData } from "@maltas-dashboard/frontend/src/types/chartData";
import { FilterTypes } from "../types/filterTypes";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import format from "date-fns/format";
import getWeek from "date-fns/getWeek";
import parseISO from "date-fns/parseISO";

type OmittedMeasurement = Omit<
  Measurement,
  "end_time_iso" | "status" | "role_id" | "device_id" | "measurement_id"
>;

export const calculateAverage = (role: OmittedMeasurement[], filter: FilterTypes): ChartData[] => {
    const averageRole: ChartData[] = [];
    let date: string;

    role.forEach((item) => {
        switch (filter) {
            case FilterTypes.DAILY:
                date = format(parseISO(item.start_time_iso), 'MM/dd/yyyy');
                break;
            case FilterTypes.WEEKLY:
                date = getWeek(new Date(item.start_time_iso)).toString();
                break;
            case FilterTypes.MONTHLY:
                date = (new Date(item.start_time_iso).getMonth() + 1).toString();
                break;
            default:
                date = format(parseISO(item.start_time_iso), 'MM/dd/yyyy');
                break;
        }
        const index = averageRole.findIndex((item) => item.x === date);
        if (index !== -1) {
            averageRole[index].y = Math.floor((averageRole[index].y + item.total_time_spent) / 2);
        } else {
            averageRole.push({ x: date, y: item.total_time_spent });
        }
    });

    return averageRole;
};
