import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services";
import FeedOrderDetailsCard from "./feed-order-details-card";
import { FC } from "react";

interface FeedOrderDetailsCardWindowProps {
  isNotModal: boolean;
}

export const FeedOrderDetailsCardWindow: FC<FeedOrderDetailsCardWindowProps> = ({isNotModal}) => {
  const { number } = useParams<string>();
  const orderCardPositionsList = useAppSelector(
    (store) => store.feed.orderCardPositionsList
  );

  console.log("orderCardPositionsList", orderCardPositionsList);

  console.log("id", number);

  if (!orderCardPositionsList) {
    return null;
  }

  const orderCardPositions = orderCardPositionsList.find(
    (order) => order.id === (Number(number))
  );

  if (!orderCardPositions) {
    return null;
  }

  return (
    <FeedOrderDetailsCard
      isNotModal={isNotModal}
      orderCardPositions={orderCardPositions}
    />
  );
};
