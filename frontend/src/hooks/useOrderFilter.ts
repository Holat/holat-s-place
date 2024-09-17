import { OrderHistoryType } from "../types/types";
import { useState, useEffect } from "react";

const useOrderFilter = (orders?: OrderHistoryType[]) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<
    OrderHistoryType[] | null
  >();

  useEffect(() => {
    const filterOrders = () => {
      const filtered = orders?.filter((order) => {
        const orderDate = new Date(order.createdAt);
        if (startDate === null && endDate === null) {
          return selectedStatus === null || order.status === selectedStatus;
        }

        if (selectedStatus === null) {
          return (
            (startDate === null || orderDate >= startDate) &&
            (endDate === null || orderDate <= endDate)
          );
        }

        return (
          order.status === selectedStatus &&
          (startDate === null || orderDate >= startDate) &&
          (endDate === null || orderDate <= endDate)
        );
      });
      setFilteredOrders(filtered);
    };
    filterOrders();
  }, [orders, selectedStatus, startDate, endDate]);

  return {
    selectedStatus,
    setSelectedStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredOrders,
  };
};

export default useOrderFilter;
