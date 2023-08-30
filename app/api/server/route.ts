// server 相关 api
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

// 新增
export async function POST(req: Request) {
  try {
    const {name, imageUrl} = await req.json();

    const profile = await currentProfile();

    if(!profile) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: {
            name: 'general',
            profileId: profile.id
          }
        },
        members: {
          create: {
            profileId: profile.id,
            role: 'ADMIN'
          }
        }
      }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('server error: ', error)
    return new NextResponse('server error', { status: 500 })
  }

}