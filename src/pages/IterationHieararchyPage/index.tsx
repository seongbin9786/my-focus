import { Callout } from "@/components/Callout";

import { CreateMilestoneForm } from "../IterationPage/CreateMilestoneForm";

import { HieararchyView } from "./HierarchyView";

export const IterationHieararchyPage = () => {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold text-content-5">현재 이터레이션</h1>
      <div className="grid h-[calc(100%-80px)] grid-cols-2 grid-rows-1 gap-4 xl:p-4">
        <div className="col-span-1 col-start-1 row-span-1 rounded-lg border-2 border-violet-50 bg-layer-2 p-4">
          <HieararchyView />
        </div>
        <div className="col-span-1 col-start-2 row-span-1 rounded-lg bg-layer-2 p-4">
          <div className="flex flex-col gap-4">
            <div className="text-view-title">마일스톤 생성하기</div>
            <Callout className="bg-layer-3">
              프로젝트 선택 시 중요도에 비례해 시간 예산이 자동으로 할당됩니다
            </Callout>
            <CreateMilestoneForm />
          </div>
        </div>
      </div>
    </div>
  );
};
