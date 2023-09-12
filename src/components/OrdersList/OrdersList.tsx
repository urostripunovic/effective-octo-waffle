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
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<View>(initialView);
    const [error, setError] = useState<string | null>(null);
    const [rate, setRate] = useState<number>(1);
    const [currency, setCurrency] = useState<string>("SEK");

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

    console.log(orders);

    if (loading) {
        return (
            <div
                className="mt-6 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error meddelande
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="mt-6 mb-4 text-4xl font-bold">Orders List</h1>
            <>
                <table className="min-w-max w-4/6 table-auto mb-4">
                    <thead>
                        <tr className="bg-[#5754f9] text-white uppercase text-base leading-normal">
                            <th className="py-3 px-6 text-left">Ordernummer</th>
                            <th className="py-3 px-6 text-left">Datum</th>
                            <th className="py-3 px-6 text-center">
                                Fullständigt namn
                            </th>
                            <th className="py-3 px-6 text-center">
                                Antal produkter
                            </th>
                            <th className="py-3 px-6 text-center">
                                Summa{" "}
                                <span>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5"
                                        onChange={(e) => {
                                            setRate(+e.target.value);
                                            //console.log(e.target.selectedOptions[0].label)
                                            setCurrency(
                                                e.target.selectedOptions[0]
                                                    .label
                                            );
                                        }}
                                    >
                                        <option value={1}>SEK</option>
                                        <option value={0.084}>EUR</option>
                                        <option value={0.09}>USD</option>
                                    </select>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-950 text-base font-light">
                        {orders.map((order) => {
                            const totalSum = (
                                order.products.reduce(
                                    (sum: number, product) =>
                                        sum + product.price * product.quantity,
                                    0
                                ) * rate
                            ).toFixed(rate === 1 ? 0 : 2);
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
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {order.id}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {order.created_at?.split(":")[0]}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {fullName}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {order.products.length}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {totalSum + " " + currency}
                                        {/*Ändra så att man kan byta mellan valutor*/}
                                    </td>
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
        </>
    );
}
