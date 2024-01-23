"use client";

import * as React from "react";
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

const LINKS = [
  {
    name: "작업",
    url: "/tasks",
  },
  {
    name: "마일스톤",
    url: "/milestones",
  },
  {
    name: "목표",
    url: "/goals?active=true",
    subLinks: [
      {
        name: "현재 목표",
        url: "/goals?active=true",
      },
      {
        name: "전체 목표",
        url: "/goals/",
      },
      {
        name: "목표 생성",
        url: "/goals/new",
      },
      {
        name: "목표 변경",
        url: "/goals/modify",
      },
    ],
    // 조회: [활성화됨(진행), 비활성화됨 (예정, 중지, 완료)], 변경: [생성, 수정, 삭제]
  },
  {
    name: "이터레이션",
    url: "/iterations?active=true",
    subLinks: [
      {
        name: "현재 이터레이션",
        url: "/iterations?active=true",
      },
      {
        name: "전체 이터레이션",
        url: "/iterations/",
      },
      {
        name: "이터레이션 생성",
        url: "/iterations/new",
      },
      {
        name: "이터레이션 변경",
        url: "/iterations/modify",
      },
    ],
    // 조회: [현재, 전체], 변경: [생성, 수정, 삭제]
  },
  {
    name: "회고",
    url: "/retrospections",
  },
  {
    name: "설정",
    url: "/settings",
  },
];

export const HorizontalNavigationTab = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {LINKS.map(({ name, url, subLinks }) => {
          if (!subLinks) {
            return (
              <NavigationMenuItem key={name}>
                <Link to={url}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          }
          return (
            <NavigationMenuItem key={name}>
              <NavigationMenuTrigger>
                <Link to={url}>{name}</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* FIXME: 패널이 길어지면 우측 화면 밖으로 나가버림. 이거는 <Content> 옵션을 봐야 할 듯 */}
                <ul className="grid gap-3 p-4 lg:grid-cols-[.4fr_.4fr]">
                  {subLinks.map(({ name, url }) => (
                    <ListItem key={name} href={url} title={name} className="w-32"></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href = "/", ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            to={href}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
