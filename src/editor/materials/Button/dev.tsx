import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { useRef, type CSSProperties } from 'react';
import { useDrag } from 'react-dnd';

export interface ButtonProps {
  id: number;
  type: ButtonType;
  text: string;
  styles?: CSSProperties;
}

export default function Button({ id, type, text, styles }: ButtonProps) {
  const dragRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [, drag] = useDrag({
    type: 'Button',
    item: {
      type: 'Button',
      dragType: 'move',
      id
    }
  });

  // 应用 drag 函数到 ref
  drag(dragRef);

  return (
    <AntdButton ref={dragRef} data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
}
