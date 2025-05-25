import { useState, type FormEvent } from 'react';
import { usePGlite } from '@electric-sql/pglite-react';
import { getInsertPatientQuery } from '../utils/patientQueries';
import {
  handleInputChange,
  INITIAL_PATIENT_FORM,
  type PatientFormData,
} from '../utils/form.utils';

interface PatientFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PatientFormModal({
  onClose,
  onSuccess,
}: PatientFormModalProps) {
  const db = usePGlite();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<PatientFormData>(INITIAL_PATIENT_FORM);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { sql, params } = getInsertPatientQuery(form);
      await db.query(sql, params);

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error registering patient:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to register patient'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Register New Patient</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-600 border border-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleInputChange(e, form, setForm)}
            className="border rounded px-3 py-2 w-full"
            disabled={isSubmitting}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => handleInputChange(e, form, setForm)}
            className="border rounded px-3 py-2 w-full"
            disabled={isSubmitting}
            min="1"
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={(e) => handleInputChange(e, form, setForm)}
            className="border rounded px-3 py-2 w-full"
            disabled={isSubmitting}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="contact"
            placeholder="Contact (10 digits)"
            value={form.contact}
            onChange={(e) => handleInputChange(e, form, setForm)}
            className="border rounded px-3 py-2 w-full"
            disabled={isSubmitting}
            required
            pattern="^[0-9]{10}$"
            title="Contact must be exactly 10 digits"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={(e) => handleInputChange(e, form, setForm)}
            className="border rounded px-3 py-2 w-full"
            rows={3}
            disabled={isSubmitting}
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
