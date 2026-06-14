"use client"

import Image from "next/image"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton" // 1. Import Skeleton
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon, SparklesIcon, CheckmarkBadgeIcon, CreditCardIcon, NotificationIcon, LogoutIcon } from "@hugeicons/core-free-icons"
import { signOut } from '@/actions/auth-action';
import { useAuthStore } from "@/stores/auth-store"

export function NavUser() {
  const { isMobile } = useSidebar()
  const profile = useAuthStore((state) => state.profile);

  // 2. Buat kondisi loading (misal jika nama belum ada)
  const isLoading = !profile || !profile.name;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLoading}>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* 3. Tampilkan Skeleton jika loading, Tampilkan Avatar jika selesai */}
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="ml-auto size-4" />
                </>
              ) : (
                <>
                  <Avatar className="relative h-8 w-8 rounded-full overflow-hidden">
                    {profile.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt={profile.name || "Avatar"}
                        fill
                        sizes="32px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <AvatarFallback className="rounded-full uppercase">
                        {profile?.name?.substring(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <h4 className="truncate font-medium">{profile.name}</h4>
                    <p className="text-muted-foreground truncate text-xs capitalize">{profile.role}</p>
                  </div>
                  <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="relative h-8 w-8 rounded-full overflow-hidden">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.name || "Avatar"}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="rounded-full uppercase">
                      {profile?.name?.substring(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h4 className="truncate font-medium">{profile?.name}</h4>
                  <p className="text-muted-foreground truncate text-xs capitalize">{profile?.role}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={SparklesIcon} strokeWidth={2} />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HugeiconsIcon icon={CheckmarkBadgeIcon} strokeWidth={2} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={NotificationIcon} strokeWidth={2} />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} variant="destructive" className="cursor-pointer">
              <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}