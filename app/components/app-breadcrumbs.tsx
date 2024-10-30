"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { useActiveItemStore } from "@/app/stores/active-item-store";
import { Menus } from "@/app/variables/constants";

export function AppBreadcrumbs() {
  const { activeItem, setActiveItem } = useActiveItemStore((state) => state);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>찬양집</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BreadcrumbPage className="cursor-pointer">
                {activeItem.title}
              </BreadcrumbPage>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Menus.map((menu) => (
                <DropdownMenuItem
                  key={menu.menuType}
                  onClick={() => setActiveItem(menu)}
                >
                  {menu.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
