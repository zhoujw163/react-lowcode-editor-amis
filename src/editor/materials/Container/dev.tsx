import useMaterialDrop, { acceptDropTypes } from '@/editor/hooks/useMaterialDrop';
import type { CommonComponentProps } from '../../types';
import { useDrag } from 'react-dnd';
import { useEffect } from 'react';

const Container = ({ id, name, children, styles }: CommonComponentProps) => {
  const { canDrop, dropRef } = useMaterialDrop(acceptDropTypes, id);

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id
    }
  });

  // 要同时给 div 绑定 drag、drop 的处理，所以用 useRef 拿到 ref 之后再绑定
  useEffect(() => {
    drag(dropRef);
  }, []);

  return (
    <div
      data-component-id={id}
      ref={dropRef}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-stone-200'
      }`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default Container;
