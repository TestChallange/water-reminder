import auth from '@react-native-firebase/auth'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import { ActivityIndicator, Button, TextInput as NativeTextInput } from 'react-native'
import styled from 'styled-components/native'
import * as yup from 'yup'

import TextInput from 'components/TextInput'
import { useAuthContext } from 'helpers/context'
import { blue } from 'styles/colors'
import { defaultPadding } from 'styles/metrics'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  email: yup.string().label('Email').email().required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(6, 'Password must be of minimum 6 characters length')
    .matches(/^[a-zA-Z0-9]*$/, 'Password must contain only alphanumeric'),
})

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-horizontal: ${defaultPadding}px;
`

const Header = styled.Text`
  font-size: 32px;
  line-height: 36px;
  color: ${blue};
  font-weight: 800;
  padding-vertical: ${defaultPadding * 3}px;
`

const LoginScreen = () => {
  const { setAuthState, authState } = useAuthContext()
  const passwordRef = useRef<NativeTextInput>(null)

  const focusPasswordField = () => passwordRef.current?.focus()
  const onSubmit = async ({ email, password }: typeof initialValues) => {
    try {
      setAuthState && setAuthState({ user: null, isAuthenticating: true, isInitializing: false })
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      setAuthState && setAuthState({ user: null, isAuthenticating: false, isInitializing: false })
      console.error(error)
    }
  }

  return (
    <ContentContainer>
      <Header>Water Remider</Header>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleBlur, handleSubmit, handleChange, touched, errors, values }) => (
          <>
            <TextInput
              label="Email"
              touched={touched.email}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              value={values.email}
              onSubmitEditing={focusPasswordField}
              returnKeyType="next"
            />
            <TextInput
              label="Password"
              touched={touched.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
              value={values.password}
              onSubmitEditing={handleSubmit}
              returnKeyType="go"
              ref={passwordRef}
              secureTextEntry
            />
            <Button title="Login" onPress={handleSubmit} disabled={authState?.isAuthenticating} />
            {authState?.isAuthenticating && <ActivityIndicator color={blue} />}
          </>
        )}
      </Formik>
    </ContentContainer>
  )
}

export default LoginScreen
