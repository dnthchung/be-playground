// Imports
import { DishSchema } from "@/schemaValidations/dish.schema";
import z from "zod";

// ===================== Dashboard Query Params =====================

// Tham số truy vấn cho chỉ số tổng quan của bảng điều khiển
export const DashboardIndicatorQueryParams = z.object({
  fromDate: z.coerce.date(), // Ngày bắt đầu
  toDate: z.coerce.date(), // Ngày kết thúc
});
export type DashboardIndicatorQueryParamsType = z.TypeOf<typeof DashboardIndicatorQueryParams>;

// ===================== Dashboard Response Schema =====================

// Kết quả trả về từ API tổng quan bảng điều khiển
export const DashboardIndicatorRes = z.object({
  data: z.object({
    revenue: z.number(), // Tổng doanh thu
    guestCount: z.number(), // Tổng số lượng khách
    orderCount: z.number(), // Tổng số lượng đơn hàng
    servingTableCount: z.number(), // Số lượng bàn đang phục vụ
    dishIndicator: z.array(
      DishSchema.extend({
        successOrders: z.number(), // Số lượng đơn hàng thành công
      }),
    ),
    revenueByDate: z.array(
      z.object({
        date: z.string(), // Ngày
        revenue: z.number(), // Doanh thu theo ngày
      }),
    ),
  }),
  message: z.string(), // Thông báo từ API
});
export type DashboardIndicatorResType = z.TypeOf<typeof DashboardIndicatorRes>;
