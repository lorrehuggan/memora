import { type } from "arktype";

export const loginSchema = type({
  email: "string.email",
  password: "string>6",
});

export type LoginForm = typeof loginSchema.infer;
