import { Callout } from "@/components/Callout";

import { CreateMilestoneForm } from "../../views/CreateMilestoneForm";
import { IterationHieararchyView } from "../IterationHieararchyPage/IterationHierarchyView";

export const ModifyIterationPage = () => {
  return (
    <div className="grid h-full grid-cols-2 gap-4 xl:p-4">
      <div className="col-span-1 col-start-1 rounded-lg border-2 border-violet-50 bg-layer-2 p-4">
        <IterationHieararchyView />
      </div>
      <div className="col-span-1 col-start-2 rounded-lg bg-layer-2 p-4">
        <div className="flex flex-col gap-4">
          <div className="text-view-title">이터레이션에 마일스톤 추가</div>
          <Callout className="bg-layer-3">기존 이터레이션에 시간 예산이 추가돼요</Callout>
          <CreateMilestoneForm />
        </div>
      </div>
    </div>
  );
};
