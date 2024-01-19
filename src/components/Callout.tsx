import { LightbulbIcon, XIcon } from "lucide-react";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  className?: string;
}

// 당장 필요가 사라져서 일단 제거하기로 함
// e.g. 작업을 클릭해 Task 메모장 내용을 전환할 수 있어요
export const Callout = ({ className, children }: Props) => (
  <div
    className={cn(
      "flex items-center justify-between rounded-md bg-layer-2 p-4 text-content-1",
      className,
    )}
  >
    <div className="flex items-center gap-2 text-yellow-600">
      <LightbulbIcon className="h-4 w-4" fill="yellow" />
      <span className="text-sm font-semibold">{children}</span>
    </div>
    <XIcon className="h-4 w-4 cursor-pointer text-content-1" />
  </div>
);
