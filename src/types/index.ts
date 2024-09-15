export * from "./global";

export type TCategory = {
  id: number;
  title: string;
  img: string;
  subCategories: TSubCategory[];
};

export type TSubCategory = {
  id: number;
  title: string;
  img: string;
  totalPoints: number;
  entryFee: number;
  categoryId: number;
  category: TCategory;
  quizes: TQuiz[];
};

export type TQuiz = {
  id: number;
  question: string;
  answer: string[];
  correctAnswer: string;
  coins: number;
  subCategoryId: number;
};

export type TWebSettings = {
  id: number;
  webAppLogo: string;
  loginPageTitle: string;
  headerTitle: string;
  perQuestionCoin: string;
  pixelId: string;
  googleAnalyticsId: string;
  metaTitle: string;
  metaDescription: string;
  nativeAd: string;
  bannerAd: string;
  rewardAd: string;
  interAd: string;
};

export type TUser = {
  id: number;
  email: string;
  active: boolean;
  totalCoins: number;
};

export type TNotification = {
  id: number;
  topic?: string;
  title: string;
  body: string;
};

export type TRole = {
  id: number;
  title: string;
  roles: TPermissions[];
};

export type TPermissions = {
  id: number;
  adminTypeId: number;
  name: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
};

export type TAdmin = {
  id: number;
  name: string;
  email: string;
  adminType: { title: string; id: number };
};

export type TMetaData = {
  totalQuizes: number;
  totalCategories: number;
  totalSubCategories: number;
  totalUsers: number;
  totalAdmins: number;
  totalNotifications: number;
};

export type TSubDomain = {
  id: number;
  name: string;
  url: string;
  port: number;
  directory: string;
  gaCode: string;
  showAdv: number;
  addLimit: number;
  addSecurity: number;
  isArticle: number;
  status: boolean;
};
