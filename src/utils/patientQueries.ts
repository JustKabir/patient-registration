import type { Patient } from '../types/patient';

export const getInsertPatientQuery = (
  patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>
) => {
  const { name, age, gender, contact, address } = patient;

  return {
    sql: `
      INSERT INTO patients (name, age, gender, contact, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    params: [name, age, gender, contact, address],
  };
};
