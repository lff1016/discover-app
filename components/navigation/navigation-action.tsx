import { Plus } from 'lucide-react'
import { ActionToolTip } from '@/components/ActionToolTip'
import { useModal } from '@/hooks'

export const NavigationAction = async () => {
  const { onOpen } = useModal()
  return (
    <ActionToolTip align="center" side="left" label="添加">
      <button className='group flex items-center' onClick={() => onOpen('createServer')}>
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
          <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
        </div>
      </button>
    </ActionToolTip>
  )
}