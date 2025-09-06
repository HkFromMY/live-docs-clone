import React from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Header from '@/components/Header'
import AddDocumentBtn from '@/components/AddDocumentBtn'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs/server'
import ClientRedirect from '@/components/ClientRedirect'

const Home = async () => {
  // TODO: this will trigger this error: https://github.com/vercel/next.js/discussions/59493
  const clerkUser = await currentUser();
  if (!clerkUser) return <ClientRedirect href="/sign-in" />;

  const documents = [];

  return (
    <main className="home-container">
      <Header className="sticky">
        <div className="flex items-center gap-2 lg:gap-4">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {
        documents.length > 0 ? (
          <div>

          </div>
        ) : (
          <div className='document-list-empty'>
            <Image 
              src="/assets/icons/doc.svg"
              alt="Document"
              width={40}
              height={40}
              className="mx-auto"
            />

            <AddDocumentBtn 
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
        )
      }
    </main>
  )
}

export default Home
