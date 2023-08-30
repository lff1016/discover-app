import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/ThemeMode'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NavigationAction } from '@/components/navigation/navigation-action'
import { NavigationItem } from '@/components/navigation/navigation-item'

export const NavigationSideBar = async () => {
  const servers = [
    {
      id: 1,
      imageUrl: 'https://uploadthing.com/f/7422fcb2-39d8-4dc9-bf34-28095bc13970_images.jpg',
      name: 'group1'
    }
  ]
  return (
    <div>
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(server => (
          <div key={server.id} className="mb-4">
            <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
          </div>
        ))}
      </ScrollArea>
      {/* 设置 */}
      <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
        <ModeToggle/>
        <UserButton afterSignOutUrl='/' appearance={{
          elements: {
            avatarBox: 'h-[48px] w-[48px]'
          }
        }}/>
      </div>
    </div>
  )
}
