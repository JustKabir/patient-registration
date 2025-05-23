import { useState, type ChangeEvent, type FormEvent } from 'react';
import { usePGlite } from '@electric-sql/pglite-react';
import { getInsertPatientQuery } from '../utils/patientQueries';
import type { Patient } from '../types/patient';

interface PatientFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PatientFormModal({
  onClose,
  onSuccess,
}: PatientFormModalProps) {
  const db = usePGlite();
  const [form, setForm] = useState<
    Omit<Patient, 'id' | 'created_at' | 'updated_at'>
  >({
    name: '',
    age: 0,
    gender: 'Male',
    contact: '',
    address: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { sql, params } = getInsertPatientQuery(form);
    await db.query(sql, params);

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Register New Patient</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            name="contact"
            placeholder="Contact"
            value={form.contact}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
