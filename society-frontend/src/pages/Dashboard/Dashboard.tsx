import CalendarCard from '../Dashboard/CalendarCard';
import UserCount from '../Dashboard/UserCount';
import RecentUsers from '../Dashboard/RecentUsers';


export default function Dashboard() {


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="p-2 grid lg:grid-cols-2 ">

          <div className=""><UserCount /></div>         
          <div className="flex justify-end"><CalendarCard /></div>
      
      </div>
      <RecentUsers />
      


    </div>
  );
}
