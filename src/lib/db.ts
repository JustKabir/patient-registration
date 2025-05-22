import { PGlite } from '@electric-sql/pglite';

export const db = new PGlite('idb://patient-registry');

export const initDB = async (): Promise<void> => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id serial PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      contact TEXT,
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
