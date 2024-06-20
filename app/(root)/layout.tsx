
import MyApp from '@/providers/StreamVideoClient'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <main>
        <MyApp>
          {children}
        </MyApp>
    </main>
  )
}

export default layout
