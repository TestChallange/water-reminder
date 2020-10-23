import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

import { blue } from 'styles/colors'
import { defaultPadding } from 'styles/metrics'

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Header = styled.Text`
  font-size: 36px;
  font-weight: 800;
  color: ${blue};
  padding-vertical: ${defaultPadding * 3}px;
`

const SplashScreen = () => {
  return (
    <ContentContainer>
      <Header>Water Reminder</Header>
      <ActivityIndicator size="small" color={blue} />
    </ContentContainer>
  )
}

export default SplashScreen
