import { FC } from "react";
import Modal from "../model/model";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services";
import { ProfileOrderDetailsCardWindow } from "./profile-order-details-card-window";

interface FeedOrderDetailsCardModalProps {
  handleModalClose: () => void;
}

const FeedOrderDetailsCardModal: FC<FeedOrderDetailsCardModalProps> = ({
  handleModalClose,
}) => {
  const { number } = useParams<string>();
  const orderCardPositionsList = useAppSelector(
    (store) => store.orderFeed.orderCardPositionsList
  );
  if (!orderCardPositionsList) {
    return null;
  }

  const orderCardPositions = orderCardPositionsList.find(
    (order) => order.number === Number(number)
  );

  if (!orderCardPositions) {
    return null;
  }

  return (
    <Modal onClose={handleModalClose} title={`#${orderCardPositions.number}`}>
      <ProfileOrderDetailsCardWindow isNotModal={false} />
    </Modal>
  );
};

export default FeedOrderDetailsCardModal;
