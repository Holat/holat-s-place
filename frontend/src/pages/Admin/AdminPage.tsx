import { useEffect, useState } from "react";
import "./adminPage.scss";
import ItemForm from "./ItemForm";
import { getAll } from "../../services/orderService";
import { OrderHistoryType, RevDetails } from "../../types/types";
import { Price } from "../../components";
import { getOrderDetails } from "../../services/adminServices";
import OrderTable from "./OrderTable";

const AdminPage = () => {
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [orders, setOrder] = useState<OrderHistoryType[]>();
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
              <p>
                <Price price={details?.totalRev || 0} />
              </p>
            </div>
            <div className="card pending-card">
              <h3>Order Count</h3>
              <p>{details?.count}</p>
            </div>
            <div className="card revenue-card">
              <h3>Pending</h3>
              <p>
                <Price price={details?.totalPending || 0} />
              </p>
            </div>
            <div className="card expenses-card">
              <h3></h3>
              <p></p>
            </div>
          </div>
        </div>
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};
export default AdminPage;
