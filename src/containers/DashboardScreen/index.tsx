import AsyncStorage from '@react-native-community/async-storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Text } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import styled from 'styled-components/native'

import { useLogout } from 'helpers/context'
import { useAppState } from 'helpers/hooks'
import { datesAreOnSameDay } from 'helpers/time'
import { blue, lightBlue } from 'styles/colors'
import { defaultPadding } from 'styles/metrics'
import { scheduleNotifications } from './helpers'

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Counter = styled.Text`
  font-size: 30px;
  font-weight: 700;
`

const LogoutButtonContainer = styled.View`
  padding-top: ${defaultPadding}px;
`

const glassesCountDateStorageKey = 'glassesCountDate'
const glassesCountStorageKey = 'glassesCount'
const fillMultiplier = 100 / 6

const DashboardScreen = () => {
  const [glasses, setGlasses] = useState(0)
  const [logout] = useLogout()
  const lastDate = useRef(new Date())
  const isSameDate = datesAreOnSameDay(lastDate.current, new Date())

  const setGlassesStoreData = (count: number) => {
    AsyncStorage.setItem(glassesCountStorageKey, count.toString())
    AsyncStorage.setItem(glassesCountDateStorageKey, new Date().getTime().toString())
  }
  const resetCount = () => {
    setGlassesStoreData(0)
    setGlasses(0)
    lastDate.current = new Date()
  }
  const getStoredCount = useCallback(async () => {
    try {
      const date = await AsyncStorage.getItem(glassesCountDateStorageKey)
      const sameDay = date && datesAreOnSameDay(new Date(parseInt(date, 10)), new Date())
      if (sameDay) {
        const count = await AsyncStorage.getItem(glassesCountStorageKey)
        count !== null && setGlasses(parseInt(count, 10))
      }
    } catch (e) {
      console.error(e)
    }
  }, [setGlasses])

  useEffect(() => {
    scheduleNotifications()
    getStoredCount()
  }, [])

  useEffect(() => {
    if (glasses) {
      isSameDate ? setGlassesStoreData(glasses) : resetCount()
    }
  }, [glasses])

  useAppState(() => !isSameDate && resetCount())

  const addGlass = () => {
    setGlasses((value) => (value < 6 ? value + 1 : value))
  }

  return (
    <ContentContainer>
      <Text>Glasses of water</Text>
      <AnimatedCircularProgress
        size={220}
        width={12}
        fill={glasses * fillMultiplier}
        padding={16}
        tintColor={blue}
        backgroundColor={lightBlue}
        backgroundWidth={12}>
        {(fill) => <Counter>{Math.round(fill / fillMultiplier)} / 6</Counter>}
      </AnimatedCircularProgress>
      <Button title="Add glass" onPress={addGlass} />
      <LogoutButtonContainer>
        <Button title="Logout" onPress={logout} />
      </LogoutButtonContainer>
    </ContentContainer>
  )
}

export default DashboardScreen
