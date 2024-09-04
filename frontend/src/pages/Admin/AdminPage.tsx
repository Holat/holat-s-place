import { useEffect, useState } from "react";
import "./adminPage.scss";
import ItemForm from "./ItemForm";
import { getAll } from "../../services/orderService";
import { OrderHistoryType, RevDetails } from "../../types/types";
import { Title } from "../../components";
import { getOrderDetails } from "../../services/adminServices";
import { formatDateToDDMMYYYY } from "../../utils/adminForm";

const lightTheme = {
  accentV: "#ffc107",
  payed: "#28a745",
  new: "#6c7ae0",
  failed: "#dc3545",
};

const AdminPage = () => {
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [orders, setOrder] = useState<OrderHistoryType[] | null>(null);
  const [details, setDetails] = useState<RevDetails>();

  useEffect(() => {
    getAll()
      .then(setOrder)
      .catch((error) => {
        console.log(error);
      });

    getOrderDetails()
      .then(setDetails)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCreateItem = (b: boolean) => setCreateItem(b);

  return (
    <div className="adminPage">
      {createItem && <ItemForm setIsOpen={handleCreateItem} />}
      <div className="adminCont">
        <div>
          <button onClick={() => setCreateItem(true)}>Open</button>
          <div className="dashboard-cards">
            <div className="card orders-card">
              <h3>Total Revenue</h3>
              <p>{details?.totalRev}</p>
            </div>
            <div className="card pending-card">
              <h3>Order Count</h3>
              <p>{details?.count}</p>
            </div>
            <div className="card revenue-card">
              <h3>Pending</h3>
              <p>{details?.totalPending}</p>
            </div>
            <div className="card expenses-card">
              <h3></h3>
              <p></p>
            </div>
          </div>
        </div>
        <div className="order-status-table">
          <div className="search-bar">
            <Title title="Orders" fontWeight={600} fontSize="20px" />
            <input type="text" placeholder="Search" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Quantity</th>
                <th>Order Status</th>
                <th>Delivery Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((item) => (
                  <tr>
                    <td>
                      <span>#{item?.id}</span>
                    </td>
                    <td>{item.totalCount}</td>
                    <td>
                      <span
                        className="status"
                        style={{
                          backgroundColor:
                            item.status === "PAYED"
                              ? lightTheme.payed
                              : item.status === "NEW"
                              ? lightTheme.new
                              : item.status === "FAILED"
                              ? lightTheme.failed
                              : lightTheme.accentV,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{formatDateToDDMMYYYY(item.createdAt)}</td>
                    <td>{item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
