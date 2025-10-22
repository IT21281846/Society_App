import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Edit3, Trash2, Save, X } from "lucide-react";
import api from "../../api/apiClient";

type EventType = {
  id: number;
  title: string;
  description?: string;
  date: string;
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarCard() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Add new event
  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date) return;
    try {
      const res = await api.post("/events", newEvent);
      setEvents((prev) => [...prev, res.data]);
      setNewEvent({ title: "", date: "" });
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  // Edit logic
  const startEdit = (event: EventType) => {
    setEditingEvent(event);
    setNewEvent({ title: event.title, date: event.date.slice(0, 10) });
  };

  const saveEdit = async () => {
    if (!editingEvent) return;
    try {
      const res = await api.put(`/events/${editingEvent.id}`, newEvent);
      setEvents((prev) =>
        prev.map((e) => (e.id === editingEvent.id ? res.data : e))
      );
      setEditingEvent(null);
      setNewEvent({ title: "", date: "" });
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setNewEvent({ title: "", date: "" });
  };

  // Delete event
  const deleteEvent = async (id: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this event?");
  if (!confirmDelete) return; 
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Calendar rendering logic
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = monthStart.getDay();
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
    return events.filter((e) => e.date.slice(0, 10) === dateStr);
  };

  const daysArray = [];
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  // Filter upcoming events for the current month
  const monthEvents = events.filter(
    (e) =>
      new Date(e.date).getMonth() === currentDate.getMonth() &&
      new Date(e.date).getFullYear() === currentDate.getFullYear()
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-sm">
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

      {/* Add/Edit Event */}
      
<div className="flex flex-col h-9 sm:flex-row gap-1 mb-4 mx-auto">
      <input
        type="text"
        placeholder="Event title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        className="border p-2 rounded w-full "
      />
      <input
        type="date"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        className="border p-1 text-xs rounded w-full sm:w-3/10"
      />
  {editingEvent ? (
      <div className="flex gap-1 ">
          <button
            onClick={saveEdit}
            className="bg-green-500 text-white text-xs px-2 py-1 hover:bg-green-600 rounded flex items-center">
            <Save className="w-3 h-3 mr-1" /> Save
          </button>
          <button
            onClick={cancelEdit}
            className="bg-red-500  text-white text-xs px-1 py-1 hover:bg-red-600 rounded flex items-center">
            <X className="w-3 h-3 " /> Cancel
          </button>
      </div>
        ) : (
          <button
            onClick={addEvent}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        )}
</div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {daysArray.map((day, idx) => (
          <div
            key={idx}
            className={`h-10 p-1 flex flex-col items-center justify-start border rounded ${
              isToday(day || 0) ? "bg-blue-100 border-blue-400" : "border-gray-200"
            }`}
          >
            <span className="text-sm font-medium">{day}</span>
            {/* Just a small dot to indicate events */}
            {day && getEventsForDay(day).length > 0 && (
              <span className="w-2/3 h-2 bg-blue-500 rounded mt-1"></span>
            )}
          </div>
        ))}
      </div>

      {/* Upcoming Events List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📅 Upcoming Events</h3>
        {monthEvents.length === 0 ? (
          <p className="text-gray-500 text-sm">No events for this month.</p>
        ) : (
          <ul className="space-y-2">
            {monthEvents
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between h-13 items-center bg-gray-50 p-2 rounded-lg border hover:shadow-sm transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{event.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(event)}
                      className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
