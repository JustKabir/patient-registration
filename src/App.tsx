import { useEffect, useState } from 'react';
import { PGliteWorker } from '@electric-sql/pglite/worker';
import { live, type PGliteWithLive } from '@electric-sql/pglite/live';
import PatientTable from './components/PatientTable';
import PatientFormModal from './components/PatientFormModal';
import toast from 'react-hot-toast';
import { PGliteProvider } from '@electric-sql/pglite-react';

const DB_NAME = 'patient-registry';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [db, setDb] = useState<PGliteWithLive | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initDb = async () => {
      try {
        const workerInstance = new Worker(
          new URL('./lib/worker.ts', import.meta.url),
          {
            type: 'module',
          }
        );

        const pgWorker = await PGliteWorker.create(workerInstance, {
          extensions: { live },
          dataDir: `idb://${DB_NAME}`,
        });

        setDb(pgWorker);
      } catch (error) {
        console.error('Database initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initDb();
  }, []);

  if (isLoading || !db) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading database...
      </div>
    );
  }

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
