import React, { useEffect } from "react";
import {
  Content,
  EmailInputField,
  Heading,
  LoginButton,
  LoginContainer,
  PasswordInputField,
  LoginMain,
} from "./adminLoginElements";
import useForm from "components/common/customHooks/useForm";
import { adminValidate } from "components/validation/customValidator";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOGIN_ADMIN } from "gql/queries";
import { useAppDispatch, useAppSelector } from "store/store";
import { resetLoginData, setLoginData } from "store/redux/slices/loginDataSlice";
import { ErrorMessage } from "components/adminLogin/adminLoginElements";
import { useNavigate } from "react-router-dom";
import { VERIFY_LOGIN } from "gql/queries";
import { Button } from 'primereact/button';


const AdminLogin = () => {
  const [login, { loading, error, data }] = useLazyQuery(LOGIN_ADMIN);
  const { loginData } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(loading , error , data)

  const login_user = ()=>{
    console.log('Login Function triggered' , loginData)
    login({ variables: {username:  loginData.user_name , password : loginData.password} 
      })
    }

  useEffect(()=>{
    data && data?.loginAdmin?.authenticated && dispatch(resetLoginData()) && localStorage.setItem("access_token", data?.loginAdmin?.token);
    !error && data && navigate("/");

  })


  const { handleSubmit, errors } = useForm( login_user , adminValidate, loginData);

  const { loading: authLoading, error: authError, data: authData, } = useQuery(VERIFY_LOGIN, {
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    // authData?.verify_login.access && navigate("/");
    // ---- 
  }, [authData]);

  return (
    <Content>
      <>
        <LoginMain>
          <LoginContainer>
            <Heading>LOGIN</Heading>
            <EmailInputField
              value={loginData.user_name}
              onChange={(e) =>
                dispatch(
                  setLoginData({ ...loginData, user_name: e.target.value })
                )
              }
              placeholder="User Name"
              type={"text"}
            />
            <ErrorMessage>{errors.user_name && errors.user_name}</ErrorMessage>
            <PasswordInputField
              value={loginData.password}
              onChange={(e) =>
                dispatch(
                  setLoginData({ ...loginData, password: e.target.value })
                )
              }
              placeholder="Password"
              type={"password"}
              pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <ErrorMessage>{errors.password && errors.password}</ErrorMessage>
            <LoginButton
              disabled={loading ? true : false}
              onClick={handleSubmit}
            >
              {loading ? "authenticating..." : "Login"}
            </LoginButton>

            <Button tooltip="Reset Password" tooltipOptions={{ position: 'bottom' }} onClick={()=>{ navigate('/reset-password') }} >
              Forgot password
            </Button>

            {error ? <ErrorMessage>{error.message}</ErrorMessage> : ""}
          </LoginContainer>
        </LoginMain>
      </>
    </Content>
  );
};

export default AdminLogin;
