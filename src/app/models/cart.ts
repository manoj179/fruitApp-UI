import { Orders } from "./order";

export class Cart {
    id: number = 0;
    userId: number;
    totalPrice: number;
    isInCart: boolean;
    createdOn: string;
    updatedBy: number | null;
    updatedOn: string | null;
    orders: Orders[] | null;
    userName: string;
}