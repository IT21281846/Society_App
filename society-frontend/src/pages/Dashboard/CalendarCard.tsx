import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Plus, Trash2 } from "lucide-react";
import api from '../../api/apiClient';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });

  // 🟢 Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("❌ Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🟢 Add new event
  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date)
      return alert("Please fill in both title and date");

    try {
      await api.post("/events", newEvent);
      setNewEvent({ title: "", date: "" });
      fetchEvents();
    } catch (err) {
      console.error("❌ Error adding event:", err);
    }
  };

  // 🟢 Delete event
  const deleteEvent = async (id: number) => {
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("❌ Error deleting event:", err);
    }
  };

  // 🗓️ Calendar logic
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = monthStart.getDay();
  const daysInMonth = monthEnd.getDate();

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

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
    return events.filter((e: any) => e.date.startsWith(dateStr));
  };

  const daysArray = [];
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md w-full">
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

      {/* Add Event Form */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="border rounded p-2"
        />
        <button
          onClick={addEvent}
          className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
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
            className={`h-20 p-1 flex flex-col items-center border rounded relative ${
              isToday(day || 0) ? "bg-blue-100 border-blue-400" : "border-gray-200"
            }`}
          >
            <span className="text-sm font-medium">{day}</span>

            {/* Events */}
            {day &&
              getEventsForDay(day).map((event: any) => (
                <div
                  key={event.id}
                  className="bg-blue-500 text-white text-xs px-1 rounded mt-1 truncate w-full text-center flex justify-between items-center"
                >
                  <span>{event.title}</span>
                  <button onClick={() => deleteEvent(event.id)}>
                    <Trash2 className="w-3 h-3 ml-1 text-white hover:text-red-300" />
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
