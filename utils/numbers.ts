
import { NumberSystem } from '../types';

export const convertNumbers = (val: string | number, system: NumberSystem): string => {
  const s = val.toString();
  if (system === NumberSystem.LATIN) return s;
  
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return s.replace(/[0-9]/g, (w) => arabicDigits[parseInt(w)]);
};

export const formatCurrency = (amount: number, system: NumberSystem, suffix: string = ''): string => {
  const formatted = amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  return `${convertNumbers(formatted, system)} ${suffix}`;
};
