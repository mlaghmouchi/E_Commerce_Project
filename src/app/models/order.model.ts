import { Address } from "./address.model";
import { OrderItem } from "./orderItem.model";
import { PaymentMethod } from "./paymentMethod.model";

export interface Order {
    id: number;
    customerId?: string;
    items: OrderItem[];
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: PaymentMethod;
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
    updatedAt: string;
    trackingNumber?: string;
    notes?: string;
}