//path : my-fe-base/src/lib/utils.ts
// External Libraries
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import slugify from "slugify";

// UI Libraries
import { toast } from "@/components/ui/use-toast";
import { BookX, CookingPot, HandCoins, Loader, Truck } from "lucide-react";

// Utility Libraries
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

// API Requests
import authApiRequest from "@/apiRequests/auth";
import guestApiRequest from "@/apiRequests/guest";

// Config and Constants
import envConfig, { defaultLocale } from "@/config";
import { EntityError } from "@/lib/http";
import { DishStatus, OrderStatus, Role, TableStatus } from "@/constants/type";

// Types
import { TokenPayload } from "@/types/jwt.types";

// Utility Functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Path Normalization
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

// Error Handling
export const handleErrorApi = ({ error, setError, duration }: { error: any; setError?: UseFormSetError<any>; duration?: number }) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, { type: "server", message: item.message });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

// Local Storage Token Management
const isBrowser = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem("accessToken") : null);

export const getRefreshTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem("refreshToken") : null);

export const setAccessTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem("accessToken", value);

export const setRefreshTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem("refreshToken", value);

export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("accessToken");
  isBrowser && localStorage.removeItem("refreshToken");
};

// Token Refresh Logic
export const checkAndRefreshToken = async (param?: { onError?: () => void; onSuccess?: () => void; force?: boolean }) => {
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();

  if (!accessToken || !refreshToken) return;

  const decodedAccessToken = decodeToken(accessToken);
  const decodedRefreshToken = decodeToken(refreshToken);

  const now = Math.round(new Date().getTime() / 1000);

  if (decodedRefreshToken.exp <= now) {
    removeTokensFromLocalStorage();
    return param?.onError?.();
  }

  const shouldRefresh = param?.force || decodedAccessToken.exp - now < (decodedAccessToken.exp - decodedAccessToken.iat) / 3;

  if (shouldRefresh) {
    try {
      const role = decodedRefreshToken.role;
      const res = role === Role.Guest ? await guestApiRequest.refreshToken() : await authApiRequest.refreshToken();

      setAccessTokenToLocalStorage(res.payload.data.accessToken);
      setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
      param?.onSuccess?.();
    } catch {
      param?.onError?.();
    }
  }
};

// Formatting and Localization
export const formatCurrency = (number: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);

export const getVietnameseDishStatus = (status: (typeof DishStatus)[keyof typeof DishStatus]) => {
  switch (status) {
    case DishStatus.Available:
      return "Có sẵn";
    case DishStatus.Unavailable:
      return "Không có sẵn";
    default:
      return "Ẩn";
  }
};

export const getVietnameseOrderStatus = (status: (typeof OrderStatus)[keyof typeof OrderStatus]) => {
  switch (status) {
    case OrderStatus.Delivered:
      return "Đã phục vụ";
    case OrderStatus.Paid:
      return "Đã thanh toán";
    case OrderStatus.Pending:
      return "Chờ xử lý";
    case OrderStatus.Processing:
      return "Đang nấu";
    default:
      return "Từ chối";
  }
};

export const getVietnameseTableStatus = (status: (typeof TableStatus)[keyof typeof TableStatus]) => {
  switch (status) {
    case TableStatus.Available:
      return "Có sẵn";
    case TableStatus.Reserved:
      return "Đã đặt";
    default:
      return "Ẩn";
  }
};

// Token and URL Handling
export const getTableLink = ({ token, tableNumber }: { token: string; tableNumber: number }) => `${envConfig.NEXT_PUBLIC_URL}/${defaultLocale}/tables/${tableNumber}?token=${token}`;

export const decodeToken = (token: string) => jwtDecode(token) as TokenPayload;

export function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const simpleMatchText = (fullText: string, matchText: string) => removeAccents(fullText.toLowerCase()).includes(removeAccents(matchText.trim().toLowerCase()));

// Date Formatting
export const formatDateTimeToLocaleString = (date: string | Date) => format(date instanceof Date ? date : new Date(date), "HH:mm:ss dd/MM/yyyy");

export const formatDateTimeToTimeString = (date: string | Date) => format(date instanceof Date ? date : new Date(date), "HH:mm:ss");

// Socket Management
export const generateSocketInstace = (accessToken: string) =>
  io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    auth: { Authorization: `Bearer ${accessToken}` },
  });

// Order Status Icons
export const OrderStatusIcon = {
  [OrderStatus.Pending]: Loader,
  [OrderStatus.Processing]: CookingPot,
  [OrderStatus.Rejected]: BookX,
  [OrderStatus.Delivered]: Truck,
  [OrderStatus.Paid]: HandCoins,
};

// API Wrapper
export const wrapServerApi = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (error: any) {
    if (error.digest?.includes("NEXT_REDIRECT")) throw error;
    return null;
  }
};

// Slug Management
export const generateSlugUrl = ({ name, id }: { name: string; id: number }) => `${slugify(name)}-i.${id}`;

export const getIdFromSlugUrl = (slug: string) => Number(slug.split("-i.")[1]);
