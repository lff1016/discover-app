import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { db } from '@/lib/db'


// 初始化用户
export const initialProfile = async () => {
  
  const user = await currentUser();

  if(!user) {
    return redirectToSignIn();
  };

  const profile = await db.profile.findUnique({
    where: {
      userId: user?.id
    }
  })

  // 如果用户已经存在，直接返回
  if(profile) return profile;

  // 如果用户不存在，创建用户
  const newProfile = await db.profile.create({
    data: {
      userId: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl,
      email: user?.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
}