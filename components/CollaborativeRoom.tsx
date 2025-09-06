'use client';

import { RoomProvider, ClientSideSuspense } from '@liveblocks/react'
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs'

import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import ActiveCollaborators from './ui/ActiveCollaborators';


const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading...</div>}>
            <div className='collaborative-room'>
                <Header>
                    <div className="flex items-center justify-center gap-2">
                        <p className="document-title">Fake doc title</p>
                    </div>
                    <div className="flex w-full flex-1 justify-end gap-2">
                        <ActiveCollaborators />
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    
                </Header>
                <Editor />
            </div>
        </ClientSideSuspense>

    </RoomProvider>
  )
}

export default CollaborativeRoom
