import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { SidebarLinks } from "@/data/SidebarLinks";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import logo from '@/assets/logo.svg'
import { MoreVertical } from "lucide-react";
import SideChatsHistory from "./SideChatsHistory";
import { avatarList } from '@/data/AvatarData'
import { useUser } from "@/context/UserContext";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const location = useLocation();
  const navigate = useNavigate();
  const { botID } = useParams();
  const { user } = useUser()

  // yaha pe usreData ke help se avatarList ko fetch kr rhe hai avatar image show krne ke liye gender ke according.
  const presentUser = avatarList.filter((avatar) => avatar.gender.toLowerCase() === user?.gender)

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="bg-transparent text-primary shadow-none hover:bg-transparent flex items-center justify-start px-1">
              <Link to="/">
                <div className="flex items-center gap-2 leading-none">
                  <img src={logo} alt="botforge" className="w-7" />
                  <span className="font-medium text-lg">BotForge</span>
                </div>
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="no-scrollbar pb-8">
        <SidebarGroup>
          <SidebarMenu>
            {SidebarLinks.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={location.pathname === item.path ? true : false}>
                      <Link to={item.path}>{<item.icon />}{item.title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SideChatsHistory botID={botID} />
      </SidebarContent>


      <div onClick={() => navigate("/settings")} className="user-info h-16 rounded-b-md flex justify-between items-center gap-2 p-1 bg-secondary cursor-pointer">
        <div className="user-icon rounded-full flex items-center gap-2">
          <img src={presentUser[0]?.avatar} alt="user-avtar" className="w-10 rounded-full" />
          <div className="flex flex-col gap-[1px]">
            <span className="text-sm">{user?.name}</span>
            <span className="text-[.7rem] text-neutral-500">{user?.email.slice(0,22)+"..."}</span>
          </div>
        </div>
        <Button variant={"outline"} className="user-name cursor-pointer bg-transparent dark:bg-transparent shadow-none border-none">
          <MoreVertical color="gray" size={18} />
        </Button>
      </div>
    </Sidebar>
  )
}
