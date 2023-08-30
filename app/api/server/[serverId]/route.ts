import { NextResponse } from 'next/server'
import { currentProfile } from "@/lib/current-profile";
import { db } from '@/lib/db';

// 删除
export async function DELETE(
  req: Request,
  { params }: { params: {serverId: string} }
) {
  try {
    const profile = await currentProfile()
    if(!profile) {
      return new NextResponse('unauthorized', {status: 401})
    }

    const server = await db.server.delete({
      where: {
        id: params?.serverId,
        profileId: profile.id
      }
    })

    return NextResponse.json(server)
  } catch(err) {
    console.log('server in delete error', err)
    return new NextResponse('Internal Error', {status: 500})
  }
}

// 更新
export async function PATCH(
  req: Request,
  { params }: { params: {serverId: string} }
) {
  try {
    const profile = await currentProfile()
    const { name,imageUrl } = await req.json()
    if(!profile) {
      return new NextResponse('unauthorized', {status: 401})
    }

    const server = await db.server.update({
      where: {
        id: params?.serverId,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    })

    return NextResponse.json(server)
  } catch(err) {
    console.log('server in patch error', err)
    return new NextResponse('Internal Error', {status: 500})
  }
}