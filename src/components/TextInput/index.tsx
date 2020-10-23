import React, { useState, useEffect, useMemo, RefObject } from 'react'
import {
  TextInput as NativeTextInput,
  TextInputProps,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Text,
} from 'react-native'
import styled from 'styled-components/native'

import { usePrevious } from 'helpers/hooks'
import { black, blue, darkGrey55, errorRed } from 'styles/colors'
import { useInputLabelAnimation } from './hooks'

interface TextInputInterface extends TextInputProps {
  label?: string
  error?: string
  touched?: boolean
  inputStyle?: object
  autoFocus?: boolean
  focused?: boolean | string | null
  useTextTranslation?: boolean
}

const INPUT_HEIGHT = 56
const LABEL_TOP_OFFSET = -INPUT_HEIGHT + 16

interface InputContainerInterface {
  hasLabel?: boolean
}

const InputContainer = styled.View<InputContainerInterface>`
  position: relative;
  height: ${({ hasLabel }) => (hasLabel ? `${INPUT_HEIGHT + 20}px` : `${INPUT_HEIGHT}px`)};
  width: 100%;
  padding-top: ${({ hasLabel }) => (hasLabel ? '16px' : '0px')};
`

interface TextInputContainerInterface {
  borderColor: string
}

const TextInputContainer = styled.View<TextInputContainerInterface>`
  border-bottom-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  flex-direction: row;
  align-items: center;
`

const LabelContainer = styled(Animated.View)`
  position: absolute;
  bottom: 26px;
  width: 100%;
  height: 20px;
  right: 0;
  padding-left: 50%;
  left: -50%;
`

const TextInputComponent = styled.TextInput`
  font-size: 20px;
  line-height: 26px;
  padding-vertical: 8px;
  flex: 1;
  text-align: left;
  color: ${black};
`

const LabelText = styled(Text)`
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  flex-wrap: nowrap;
  font-size: 20px;
  padding-left: 2px;
  color: ${darkGrey55};
`

const ErrorText = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: ${errorRed};
  padding-vertical: 2px;
`

const TextInput = React.forwardRef(
  (
    {
      onChangeText,
      value,
      label,
      style,
      error,
      touched,
      onBlur,
      onFocus,
      inputStyle,
      autoFocus,
      focused,
      ...props
    }: TextInputInterface,
    ref
  ) => {
    const [startLabelAnimation, animatedLabelStyle] = useInputLabelAnimation(
      !!value,
      LABEL_TOP_OFFSET
    )
    const [isFocused, setIsFocused] = useState<boolean>(!!value || !!focused)
    const wasFocused = usePrevious(focused)
    useEffect(() => {
      if (wasFocused !== undefined && focused !== wasFocused && !value) {
        setIsFocused(!!focused)
        startLabelAnimation(!!focused)
      }
    }, [focused])

    const handleChangeText = (text: string): void => onChangeText && onChangeText(text?.trimLeft())
    const handleOnFocus = (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true)
      startLabelAnimation(true)
      if (onFocus && e) {
        onFocus(e)
      }
    }
    const handleOnBlur = (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false)
      if (onBlur && e) {
        onBlur(e)
      }
      if (!value) {
        startLabelAnimation(false)
      }
    }

    const isInputFocused = isFocused || !!value
    const hasError = !!error && touched && !isFocused
    const borderColor = useMemo(() => {
      if (hasError) {
        return errorRed
      } else if (isInputFocused) {
        return blue
      }
      return black
    }, [hasError, isInputFocused])

    return (
      <InputContainer style={style} hasLabel={!!label}>
        <TextInputContainer borderColor={borderColor}>
          <TextInputComponent
            {...props}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            value={value}
            onChangeText={handleChangeText}
            ref={ref as RefObject<NativeTextInput>}
            style={inputStyle}
            autoFocus={autoFocus}
            autoCapitalize="none"
          />
        </TextInputContainer>
        {!!label && (
          <LabelContainer pointerEvents="none" style={animatedLabelStyle}>
            <LabelText>{label}</LabelText>
          </LabelContainer>
        )}
        {touched && !!error && !isFocused && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    )
  }
)

export default TextInput
