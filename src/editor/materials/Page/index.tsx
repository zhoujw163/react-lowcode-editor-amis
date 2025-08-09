import { type PropsWithChildren } from 'react';

function Page({ children }: PropsWithChildren) {
  return <div className="p-[20px] h-full box-border">{children}</div>;
}

export default Page;
