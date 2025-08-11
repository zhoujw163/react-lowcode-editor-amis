import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useComponentsStore } from '@/editor/stores/components';
import { useComponentConfigStore } from '@/editor/stores/component-config';

export const acceptDropTypes = ['Container', 'Button', 'Modal'];

/**
 * 组件拖拽
 * @param accept 接受的类型 eg: ['Container', 'Button']
 * @param id 父组件id
 * @returns
 */
export default function useMaterialDrop(accept: string[], id: number) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop({
    accept,
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      const config = componentConfig[item.type];

      addComponent(
        {
          // id: Math.random().toString(36).substring(2, 8),
          id: new Date().getTime(),
          name: item.type,
          props: config.defaultProps,
          desc: config.desc
        },
        id
      );
    },
    collect: monitor => ({
      canDrop: monitor.canDrop()
    })
  });

  const dropRef = useRef<HTMLDivElement>(null);
  drop(dropRef);

  return {
    canDrop,
    dropRef
  };
}
