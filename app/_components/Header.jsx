"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import Link from 'next/link'


function Header() {

  const {user, isSignedIn} = useUser();

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image src="/logo.svg" alt="Logo" width={60} height={60} />
      {/* <Button>Get Started</Button> */}

      {isSignedIn? <UserButton /> : <Link href="/sign-in"> <Button>Get Started</Button></Link>}
    </div>
  )
}

export default Header