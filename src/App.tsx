import React from 'react'

import Root from 'containers/Root'
import { AuthProvider } from 'helpers/context'
import { initPushNotifications } from 'helpers/notifications'

initPushNotifications()

const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  )
}

export default App
