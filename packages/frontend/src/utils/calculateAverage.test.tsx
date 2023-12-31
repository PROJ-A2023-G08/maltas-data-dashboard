import { FilterTypes } from '@maltas-dashboard/frontend/src/types/filterTypes';
import { calculateAverage } from './calculateAverage';

describe('calculateAverage', () => {
  const role = [
    { start_time_iso: '2022-01-01T10:00:00Z', total_time_spent: 60 },
    { start_time_iso: '2022-01-01T11:00:00Z', total_time_spent: 120 },
    { start_time_iso: '2022-01-02T10:00:00Z', total_time_spent: 90 },
    { start_time_iso: '2022-01-02T11:00:00Z', total_time_spent: 180 },
    { start_time_iso: '2022-01-03T10:00:00Z', total_time_spent: 120 },
    { start_time_iso: '2022-01-03T11:00:00Z', total_time_spent: 240 },
  ];

  it('should calculate daily average', () => {
    const filter = FilterTypes.DAILY;
    const result = calculateAverage(role, filter);
    expect(result).toEqual([
      { x: '01/01/2022', y: 90 },
      { x: '01/02/2022', y: 135 },
      { x: '01/03/2022', y: 180 },
    ]);
  });

  it('should calculate weekly average', () => {
    const filter = FilterTypes.WEEKLY;
    const result = calculateAverage(role, filter);
    expect(result).toEqual([
      {
        "x": "1",
        "y": 90,
      },
      { x: '2', y: 183 },
    ]);
  });

  it('should calculate monthly average', () => {
    const filter = FilterTypes.MONTHLY;
    const result = calculateAverage(role, filter);
    expect(result).toEqual([
      { x: '1', y: 183 },
    ]);
  });

});