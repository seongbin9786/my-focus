import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  projectName: z.string(),
  totalTime: z.number(),
  priorityRatio: z.number(),
});

// 2. Define a submit handler.
function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}

export const CreateMilestoneForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectName: "",
      totalTime: 0,
      priorityRatio: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>대상 프로젝트</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="프로젝트를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>제품 개발</SelectLabel>
                    <SelectItem value="데브코스 2차팀 FE 프로젝트">
                      데브코스 2차팀 FE 프로젝트
                    </SelectItem>
                    <SelectItem value="개인 프로젝트 FocusTree">개인 프로젝트 FocusTree</SelectItem>
                    <SelectItem value="개인 프로젝트 my-wiki">개인 프로젝트 my-wiki</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>실무 기술의 원리</SelectLabel>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Zusatnd">Zusatnd</SelectItem>
                    <SelectItem value="React-query">React-query</SelectItem>
                    <SelectItem value="TailwindCSS">TailwindCSS</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>실무 기본기</SelectLabel>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="보안">보안</SelectItem>
                    <SelectItem value="웹 브라우저">웹 브라우저</SelectItem>
                    <SelectItem value="모바일 대응">모바일 대응</SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
              <div className="ml-1 text-sm text-green-500">
                프로젝트 시간 예산: 10, 잔여 시간 예산: 5
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>마일스톤 이름</FormLabel>
              <FormControl>
                <Input placeholder="초기 화면 퍼블리싱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Callout>시간 예산 혹은 중요도 비율로 입력할 수 있어요</Callout>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="totalTime"
            // FIXME: number가 아닌 string으로 입력 값이 들어오게 됨
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>시간 예산</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>시간 예산은 중요도에도 반영돼요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priorityRatio"
            // FIXME: number가 아닌 string으로 입력 값이 들어오게 됨
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>중요도</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>중요도는 시간 예산에도 반영돼요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" variant="violet">
          마일스톤 생성하기
        </Button>
      </form>
    </Form>
  );
};
