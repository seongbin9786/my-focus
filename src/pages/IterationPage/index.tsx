import { CreateIssueForm } from "./CreateIssueForm";
import { CreateIterationForm } from "./CreateIterationForm";
import { CreateMilestoneForm } from "./CreateMilestoneForm";

export const IterationPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-view-title">신규 이터레이션 생성</h2>
          <CreateIterationForm />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-view-title">신규 마일스톤 생성</h2>
          <CreateMilestoneForm />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-view-title">신규 이슈 생성</h2>
          <CreateIssueForm />
        </div>
      </div>
    </div>
  );
};
