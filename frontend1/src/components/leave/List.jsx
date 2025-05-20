// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../context/authContext";

// const List = ()=>{
//     const [leaves, setLeaves] = useState(null)
//     let sno = 1;
//     const{id} = useParams()
//     const {user} = useAuth()

//     const fetchSalaries = async()=>{
//             try{
//                 const response = await axios.get(`https://gg-ten-cyan.vercel.app/api/leave/${id}/${user.role}`,{
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if(response.data.success){
//                     setLeaves(response.data.leaves);
//                 }
//             } catch(error){
//                 if(error.response && !error.response.data.success){
//                     alert(error.message);
//                 }
//             }
//         };
//         useEffect(()=>{
//             fetchSalaries();
//         },[]);

//         if(!leaves){
//             return <div>Loading...</div>
//         }

//     return(
//         <div className="p-6">
//             <div className="text-center">
//                 <h3 className="text-2xl font-bold">Manage Leaves</h3>
//             </div>
//             <div className="flex justify-between items-center">
//                 <input 
//                   type="text"
//                   placeholder = "Search By Dep Name"
//                   className="px-4 py-0.5 border" 
//                 />
//                 {user.role==="employee" &&
//                 <Link
//                   to="/employee-dashboard/add-leave"
//                   className="px-4 py-1 bg-teal-600 rounded text-white"
//                 >
//                   Add New Leave
//                 </Link>
//                 }
//             </div>
//             <table className="w-full text-sm text-left text-gray-500 mt-6">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
//                     <tr>
//                         <th className="px-6 py-3">SNO</th>
//                             <th className="px-6 py-3">Leave Type</th>
//                             <th className="px-6 py-3">From</th>
//                             <th className="px-6 py-3">To</th>
//                             <th className="px-6 py-3">Description</th>
//                             <th className="px-6 py-3">Status</th>
//                     </tr>
//                   </thead>
//                 <tbody>
//                 {leaves.map((leave)=>(
//                     <tr
//                       key={leave._id}
//                       className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                     >
//                     <td className="px-6 py-3">{sno++}</td>
//                     <td className="px-6 py-3">{leave.leaveType}</td>
//                     <td className="px-6 py-3">
//                         {new Date(leave.startDate).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
//                     <td className="px-6 py-3">{leave.reason}</td>
//                     <td className="px-6 py-3">{leave.status}</td>
//                   </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//     )
// }

// export default List;



import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `https://gg-ten-cyan.vercel.app/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
        setFilteredLeaves(response.data.leaves); // Initialize filteredLeaves with all leaves
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // Handle search and filter the leaves by leaveType
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredLeaves(leaves); // Show all leaves if the search query is empty
    } else {
      setFilteredLeaves(
        leaves.filter((leave) =>
          leave.leaveType
            ? leave.leaveType.toLowerCase().includes(query.toLowerCase()) // Search by leaveType
            : false
        )
      );
    }
  };

  if (!leaves) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Leave Type"
          className="px-4 py-0.5 border"
          value={searchQuery} // Bind search query state
          onChange={handleSearch} // Trigger search on change
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>
      {filteredLeaves.length === 0 ? (
        <div className="text-center mt-4">No records to display</div> // Show this message if no records match
      ) : (
        <table className="w-full text-sm text-left text-gray-500 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr
                key={leave._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
