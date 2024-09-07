import { useEffect, useState } from "react";
import "./adminPage.scss";
import ItemForm from "./ItemForm";
import { OrderHistoryType, RevDetails, ModalStateType } from "../../types/types";
import { Price } from "../../components";
import { getOrderDetails, getOrders } from "../../services/adminServices";
import OrderTable from "./OrderTable";
import MonthlySalesChart, { OrderStatusChart } from "./OrderChart";
import useFood from "../../hooks/useFood";
import ItemEdit from "./ItemEdit";
import AdminGrant from "./AdminGrant";


const AdminPage = () => {
  const { tags, origins } = useFood()
  const [activeModal, setActiveModal] = useState<ModalStateType | null>(null);
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

  const handleCreateItem = () => setActiveModal(null);
  return (
    <div className="adminPage">
      {activeModal === 'createItem' && <ItemForm closeModal={handleCreateItem} apiTags={tags} origins={origins}/>}
      {activeModal === 'editFood' && <ItemEdit closeModal={handleCreateItem} />}
      {activeModal === 'authorize' && <AdminGrant closeModal={handleCreateItem}/>}
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
        <div className="img">
          <img
            src='/icons/setting.svg'
            alt={'setting'}
          />
        </div>
        <div className="btnCont"  id="btna1" onClick={() => setActiveModal('createItem')}>
          <img src="/icons/addI.svg" alt="Add image" />
        </div>
        <div className="btnCont" id="btna2">
          <img src="/icons/edit.svg" alt="Add image" style={{ width: '24px', height: '24px', margin: '0 auto'}}/>
        </div>
        <div className="btnCont" id="btna3" onClick={() => setActiveModal('authorize')}>
        <img src="/icons/profile.svg" alt="Add image" style={{ width: '40px', height: '40px', margin: '0 auto'}}/>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
