import type { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return <div className="border-[1px] border-stone-200 min-h-[100px] p-[20px]">{children}</div>;
}
