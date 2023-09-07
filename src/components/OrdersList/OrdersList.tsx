import { useEffect, useRef, useState } from "react";
import { getOrders } from "../../api/api";
import { Button } from "../Button/Button";
import "./OrdersList.css";

export function OrdersList() {
    const ref = useRef(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [view, setView] = useState({
        click: false,
        order: undefined,
        variant: "primary",
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getOrders();
                setOrders(orders);
                setLoading(false);
            } catch (error) {
                setLoading(true);
                throw "Fel med att hämta ordrar: " + error;
            }
        };
        fetchOrders();
    }, []);

    //console.log(orders);

    return (
        <>
            <h1>Orders List</h1>
            {isLoading ? (
                <p>Hämtar ordrar...</p>
            ) : (
                <>
                    <table id="orders">
                        <thead>
                            <tr>
                                <th>Ordernummer</th>
                                <th>Datum</th>
                                <th>Fullständigt namn</th>
                                <th>Antal produkter</th>
                                <th>Summa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: any) => {
                                const totalSum = order.products.reduce(
                                    (sum: number, product: any) =>
                                        sum + product.price * product.quantity,
                                    0
                                );
                                const fullName =
                                    order.first_name + " " + order.last_name;
                                return (
                                    <tr
                                        key={order.id}
                                        onClick={() =>
                                            setView({
                                                click: true,
                                                order: order.id,
                                                variant: "success",
                                            })
                                        }
                                    >
                                        <td>{order.id}</td>
                                        <td>
                                            {order.created_at.split(":")[0]}
                                        </td>
                                        <td>{fullName}</td>
                                        <td>{order.products.length}</td>
                                        <td>{totalSum} kr</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <Button
                        ref={ref}
                        variant={view.variant}
                        onClick={() => {
                            alert(
                                (view.order && `Order: ${view.order}`) ||
                                    "Välja gärna en order du vill kolla på"
                            );
                            setView({
                                click: false,
                                order: undefined,
                                variant: "primary",
                            });
                        }}
                    >
                        {!view.click
                            ? "Kolla på en order i mer detalj"
                            : `En detaljerad vy av order ${view.order} är redo`}
                    </Button>
                </>
            )}
        </>
    );
}
