export * from "./global";
export * from "./types.webSettings";

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
  coins: number,
  subCategoryId: number;
};
