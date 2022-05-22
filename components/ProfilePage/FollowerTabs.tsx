import React from 'react'
import { ProfileCard } from './ProfileCard'

export const FollowerTabs = () => {
  return (
    <div className='grid grid-cols-4 gap-3'>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </div>
  )
}
