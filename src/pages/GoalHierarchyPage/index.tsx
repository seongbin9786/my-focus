/* eslint-disable */
// @ts-nocheck
import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { Callout } from "@/components/Callout";
import { DUMMY } from "./DUMMY";
import { GoalHieararchyView } from "./GoalHierarchyView";
import { GoalTabsAndContents } from "./GoalTabsAndContents";

export const GoalHieararchyPage = () => {
  return (
    <div className="flex h-full flex-col items-center gap-4">
      <Callout>
        [TODO] 해당 화면에서 프로젝트 별 마일스톤, 이슈 개수의 누적, 현재 이터레이션의 진행률을
        표시할 예정
      </Callout>
      <GoalTabsAndContents />
    </div>
  );
};
