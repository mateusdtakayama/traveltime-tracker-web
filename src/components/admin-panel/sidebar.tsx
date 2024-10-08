'use client'

import Link from 'next/link'
import { BotMessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu } from '@/components/admin-panel/menu'
import { SidebarToggle } from '@/components/admin-panel/sidebar-toggle'
import { useSidebarToggle } from '@/hooks/use-sidebar'

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarToggle()
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen transition-transform ease-in-out duration-300',
        isOpen
          ? 'w-72 translate-x-0'
          : 'w-[90px] -translate-x-full lg:translate-x-0'
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="text-white relative h-full flex flex-col px-3 py-4 overflow-y-hidden shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            isOpen ? 'translate-x-0' : 'translate-x-1'
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <BotMessageSquare className="text-white w-6 h-6 mr-1" />
            <h1
              className={cn(
                'font-bold text-white whitespace-nowrap transition-all duration-300',
                isOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-96 opacity-0 hidden'
              )}
            ></h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  )
}
