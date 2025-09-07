import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server'
import ClientRedirect from '@/components/ClientRedirect';
import React from 'react'
import { getClerkUsers } from '@/lib/actions/user.actions';

const Document = async ({ params }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) return <ClientRedirect href="/sign-in" />

  const { id } = await params; // for some reason this is required, otherwise terminall will display warning
  
  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) return <ClientRedirect href="/" />

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });
  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer'
  }));

  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write')
    ? 'editor'
    : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  )
}

export default Document
