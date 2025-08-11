import useMaterialDrop, { acceptDropTypes } from '@/editor/hooks/useMaterialDrop';
import type { CommonComponentProps } from '../../types';

const Container = ({ id, children, styles }: CommonComponentProps) => {
  const { canDrop, dropRef } = useMaterialDrop(acceptDropTypes, id);

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
