import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import { ActionToolTip } from '@/components/ActionToolTip';


interface NavigationItemProps {
  id: number;
  name: string;
  imageUrl: string;
}

export const NavigationItem = ({id, name, imageUrl }: NavigationItemProps) => {

  const params = useParams()
  const router = useRouter()

  const onClick = () => {
    router.push(`/server/${id}`)
  }
  return (
    <ActionToolTip align='center' side='left' label={name}>
      <button onClick={onClick} className='group relative flex items-center'>
        <Image src={imageUrl} alt="channel" fill />
      </button>
    </ActionToolTip>
  )
}