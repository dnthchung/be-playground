import { z } from "zod";

// Schema để kiểm tra các biến môi trường cần thiết
const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_GOOGLE_AUTHORIZED_REDIRECT_URI: z.string(),
});

// Kiểm tra và xác thực các biến môi trường
const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_AUTHORIZED_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_AUTHORIZED_REDIRECT_URI,
});

// Nếu có lỗi, in ra lỗi và ném ra một exception
if (!configProject.success) {
  console.error(configProject.error.errors);
  throw new Error("Các khai báo biến môi trường không hợp lệ");
}

// Lấy dữ liệu đã xác thực từ kết quả kiểm tra
const envConfig = configProject.data;

// Xuất cấu hình môi trường đã xác thực
export default envConfig;

// Định nghĩa các ngôn ngữ hỗ trợ
export const locales = ["en", "vi"] as const;

// Định nghĩa kiểu dữ liệu cho Locale
export type Locale = (typeof locales)[number];

// Ngôn ngữ mặc định
export const defaultLocale: Locale = "vi";
