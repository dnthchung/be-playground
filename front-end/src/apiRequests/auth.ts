// Imports
import http from "@/lib/http";
import { LoginBodyType, LoginResType, LogoutBodyType, RefreshTokenBodyType, RefreshTokenResType } from "@/schemaValidations/auth.schema";

// ===================== Authentication API Requests =====================

const authApiRequest = {
  // Quản lý yêu cầu làm mới token (dùng để tránh gọi trùng lặp)
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,

  // Đăng nhập server-side
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),

  // Đăng nhập client-side (gọi route API trực tiếp)
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "", // Không gán base URL vì gọi từ client
    }),

  // Đăng xuất server-side
  sLogout: (body: LogoutBodyType & { accessToken: string }) =>
    http.post(
      "/auth/logout",
      { refreshToken: body.refreshToken },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`, // Đính kèm access token
        },
      },
    ),

  // Đăng xuất client-side (không cần token trong body vì cookie đã gửi kèm)
  logout: () => http.post("/api/auth/logout", null, { baseUrl: "" }),

  // Làm mới token server-side
  sRefreshToken: (body: RefreshTokenBodyType) => http.post<RefreshTokenResType>("/auth/refresh-token", body),

  // Làm mới token client-side
  async refreshToken() {
    if (this.refreshTokenRequest) {
      // Tránh gọi trùng lặp
      return this.refreshTokenRequest;
    }
    // Gửi yêu cầu làm mới token
    this.refreshTokenRequest = http.post<RefreshTokenResType>("/api/auth/refresh-token", null, {
      baseUrl: "",
    });
    const result = await this.refreshTokenRequest;
    this.refreshTokenRequest = null; // Reset yêu cầu sau khi hoàn tất
    return result;
  },

  // Ghi token vào cookie thông qua API
  setTokenToCookie: (body: { accessToken: string; refreshToken: string }) => http.post("/api/auth/token", body, { baseUrl: "" }),
};

export default authApiRequest;
