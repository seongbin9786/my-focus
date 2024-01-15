import { TodayTaskView } from "@/views/TodayTaskView";

export const HomePage = () => {
  return (
    // 모바일 뷰에서 cols 없으면 그냥 쭉쭉 늘어나는 듯. Best인 듯?
    <div className="grid h-full grid-cols-1 xl:grid-cols-2 xl:grid-rows-10 xl:gap-4 xl:p-4">
      <div className="bg-layer-5 p-4 xl:row-span-1 xl:rounded-lg">
        <h2 className="text-lg font-bold text-content-5">현재 작업</h2>
        <div>hello world</div>
      </div>
      {/* row full로 가져가는 게 2번째 칸에 있어야만 우측에 배치가 가능함 (불편) */}
      <div className="bg-content-2 p-4 xl:row-span-10 xl:rounded-lg">
        <h2 className="text-lg font-bold text-black/80">Task 메모장</h2>
      </div>
      <div className="box-border flex flex-col gap-4 bg-layer-3 p-4 xl:row-span-4 xl:rounded-lg">
        <TodayTaskView />
      </div>
      <div className="bg-layer-5 p-4 xl:row-span-2 xl:rounded-lg">
        <h2 className="text-lg font-bold text-content-5">진행 중인 마일스톤</h2>
        <div className="flex h-[calc(100%-30px)] items-center justify-center">텅</div>
      </div>
      <div className="bg-layer-7 p-4 xl:row-span-3 xl:rounded-lg">
        <h2 className="text-lg font-bold text-content-5">오늘 시간 관리 현황</h2>
        <div className="flex h-[calc(100%-30px)] items-center justify-center">
          (그 시간 그래프 표시) (어떻게 구현해야 함?)
        </div>
      </div>
    </div>
  );
};
