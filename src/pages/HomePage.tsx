import { CheckIcon, RotateCwIcon } from "lucide-react";

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
  // FIXME: shrink-0을 주지 않으면 120px이 아닌 116px, 118px로 줄어듬. (왜 그때 그때 2가지로 나오는지..)
  <div className="flex h-[120px] w-full shrink-0 px-4">
    <div className="flex flex-col p-4">
      <span className="text-content-3">7분 전</span>
      <span className="italic text-content-1">13:52</span>
    </div>
    <Separator
      orientation="vertical"
      // FIXME: Separator 입장에서 Item의 root div의 높이를 인식하지 못한다. why?
      // 특별히 바뀌는 경우가 아니어서 Item의 height=120px로 지정한다.
      className={cn("w-[3px]", selected ? "bg-green-600" : "bg-gray-600")}
    />
    <div
      className={cn(
        "relative flex grow justify-between p-4",
        selected && "bg-green-500/30",
        firstSelected && "border-t-[1px] border-t-green-600",
      )}
    >
      {firstSelected && (
        <div className="absolute -left-[6px] -top-[4px] h-2 w-2 rounded-full bg-green-500"></div>
      )}
      <div
        className={cn(
          "absolute -left-[9px] top-[20px] h-4 w-4 rounded-full border-2",
          selected ? "border-green-500 bg-green-500" : "border-gray-500 bg-layer-3",
        )}
      >
        {selected ? <CheckIcon className="w-3 h-3" /> : null}
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-bold line-clamp-1 text-content-6">Task 어쩌고 저쩌고 긴 거</div>
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
    <>
      {/* max-h-full 로 해놓으면 header, footer 등 배치 빼고 배치 받은 본인 크기에서 더 커지지 않겠다는 뜻 */}
      {/* 그렇게 하면 자식의 크기만큼 스스로 자동으로 커질 때에 full보다 더 커지지 않음 */}
      <div className="grid max-h-full grid-cols-1 gap-4 xl:grid-cols-2 xl:grid-rows-12 xl:p-4">
        <div className="relative flex flex-col col-span-1 col-start-1 row-span-3 gap-2 p-4 smh:row-span-12 bg-layer-2 xl:rounded-lg">
          <CurrentTaskView doing={true} />
        </div>
        <div className="box-border flex flex-col gap-4 p-4 smh:col-start-2 smh:row-span-12 row-span-9 bg-layer-2 xl:col-start-1 xl:rounded-lg">
          <TodayTaskView />
        </div>
        <div className="flex flex-col max-h-full gap-4 p-4 smh:hidden row-span-12 bg-layer-2 xl:col-start-2 xl:row-start-1 xl:rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-content-5">작업 현황 (오늘, 2024-01-16)</h2>
            {/* 새로 배운 점: 그냥 button으로 감싸도 된다! 사실 select-none + cursor-pointer = 버튼 */}
            <button>
              <RotateCwIcon className="w-5 h-5 text-content-1" />
            </button>
          </div>
          {/* FIXME: height를 지정하지 않으면 overflow가 불가능하므로 어쩔 수 없음 */}
          <div className="flex max-h-[calc(100%-60px)] flex-col pr-2 xl:overflow-auto">
            <div className="px-8 py-2 bg-zinc-800 text-content-5">어제 (1/15, 화)</div>
            <Item />
            <Item selected firstSelected />
            <Item selected />
            <Item />
            <Item />
            <Item selected firstSelected />
            <Item selected />
            <Item />
            <div className="px-8 py-2 bg-zinc-800 text-content-6">오늘 (1/16, 24')</div>
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
      </div>
    </>
  );
};
