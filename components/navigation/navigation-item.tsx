'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import { ActionToolTip } from '@/components/ActionToolTip';
import { cn } from '@/lib/utils';


interface NavigationItemProps {
  id: number | string;
  name: string;
  imageUrl: string;
}

export const NavigationItem = ({id, name, imageUrl }: NavigationItemProps) => {

  const params = useParams()
  const router = useRouter()

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <ActionToolTip align='center' side='right' label={name} >
      <button onClick={onClick} className='group relative flex items-center'>
        <div className={cn(
          'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
          params?.serverId !== id && 'group-hover:h-[20px]',
          params?.serverId === id ? 'h-[36px] bg-emerald-500' : 'h-[48px]'
        )}/>
        <div className={cn(
          'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
          params?.serverId == id && 'bg-primary/10 text-primary rounded-[16px]'
        )}>
          <Image src={imageUrl} alt="channel" fill />
        </div>
      </button>
    </ActionToolTip>
  )
}