import { Button } from "@/components/ui/button";

export const CurrentTaskView = ({ doing }: { doing: boolean }) => {
  if (!doing) {
    return (
      <>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-content-5">현재 작업 (유휴 시간 3h 24m 11s)</h2>
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
      <div className="absoulte left-0 top-0 h-[2px] w-[50%] bg-green-600"></div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-content-5">현재 작업 (예상 1h / 소요 30m 24s)</h2>
        <div className="flex gap-2">
          <Button className="h-7" variant="destructive">
            작업 전환
          </Button>
          <Button className="h-7" variant="secondary">
            일시 중지
          </Button>
          <Button className="h-7 border-0 bg-blue-500 text-content-7 hover:bg-blue-600">
            완료
          </Button>
        </div>
      </div>
      {/* ... 기능은 line clamp로 쉽게 가능. title 속성을 주면 hover 시 표시됨, 모바일에선 clamp 없으므로 괜찮음 */}
      <div
        className="text-content-5 xl:line-clamp-1"
        title="작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를
          기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을
          수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획,
          퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱작업을
          수정하는 UI를 기획, 퍼블리싱작업을 수정하는 UI를 기획, 퍼블리싱"
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
