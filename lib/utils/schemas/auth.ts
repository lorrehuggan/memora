import { type } from "arktype";

export const loginSchema = type({
  email: "string.email",
  password: "string>6",
});

export type LoginForm = typeof loginSchema.infer;

export const signUpSchema = type({
  email: "string.email",
  password: "string>6",
  confirmPassword: "string>6",
  name: "string>1",
});

export type SignUpForm = typeof signUpSchema.infer;
