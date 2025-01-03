import jwt from "jsonwebtoken";
import { subDays } from "date-fns";

export const generateToken = (id: number, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export const sendCookie = (res: any, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const getFilter = (filter: string | undefined) => {
  switch (filter) {
    case "past_week":
      return { gte: subDays(new Date(), 7) };
    case "past_month":
      return { gte: subDays(new Date(), 30) };
    case "last_3_months":
      return { gte: subDays(new Date(), 90) };
    default:
      return {};
  }
};
