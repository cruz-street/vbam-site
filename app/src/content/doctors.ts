import data from './doctors.json';

export type Doctor = typeof data.doctors[0];
export const DOCTORS = data.doctors;
