import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../services';
import { removeIngredient } from '../../../services/burger-constructor/slice';
import { decreaseIngredientCount } from '../../../services/burger-ingredients/slice';
import styles from './draggable-constructor-ingredient.module.css'

export const DraggableConstructorIngredient = ({ item, index, moveIngredient }) => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'constructor-ingredient',
    drop(draggedItem) {
      if (!ref.current || draggedItem.index === index) return;
      moveIngredient(draggedItem.index, index);
    },
  });

  drag(drop(ref));
  console.log('item', item);

  return (
    <div key={item.key} className={styles.item}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => 
          { 
            dispatch(removeIngredient(item._id)) 
            dispatch(decreaseIngredientCount(item._id));
          }}
      />
    </div>
  );
};
