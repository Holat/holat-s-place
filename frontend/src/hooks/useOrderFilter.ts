import { OrderHistoryType } from "../types/types";
import { useState, useEffect } from "react";

const useOrderFilter = (orders?: OrderHistoryType[]) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<
    OrderHistoryType[] | null
  >();

  const stripTime = (date: Date) =>
    new Date(date.getDate(), date.getMonth(), date.getDate());
  const trimUpperS = (s: string) => s.trim().toUpperCase();
  
  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedStatus(null);
  }

  useEffect(() => {
    const filterOrders = () => {
      let filtered = orders || [];
      let adjustedStartDate = startDate;
      let adjustedEndDate = endDate;

      if (startDate && !endDate) adjustedEndDate = startDate;
      if (!startDate && endDate) adjustedStartDate = endDate;
      adjustedStartDate = adjustedStartDate
        ? stripTime(adjustedStartDate)
        : null;
      adjustedEndDate = adjustedEndDate ? stripTime(adjustedEndDate) : null;

      if (selectedStatus && !adjustedStartDate && !adjustedEndDate)
        filtered = filtered.filter(
          (order: OrderHistoryType) => trimUpperS(order.status) === trimUpperS(selectedStatus)
        );
      else if (!selectedStatus && (adjustedStartDate || adjustedEndDate)) {
        filtered = filtered.filter((order: OrderHistoryType) => {
          const orderDate = stripTime(new Date(order.createdAt));
          if (adjustedStartDate && adjustedEndDate)
            return (
              orderDate >= adjustedStartDate && orderDate <= adjustedEndDate
            );
          return true;
        });
      } else if (selectedStatus && (adjustedStartDate || adjustedEndDate)) {
        filtered = filtered.filter((order: OrderHistoryType) => {
          const orderDate = stripTime(new Date(order.createdAt));
          const statusMatch = trimUpperS(order.status) === trimUpperS(selectedStatus);
          const dateMatch =
            (!adjustedStartDate || orderDate >= adjustedStartDate) &&
            (!adjustedEndDate || orderDate <= adjustedEndDate);
          return statusMatch && dateMatch;
        });
      }
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
    reset,
  };
};

export default useOrderFilter;
