import { db } from '../lib/db';
import { escapeStr } from './escapeStr';

export async function insertPatient({
  name,
  age,
  gender,
  contact,
  address,
}: {
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
}) {
  await db.exec(`
    INSERT INTO patients (name, age, gender, contact, address)
    VALUES ('${escapeStr(name)}', ${age}, '${escapeStr(gender)}', '${escapeStr(contact)}', '${escapeStr(address)}');
  `);
}
