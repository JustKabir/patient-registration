export const escapeStr = (val: string | number) =>
  typeof val === 'string' ? JSON.stringify(val) : val;
