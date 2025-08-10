import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';
import type { CSSProperties } from 'react';

export interface ButtonProps {
  id: number;
  type: ButtonType;
  text: string;
  styles?: CSSProperties;
}

export default function Button({ id, type, text, styles }: ButtonProps) {
  return (
    <AntdButton data-component-id={id} type={type} style={styles}>
      {text}
    </AntdButton>
  );
}
