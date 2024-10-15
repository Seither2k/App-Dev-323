import React from 'react';
import {StatusBar} from 'expo-status-bar';

// formik
import {Formik} from 'formik';

//icons
import{Octicons} from '@expo/vector-icons';

import{
     StyledContainer,
     InnerContainer,
     PageLogo,
     PageTitle,
     SubTitle,
     StyledFormArea,
     LeftIcon,
     StyledInputLabel,
     StyledTextInput,
     RightIcon,
} from'./../components/styles';
import {View} from 'react-native';

//Colors

const{brand, darkLight } = Colors;

const Login = () => {
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
               <PageLogo resizeMode="cover" source={require('./../assets/img/img1.png')}/>
               <PageTitle>Login</PageTitle>
               <SubTitle>Login to your account here </SubTitle>

               <Formik
                 initialValues={{ email: '', password: '' }}
                 onSubmit={(values) => {
                   console.log(values);
                 }}
               />
               {({ handleChange,handleBlur,handleSubmit,values}) => (
                 <StyleFormArea>
                 <MyTextInput
                   label="Email Address"
                   icon="mail"
                   placeholder="kchindongo@gmail.com"
                   placeholderTextColor={darkLight}
                   onChangeText={handleChange('email')}
                   onBlur={handleBlur('email')}
                   value={values.email}
                   keyboardType="email-address"
                 />
               </StyleFormArea>
               )}
            </InnerContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({label, icon, ...props}) => {
    return (<View>
        <LeftIcon>
          <Octicons name={icon} size={30} color ={brand}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
 </View>)
}

export default Login;