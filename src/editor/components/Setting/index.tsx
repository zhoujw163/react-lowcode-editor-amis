import { Segmented } from 'antd';
import { useState } from 'react';
import { useComponentsStore } from '../../stores/components';
import ComponentAttr from './ComponentAttr';
import ComponentEvent from './ComponentEvent';
import ComponentStyle from './ComponentStyle';

export default function Setting() {
  const { curComponentId } = useComponentsStore();

  const [key, setKey] = useState('属性');

  if (!curComponentId) return null;

  return (
    <div>
      <Segmented value={key} onChange={setKey} block options={['属性', '样式', '事件']} />
      <div className="pt-[20px]">
        {key === '属性' && <ComponentAttr />}
        {key === '样式' && <ComponentStyle />}
        {key === '事件' && <ComponentEvent />}
      </div>
    </div>
  );
}
