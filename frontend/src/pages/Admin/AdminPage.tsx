import { useEffect, useState } from "react";
import "./adminPage.scss";
import ItemForm from "./ItemForm";
import { OrderHistoryType, RevDetails } from "../../types/types";
import { Price } from "../../components";
import { getOrderDetails, getOrders } from "../../services/adminServices";
import OrderTable from "./OrderTable";
import MonthlySalesChart, { OrderStatusChart } from "./OrderChart";

const AdminPage = () => {
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [orders, setOrder] = useState<OrderHistoryType[]>();
  const [details, setDetails] = useState<RevDetails>();

  useEffect(() => {
    getOrders()
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
  console.log(orders);

  return (
    <div className="adminPage">
      {createItem && <ItemForm setIsOpen={handleCreateItem} />}
      <div className="adminCont">
        <div>
          {/* <button onClick={() => setCreateItem(true)}>Open</button> */}
          <div className="dashboard-cards">
            <div className="cardCont">
              <div className="card">
                <h3>Total Revenue</h3>
                <p>
                  <Price price={details?.totalRevenue || 0} />
                </p>
              </div>
              <div className="card">
                <h3>Paid Orders</h3>
                <p>{details?.totalPaidOrders}</p>
              </div>
              <div className="card">
                <h3>Pending</h3>
                <p>{details?.totalPendingOrders}</p>
              </div>
              <div className="card">
                <h3>Total Order</h3>
                <p>{details?.totalOrders}</p>
              </div>
            </div>
            <MonthlySalesChart />
            <OrderStatusChart
              paid={details?.totalPaidOrders}
              pending={details?.totalPendingOrders}
              total={details?.totalOrders}
            />
          </div>
        </div>
        <OrderTable orders={orders} />
      </div>
      <div className="floating-btn">
        <img
          src='/icons/setting.svg'
          alt={'setting'}
        />
      </div>
    </div>
  );
};
export default AdminPage;
