import { LightbulbIcon, XIcon } from "lucide-react";

// 당장 필요가 사라져서 일단 제거하기로 함
// e.g. 작업을 클릭해 Task 메모장 내용을 전환할 수 있어요
export const Callout = ({ text }: { text: string }) => (
  <div className="flex items-center justify-between p-4 rounded-md bg-layer-2 text-content-1">
    <div className="flex items-center gap-2 text-yellow-600">
      <LightbulbIcon className="w-4 h-4" fill="yellow" />
      <span className="text-sm font-semibold">{text}</span>
    </div>
    <XIcon className="w-4 h-4 cursor-pointer text-content-1" />
  </div>
);
