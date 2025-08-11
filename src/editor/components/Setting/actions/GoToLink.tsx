import { Input } from 'antd';
import { useComponentsStore } from '@/editor/stores/components';
import { useState } from 'react';

export interface GoToLinkConfig {
  type: 'goToLink';
  url: string;
}

export interface GoToLinkProps {
  defaultValue?: string;
  onChange?: (config: GoToLinkConfig) => void;
}

export default function GoToLink({ defaultValue, onChange }: GoToLinkProps) {
  const { curComponentId } = useComponentsStore();
  const [value, setValue] = useState(defaultValue);

  function urlChange(value: string) {
    if (!curComponentId) return;
    setValue(value);

    onChange?.({
      type: 'goToLink',
      url: value
    });
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[10px]">
        <div>跳转链接</div>
        <div>
          <Input.TextArea
            style={{ height: 200, width: 500, border: '1px solid #000' }}
            onChange={e => {
              urlChange(e.target.value);
            }}
            value={value || ''}
          />
        </div>
      </div>
    </div>
  );
}
