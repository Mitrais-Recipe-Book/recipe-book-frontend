import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProfileCard } from './ProfileCard'

export const FollowTabs = (props:any) => {
  const router = useRouter()
  function onClickHandler(username:any){
    router.push(`/profile/${username}`)
  }
  return (
    <div className='grid grid-cols-4 gap-3'>
      {
        props?.followList?.length > 0 ? 
        (
          props?.followList?.map((element:any) => 
            (
              <>
                <ProfileCard key={Math.random()*Math.random()} user={element} />
              </>
            )
          )
        ) : (
          <div className="">There is no user</div>
        )
      }
    </div>
  )
}
