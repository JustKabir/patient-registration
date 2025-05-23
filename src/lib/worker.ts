import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { worker } from '@electric-sql/pglite/worker';
import { PATIENT_TABLE_SCHEMA } from '../utils/db.utils';

worker({
  async init(options) {
    try {
      console.log('Initializing PGlite worker...');

      const db = await PGlite.create({
        extensions: { live },
        dataDir: options.dataDir || 'idb://patient-registry',
      });

      await db.exec(PATIENT_TABLE_SCHEMA);

      console.log('PGlite worker initialized successfully');
      return db;
    } catch (error) {
      console.error('Error initializing PGlite worker:', error);
      throw error;
    }
  },
});
