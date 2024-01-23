export const DUMMY = {
  name: "프론트엔드 개발자 취업",
  priorityRatio: 100,
  children: [
    {
      name: "제품 개발",
      priorityRatio: 25,
      children: [
        {
          name: "개인 프로젝트 FocusTree",
          priorityRatio: 70,
        },
        {
          name: "데브코스 2차팀 FE 프로젝트",
          priorityRatio: 15,
        },
        {
          name: "개인 프로젝트 my-wiki",
          priorityRatio: 15,
        },
      ],
    },
    {
      name: "실무 기술의 원리",
      priorityRatio: 25,
      children: [
        {
          name: "React",
          priorityRatio: 40,
        },
        {
          name: "CSS",
          priorityRatio: 20,
        },
        {
          name: "JavaScript",
          priorityRatio: 15,
        },
        {
          name: "React-query",
          priorityRatio: 10,
        },
        {
          name: "Zustand",
          priorityRatio: 5,
        },
        {
          name: "TailwindCSS",
          priorityRatio: 5,
        },
        {
          name: "TypeScript",
          priorityRatio: 5,
        },
      ],
    },
    {
      name: "실무 기본기",
      priorityRatio: 20,
      size: 1759,
      children: [
        {
          name: "웹 브라우저",
          priorityRatio: 30,
        },
        {
          name: "모바일 대응",
          priorityRatio: 25,
        },
        {
          name: "API",
          priorityRatio: 20,
        },
        {
          name: "보안",
          priorityRatio: 15,
        },
        {
          name: "SEO",
          priorityRatio: 10,
        },
      ],
    },
    {
      name: "CS 기본기",
      priorityRatio: 15,
      size: 1759,
      children: [
        {
          name: "네트워크",
          priorityRatio: 40,
        },
        {
          name: "운영체제",
          priorityRatio: 30,
        },
        {
          name: "데이터베이스",
          priorityRatio: 20,
        },
        {
          name: "컴퓨터 구조",
          priorityRatio: 10,
        },
      ],
    },
    {
      name: "코딩 테스트 기본기",
      priorityRatio: 10,
      size: 2165,
      children: [
        {
          name: "구현/시뮬레이션/완전탐색",
          priorityRatio: 50,
        },
        {
          name: "그래프 탐색",
          priorityRatio: 30,
        },
        {
          name: "동적 프로그래밍",
          priorityRatio: 20,
        },
      ],
    },
    {
      name: "구직 활동",
      priorityRatio: 5,
      children: [
        {
          name: "공고 수집 및 선별",
          priorityRatio: 20,
        },
        {
          name: "서류 작성",
          priorityRatio: 20,
        },
        {
          name: "코딩 테스트 응시",
          priorityRatio: 20,
        },
        {
          name: "기술 면접",
          priorityRatio: 20,
        },
        {
          name: "기술 면접 회고",
          priorityRatio: 20,
        },
      ],
    },
  ],
} as const;
