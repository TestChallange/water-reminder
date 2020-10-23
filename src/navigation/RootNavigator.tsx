import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import DashboardScreen from 'containers/DashboardScreen'
import LoginScreen from 'containers/LoginScreen'
import SplashScreen from 'containers/SplashScreen'
import { SCREEN_NAMES } from 'constants/navigation'
import { useAuthContext } from 'helpers/context'
import { white } from 'styles/colors'

const Stack = createStackNavigator()

const RootNavigator = () => {
  const { authState } = useAuthContext()

  const isAuthenticated = !!authState?.user
  const isInitializing = authState?.isInitializing

  if (isInitializing) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: white,
          },
        }}>
        {!isAuthenticated ? (
          <Stack.Screen
            name={SCREEN_NAMES.LOGIN}
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        ) : (
          <Stack.Screen
            name={SCREEN_NAMES.DASHBOARD}
            options={{ headerShown: false }}
            component={DashboardScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default RootNavigator
