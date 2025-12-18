import CalendarCard from '../Dashboard/CalendarCard';
import UserCount from '../Dashboard/UserCount';
import RecentUsers from '../Dashboard/RecentUsers';


export default function Dashboard() {


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserCount />
      <CalendarCard />
      <RecentUsers />
      </div>


    </div>
  );
}
