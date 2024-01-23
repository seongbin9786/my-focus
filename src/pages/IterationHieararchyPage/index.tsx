import { Callout } from "@/components/Callout";

import { IterationHieararchyView } from "./IterationHierarchyView";

/* TODO: 마일스톤 생성 시에는 프로젝트 클릭이 프로젝트 선택의 방법이 됨 */
export const IterationPage = () => {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <Callout>작업할 때도 이 화면을 보면 좋겠는데</Callout>
      <IterationHieararchyView />
    </div>
  );
};
