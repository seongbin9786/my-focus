/* eslint-disable */
// @ts-nocheck
import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { Callout } from "@/components/Callout";
import { DUMMY } from "./DUMMY";

// 엣지 굵기 계산
const getWidth = (child: d3.HierarchyNode<unknown>, parent?: d3.HierarchyNode<unknown>) => {
  // console.log("getWidth:", child, parent);
  return Math.floor(
    Math.round((((parent?.data?.priorityRatio || 100) * child.data.priorityRatio) / 10000) * 50),
  );
};

// 루트 목표의 반지름
const ROOT_RADIUS = 40;

// 노드의 반지름 계산
const getRadiusOfNode = (parentRadius: number, d: d3.HierarchyNode<unknown>) => {
  const myArea = (Math.PI * Math.pow(parentRadius, 2) * d.data.priorityRatio) / 100;
  const myRadius = Math.sqrt(myArea / Math.PI);
  // console.log("my area = ", myArea, "my radius = ", myRadius);
  return Math.round(myRadius);
};

const getColorForStatusText = (d: d3.HierarchyNode<unknown>) => {
  const { priorityRatio, executedTotalTime, scheduledTotalTime } = d.data;
  const accomplishedRatio = Math.round((executedTotalTime / scheduledTotalTime) * 100);

  // 이렇게 하면 급한 작업들이 눈에 보이게 됨
  if (accomplishedRatio >= 75) {
    return "#666";
  }
  if (accomplishedRatio >= 50) {
    return "#aaa";
  }
  if (accomplishedRatio >= 30) {
    return "#ccc";
  }
  return "#eee";

  // 이렇게 반환하면 완료된 게 제일 빛나게 됨. 근데 완료된 건 집중할 필요가 없음!!
  // if (accomplishedRatio >= 75) {
  //   return "#eee";
  // }
  // if (accomplishedRatio >= 50) {
  //   return "#ccc";
  // }
  // if (accomplishedRatio >= 30) {
  //   return "#aaa";
  // }
  // return "#666";
};

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
    width = 1200, // outer width, in pixels
    height, // outer height, in pixels
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
    halo = "#eee", // color of label halo
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
  const nodeNames = label == null ? null : descendants.map((d) => label(d.data, d));
  const nodePriorityRatio = descendants.map((d) => d.data.priorityRatio);

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
    .attr("viewBox", [-100, -500, 1200, 1000])
    .attr("width", 1200)
    .attr("height", 1000)
    // .attr("viewBox", [-150, -500, width, height])
    // .attr("width", width)
    // .attr("height", height)
    .attr("style", "max-width: 100%; height: auto; height: intrinsic; color: #fff;")
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .attr("font-size", 16); // FIXME: 이거 font size 올리면 화면 밖으로 짤림;;
  // TODO: 텍스트 위치를 결정할 순 없나? 할 수 있네. viewBox 조절로 가능한 듯?
  //

  svg
    .append("g")
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr("fill", "none")
    .attr("stroke", ({ target: d }) => {
      // 노드의 edge 색상을 결정
      // target = child = 본인 노드
      const { scheduledTotalTime, executedTotalTime } = d.data;

      if (scheduledTotalTime === 0) {
        return "#64748b"; // slate
      }

      if (executedTotalTime === 0) {
        return "#ef4444"; // r
      }

      const accomplishedRatio = executedTotalTime / scheduledTotalTime;
      console.log("accomplishedRatio:", d.data.name, accomplishedRatio);

      if (accomplishedRatio >= 0.75) return "#22c55e"; // g
      if (accomplishedRatio >= 0.5) return "#3b82f6"; // b
      if (accomplishedRatio >= 0.25) return "#eab308"; // y
      return "#ef4444"; // r
    })
    .attr("stroke-opacity", strokeOpacity)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-width", ({ source, target }) => {
      // 엣지의 굵기 설정
      const width = getWidth(target, source); // 각 target의 %에 비례한 굵기를 설정해야
      return width;
    })
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
    .attr("fill", (d) => {
      // 노드의 edge 색상을 결정
      // target = child = 본인 노드
      const { scheduledTotalTime, executedTotalTime } = d.data;

      if (scheduledTotalTime === 0) {
        return "#64748b"; // slate
      }

      if (executedTotalTime === 0) {
        return "#ef4444"; // r
      }

      const accomplishedRatio = executedTotalTime / scheduledTotalTime;
      console.log("accomplishedRatio:", d.data.name, accomplishedRatio);

      if (accomplishedRatio >= 0.75) return "#22c55e"; // g
      if (accomplishedRatio >= 0.5) return "#3b82f6"; // b
      if (accomplishedRatio >= 0.25) return "#eab308"; // y
      return "#ef4444"; // r
    })
    .attr("r", (d) => {
      // 노드 원의 지름 결정
      // 부모 원의 면적의 %만큼을 차지하는 원의 반지름을 구해서 표현함
      const radius = getWidth(d, d.parent);

      // 루트 목표의 반지름은 상수로 결정
      if (!d.parent) {
        return ROOT_RADIUS;
      }

      if (d.depth === 1) {
        // (pr^2 * ratio / 100) = 내가 가져야 할 면적
        //
        return getRadiusOfNode(ROOT_RADIUS, d);
      }

      const parentRadius = getRadiusOfNode(ROOT_RADIUS, d.parent);
      const myRadius = getRadiusOfNode(parentRadius, d);
      return myRadius;
    });

  if (title != null) node.append("title").text((d) => title(d.data, d));

  if (nodeNames) {
    node
      .append("text")
      .attr("dy", (d) => {
        if (!d.parent) {
          return "0.32em";
        }
        if (d.depth === 1) {
          return "2em";
        }

        return "0.32em";
      }) // 이건 y축 보정 (0.32에서 키우면 내려감)
      // 노드 비중(%)의 위치 결정
      .attr("x", (d) => (d.children ? 50 : 30)) // FIXME: 중앙 정렬은 못 시키나? 엄청 중요한 건 아니긴 함
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .attr("paint-order", "stroke")
      // FIXME: stroke, fill은 동일함... (근데 걍 하나 지우는 게 날듯 색상 통일할 거면)
      .attr("stroke", getColorForStatusText)
      .attr("stroke-width", 1)
      .attr("fill", getColorForStatusText)
      .text((d, i) => {
        if (!d.parent) {
          return "";
        }

        const { priorityRatio, executedTotalTime, scheduledTotalTime } = d.data;

        console.log(d.data);

        if (scheduledTotalTime === 0) {
          return "-";
        }

        const accomplishedRatio = Math.round((executedTotalTime / scheduledTotalTime) * 100);

        if (executedTotalTime >= scheduledTotalTime) {
          return "완료됨";
        }

        if (executedTotalTime === 0) {
          return `[시작 필요, ${Math.round((scheduledTotalTime - executedTotalTime) * 100) / 100}h]`;
        }

        return `[잔여: ${100 - accomplishedRatio}%, ${Math.round((scheduledTotalTime - executedTotalTime) * 100) / 100}h]`;
      });

    // 노드 제목의 위치 결정
    node
      .append("text")
      .attr("dy", (d) => {
        if (!d.parent) {
          return "-3em";
        }
        if (d.depth === 1) {
          return "-2em";
        }

        return "0.32em";
      }) // 이건 y축 보정 (0.32에서 키우면 내려감)
      .attr("x", (d) => {
        if (!d.parent) {
          // 루트일 때는 퍼센트 미표기하므로 공간이 남음...이었지만,
          // 노드 원이 커져서 결국 60이긴 하네
          return 80;
        }
        if (d.depth === 1) {
          return 40;
        }
        return 190;
      }) // 6에서 키우면 올라감
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      // text-anchor로 Node의 전/후 지정 가능
      // 근데 children이 있는 노드는 Node 이후에 텍스트 배치하면 겹쳐서 보기 흉함.. 문제 있음
      // 가능하면 마일스톤 단위로 1차원으로 구성하는 게 좋을 듯
      .attr("paint-order", "stroke")
      .attr("fill", halo)
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((d, i) => nodeNames[i]);
  }

  return svg.node();
}

export const IterationHieararchyPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  // data는 단순하게 item = { name, ...props, children: item[] } 으로 무한 재귀
  const chart = drawTreeIntoSvg(DUMMY, {
    label: (d) => d.name,
    title: (d, n) =>
      `${n
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join(" > ")}`, // hover text

    // link: (d, n) =>
    //   `${n
    //     .ancestors()
    //     .reverse()
    //     .map((d) => d.data.name)
    //     .join("/")}${n.children ? "" : ".as"}`,
    width: 1300,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.replaceChildren(chart);
  }, []);

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <Callout>목표가 2개 이상이면 여기에서 선택해서 조회할 수 있으면 좋겠다.</Callout>
      <Callout>면적을 자유 자제로 조절할 수 있으면 좋겠다.</Callout>
      <div ref={ref}></div>
    </div>
  );
};
