import type { PatientFormData } from './form.utils';

export const getInsertPatientQuery = (patient: PatientFormData) => ({
  sql: `
   INSERT INTO patients (name, age, gender, contact, address)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *;
 `,
  params: [
    patient.name,
    patient.age,
    patient.gender,
    patient.contact,
    patient.address,
  ],
});

export const getAllPatientsQuery = () => ({
  sql: `SELECT * FROM patients ORDER BY created_at DESC`,
  params: [],
});

export const getPaginatedPatientsQuery = (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return {
    sql: `
     SELECT * FROM patients
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2
   `,
    params: [limit, offset],
  };
};

export const getPatientCountQuery = () => ({
  sql: `SELECT COUNT(*) as total FROM patients`,
  params: [],
});
