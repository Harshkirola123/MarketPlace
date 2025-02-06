import { BaseSchema } from "../common/dto/base.dto";

export const userEnum = ["USER", "ADMIN"] as const;

export type UserEmum = (typeof userEnum)[number];
export interface IUser extends BaseSchema {
  name: string;
  email: string;
  password: string;
  role: UserEmum;
  walletBalance: number;
  refToken?: string;
}
