import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { getComponentById, useComponentsStore } from '@/editor/stores/components';
import { useComponentConfigStore } from '@/editor/stores/component-config';

export const acceptDropTypes = ['Container', 'Button', 'Modal', 'Table'];

export interface ItemType {
  type: string;
  dragType: 'move' | 'add';
  id: number;
}

/**
 * 组件拖拽
 * @param accept 接受的类型 eg: ['Container', 'Button']
 * @param id 父组件id
 * @returns
 */
export default function useMaterialDrop(accept: string[], id: number) {
  const { components, addComponent, deleteComponent } = useComponentsStore();

  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop({
    accept,
    drop: (item: ItemType, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      if (item.dragType === 'move') {
        const component = getComponentById(item.id, components)!;
        deleteComponent(item.id);
        addComponent(component, id);
      } else {
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
      }
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
