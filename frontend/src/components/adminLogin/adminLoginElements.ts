import styled from "styled-components";

import background from "assets/login-bg.png";

export const Content = styled.div`
  background-image: url(${background});
  background-size: 100vw 100vh;
  background-repeat: no-repeat;

  @media (max-width: 991px) {
    background-size: 100vw 100vh;
    background-position: 0;
  }
  @media (max-width: 460px) {
    background-image: none;
  }
`;

export const LoginMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-width: 460px) {
    padding: 0 1rem;
  }
`;

export const LoginContainer = styled.div`
  height: 20rem;
  width: 25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  color: white;
  flex-direction: column;
  background-color: #3d3b3b;
`;

export const Heading = styled.h1`
  color: white;
  /* margin-top: 55px; */
`;

export const EmailInputField = styled.input`
  width: 18rem;
  height: 25px;
  border-radius: 20px;
  border: none;
  outline: none;
  margin-top: 10px;
  text-indent: 15px;
  color: black;
`;

export const PasswordInputField = styled.input`
  margin-top: 30px;
  border-radius: 20px;
  width: 18rem;
  height: 25px;
  border: none;
  outline: none;
  text-indent: 15px;
  color: black;
`;
export const LoginButton = styled.button`
  margin-top: 30px;
  height: 33px;
  width: 18rem;
  border-radius: 30px;
  border: none;
  outline: none;
  background: linear-gradient(to bottom, #72799c, #70789b, #787fa0, #ffffff)
    no-repeat center center;
  color: white;
  font-weight: 600;
  text-align: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;


export const ErrorMessage = styled.p`
  text-align: start;
  color: red;
  margin-bottom: 0px;
`;
