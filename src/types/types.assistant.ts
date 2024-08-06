import { TAssistantCategory } from "./types.grammarQuiz";
import { TUser } from "./types.user";

export type TAssistant = {
  id: number;
  title: string;
  icon: string;
  initialPrompt: string;
  initialMessage: string;
  categoryID: number;
  category: TAssistantCategory;
  createdAt: string;
};

export type TFeedback = {
  id: number;
  userId: number;
  suggestion: string;
  message: string;
  user: Partial<TUser>;
  createdAt: string;
};
