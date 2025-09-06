import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server'
import ClientRedirect from '@/components/ClientRedirect';
import React from 'react'

const Document = async ({ params }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) return <ClientRedirect href="/sign-in" />

  const { id } = await params; // for some reason this is required, otherwise terminall will display warning
  
  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) return <ClientRedirect href="/" />

  // TODO: Assess the permissions of the user to access the document

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
      />
    </main>
  )
}

export default Document
