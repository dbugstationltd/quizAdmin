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
  interAd: string
};

export type TUser = {
  id: number;
  email: string;
  active: boolean;
  totalCoins: number;
};
