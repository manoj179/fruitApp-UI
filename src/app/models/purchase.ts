import { Orders } from "./order";

export class Purchase {
    id: number = 0;
    userId: number;
    totalPrice: number;
    address: string;
    purchasedDate: string;
    status: string;
    deliveredDate: string | null;
    statusReason: string;
    orders: Orders[] | null;
    userName: string;
}