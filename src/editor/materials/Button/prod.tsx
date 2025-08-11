import type { CommonComponentProps } from '@/editor/types';
import { Button as AntdButton } from 'antd';

export default function Button({ id, type, text, styles, ...props }: CommonComponentProps) {
  return (
    <AntdButton data-component-id={id} type={type} style={styles} {...props}>
      {text}
    </AntdButton>
  );
}
