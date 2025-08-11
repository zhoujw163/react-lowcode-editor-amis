import type { ComponentEvent } from '@/editor/stores/component-config';
import { Input, Select } from 'antd';
import { useComponentsStore } from '@/editor/stores/components';

export default function ShowMessage({ event }: { event: ComponentEvent }) {
  const { curComponentId, updateComponentProps, curComponent } = useComponentsStore();

  function messageTypeChange(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          type: value
        }
      }
    });
  }

  function messageTextChange(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          text: value
        }
      }
    });
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[10px]">
        <div>类型：</div>
        <div>
          <Select
            style={{ width: 160 }}
            options={[
              { label: '成功', value: 'success' },
              { label: '失败', value: 'error' }
            ]}
            onChange={value => {
              messageTypeChange(event.name, value);
            }}
            value={curComponent?.props?.[event.name]?.config?.type}
          />
        </div>
      </div>
      <div className="flex items-center gap-[10px] mt-[10px]">
        <div>文本：</div>
        <div>
          <Input
            onChange={e => {
              messageTextChange(event.name, e.target.value);
            }}
            value={curComponent?.props?.[event.name]?.config?.text}
          />
        </div>
      </div>
    </div>
  );
}
