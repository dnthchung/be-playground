// Imports
import { Role } from "@/constants/type";
import z from "zod";

// ===================== Authentication Schemas =====================

// Yêu cầu đăng nhập
export const LoginBody = z
  .object({
    email: z.string().min(1, { message: "required" }).email({ message: "invalidEmail" }),
    password: z.string().min(6, "minmaxPassword").max(100, "minmaxPassword"),
  })
  .strict();
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

// Kết quả trả về khi đăng nhập
export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      role: z.enum([Role.Owner, Role.Employee]),
    }),
  }),
  message: z.string(),
});
export type LoginResType = z.TypeOf<typeof LoginRes>;

// Yêu cầu làm mới token
export const RefreshTokenBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();
export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>;

// Kết quả trả về khi làm mới token
export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  message: z.string(),
});
export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>;

// Yêu cầu đăng xuất
export const LogoutBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();
export type LogoutBodyType = z.TypeOf<typeof LogoutBody>;
