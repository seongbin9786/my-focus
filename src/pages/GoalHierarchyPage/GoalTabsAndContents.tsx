import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GoalHieararchyView } from "./GoalHierarchyView";

export const GoalTabsAndContents = () => (
  <Tabs defaultValue="프론트엔드 개발자 취업">
    <div className="flex flex-col items-center justify-center gap-2">
      <TabsList>
        <TabsTrigger value="프론트엔드 개발자 취업">프론트엔드 개발자 취업</TabsTrigger>
        <TabsTrigger value="흥미로운 개발 지식">흥미로운 개발 지식</TabsTrigger>
      </TabsList>
      <TabsContent value="프론트엔드 개발자 취업">
        <GoalHieararchyView />
      </TabsContent>
      <TabsContent value="흥미로운 개발 지식">
        <GoalHieararchyView />
      </TabsContent>
    </div>
  </Tabs>
);
