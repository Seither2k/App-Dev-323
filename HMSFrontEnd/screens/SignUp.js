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
     Line,
     ExtraView,
     ExtraText,
     TextLink,
     TextLinkContent
} from'./../components/styles';
import {View} from 'react-native';

//Colors

const{brand, darkLight, primary } = Colors;

const SignUp = () => {
     const[hidePassword, setHidePassword] = useState(true);

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
               <PageTitle> HMS SignUp</PageTitle>
               <SubTitle>Sign up for your account here </SubTitle>

               <Formik
                 initialValues={{ fullName: '',email: '', dateOfBirth: '', password: '',confirmPassword }}
                 onSubmit={(values) => {
                   console.log(values);
                 }}
               />
               {({ handleChange,handleBlur,handleSubmit,values}) => (
                 <StyleFormArea>
                 <MyTextInput
                   label="Full Name"
                   icon="person"
                   placeholder="Kondwani Chindongo"
                   placeholderTextColor={darkLight}
                   onChangeText={handleChange('fullName')}
                   onBlur={handleBlur('fullName')}
                   value={values.fullName}
                 />

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
                   label="Date of Birth"
                   icon="calendar"
                   placeholder="YYYY - MM - DD"
                   placeholderTextColor={darkLight}
                   onChangeText={handleChange('dateOfBirth')}
                   onBlur={handleBlur('dateOfBirth')}
                   value={values.dateOfBirth}
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

                <MyTextInput
                   label="Confirm Password"
                   icon="lock"
                   placeholder="***********"
                   placeholderTextColor={darkLight}
                   onChangeText={handleChange('Confirm password')}
                   onBlur={handleBlur('Confirm password')}
                   value={values.confirmPassword}
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
                 <ExtraView>
                     <ExtraText>Already have an account?</ExtraText>
                     <TextLink>
                         <TextLinkContent>Login</TextLinkContent>
                     </TextLink>
                 </ExtraView>
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

export default SignUp;