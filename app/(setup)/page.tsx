import { redirect } from 'next/navigation'
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'
import { InitialModal } from "@/components/modals";

const SetUpPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    redirect(`/server/${server.id}`)
  }

  return  <InitialModal />
}

export default SetUpPage