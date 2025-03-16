import ProtectedRouteAdmin from '@/app/components/protected/ProtectedRouteAdmin'
import React from 'react'

const page = () => {
  return (
    <ProtectedRouteAdmin>
    <div>page</div>
    </ProtectedRouteAdmin>

  )
}

export default page