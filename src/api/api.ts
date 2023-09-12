export type ApiOrderStatus = "pending" | "cancelled" | "shipped";

export interface ApiOrder {
  id: number;
  status: ApiOrderStatus;
  items: ApiOrderItem[];
  price: {
    total: number;
    currency: "EUR" | "SEK" | "USD";
  }
  customer: ApiCustomer;
}

export interface ApiOrderItem {
  name: string;
  quantity: number;
  pricePerUnit: number;
}

export interface ApiCustomer {
  name: string;
  email: string;
  address: string;
}

export async function getOrders(){
    //throw new Error("Simulated error: Unable to fetch orders.");
    const res = await fetch("/api/orders");
    return await res.json();
}
