const PatientTable = () => {
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
          <tr>
            <td colSpan={5} className="text-center p-4 text-gray-500">
              No patients registered yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
