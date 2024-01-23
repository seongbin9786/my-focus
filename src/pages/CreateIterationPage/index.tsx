import { Callout } from "@/components/Callout";

import { CreateIterationForm } from "../../views/CreateIterationForm";
import { GoalTabsAndContents } from "../GoalHierarchyPage/GoalTabsAndContents";
import { IterationHieararchyView } from "../IterationHieararchyPage/IterationHierarchyView";

// FIXME: 해당 페이지에서만 갑자기 화면 배치가 이상해짐
export const CreateIterationPage = () => {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-1 gap-4 overflow-auto xl:p-4">
      <div className="col-span-1 col-start-1 row-span-1 rounded-lg border-2 border-violet-50 bg-layer-2 p-4">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-bold text-content-5">목표 트리 선택</div>
          <GoalTabsAndContents />
          <div className="text-lg font-bold text-content-5">생성 중인 이터레이션</div>
          <IterationHieararchyView />
        </div>
      </div>
      <div className="col-span-1 col-start-2 row-span-1 overflow-auto rounded-lg bg-layer-2 p-4">
        <div className="flex flex-col gap-4">
          <div className="text-view-title">이터레이션 생성</div>
          <div className="flex flex-col gap-2">
            <Callout className="bg-layer-3">생성 중인 이터레이션 화면에 반영돼요</Callout>
            <Callout className="bg-layer-3">
              이터레이션의 시간 예산은 선택된 프로젝트로 자동 분배돼요
            </Callout>
          </div>
          <CreateIterationForm />
        </div>
      </div>
    </div>
  );
};
