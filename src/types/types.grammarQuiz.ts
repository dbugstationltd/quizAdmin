export type TGrammarQuiz = {
  id: number;
  question: string;
  options: string[];
  rightAnswer: string;
  tips: string;
  createdAt: string;
};

export type TAssistantCategory = {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
};
