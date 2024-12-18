"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale } from "@/config";

// Tên cookie lưu trữ ngôn ngữ người dùng
const COOKIE_NAME = "NEXT_LOCALE";

// ===================== Locale Management =====================

// Lấy ngôn ngữ người dùng từ cookie, mặc định là ngôn ngữ hệ thống
export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

// Cập nhật ngôn ngữ người dùng trong cookie
export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
