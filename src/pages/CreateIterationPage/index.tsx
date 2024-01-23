import { Callout } from "@/components/Callout";

import { CreateIterationForm } from "../../views/CreateIterationForm";
import { GoalTabsAndContents } from "../GoalHierarchyPage/GoalTabsAndContents";

// FIXME: 해당 페이지에서만 갑자기 화면 배치가 이상해짐
export const CreateIterationPage = () => {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-1 gap-4 overflow-auto xl:p-4">
      <div className="col-span-1 col-start-1 row-span-1 rounded-lg border-2 border-violet-50 bg-layer-2 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Callout className="bg-layer-3">
              선택한 프로젝트의 중요도가 가중치가 되어 시간이 할당돼요
            </Callout>
          </div>
          <GoalTabsAndContents />
        </div>
      </div>
      <div className="col-span-1 col-start-2 row-span-1 overflow-auto rounded-lg bg-layer-2 p-4">
        <div className="flex flex-col gap-4">
          <div className="text-view-title">이터레이션 생성</div>
          <Callout className="bg-layer-3">
            이터레이션의 시간 예산 입력 시 프로젝트 별 시간 예산이 자동으로 할당돼요
          </Callout>
          <Callout className="bg-layer-3">폼은 자동 저장돼요!</Callout>
          <CreateIterationForm />
        </div>
      </div>
    </div>
  );
};
