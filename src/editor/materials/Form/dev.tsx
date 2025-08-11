import { Form as AntdForm, Input } from 'antd';
import React, { useEffect, useMemo } from 'react';
import useMaterialDrop from '../../hooks/useMaterialDrop';
import type { CommonComponentProps } from '../../types';
import { useDrag } from 'react-dnd';

function Form({ id, name, children, onFinish }: CommonComponentProps) {
  const [form] = AntdForm.useForm();

  const { canDrop, dropRef } = useMaterialDrop(['FormItem'], id);

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id
    }
  });

  useEffect(() => {
    drag(dropRef);
  }, []);

  const formItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id
      };
    });
  }, [children]);

  return (
    <div
      className={`w-[100%] p-[20px] min-h-[100px] ${
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-stone-200'
      }`}
      ref={dropRef}
      data-component-id={id}
    >
      <AntdForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={values => {
          if (onFinish) {
            onFinish(values);
          }
        }}
      >
        {formItems.map((item: any, index: number) => {
          return (
            <AntdForm.Item
              key={item.name + index}
              data-component-id={item.id}
              name={item.name}
              label={item.label}
            >
              <Input style={{ pointerEvents: 'none' }} />
            </AntdForm.Item>
          );
        })}
      </AntdForm>
    </div>
  );
}

export default Form;
