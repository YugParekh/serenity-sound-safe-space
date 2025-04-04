
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Home, 
  User, 
  Calendar, 
  BookOpen, 
  Headphones,
  Gamepad,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut 
} from "lucide-react";

interface AppSidebarProps {
  userType: 'user' | 'therapist';
}

export function AppSidebar({ userType }: AppSidebarProps) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userMenuItems = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "My Profile", icon: User, path: "/profile" },
    { title: "Therapy Sessions", icon: Calendar, path: "/sessions" },
    { title: "Resources", icon: BookOpen, path: "/resources" },
    { title: "Sound Therapy", icon: Headphones, path: "/sounds" },
    { title: "Wellness Games", icon: Gamepad, path: "/games" },
    { title: "Messages", icon: MessageSquare, path: "/messages" },
  ];

  const therapistMenuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "My Profile", icon: User, path: "/profile" },
    { title: "Sessions", icon: Calendar, path: "/sessions" },
    { title: "Patient Records", icon: BookOpen, path: "/patients" },
    { title: "Resources", icon: BookOpen, path: "/resources" },
    { title: "Messages", icon: MessageSquare, path: "/messages" },
  ];

  const menuItems = userType === 'user' ? userMenuItems : therapistMenuItems;
  const userName = userType === 'user' ? 'Sarah Johnson' : 'Dr. Michael Chen';
  const userRole = userType === 'user' ? 'Member' : 'Licensed Therapist';

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Sidebar
      className="border-r"
    >
      <SidebarHeader className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          {!isCollapsed && (
            <>
              <div className="h-7 w-7 rounded-full bg-serenity-500 flex items-center justify-center">
                <span className="font-bold text-white">S</span>
              </div>
              <span className="font-semibold">Serenity</span>
            </>
          )}
          {isCollapsed && (
            <div className="h-7 w-7 rounded-full bg-serenity-500 flex items-center justify-center">
              <span className="font-bold text-white">S</span>
            </div>
          )}
        </div>
        <SidebarTrigger 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="ml-auto"
        >
          <ArrowLeft className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleMenuClick(item.path)}
                    className="flex items-center"
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto pt-4">
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleMenuClick('/help')}
                  className="flex items-center"
                >
                  <HelpCircle className="h-5 w-5 mr-2" />
                  <span>Help & Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => handleMenuClick('/settings')}
                  className="flex items-center"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-serenity-100 text-serenity-800">
              {userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
          )}
          {!isCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
