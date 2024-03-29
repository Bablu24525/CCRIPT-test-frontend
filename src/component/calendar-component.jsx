import dayjs from 'dayjs';
import React from 'react';
import { MdRefresh } from 'react-icons/md';


const Calendar = ({ data, getAppointments }) => {

  const weekNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = dayjs().hour(hour).format('ha');
    times.push(formattedHour);
  }

  const getHourNum = (time) => {
    const hour = parseInt(time.split(/[a-zA-Z]/)[0], 10);
    return hour;
  }

  const getRowSpan = (day, time) => {
    // Split the time string and extract the hour part as an integer
    const event = data.find(event => event.day.toLowerCase() === day.toLowerCase() && event.start === time);
    return event ? event.end - event.start + 1 : 1;
  };

  return (
    <div className=" w-full overflow-auto">
      <table className='w-full table-auto min-w-[900px] lg:min-w-full'>
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">
              <button type="button" onClick={getAppointments} className="focus:outline-none">
                <MdRefresh />
              </button>
            </th>
            {weekNames.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td>{time}</td>
              {weekNames.map((day, dayIndex) => {
                const event = data.find(event => event.day.toLowerCase() === day.toLowerCase() && event.start === getHourNum(time) + 8);
                if (event && timeIndex === times.indexOf(time)) {
                  return (
                    <td key={dayIndex} rowSpan={getRowSpan(day, getHourNum(time))}>
                      <div className='bg-blue-100 p-2 text-center'>
                        <h6 className="text-xs">{event.username}</h6>
                        <h6 className='font-medium text-sm mt-4'>Reason</h6>
                        <p className='text-xs'>{event.reason}</p>
                      </div>
                    </td>
                  );
                } else if (!event && timeIndex === times.indexOf(time)) {
                  return <td key={dayIndex}></td>;
                }
                return null; // Skip rendering cells covered by rowspan
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
