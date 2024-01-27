import { addDays, format } from "date-fns";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Callout } from "@/components/Callout";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { CreateMilestoneForm } from "./CreateMilestoneForm";
import { CreateIssueForm } from "./CreateIssueForm";

import { cn } from "@/lib/utils";
import { PROJECTS_WITH_RATIO } from "@/pages/CreateIterationPage/DUMMY";

const formSchema = z.object({
  name: z.string(),
  totalTime: z.number(),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .required(),
});

// 2. Define a submit handler.
function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}

export const CreateIterationForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      totalTime: 0,
      date: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    },
  });

  const [checkedList, setCheckedList] = useState<{ name: string; priorityRatio: number }[]>([]);

  return (
    <div className="flex flex-col gap-16 rounded-md bg-layer-3 p-4 text-content-5">
      <Collapsible>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-content-5">STEP 1. 이터레이션 설정</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {/* TODO: 닫히면 v, 열리면 ^로 바꾸기? */}
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 rounded-md bg-layer-3"
            >
              <Callout>설정한 시간을 초과할 수 없으니 잘 설정해주세요!</Callout>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="totalTime"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>총 시간 예산</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>가용 시간을 입력해주세요!</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>기간</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant="outline"
                              className={cn(
                                "flex w-[300px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={field.value.from}
                              selected={field.value}
                              onSelect={field.onChange}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormDescription>기간을 선택해주세요!</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="방학 1 - FocusTree 개발 위주" {...field} />
                    </FormControl>
                    <FormDescription>이름으로 주제를 표현해주세요!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-content-5">STEP 2. 프로젝트 선택</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {/* TODO: 닫히면 v, 열리면 ^로 바꾸기? */}
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="mt-2 flex flex-col gap-2">
            <Callout>해제된 프로젝트는 </Callout>
            <div className="flex flex-col gap-2 rounded-md border-[1px] border-layer-6 bg-layer-1">
              <div className="flex flex-col gap-2 border-b-[1px] border-layer-6 p-2">
                <span className="text-sm font-semibold text-content-6">
                  선택된 프로젝트 수: {checkedList.length}, 중요도 합계:{" "}
                  {checkedList.reduce((sum, { priorityRatio }) => sum + priorityRatio, 0)}%
                </span>
                <div>
                  <Label
                    htmlFor="selectAll"
                    className="flex items-center gap-1 text-xs text-content-6"
                  >
                    <Checkbox
                      id="selectAll"
                      checked={checkedList.length === PROJECTS_WITH_RATIO.length}
                      onClick={() => {
                        if (checkedList.length > 0) {
                          setCheckedList([]);
                          return;
                        }
                        setCheckedList([...PROJECTS_WITH_RATIO]);
                      }}
                    />
                    전체 선택/해제
                  </Label>
                </div>
                <div>
                  <Label
                    htmlFor="sortByProject"
                    className="flex items-center gap-1 text-xs text-content-6"
                  >
                    <Checkbox checked={true} id="sortByProject" />
                    프로젝트 순으로 정렬
                  </Label>
                </div>
                <div>
                  <Label
                    htmlFor="sortByPriorityRatio"
                    className="flex items-center gap-1 text-xs text-content-6"
                  >
                    <Checkbox checked={false} id="sortByPriorityRatio" />
                    우선 순위 순으로 정렬
                  </Label>
                </div>
              </div>
              <div className="flex max-h-[200px] flex-col gap-2 overflow-auto rounded-md p-2">
                {PROJECTS_WITH_RATIO.map((project) => {
                  const { name, priorityRatio } = project;
                  const checked =
                    checkedList.findIndex(({ name: itemName }) => itemName === name) !== -1;
                  const hour =
                    Math.round((form.getValues().totalTime * priorityRatio * 100) / 100) / 100;
                  const isHourDisplayed = hour > 0 && Math.floor(hour) > 0;
                  const isMinutesDisplayed = hour - Math.floor(hour) > 0;
                  const hoursInteger = Math.floor(hour);
                  const minutesInteger = Math.round((hour - Math.floor(hour)) * 60);
                  return (
                    <div className="flex items-center justify-between border-b-[1px] border-layer-5 pb-1 text-content-6">
                      <Label htmlFor={name} key={name} className="flex gap-1">
                        <Checkbox
                          id={name}
                          checked={checked}
                          onClick={(e) => {
                            const targetName = e.currentTarget.getAttribute("id");
                            if (!targetName) {
                              return;
                            }
                            if (checked) {
                              setCheckedList(checkedList.filter(({ name }) => name !== targetName));
                              return;
                            }
                            setCheckedList([...checkedList, project]);
                          }}
                        />
                        <span className="w-12">{priorityRatio}%</span>
                        <span className="mr-2 w-20 text-right">
                          {isHourDisplayed && `${hoursInteger}시간`}{" "}
                          {isMinutesDisplayed && `${minutesInteger}분`}
                        </span>
                        <span className="line-clamp-1">{name}</span>
                      </Label>
                      <div className="text-sm text-content-5">3시간</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-content-5">STEP 3. 마일스톤 생성</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {/* TODO: 닫히면 v, 열리면 ^로 바꾸기? */}
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <CreateMilestoneForm />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-content-5">STEP 4. 이슈 생성</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {/* TODO: 닫히면 v, 열리면 ^로 바꾸기? */}
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <CreateIssueForm />
        </CollapsibleContent>
      </Collapsible>
      <Button type="submit">이터레이션 생성</Button>
    </div>
  );
};
