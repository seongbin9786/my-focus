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
  console.log("my area = ", myArea, "my radius = ", myRadius);
  return Math.round(myRadius);
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
    width = 640, // outer width, in pixels
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
  console.log("descendants:", descendants);
  const nodeNames = label == null ? null : descendants.map((d) => label(d.data, d));
  const nodePriorityRatio = descendants.map((d) => d.data.priorityRatio);
  console.log("progress:", nodePriorityRatio);

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
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr("fill", "none")
    .attr("stroke", ({ target: d }) => {
      // 노드의 edge 색상을 결정
      // target = child = 본인 노드
      const { priorityRatio } = d.data;

      if (d.depth === 1) {
        if (priorityRatio >= 25) {
          return "#4ade80"; // green 400
        }
        if (priorityRatio >= 20) {
          return "#22c55e"; // green 500
        }
        if (priorityRatio >= 15) {
          return "#16a34a"; // green 600
        }
        if (priorityRatio >= 10) {
          return "#15803d"; // green 700
        }
        return "#166534"; // green 800
      }

      const combinedRatio = Math.round((priorityRatio * d.parent?.data.priorityRatio) / 100);

      if (combinedRatio >= 20) {
        return "#bbf7d0"; // green 200
      }
      if (combinedRatio >= 15) {
        return "#86efac"; // green 300
      }
      if (combinedRatio >= 10) {
        return "#4ade80"; // green 400
      }
      if (combinedRatio >= 8) {
        return "#22c55e"; // green 500
      }
      if (combinedRatio >= 6) {
        return "#16a34a"; // green 600
      }
      if (combinedRatio >= 4) {
        return "#15803d"; // green 700
      }
      if (combinedRatio >= 2) {
        return "#166534"; // green 800
      }
      return "#14532d"; // green 900
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
      // 노드 원의 색상 결정
      const { priorityRatio } = d.data;

      if (d.depth === 0) {
        return "#86efac"; // green 300
      }

      if (d.depth === 1) {
        if (priorityRatio >= 25) {
          return "#4ade80"; // green 400
        }
        if (priorityRatio >= 20) {
          return "#22c55e"; // green 500
        }
        if (priorityRatio >= 15) {
          return "#16a34a"; // green 600
        }
        if (priorityRatio >= 10) {
          return "#15803d"; // green 700
        }
        return "#166534"; // green 800
      }

      const prr = Math.round((priorityRatio * d.parent?.data.priorityRatio) / 100);
      console.log("prr:", prr);

      if (prr >= 20) {
        return "#bbf7d0"; // green 200
      }
      if (prr >= 15) {
        return "#86efac"; // green 300
      }
      if (prr >= 10) {
        return "#4ade80"; // green 400
      }
      if (prr >= 8) {
        return "#22c55e"; // green 500
      }
      if (prr >= 6) {
        return "#16a34a"; // green 600
      }
      if (prr >= 4) {
        return "#15803d"; // green 700
      }
      if (prr >= 2) {
        return "#166534"; // green 800
      }
      return "#14532d"; // green 900
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
          return "-0.32em";
        }

        return "0.32em";
      }) // 이건 y축 보정 (0.32에서 키우면 내려감)
      // 노드 비중(%)의 위치 결정
      .attr("x", (d) => (d.children ? -20 : 20)) // 6에서 키우면 올라감
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .attr("paint-order", "stroke")
      .attr("stroke", (d) => {
        // % 텍스트의 stroke
        const { priorityRatio } = d.data;

        if (d.depth === 0) {
          // ROOT
          return "#fff";
        }

        if (d.depth === 1) {
          if (priorityRatio >= 25) {
            return "#fff";
          }
          if (priorityRatio >= 20) {
            return "#eee";
          }
          if (priorityRatio >= 15) {
            return "#ddd";
          }
          if (priorityRatio >= 10) {
            return "#ccc";
          }
          return "#bbb";
        }
        const combinedRatio = Math.round((priorityRatio * d.parent?.data.priorityRatio) / 100);

        if (combinedRatio >= 20) {
          return "fff";
        }
        if (combinedRatio >= 15) {
          return "#eee";
        }
        if (combinedRatio >= 10) {
          return "#ddd";
        }
        if (combinedRatio >= 8) {
          return "#ccc";
        }
        if (combinedRatio >= 6) {
          return "#bbb";
        }
        if (combinedRatio >= 4) {
          return "#aaa";
        }
        if (combinedRatio >= 2) {
          return "#999";
        }
        return "#888";
      })
      .attr("stroke-width", 1)
      .attr("fill", (d) => {
        const { name, priorityRatio } = d.data;
        console.log(name, d.depth);

        if (d.depth === 0) {
          // ROOT
          return "#fff";
        }

        if (d.depth === 1) {
          if (priorityRatio >= 25) {
            return "fff";
          }
          if (priorityRatio >= 20) {
            return "#eee";
          }
          if (priorityRatio >= 15) {
            return "#ddd";
          }
          if (priorityRatio >= 10) {
            return "#ccc";
          }
          return "#bbb";
        }
        const combinedRatio = Math.round((priorityRatio * d.parent?.data.priorityRatio) / 100);
        console.log("prr:", combinedRatio);

        if (combinedRatio >= 20) {
          return "fff";
        }
        if (combinedRatio >= 15) {
          return "#eee";
        }
        if (combinedRatio >= 10) {
          return "#ddd";
        }
        if (combinedRatio >= 8) {
          return "#ccc";
        }
        if (combinedRatio >= 6) {
          return "#bbb";
        }
        if (combinedRatio >= 4) {
          return "#aaa";
        }
        if (combinedRatio >= 2) {
          return "#999";
        }
        return "#888";
      })
      .text((d, i) => {
        // 세부 목표 별 비중을 퍼센트로 표시
        // 루트 목표는 퍼센트 생략
        if (!d.parent) {
          return "";
        }
        return `[${d.data.priorityRatio}%]`;
      });

    // 노드 제목의 위치 결정
    node
      .append("text")
      .attr("dy", (d) => {
        if (!d.parent) {
          return "0.32em";
        }
        if (d.depth === 1) {
          return "-0.32em";
        }

        return "0.32em";
      }) // 이건 y축 보정 (0.32에서 키우면 내려감)
      .attr("x", (d) => {
        if (!d.parent) {
          // 루트일 때는 퍼센트 미표기하므로 공간이 남음...이었지만,
          // 노드 원이 커져서 결국 60이긴 하네
          return -45;
        }
        if (d.depth === 1) {
          return -65;
        }
        return 70;
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

export const GoalHieararchyView = () => {
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

    width: 1200,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.replaceChildren(chart);
  }, []);

  return (
    <div className="flex items-center justify-center border-2 border-violet-500" ref={ref}></div>
  );
};
