/* eslint-disable */
import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { Callout } from "@/components/Callout";

// Copyright 2021-2023 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/tree
function drawTreeIntoSvg(
  data: any,
  {
    // data is either tabular (array of objects) or hierarchy (nested objects)
    path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
    id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
    parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
    children, // if hierarchical data, given a d in data, returns its children
    tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
    sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
    label, // given a node d, returns the display name
    title, // given a node d, returns its hover text
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links (if any)
    width = 640, // outer width, in pixels
    height, // outer height, in pixels
    r = 6, // radius of nodes
    // 노드 원의 지름
    padding = 2, // horizontal padding for first and last column
    // padding은 px를 의미함. 폰트 키우면 px 키워줘야 안 잘림
    fill = "#22c55e", // fill for nodes
    fillOpacity, // fill opacity for nodes
    stroke = "#15803d", // stroke for links
    // 연결선 + 리프 노드를 제외한 노드의 색상
    strokeWidth = 4, // stroke width for links
    // 연결선의 두께
    strokeOpacity = 1, // stroke opacity for links
    strokeLinejoin, // stroke line join for links
    strokeLinecap, // stroke line cap for links
    halo = "#fff", // color of label halo
    haloWidth = 0, // padding around the labels
    curve = d3.curveBumpX, // curve for the link
    // curveStep은 네모네모, curveBump는 둥글둥글
  } = {},
) {
  // If id and parentId options are specified, or the path option, use d3.stratify
  // to convert tabular data to a hierarchy; otherwise we assume that the data is
  // specified as an object {children} with nested objects (a.k.a. the “flare.json”
  // format), and use d3.hierarchy.
  const root =
    path != null
      ? d3.stratify().path(path)(data)
      : id != null || parentId != null
        ? d3.stratify().id(id).parentId(parentId)(data)
        : d3.hierarchy(data, children);

  // Sort the nodes.
  if (sort != null) root.sort(sort);

  // Compute labels and titles.
  const descendants = root.descendants();
  const L = label == null ? null : descendants.map((d) => label(d.data, d));

  // Compute the layout.
  const dx = 25; // FIXME: 이유는 모르겠지만 이걸 키우면 node 간 margin이 커짐 (왜 dx냐?)
  // FIXME: dx 늘리면 y축 스크롤바 생기는데 해결 방법 모르겠음
  const dy = width / (root.height + padding);
  tree().nodeSize([dx, dy])(root);

  // Center the tree.
  let x0 = Infinity;
  let x1 = -x0;
  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the default height.
  if (height === undefined) height = x1 - x0 + dx * 2;

  // Use the required curve
  if (typeof curve !== "function") throw new Error(`Unsupported curve`);

  const svg = d3
    .create("svg")
    .attr("viewBox", [(-dy * padding) / 2, x0 - dx, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto; height: intrinsic; color: #fff;")
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", 16); // FIXME: 이거 font size 올리면 화면 밖으로 짤림;;
  // TODO: 텍스트 위치를 결정할 순 없나? 할 수 있네. viewBox 조절로 가능한 듯?
  //

  svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", stroke)
    .attr("stroke-opacity", strokeOpacity)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-width", strokeWidth)
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr(
      "d",
      d3
        .link(curve)
        .x((d) => d.y)
        .y((d) => d.x),
    );

  const node = svg
    .append("g")
    .selectAll("a")
    .data(root.descendants())
    .join("a")
    .attr("xlink:href", link == null ? null : (d) => link(d.data, d))
    .attr("target", link == null ? null : linkTarget)
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  node
    .append("circle")
    .attr("fill", (d) => (d.children ? stroke : fill))
    .attr("r", r);

  if (title != null) node.append("title").text((d) => title(d.data, d));

  if (L)
    node
      .append("text")
      // 텍스트 위치 조절 여기인 듯
      .attr("dy", "0.32em") // 이건 y축 보정 (0.32에서 키우면 내려감)
      .attr("x", (d) => (d.children ? -10 : 10)) // 6에서 키우면 올라감
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      // text-anchor로 Node의 전/후 지정 가능
      // 근데 children이 있는 노드는 Node 이후에 텍스트 배치하면 겹쳐서 보기 흉함.. 문제 있음
      // 가능하면 마일스톤 단위로 1차원으로 구성하는 게 좋을 듯
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((d, i) => L[i]);

  return svg.node();
}

// data는 단순하게 item = { name, ...props, children: item[] } 으로 무한 재귀
const data = {
  name: "프론트엔드 개발자 취업",
  children: [
    {
      name: "제품 개발",
      children: [
        {
          name: "데브코스 2차팀 FE 프로젝트",
        },
        {
          name: "개인 프로젝트 my-focus",
        },
        {
          name: "개인 프로젝트 my-wiki",
        },
      ],
    },
    {
      name: "실무 기술의 원리",
      children: [
        {
          name: "React",
          size: 17010,
        },
        {
          name: "Zustand",
          size: 5842,
        },
        {
          name: "React-query",
          size: 1041,
        },
        {
          name: "TailwindCSS",
          size: 6006,
        },
        {
          name: "TypeScript",
        },
        {
          name: "JavaScript",
        },
        {
          name: "CSS",
        },
      ],
    },
    {
      name: "실무 기본기",
      size: 1759,
      children: [
        {
          name: "API",
        },
        {
          name: "보안",
        },
        {
          name: "웹 브라우저",
        },
        {
          name: "모바일 대응",
        },
        {
          name: "SEO",
        },
      ],
    },
    {
      name: "CS 기본기",
      size: 1759,
      children: [
        {
          name: "네트워크",
        },
        {
          name: "운영체제",
        },
        {
          name: "컴퓨터 구조",
        },
        {
          name: "데이터베이스",
        },
      ],
    },
    {
      name: "코딩 테스트 기본기",
      size: 2165,
      children: [
        {
          name: "완전 탐색",
        },
        {
          name: "그래프 탐색",
        },
        {
          name: "동적 프로그래밍",
        },
        {
          name: "구현/시뮬레이션",
        },
        {
          name: "기타 유형",
        },
      ],
    },
    {
      name: "구직 활동",
      children: [
        {
          name: "공고 수집 및 선별",
          size: 8833,
        },
        {
          name: "서류 작성",
          size: 8833,
        },
        {
          name: "코딩 테스트 응시",
          size: 10066,
        },
        {
          name: "기술 면접",
          size: 10066,
        },
        {
          name: "기술 면접 회고",
          size: 10066,
        },
      ],
    },
  ],
};

const chart = drawTreeIntoSvg(data, {
  label: (d) => d.name,
  title: (d, n) =>
    `${n
      .ancestors()
      .reverse()
      .map((d) => d.data.name)
      .join(".")}`, // hover text
  link: (d, n) =>
    `${n
      .ancestors()
      .reverse()
      .map((d) => d.data.name)
      .join("/")}${n.children ? "" : ".as"}`,
  width: 1200,
});

export const HieararchyPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.replaceChildren(chart);
  }, []);

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <Callout>
        [TODO] 해당 화면에서 프로젝트 별 마일스톤, 이슈 개수의 누적, 현재 이터레이션의 진행률을
        표시할 예정
      </Callout>
      <div ref={ref}></div>
    </div>
  );
};
