import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

import RootNavigator from 'navigation/RootNavigator'
import { useAuthContext } from 'helpers/context'

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`

const Root = () => {
  const { setAuthState } = useAuthContext()

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setAuthState && setAuthState({ user, isAuthenticating: false, isInitializing: false })
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <SafeArea>
      <RootNavigator />
    </SafeArea>
  )
}

export default Root
