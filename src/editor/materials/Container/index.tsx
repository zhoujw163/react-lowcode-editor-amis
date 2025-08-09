import useMaterialDrop from '@/editor/hooks/useMaterialDrop';
import type { CommonComponentProps } from '../../types';

const Container = ({ id, children }: CommonComponentProps) => {
  const { canDrop, dropRef } = useMaterialDrop(['Container', 'Button'], id);

  return (
    <div
      ref={dropRef}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-stone-200'
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
