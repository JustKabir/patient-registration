import type { ChangeEvent } from 'react';
import type { Patient } from '../types/patient';

export type PatientFormData = Omit<Patient, 'id' | 'created_at' | 'updated_at'>;

export const INITIAL_PATIENT_FORM: PatientFormData = {
  name: '',
  age: 0,
  gender: 'Male',
  contact: '',
  address: '',
};

export const handleInputChange = <T>(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  formData: T,
  setFormData: (data: T) => void
): void => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
