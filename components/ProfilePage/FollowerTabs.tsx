import React, { useEffect } from 'react'
import { ProfileCard } from './ProfileCard'

export const FollowerTabs = (props:any) => {

  useEffect(()=>{
    
  })

  return (
    <div className='grid grid-cols-4 gap-3'>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </div>
  )
}
