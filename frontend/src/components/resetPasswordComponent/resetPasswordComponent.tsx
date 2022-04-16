import React, { useEffect , useState , useRef } from "react";
import {
  Content,
  EmailInputField,
  Heading,
  LoginButton,
  LoginContainer,
  PasswordInputField,
  LoginMain,
} from "components/adminLogin/adminLoginElements";
import useForm from "components/common/customHooks/useForm";
import { emailValidate , otpValidate , passwordValidate } from "components/validation/customValidator";
import { LOGIN_ADMIN } from "gql/queries";
import { useAppDispatch, useAppSelector } from "store/store";
import { resetLoginData, setLoginData } from "store/redux/slices/loginDataSlice";
import { Toast } from 'primereact/toast';

import InputField from 'components/common/inputField/inputField';

import { resetPassword, setPassword } from "store/redux/slices/resetPasswordSlice";


import { ErrorMessage } from "components/adminLogin/adminLoginElements";
import { useNavigate } from "react-router-dom";
import { VERIFY_LOGIN } from "gql/queries";
import { NEW_PASSWORD , SEND_MAIL } from "gql/mutations";


import { useQuery, useMutation } from "@apollo/react-hooks";

import { Button } from 'primereact/button';

const ResetPassword = () => {
  const { resetPass } = useAppSelector((state) => state.resetPass);
  const { loginData } = useAppSelector((state) => state.login);

  const [ issend , setSend ] = useState(false);
  const [ isverify , setVerify ] = useState(false);
  const [ codeval , setCode ] = useState('');
  const toast = useRef<Toast>(null);
  const [createAdmin, createValues] = useMutation(NEW_PASSWORD);
  const [createmail, createmailValues] = useMutation(SEND_MAIL);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();


   const generateOTP =()=>{
        var digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }


  const sendMail = ()=>{
      let genCode = generateOTP();
      setCode(genCode);
      console.log('code-->' , genCode)
      createmail({
        variables: {
          reciepent: resetPass.email , code :genCode
        }
      }).then((result) => {
        if (result.data) {
          toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Email Sent Succesfully', life: 3000 });
        }
      })

    setSend(true);
  }

  const verifyOTP = ()=>{
    console.log('OTP VERIFIED' ,);
    console.log('code-->' , codeval)
    if(resetPass.OTP == codeval){
      setVerify(true);      
    }
    else{
      toast.current?.show({ severity: 'error', summary: 'Invalid Code', detail: 'Wrong Verification Code', life: 3000 });

    }

  }

  const submitPass = ()=>{
    console.log('NEW PASSWORD RESETTED');
    console.log(resetPass.email , loginData.password)
      createAdmin({
        variables: {
          email: resetPass.email , newPassword : loginData.password 
        }
      }).then((result) => {
        if (result.data) {
          toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Password Changed Succesfully', life: 3000 });
          localStorage.removeItem("access_token");
          dispatch(resetLoginData());
          dispatch(resetPassword());
          setSend(false);
          setVerify(false);
          navigate("/admin-login");
        }
      })


  }

  const { handleSubmit, errors } = useForm( sendMail , emailValidate , {email : resetPass.email} );

  const { handleSubmit : handleSubmit2 , errors : errors2 } = useForm( verifyOTP , otpValidate , {OTP : resetPass.OTP} );

  const { handleSubmit : handleSubmit3 , errors : errors3 } = useForm( submitPass , passwordValidate , {password : loginData.password} );


  return (
    <Content>
      <Toast ref={toast} />
      <>
        <LoginMain>
          <LoginContainer>
            { !isverify? 
            <>
              <Heading>Forgot Password</Heading>
              { !issend?
               <>
                <EmailInputField
                  value={resetPass.email}
                  onChange={(e) =>
                    dispatch(
                      setPassword({ ...resetPass, email: e.target.value })
                    )
                  }
                  placeholder="Email"
                  type={"text"}
                />
                <ErrorMessage>{errors.email}</ErrorMessage>
               
                <LoginButton
                  disabled={false}
                  onClick={handleSubmit}
                >
                  {'Send OTP'}
                </LoginButton>
              </>
              : 
              <>
                <InputField
                  value={resetPass.OTP}
                  setValue={(e) => dispatch(setPassword({ ...resetPass , OTP: e.target.value }))}
                  headerLabel={`Check ${resetPass.email} for OTP`}
                  error={errors2.password}
                  maxLength={4}
                  placeholder="OTP"
                  name='OTP'
                />
                <ErrorMessage>{errors2.OTP}</ErrorMessage>

                <LoginButton
                  disabled={false}
                  onClick={handleSubmit2}
                >
                  {'Submit OTP'}
                </LoginButton>
               </>
            }
          </>
          : 
          <>
            CHANGE PASSWORD
                <InputField
                  value={loginData.password}
                  setValue={(e) => dispatch(setLoginData({ ...loginData , password: e.target.value }))}
                  headerLabel="Password"
                  error={errors3.password}
                  maxLength={4}
                  placeholder="New Password"
                  name='newpassword'
                />

                <LoginButton
                  disabled={false}
                  onClick={handleSubmit3}
                >
                  {'Reset Password'}
                </LoginButton>

          </>
        }

          </LoginContainer>
        </LoginMain>
      </>
    </Content>
  );
};

export default ResetPassword;
