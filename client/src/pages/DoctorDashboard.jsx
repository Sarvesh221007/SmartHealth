import { useEffect, useState } from "react";
import API from "../utils/api";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [form, setForm] = useState({ medicine:"", dosage:"", schedule:"", endDate:"" });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/doctor/patients");
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatients();
  }, []);

  const viewLogs = async (id) => {
    setSelected(id);
    try {
      const resLogs = await API.get(`/doctor/patients/${id}/logs`);
      const resPresc = await API.get(`/doctor/patients/${id}/prescriptions`);
      setLogs(resLogs.data || []);
      setPrescriptions(resPresc.data || []);
    } catch(err) {
      console.error(err);
    }
  };

  const addPrescription = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/doctor/patients/${selected}/prescriptions`, form);
      setForm({ medicine:"", dosage:"", schedule:"", endDate:"" });
      viewLogs(selected);
    } catch (err) {
      alert("Error adding prescription");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

      <h3 className="font-semibold mb-2">Patients</h3>
      <ul className="mb-6">
        {patients.map(p => (
          <li key={p._id} className="flex justify-between mb-2 border p-2 rounded">
            <span>{p.name} ({p.email})</span>
            <button onClick={() => viewLogs(p._id)} className="bg-blue-600 text-white px-2 py-1 rounded">View</button>
          </li>
        ))}
      </ul>

      {selected && (
        <>
          <h3 className="text-xl font-semibold">Logs</h3>
          {logs.length === 0 ? <p>No logs available.</p> : logs.map(l => (
            <div key={l._id} className="border p-2 rounded mb-2">
              <div><strong>Date:</strong> {new Date(l.date).toLocaleDateString()}</div>
              <div><strong>Symptoms:</strong> {l.symptoms}</div>
              <div><strong>Mood:</strong> {l.mood}</div>
              <div><strong>Notes:</strong> {l.notes}</div>
            </div>
          ))}

          <h3 className="text-xl font-semibold mt-4">Prescriptions</h3>
          {prescriptions.length === 0 ? <p>No prescriptions yet.</p> : prescriptions.map(pr => (
            <div key={pr._id} className="border p-2 rounded mb-2">
              <div><strong>{pr.medicine}</strong> - {pr.dosage} ({pr.schedule})</div>
              <div>By Dr. {pr.doctor?.name}</div>
            </div>
          ))}

          <h3 className="text-xl font-semibold mt-4">Add Prescription</h3>
          <form onSubmit={addPrescription} className="space-y-2">
            <input placeholder="Medicine" value={form.medicine} onChange={e=>setForm({...form, medicine:e.target.value})} className="w-full p-2 border rounded"/>
            <input placeholder="Dosage" value={form.dosage} onChange={e=>setForm({...form, dosage:e.target.value})} className="w-full p-2 border rounded"/>
            <input placeholder="Schedule" value={form.schedule} onChange={e=>setForm({...form, schedule:e.target.value})} className="w-full p-2 border rounded"/>
            <input type="date" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})} className="w-full p-2 border rounded"/>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
          </form>
        </>
      )}
    </div>
  );
}
