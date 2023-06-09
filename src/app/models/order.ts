import { Fruite } from "./fruit";

export class Orders {
    id: number = 0;
    fruiteId: number;
    quantity: number;
    pricePerKG: number;
    cartId: number | null;
    purchaseId: number | null;
    fruite: Fruite;
}