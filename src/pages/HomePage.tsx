import { TodayTaskView } from "@/views/TodayTaskView";

export const HomePage = () => {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-5 lg:gap-4 lg:p-4">
      {/* 뭔가 이상한데 배치가 */}
      <div className="box-border flex flex-col gap-4 bg-layer-3 p-4 lg:row-span-2 lg:rounded-lg">
        <TodayTaskView />
      </div>
      <div className="bg-content-1 p-4 lg:row-span-5 lg:rounded-lg">
        Task 메모장
        <TodayTaskView />
      </div>
      <div className="bg-layer-5 p-4 lg:row-span-1 lg:rounded-lg">
        진행 중인 마일스톤
        <TodayTaskView />
      </div>
      <div className="bg-layer-7 p-4 lg:row-span-2 lg:rounded-lg">
        오늘 시간 관리 현황
        <TodayTaskView />
      </div>
    </div>
  );
};
