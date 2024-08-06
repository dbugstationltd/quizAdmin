import { z } from "zod";

export const LoginValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const RegistrationValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    password_confirmation: z
      .string()
      .min(1, "Password confirmation is required"),
    country: z.string().min(1, "Country is required"),
    number: z.string().min(1, "Phone number is required"),
    additional_contact_type: z
      .string()
      .min(1, "Additional contact type is required"),
    additional_contact_value: z
      .string()
      .min(1, "Additional contact value is required"),
    code: z
      .string()
      .min(1, "Required")
      .transform((val) => val.split("-").pop()),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords didn't match",
    path: ["password_confirmation"],
  })
  .transform((data) => ({
    ...data,
    phone_number: `${data.code}${data.number}`,
  }));

export const AddUserValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    photo: z.instanceof(File, { message: "Photo is required" }).optional(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    country: z.string().min(1, "Country is required"),
    gender: z.string().min(1, "Gender is required"),
    nativeLanguage: z.string().min(1, "Native Language is required"),
    number: z.string().min(1, "Phone number is required"),
    code: z.string().min(1, "Required"),
  })
  .transform((data) => ({
    name: data.name,
    email: data.email,
    password: data.password,
    country: data.country,
    gender: data.gender,
    photo: data.photo,
    nativeLanguage: data.nativeLanguage,
    phone: `${data.code}-${data.number}`,
  }));

export const UpdateUserValidation = z
  .object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    photo: z.instanceof(File, { message: "Photo must be a file" }).optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Password must be at least 8 characters long",
      }),
    country: z.string().min(1, "Country is required").optional(),
    gender: z.string().min(1, "Gender is required").optional(),
    nativeLanguage: z.string().min(1, "Native Language is required").optional(),
    number: z.string().min(1, "Phone number is required").optional(),
    code: z.string().min(1, "Code is required").optional(),
  })
  .transform((data) => ({
    name: data.name,
    email: data.email,
    password: data.password,
    country: data.country,
    gender: data.gender,
    photo: data.photo,
    nativeLanguage: data.nativeLanguage,
    phone: data.code && data.number ? `${data.code}-${data.number}` : undefined,
  }));

export const AddLevelValidation = z.object({
  title: z.string().min(1, "Level is required"),
  coverImg: z.instanceof(File, { message: "Cover Image is required" }),
  bgImg: z.instanceof(File, { message: "Background Image is required" }),
});

export const UpdateLevelValidation = z.object({
  title: z.string().min(1, "Level is required"),
  coverImg: z
    .instanceof(File, { message: "Cover Image is required" })
    .optional(),
  bgImg: z
    .instanceof(File, { message: "Background Image is required" })
    .optional(),
});

export const forgotPasswordValidation = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordValidation = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    password_confirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords didn't match",
    path: ["password_confirmation"],
  });

export const fillTheBlankValidation = z.object({
  questionType: z.string().min(1, { message: "Question type is required" }),
  question: z.string().min(1, { message: "Question is required" }),
  fillBlank: z.string().min(1, { message: "Fill blank is required" }),
});

export const chooseResponseValidation = z.object({
  questionType: z.string().min(1, { message: "Question type is required" }),
  question: z.string().min(1, { message: "Question is required" }),
  answer: z.array(z.string()).min(1, { message: "Answer is required" }),
});

export const pickRightOptionValidation = z.object({
  questionType: z.string().min(1, { message: "Question type is required" }),
  question: z.string().min(1, { message: "Question is required" }),
  answer: z.array(z.string()).min(1, { message: "Answer is required" }),
  correctAnswer: z
    .array(z.string())
    .min(1, { message: "Correct answer is required" }),
});

export const mcqValidation = z.object({
  questionType: z.string().min(1, { message: "Question type is required" }),
  question: z.string().min(1, { message: "Question is required" }),
  answer: z.array(z.string()).min(1, { message: "Answer is required" }),
  correctAnswer: z
    .array(z.string())
    .min(1, { message: "Correct answer is required" }),
  fillBlank: z.string().min(1, { message: "Fill blank is required" }),
});

export const imageValidation = z.object({
  questionType: z.string().min(1, { message: "Question type is required" }),
  answer: z.array(z.string()).min(1, { message: "Answer is required" }),
  correctAnswer: z
    .array(z.string())
    .min(1, { message: "Correct answer is required" }),
  fillBlank: z.string().min(1, { message: "Fill blank is required" }),
  file: z.instanceof(File, { message: "Image is Required" }),
});

export const videoValidation = z.object({
  questionType: z.string().min(1, { message: "Question type is required" }),
  file: z.instanceof(File, { message: "Video is Required" }),
  answer: z.array(z.string()).min(1, { message: "Answer is required" }),
  correctAnswer: z
    .array(z.string())
    .min(1, { message: "Correct answer is required" }),
  fillBlank: z.string().min(1, { message: "Fill blank is required" }),
});

export const AddQuizValidation = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  answer: z.array(z.string()).min(1, { message: "Options is required" }),
  correctAnswer: z.string().min(1, { message: "Right answer is required" }),
});

export const AddCategoryValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  img: z.instanceof(File, { message: "Icon is required" }),
});

export const UpdateCategoryValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  img: z.instanceof(File, { message: "Icon is required" }).optional(),
});

export const AddSubCategoryValidation = z.object({
  categoryId: z.number().min(1, { message: "Select a category" }),
  title: z.string().min(1, { message: "Title is required" }),
  totalPoints: z.string().min(1, { message: "Total points is required" }),
  entryFee: z.string().min(1, { message: "Entry Fee is required" }),
});

export const AddStoryValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  file: z.instanceof(File, { message: "Image/Video is required" }),
});

export const UpdateStoryValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  file: z.instanceof(File, { message: "Image/Video is required" }).optional(),
});
