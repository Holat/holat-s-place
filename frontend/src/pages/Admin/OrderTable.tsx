import { OrderHistoryType } from "../../types/types";
import { formatDateToDDMMYYYY } from "../../utils/adminForm";
import { Price, Title } from "../../components";

const lightTheme = {
  accentV: "#ffc107",
  paid: "#28a745",
  new: "#6c7ae0",
  failed: "#dc3545",
};

const OrderTable = ({ orders }: { orders?: OrderHistoryType[] }) => {
  return (
    <div className="order-status-table">
      <div className="search-bar">
        <Title title="Orders" fontWeight={600} fontSize="20px" />
        <input type="text" placeholder="Search" />
      </div>
      <table>
        {/* <thead>
          <tr>
            <th>Order Id</th>
            <th>Quantity</th>
            <th>Order Status</th>
            <th>Delivery Date</th>
            <th>Total</th>
          </tr>
        </thead> */}
        <tbody>
          {orders &&
            orders.length > 1 &&
            orders.map((item, i) => (
              <tr key={item.id + i}>
                <td>
                  <div className="td">
                    <h4>#{item?.id}</h4>
                    <span>{formatDateToDDMMYYYY(item.createdAt)}</span>
                  </div>
                </td>
                <td>
                  <div className="td">
                    <h4>{item?.name}</h4>
                    <span>
                      Total Amount: <Price price={item.totalPrice} />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="td">
                    <div className="status">
                      <h4>{item.status.toLowerCase()}</h4>
                      <span
                        style={{
                          backgroundColor:
                            item.status === "PAID"
                              ? lightTheme.paid
                              : item.status === "NEW"
                              ? lightTheme.new
                              : item.status === "FAILED"
                              ? lightTheme.failed
                              : lightTheme.accentV,
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <span >Online Payment</span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
