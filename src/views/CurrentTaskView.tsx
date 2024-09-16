import { Button } from "@/components/ui/button";

export const CurrentTaskView = ({ doing }: { doing: boolean }) => {
  if (!doing) {
    return (
      <>
        <div className="flex items-center justify-between">
          <h2 className="text-view-title">현재 작업 (유휴 시간 3h 24m 11s)</h2>
          <div className="flex gap-2">
            <Button className="h-7 border-0 bg-yellow-500 font-semibold text-black/60 hover:bg-yellow-600">
              신규 작업 시작
            </Button>
          </div>
        </div>
        <div className="text-content-1">(작업을 선택해주세요)</div>
      </>
    );
  }

  return (
    <>
      <div className="absolute left-0 top-0 flex w-full px-[1px]">
        {/* TODO: 여기에 좌측에서 우측으로 차오르는 애니메이션 있으면 좋겠다. */}
        <div className="h-[2px] w-[50%] rounded-sm bg-green-500"></div>
        <div className="h-[2px] w-[50%] bg-green-900/50"></div>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <h2 className="text-view-title">현재 작업 (예상 1h / 소요 30m 24s)</h2>
        <div className="flex gap-2 ">
          {/* TODO: 라이트 모드 컬러 추가하기. 현재는 다크 모드 기준 색상임 */}
          <Button className="h-7 bg-red-700 text-content-7 hover:bg-red-600">전환</Button>
          <Button className="h-7 bg-amber-700 text-content-7 hover:bg-amber-600">연장</Button>
          <Button className="h-7 bg-zinc-700 text-content-7 hover:bg-zinc-600">중단</Button>
          <Button className="h-7 border-0 bg-blue-700 text-content-7 hover:bg-blue-600">
            완료
          </Button>
        </div>
      </div>
      <div
        className="text-content-5 xl:line-clamp-3"
        // title 속성을 주면 hover 시 표시됨
      >
        작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를
        기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을
        수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획,
        퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을
        수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱
      </div>
    </>
  );
};
