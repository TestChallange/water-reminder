import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const usePrevious = <T,>(value: T) => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useAppState = (onAppStateChange: () => void, shouldHandleAppState: boolean = true) => {
  const appState = useRef<AppStateStatus>(AppState.currentState)

  useEffect(() => {
    if (shouldHandleAppState) {
      AppState.addEventListener('change', handleAppStateChange)
    }
    return () => {
      shouldHandleAppState && AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      ((appState.current && appState.current.match(/inactive|background/)) ||
        appState.current == null) &&
      nextAppState === 'active'
    ) {
      onAppStateChange()
    }
    appState.current = nextAppState
  }

  return [appState.current] as const
}
