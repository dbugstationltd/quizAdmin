export type TUser = {
  id: number;
  name: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  country: string;
  nativeLanguage: string;
  password: string;
  passwordChangedAt: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  provider: string | null;
  providerId: string | null;
  isOnline: boolean;
  active: boolean;
  earnedCoins: string | null;
  createdAt: string;
  updatedAt: string;
  userPreference: TUserPreference | null;
  levelsPassed: TLevelPassed[];
  earnedXp: TEarnedXp[];
  totalXp?: number;
};

export type TUserPreference = {
  id: number;
  englishProficiency: string;
  improvementGoal: string;
  englishChallenge: string;
  studyTarget: string;
  userId: number;
};

export type TLevelPassed = {
  id: number;
  levelId: number;
  userId: number;
};

export type TEarnedXp = {
  id: number;
  userId: number;
  xp: number;
};
