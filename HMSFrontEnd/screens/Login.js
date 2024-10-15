import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';

// formik
import {Formik} from 'formik';

//icons
import{Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

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
     StyledButton,
     ButtonText,
     Colors,
     MsgBox,
     Line
} from'./../components/styles';
import {View} from 'react-native';

//Colors

const{brand, darkLight, primary } = Colors;

const Login = () => {
     const[hidePassword, setHidePassword] = useState(true);

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
               <PageLogo resizeMode="cover" source={require('./../assets/img/img1.png')}/>
               <PageTitle> HMS Login</PageTitle>
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

                 <MyTextInput
                   label="Password"
                   icon="lock"
                   placeholder="***********"
                   placeholderTextColor={darkLight}
                   onChangeText={handleChange('password')}
                   onBlur={handleBlur('password')}
                   value={values.password}
                   secureTextEntry={hidePassword}
                   isPassword={true}
                   hidePassword={hidePassword}
                   setHidePassword={setHidePassword}
                 />
                 <MsgBox>...</MsgBox>
                 <StyledButton onPress={handleSubmit}>
                     <ButtonText>Login</ButtonText>
                 </StyledButton>
                 <Line />
                 <StyledButton onPress={handleSubmit}>
                     <Fontisto name="google" color={primary} size={25} />
                     <ButtonText>Sign in with Google</ButtonText>
                 </StyledButton>
               </StyleFormArea>
               )}
            </InnerContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({label, icon,isPassword,hidePassword,setHidePassword, ...props}) => {
    return (<View>
        <LeftIcon>
          <Octicons name={icon} size={30} color ={brand}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
          <RightIcon onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size = {30} 
            color={darkLight}/>
          </RightIcon>
        )}
 </View>)
}

export default Login;