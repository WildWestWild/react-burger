import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../services';
import { Item, removeIngredient } from '../../../services/burger-constructor/slice';
import { decreaseIngredientCount } from '../../../services/burger-ingredients/slice';
import styles from './draggable-constructor-ingredient.module.css'

type DraggableConstructorIngredientProps = {
  item: Item,
  index: number,
  moveIngredient: (fromIndex: number, toIndex: number) => void
}

type DraggbleElement = {
  index: number,
  uuid: string
}

export const DraggableConstructorIngredient : FC<DraggableConstructorIngredientProps> = ({ item, index, moveIngredient }) => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const [, drop] = useDrop<DraggbleElement>({
    accept: 'constructor-ingredient',
    drop(draggedItem) {
      if (!ref.current || draggedItem.index === index) return;
      moveIngredient(draggedItem.index, index);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { index, id: item.uuid },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.item}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(removeIngredient(item.uuid));
          dispatch(decreaseIngredientCount(item._id));
        }}
      />
    </div>
  );
};
