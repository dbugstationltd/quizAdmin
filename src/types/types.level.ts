export type TLevel = {
  id: number;
  title: string;
  coverImg: string;
  bgImg: string;
  status: number;
  createdAt: string;
  levelQuestion: TLevelQuestion[];
};

export type TLevelQuestion = {
  id: number;
  questionType: string;
  question?: string;
  answer: any;
  correctAnswer: any;
  fillBlank?: string;
  file?: string;
  levelId: number;
  createdAt: string;
};
