// Imports
import { Role } from "@/constants/type";
import { OrderSchema } from "@/schemaValidations/order.schema";
import z from "zod";

// ===================== Guest Authentication =====================

// Yêu cầu đăng nhập cho khách
export const GuestLoginBody = z
  .object({
    name: z.string().min(2).max(50), // Tên khách từ 2-50 ký tự
    tableNumber: z.number(), // Số bàn phải là số nguyên
    token: z.string(), // Token xác thực
  })
  .strict();
export type GuestLoginBodyType = z.TypeOf<typeof GuestLoginBody>;

// Kết quả trả về khi đăng nhập khách
export const GuestLoginRes = z.object({
  data: z.object({
    accessToken: z.string(), // Token truy cập
    refreshToken: z.string(), // Token làm mới
    guest: z.object({
      id: z.number(), // ID khách
      name: z.string(), // Tên khách
      role: z.enum([Role.Guest]), // Vai trò phải là "Guest"
      tableNumber: z.number().nullable(), // Số bàn, có thể null
      createdAt: z.date(), // Ngày tạo
      updatedAt: z.date(), // Ngày cập nhật
    }),
  }),
  message: z.string(),
});
export type GuestLoginResType = z.TypeOf<typeof GuestLoginRes>;

// ===================== Guest Orders =====================

// Yêu cầu tạo đơn hàng của khách
export const GuestCreateOrdersBody = z.array(
  z.object({
    dishId: z.number(), // ID món ăn
    quantity: z.number(), // Số lượng
  }),
);
export type GuestCreateOrdersBodyType = z.TypeOf<typeof GuestCreateOrdersBody>;

// Kết quả trả về khi tạo đơn hàng
export const GuestCreateOrdersRes = z.object({
  message: z.string(), // Thông báo từ API
  data: z.array(OrderSchema), // Danh sách đơn hàng tạo thành công
});
export type GuestCreateOrdersResType = z.TypeOf<typeof GuestCreateOrdersRes>;

// Kết quả trả về khi lấy danh sách đơn hàng
export const GuestGetOrdersRes = GuestCreateOrdersRes;
export type GuestGetOrdersResType = z.TypeOf<typeof GuestGetOrdersRes>;
