import { useState, useCallback, useMemo } from 'react'
import { Animated } from 'react-native'

export const useInputLabelAnimation = (isInputPrefilled: boolean, labelTopOffset: number) => {
  const [labelAnimation] = useState<Animated.Value>(new Animated.Value(isInputPrefilled ? 1 : 0))

  const startLabelAnimation = useCallback(
    (focused: boolean): void => {
      Animated.timing(labelAnimation, {
        toValue: focused ? 1 : 0,
        useNativeDriver: true,
        duration: 300,
      }).start()
    },
    [labelAnimation]
  )

  const animatedLabelStyle = useMemo(
    () => ({
      transform: [
        {
          scale: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 14 / 20],
          }),
        },
        {
          translateY: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, labelTopOffset],
          }),
        },
      ],
    }),
    [labelAnimation]
  )
  const animation: [typeof startLabelAnimation, typeof animatedLabelStyle] = [
    startLabelAnimation,
    animatedLabelStyle,
  ]

  return animation
}
