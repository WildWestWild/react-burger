export enum OrderStatus {
  Cancel = "cancelled",
  Penging = "pending",
  Done = "done",
}

export function getOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Cancel:
      return <p style={{ color: "#FF2400" }}>Отменен</p>;
    case OrderStatus.Done:
      return <p style={{ color: "#00CCCC" }}>Выполнен</p>;
    default:
       return <p style={{ color: "#F2C94C" }}>Готовится</p>;
  }
}