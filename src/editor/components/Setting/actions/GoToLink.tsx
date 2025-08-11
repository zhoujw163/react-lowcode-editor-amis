import type { ComponentEvent } from '@/editor/stores/component-config';
import { Input } from 'antd';
import { useComponentsStore } from '@/editor/stores/components';

export default function GoToLink({ event }: { event: ComponentEvent }) {
  const { curComponentId, updateComponentProps, curComponent } = useComponentsStore();

  function urlChange(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        url: value
      }
    });
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[5px]">
        <div>链接：</div>
        <div>
          <Input
            onChange={e => {
              urlChange(event.name, e.target.value);
            }}
            value={curComponent?.props?.[event.name]?.url}
          />
        </div>
      </div>
    </div>
  );
}
