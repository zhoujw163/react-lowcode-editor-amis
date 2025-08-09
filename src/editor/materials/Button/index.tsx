import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';

export interface ButtonProps {
  id: number;
  type: ButtonType;
  text: string;
}

export default function Button({ id, type, text }: ButtonProps) {
  return (
    <AntdButton data-component-id={id} type={type}>
      {text}
    </AntdButton>
  );
}
