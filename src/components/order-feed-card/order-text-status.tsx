export enum OrderStatus {
  Created = "created",
  Penging = "pending",
  Done = "done",
}

export function getOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Created:
      return <p style={{ color: "#FF2400" }}>Создан</p>;
    case OrderStatus.Done:
      return <p style={{ color: "#00CCCC" }}>Выполнен</p>;
    default:
       return <p style={{ color: "#F2C94C" }}>Готовится</p>;
  }
}