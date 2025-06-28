import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Topbar = () => {
  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/assets/plogo.png' alt='Logo Image' width={28} height={28} className='rounded-full' />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>
          Postly
        </p>
      </Link>

      <div className='flex items-center gap-1'>

        {/* Mobile Logout Button */}
        <div className='block sm:hidden'>
          <SignedIn>
            <SignOutButton redirectUrl='/sign-in'>
              <div className='flex items-center gap-1 cursor-pointer'>
                <Image src='/assets/logout.svg' alt='logout' width={18} height={18} />              
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* Organization Switcher - always visible */}
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-1"
            }
          }}
        />
        
      </div>
    </nav>
  )
}

export default Topbar
