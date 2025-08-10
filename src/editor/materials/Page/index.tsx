import useMaterialDrop from '@/editor/hooks/useMaterialDrop';
import type { CommonComponentProps } from '@/editor/types';

function Page({ children, id }: CommonComponentProps) {
  const { canDrop, dropRef } = useMaterialDrop(['Container', 'Button'], id);

  return (
    <div
      data-component-id={id}
      ref={dropRef}
      className="p-[20px] h-[100%] box-border"
      style={{ border: canDrop ? '2px solid #1677ff' : 'none' }}
    >
      {children}
    </div>
  );
}

export default Page;
