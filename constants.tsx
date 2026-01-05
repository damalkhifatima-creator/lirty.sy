
import { Banknote, AppSettings } from './types';

export const DENOMINATIONS = [10, 25, 50, 100, 200, 500];

export const INITIAL_SETTINGS: AppSettings = {
  platformName: "خبير العملة السورية 2026",
  description: "نظامك الموثوق لتقييم وفهم العملة السورية الجديدة. دقة، أمان، وموثوقية في كل معاملة.",
  maintenanceMode: false,
  officialUsdRate: 50, // 1 USD = 50 New SYP
  newToOldRatio: 100, // 1 New SYP = 100 Old SYP
  logoUrl: "https://picsum.photos/id/100/100/100",
  logoScale: 100,
  logoX: 50,
  logoY: 50
};

export const BANKNOTES_DATA: Banknote[] = [
  {
    id: 1,
    value: 10,
    imageUrlFront: "https://picsum.photos/seed/10f/800/400",
    imageUrlBack: "https://picsum.photos/seed/10b/800/400",
    securityFeatures: ["علامة مائية مدمجة", "خيط أمان ثلاثي الأبعاد", "حبر حراري يتغير لونه"],
    purchasingPower: "كافية لشراء وجبة خفيفة سريعة أو مستلزمات يومية بسيطة.",
    color: "bg-emerald-600"
  },
  {
    id: 2,
    value: 25,
    imageUrlFront: "https://picsum.photos/seed/25f/800/400",
    imageUrlBack: "https://picsum.photos/seed/25b/800/400",
    securityFeatures: ["طباعة بارزة للمكفوفين", "شريط هولوغرافي متقدم", "ترقيم تسلسلي بالليزر"],
    purchasingPower: "تغطي مصاريف النقل الداخلي لعدة رحلات أو وجبة متكاملة لشخص واحد.",
    color: "bg-blue-600"
  },
  {
    id: 3,
    value: 50,
    imageUrlFront: "https://picsum.photos/seed/50f/800/400",
    imageUrlBack: "https://picsum.photos/seed/50b/800/400",
    securityFeatures: ["خيط أمان ممغنط", "علامة مائية لصورة شخصية تاريخية", "حبر فوق بنفسجي"],
    purchasingPower: "توازي سعر صرف دولار واحد تقريباً؛ تغطي احتياجات العائلة اليومية الأساسية.",
    color: "bg-indigo-600"
  },
  {
    id: 4,
    value: 100,
    imageUrlFront: "https://picsum.photos/seed/100f/800/400",
    imageUrlBack: "https://picsum.photos/seed/100b/800/400",
    securityFeatures: ["نافذة شفافة أمنية", "تصميم هندسي معقد لمنع المسح الضوئي", "ورق قطني عالي المتانة"],
    purchasingPower: "فئة متوسطة القوة؛ تغطي فواتير الخدمات الشهرية المتوسطة.",
    color: "bg-purple-600"
  },
  {
    id: 5,
    value: 200,
    imageUrlFront: "https://picsum.photos/seed/200f/800/400",
    imageUrlBack: "https://picsum.photos/seed/200b/800/400",
    securityFeatures: ["خيط أمان نافذ", "علامة تطابق متقنة", "حماية نانوية ضد التآكل"],
    purchasingPower: "تغطي تكلفة تسوق أسبوعية متوسطة لعائلة صغيرة.",
    color: "bg-rose-600"
  },
  {
    id: 6,
    value: 500,
    imageUrlFront: "https://picsum.photos/seed/500f/800/400",
    imageUrlBack: "https://picsum.photos/seed/500b/800/400",
    securityFeatures: ["أعلى تقنيات الأمان العالمية", "خيط أمان بصري متحرك", "مجهريات دقيقة لا ترى بالعين المجردة"],
    purchasingPower: "أكبر فئة نقدية؛ مخصصة للمعاملات التجارية الكبيرة والمدخرات.",
    color: "bg-amber-600"
  }
];
