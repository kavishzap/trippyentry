import { Preloader } from '@/components'
import { Suspense, type ReactNode } from 'react'

import { TrippyAuthFlow, TrippyAuthSplitGrid } from '@/views/auth/TrippyAuthShell'

const AuthLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <TrippyAuthFlow>
      <TrippyAuthSplitGrid>
        <Suspense fallback={<Preloader />}>{children}</Suspense>
      </TrippyAuthSplitGrid>
    </TrippyAuthFlow>
  )
}

export default AuthLayout
