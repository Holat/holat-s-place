import { OrderHistoryType } from "../../types/types";
import { formatDateToDDMMYYYY } from "../../utils/adminForm";
import { Price, Title } from "../../components";
import { refreshIcon } from "../../assets/icons";
import useOrderFilter from "../../hooks/useOrderFilter";

const lightTheme = {
  accentV: "#ffc107",
  paid: "#28a745",
  new: "#6c7ae0",
  failed: "#dc3545",
};

const OrderTable = ({
  orders,
  refresh,
}: {
  orders?: OrderHistoryType[];
  refresh: () => void;
}) => {
  const {
    selectedStatus,
    setSelectedStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredOrders,
  } = useOrderFilter(orders);

  console.log(orders);
  return (
    <div className="order-status-table">
      <div className="search-bar">
        <Title title="Orders" fontWeight={600} fontSize="20px" />
        <div className="searchBox">
          <button onClick={refresh}>
            <img src={refreshIcon} alt="refresg" />
          </button>
          {/* <input type="text" placeholder="Search" /> */}
          <div className="filter">
            {orders && (
              <>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => e.target.value ? setStartDate(new Date(e.target.value)) : null}
                />
                <input
                  type="date"
                  value={endDate ? endDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => e.target.value ? setEndDate(new Date(e.target.value)) : null}
                />
                <select
                  value={selectedStatus || ""}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </>
            )}
          </div>
        </div>
      </div>
      <table>
        <tbody>
          {filteredOrders && filteredOrders.length > 1 ? (
            filteredOrders.map((item, i) => (
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
                              : item.status === "FAILED" ||
                                item.status === "CANCELLED"
                              ? lightTheme.failed
                              : lightTheme.accentV,
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <span>Online Payment</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h4>Empty</h4>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
