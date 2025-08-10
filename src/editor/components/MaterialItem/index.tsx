import { useRef } from 'react';
import { useDrag } from 'react-dnd';

export interface MaterialItemProps {
  name: string;
  desc: string;
}

export function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props;
  const dragRef = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: name,
    item: {
      type: name
    }
  });

  // 应用 drag 函数到 ref
  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className="border-dashed border-[1px] border-stone-200 py-[8px] px-[10px] m-[10px] cursor-move bg-white hover:bg-[#ccc]"
    >
      {desc}
    </div>
  );
}
