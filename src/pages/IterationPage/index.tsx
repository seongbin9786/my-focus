import { CreateIterationForm } from "./CreateIterationForm";
import { CreateMilestoneForm } from "./CreateMilestoneForm";

export const IterationPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-4">
        <div>
          <h2>신규 이터레이션 생성</h2>
          <CreateIterationForm />
        </div>
        <div>
          <h2>신규 마일스톤 생성</h2>
          <CreateMilestoneForm />
        </div>
      </div>
    </div>
  );
};
