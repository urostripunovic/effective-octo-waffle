import { useEffect, useRef, useState } from "react";
import { ApiOrderStatus, getOrders } from "../../api/api";
import { Button, Variant } from "../Button/Button";

interface Orders {
    id: number;
    created_at: string;
    status: ApiOrderStatus;
    products: [
        {
            id: string;
            name: string;
            quantity: number;
            price: number;
        }
    ];
    first_name: string;
    last_name: string;
}

interface View {
    click: boolean;
    orderNbr?: number;
    variant?: Variant;
}

const initialView: View = {
    click: false,
    orderNbr: undefined,
};

export function OrdersList() {
    const ref = useRef<null | HTMLButtonElement>(null);
    const [orders, setOrders] = useState<Orders[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<View>(initialView);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getOrders();
                setOrders(orders);
                setLoading(false);
                setError(null);
            } catch (error) {
                setError("Fel med att hämta ordrar: " + error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
    //console.log(orders);
    return (
        <>
            <h1 className="mt-6 mb-4 text-4xl font-bold">Orders List</h1>
            {isLoading ? (
                <p>Hämtar ordrar...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <table className="min-w-max w-4/6 table-auto mb-4">
                        <thead>
                            <tr className="bg-[#5754f9] text-white uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Ordernummer</th>
                                <th className="py-3 px-6 text-left">Datum</th>
                                <th className="py-3 px-6 text-center">Fullständigt namn</th>
                                <th className="py-3 px-6 text-center">Antal produkter</th>
                                <th className="py-3 px-6 text-center">Summa</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-950 text-sm font-light">
                            {orders.map((order) => {
                                const totalSum = order.products.reduce(
                                    (sum: number, product: any) =>
                                        sum + product.price * product.quantity,
                                    0
                                );
                                const fullName =
                                    order.first_name + " " + order.last_name;
                                return (
                                    <tr
                                        className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                                        key={order.id}
                                        onClick={() =>
                                            setView({
                                                click: true,
                                                orderNbr: order.id,
                                                variant: "success",
                                            })
                                        }
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                                        <td className="py-3 px-6 text-left">
                                            {order.created_at.split(":")[0]}
                                        </td>
                                        <td className="py-3 px-6 text-center">{fullName}</td>
                                        <td className="py-3 px-6 text-center">{order.products.length}</td>
                                        <td className="py-3 px-6 text-center">{totalSum} kr</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Button
                        ref={ref}
                        //className="custom-css-button"
                        size="sm"
                        variant={view.variant}
                        onClick={() => {
                            alert(
                                (view.orderNbr && `Order: ${view.orderNbr}`) ||
                                    "Välja gärna en order du vill kolla på"
                            );
                            setView({
                                click: false,
                                orderNbr: undefined,
                            });
                        }}
                    >
                        {!view.click
                            ? "Kolla på en order i mer detalj"
                            : `En detaljerad vy av order ${view.orderNbr} är redo`}
                    </Button>
                </>
            )}
        </>
    );
}
