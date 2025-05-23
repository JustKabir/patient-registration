import { useLiveQuery } from '@electric-sql/pglite-react';
import type { Patient } from '../types/patient';
import { getAllPatientsQuery } from '../utils/patientQueries';

const PatientTable = () => {
  const { sql, params } = getAllPatientsQuery();
  const { rows: patients = [] } = useLiveQuery<Patient>(sql, params) || {
    rows: [],
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">{patient.age}</td>
                <td className="px-4 py-2">{patient.gender}</td>
                <td className="px-4 py-2">{patient.contact}</td>
                <td className="px-4 py-2">{patient.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No patients registered yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
