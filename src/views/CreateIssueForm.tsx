import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  milestoneName: z.string(),
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

export const CreateIssueForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectName: "",
      milestoneName: "",
      totalTime: 0,
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
              <FormLabel>프로젝트명</FormLabel>
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="milestoneName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>마일스톤명</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="마일스톤을 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>데브코스 2차팀 FE 프로젝트</SelectLabel>
                    <SelectItem value="v1 이터레이션">v1 이터레이션</SelectItem>
                    <SelectItem value="v2 이터레이션">v2 이터레이션</SelectItem>
                    <SelectItem value="v3 이터레이션">v3 이터레이션</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이슈 이름</FormLabel>
              <FormControl>
                <Input placeholder="신규 이터레이션 생성 페이지 퍼블리싱" {...field} />
              </FormControl>
              <FormDescription>해당 이슈의 이름을 입력해주세요!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>시간 예산</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>해당 이슈의 가용 시간을 입력해주세요!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="violet">
          이슈 생성
        </Button>
      </form>
    </Form>
  );
};
