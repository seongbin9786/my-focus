import { CheckIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { CurrentTaskView } from "@/views/CurrentTaskView";
import { TodayTaskView } from "@/views/TodayTaskView";

const Item = ({
  selected = false,
  firstSelected = false,
}: {
  selected?: boolean;
  firstSelected?: boolean;
}) => (
  <div className="flex w-full px-4">
    <div className="flex flex-col p-4">
      <span className="text-content-3">7분 전</span>
      <span className="italic text-content-1">13:52</span>
    </div>
    <Separator
      orientation="vertical"
      className={cn("w-[3px]", selected ? "bg-blue-600" : "bg-gray-600")}
    />
    <div
      className={cn(
        "relative flex grow justify-between p-4",
        selected && "bg-blue-500/30",
        firstSelected && "border-t-[1px] border-t-blue-600",
      )}
    >
      {firstSelected && (
        <div className="absolute -left-[6px] -top-[4px] h-2 w-2 rounded-full bg-blue-500"></div>
      )}
      <div
        className={cn(
          "absolute -left-[9px] top-[20px] h-4 w-4 rounded-full border-2",
          selected ? "border-blue-500 bg-blue-500" : "border-gray-500 bg-layer-3",
        )}
      >
        {selected ? <CheckIcon className="h-3 w-3" /> : null}
      </div>
      <div className="flex flex-col gap-1">
        <div className="line-clamp-1 font-bold text-content-6">Task 어쩌고 저쩌고 긴 거</div>
        <div className="text-xs italic text-content-5">이슈 1</div>
        <div className="text-xs italic text-content-4">마일스톤 1</div>
        <div className="text-xs italic text-content-3">프로젝트 1</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs italic text-content-4">난도: 어려움</div>
        <div className="text-xs italic text-content-4">예상: 1h</div>
        <div className="text-xs italic text-content-4">실제: 1h</div>
      </div>
    </div>
  </div>
);

export const HomePage = () => {
  return (
    // 모바일 뷰에서 cols 없으면 그냥 쭉쭉 늘어나는 듯. Best인 듯?
    <>
      <div className="grid-cols-2 grid-rows-6 gap-4 xl:grid xl:p-4">
        <div className="relative col-span-1 col-start-1 row-span-1 flex flex-col gap-2 bg-layer-3 p-4 xl:rounded-lg">
          <CurrentTaskView doing={true} />
        </div>
        <div className="row-span-6 bg-layer-3 p-4 xl:rounded-lg">
          <h2 className="text-lg font-bold text-content-4">작업 현황 (오늘, 2024-01-15)</h2>
          <div className="flex h-[calc(100%-30px)] flex-col">
            <Item />
            <Item selected firstSelected />
            <Item selected />
            <Item />
            <Item />
            <Item selected firstSelected />
            <Item selected />
            <Item />
          </div>
        </div>
        <div className="row-span-5 box-border flex flex-col gap-4 bg-layer-3 p-4 xl:rounded-lg">
          <TodayTaskView />
        </div>
      </div>
    </>
  );
};
