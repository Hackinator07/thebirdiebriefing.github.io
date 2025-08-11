interface ScheduleDay {
  day: string;
  times: string[];
}

interface TVScheduleProps {
  title: string;
  schedule: ScheduleDay[];
}

export default function TVSchedule({ title, schedule }: TVScheduleProps) {
  return (
    <section className="my-12">
      <div className="bg-primary-50 rounded-lg p-8 border border-primary-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="space-y-6">
          {schedule.map((day, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-primary-100">
              <h4 className="text-lg font-semibold text-primary-700 mb-3">{day.day}</h4>
              <div className="space-y-2">
                {day.times.map((time, timeIndex) => (
                  <div key={timeIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
