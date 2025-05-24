import { useLiveQuery } from '@electric-sql/pglite-react';
import { useState, useEffect } from 'react';
import type { Patient } from '../types/patient';
import {
  getPaginatedPatientsQuery,
  getPatientCountQuery,
} from '../utils/patientQueries';

const PatientTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPatients, setTotalPatients] = useState(0);

  const { sql, params } = getPaginatedPatientsQuery(currentPage, itemsPerPage);
  const result = useLiveQuery<Patient>(sql, params);
  const countResult = useLiveQuery<{ total: number }>(
    getPatientCountQuery().sql,
    getPatientCountQuery().params
  );
  useEffect(() => {
    if (countResult?.rows?.[0]?.total) {
      setTotalPatients(Number(countResult.rows[0].total));
    }
  }, [countResult]);

  const totalPages = Math.ceil(totalPatients / itemsPerPage);

  if (!result) {
    return (
      <div className="bg-white shadow rounded p-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
        <p className="text-gray-600">Loading patient data...</p>
      </div>
    );
  }

  const { rows: patients = [] } = result;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white shadow rounded">
      <div className="overflow-x-auto">
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-3">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, totalPatients)}
              </span>{' '}
              of <span className="font-medium">{totalPatients}</span> patients
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientTable;
