import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const events = [
  { date: "2025-10-20", title: "Board Meeting" },
  { date: "2025-10-22", title: "Team Outing" },
  { date: "2025-10-25", title: "Project Deadline" },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = monthStart.getDay(); // index of first day
  const daysInMonth = monthEnd.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getDate() === day
    );
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const daysArray = [];
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-lg font-semibold text-gray-700">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </div>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-200">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {daysArray.map((day, idx) => (
          <div
            key={idx}
            className={`h-16 p-1 flex flex-col items-center border rounded ${
              isToday(day || 0) ? "bg-blue-100 border-blue-400" : "border-gray-200"
            }`}
          >
            <span className="text-sm font-medium">{day}</span>
            {/* Events */}
            {day &&
              getEventsForDay(day).map((event, i) => (
                <span
                  key={i}
                  className="bg-blue-500 text-white text-xs px-1 rounded mt-1 truncate w-full text-center"
                >
                  {event.title}
                </span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
