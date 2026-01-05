
export interface Banknote {
  id: number;
  value: number;
  imageUrlFront: string;
  imageUrlBack: string;
  securityFeatures: string[];
  purchasingPower: string;
  color: string;
}

export interface AppSettings {
  platformName: string;
  description: string;
  maintenanceMode: boolean;
  officialUsdRate: number;
  newToOldRatio: number;
  logoUrl: string;
}

export enum NumberSystem {
  ARABIC = 'ARABIC', // ١٢٣
  LATIN = 'LATIN'    // 123
}

export type AdminTab = 'system' | 'identity' | 'banknotes' | 'alerts';
