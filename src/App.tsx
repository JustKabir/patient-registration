import { PGlite } from '@electric-sql/pglite';
import { live, type PGliteWithLive } from '@electric-sql/pglite/live';
import { useEffect, useState } from 'react';
import PatientTable from './components/PatientTable';
import PatientFormModal from './components/PatientFormModal';
import toast from 'react-hot-toast';
import { PGliteProvider } from '@electric-sql/pglite-react';
import { createDB } from './lib/db';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [db, setDb] = useState<PGliteWithLive | undefined>(undefined);

  useEffect(() => {
    const initDb = async () => {
      const db = await PGlite.create({
        extensions: { live },
        dataDir: 'idb://patient-registry',
      });

      await createDB(db);

      setDb(db);
    };
    initDb();
  }, []);

  return (
    <PGliteProvider db={db}>
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
    </PGliteProvider>
  );
}
