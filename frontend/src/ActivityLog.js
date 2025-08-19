import React, { useEffect, useState } from "react";
import axios from "axios";

function ActivityLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/activity/logs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(res.data);
      } catch (err) {
        alert("Failed to fetch activity logs");
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="container mx-auto max-w-2xl mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
      {logs.length === 0 ? (
        <p className="text-center text-gray-500">No activities recorded.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Username</th>
              <th className="p-2">Action</th>
              <th className="p-2">IP</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{log.username}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.ip}</td>
                <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityLog;
