import React from 'react';
import {StatusBar} from 'expo-status-bar';


import{
     InnerContainer,
     PageTitle,
     SubTitle,
     StyledFormArea,
     StyledButton,
     ButtonText,
     Line,
     WelcomeContainer,
     WelcomeImage,
     Avatar
} from'./../components/styles';

//Colors


const Welcome = () => {

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage  resizeMode="cover" source={require('./../assets/img/img1.png')}/>
               <WelcomeContainer>
                  <PageTitle welcome={true}>Welcome to the HMS App!</PageTitle>
                  <SubTitle>We are ready to help you reach your full potential </SubTitle>

                  <StyleFormArea>
                     <Avatar resizeMode="cover" source={require('./../assets/img/img1.png')}/>

                     <Line />
                     <StyledButton onPress={() => {}}>
                        <ButtonText>Logout</ButtonText>
                     </StyledButton>
               </StyleFormArea>
              </WelcomeContainer>
            </InnerContainer>
        </>
    );
}



export default Welcome;