
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AreaChart, Bot, Cog, Database, GitBranch, Home, UploadCloud, Beaker } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarInset>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Database className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold font-headline text-foreground">Analytica AI</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/datasets')} tooltip="Datasets">
                  <Link href="/datasets">
                    <UploadCloud />
                    <span>Data Workflow</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/analytics')} tooltip="Analytics">
                  <Link href="/analytics">
                    <AreaChart />
                    <span>Analytics & NLQ</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/version-control')} tooltip="Version History">
                  <Link href="/version-control">
                    <GitBranch />
                    <span>Version History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/integrations')} tooltip="Integrations">
                  <Link href="/integrations">
                    <GitBranch />
                    <span>Integrations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/settings')} tooltip="Settings">
                  <Link href="/settings">
                    <Cog />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-card border cursor-pointer hover:bg-muted">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40" data-ai-hint="male avatar" />
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                        <span className="font-semibold text-sm">Analytica AI User</span>
                        <span className="text-xs text-muted-foreground">user@analyticaai.pro</span>
                    </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/login">Log Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </SidebarInset>
      </Sidebar>
      <main className="flex-1 min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <SidebarTrigger />
          <Button variant="outline">Help & Feedback</Button>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default AppLayout;
