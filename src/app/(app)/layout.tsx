'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AreaChart, Bot, Cog, Database, GitBranch, Home, UploadCloud } from 'lucide-react';
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
              <h1 className="text-2xl font-bold font-headline text-foreground">DataWise</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/datasets')} tooltip="Datasets">
                  <Link href="/datasets">
                    <UploadCloud />
                    <span>Datasets & Versions</span>
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
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40" />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Analytica Pro User</span>
                <span className="text-xs text-muted-foreground">user@analytica.pro</span>
              </div>
            </div>
          </SidebarFooter>
        </SidebarInset>
      </Sidebar>
      <main className="flex-1 min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b md:justify-end bg-card">
          <SidebarTrigger className="md:hidden" />
          <Button variant="outline">Help & Feedback</Button>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default AppLayout;
