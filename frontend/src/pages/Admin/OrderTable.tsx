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
            orders.length > 1 &&
            orders.map((item, i) => (
              <tr key={item.id + i}>
                <td>
                  <span>#{item?.id}</span>
                </td>
                <td>{item.totalCount}</td>
                <td>
                  <span
                    className="status"
                    style={{
                      backgroundColor:
                        item.status === "PAID"
                          ? lightTheme.paid
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
                <td>
                  <Price price={item.totalPrice} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
