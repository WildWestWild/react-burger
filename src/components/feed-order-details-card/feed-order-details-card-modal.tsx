import { FC } from "react";
import { FeedOrderDetailsCardWindow } from "./feed-order-details-card-window";
import Modal from "../model/model";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services";

interface FeedOrderDetailsCardModalProps {
  handleModalClose: () => void;
}

const FeedOrderDetailsCardModal: FC<FeedOrderDetailsCardModalProps> = ({
  handleModalClose,
}) => {
  const { number } = useParams<string>();
  const orderCardPositionsList = useAppSelector(
    (store) => store.feed.orderCardPositionsList
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
      <FeedOrderDetailsCardWindow isNotModal={false} />
    </Modal>
  );
};

export default FeedOrderDetailsCardModal;
