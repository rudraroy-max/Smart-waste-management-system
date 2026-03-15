import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/all-donations", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setDonations(res.data))
      .catch((err) => {
        alert("Failed to fetch donations");
        console.error(err);
      });
  }, []);

  const changeStatus = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/donation/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === id ? { ...donation, status: newStatus } : donation
        )
      );
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard - All Donations</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead style={{ backgroundColor: "#eee" }}>
          <tr>
            <th>Donor</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Time</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d._id}>
              <td>{d.donor}</td>
              <td>{d.foodDetails}</td>
              <td>{d.quantity}</td>
              <td>{d.status}</td>
              <td>{new Date(d.createdAt).toLocaleString()}</td>
              <td>
                {d.image && <img src={`http://localhost:5000${d.image}`} alt="donation" style={{ width: "100px" }} />}
              </td>
              <td>
                {d.status !== "Collected" ? (
                  <button onClick={() => changeStatus(d._id, "Collected")}>
                    Mark as Collected
                  </button>
                ) : (
                  <span style={{ color: "green" }}>✔ Collected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
