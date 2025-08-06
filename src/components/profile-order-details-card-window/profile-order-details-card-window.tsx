import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services";
import { FC } from "react";
import FeedOrderDetailsCard from "../feed-order-details-card/feed-order-details-card";

interface ProfileOrderDetailsCardWindowProps {
  isNotModal: boolean;
}

export const ProfileOrderDetailsCardWindow: FC<ProfileOrderDetailsCardWindowProps> = ({isNotModal}) => {
  const { number } = useParams<string>();
  const orderCardPositionsList = useAppSelector((store) => store.orderFeed.orderCardPositionsList);

  console.log("orderCardPositionsList", orderCardPositionsList);

  console.log("id", number);

  if (!orderCardPositionsList) {
    return null;
  }

  const orderCardPositions = orderCardPositionsList.find(
    (order) => order.number === (Number(number))
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
