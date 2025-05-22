import { useEffect, useState } from 'react';
import { initDB } from './lib/db';
import PatientTable from './components/PatientTable';
import PatientFormModal from './components/PatientFormModal';
import toast from 'react-hot-toast';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    initDB();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Patient Registry</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register Patient
        </button>
      </div>

      <PatientTable />

      {showModal && (
        <PatientFormModal
          onClose={() => setShowModal(false)}
          onSuccess={() => toast.success('Patient registered successfully!')}
        />
      )}
    </div>
  );
}
