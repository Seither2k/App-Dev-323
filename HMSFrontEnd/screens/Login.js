import React from 'react';

import{
     StyledContainer,
     InnerContainer,
     PageLogo,
     PageTitle
} from'./../components/styles';


const Login = () => {
    return (
        <StyledContainer>
            <InnerContainer>
               <PageLogo resizeMode="cover" source={require('./../assets/img/img1.png')}/>
               <PageTitle>Login to your account</PageTitle>
               
            </InnerContainer>
        </StyledContainer>
    );
}

export default Login;