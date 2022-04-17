import React, { useEffect , useRef } from "react";
import {
  Content,
  EmailInputField,
  Heading,
  LoginButton,
  LoginContainer,
  PasswordInputField,
  LoginMain,
} from "components/adminLogin/adminLoginElements";
import InputField from 'components/common/inputField/inputField';

import useForm from "components/common/customHooks/useForm";
import { adminValidate } from "components/validation/customValidator";
import { useAppDispatch, useAppSelector } from "store/store";
import { resetAdmin, setAdmin } from "store/redux/slices/adminSlice";
import { ErrorMessage } from "components/adminLogin/adminLoginElements";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { useQuery, useMutation } from "@apollo/react-hooks";

import { ACTIVATE_ACCOUNT } from "gql/mutations";
import { Toast } from 'primereact/toast';
const CryptoJS = require("crypto-js");
const config  = require("config");


const Activate = () => {
  const { admin } = useAppSelector((state) => state.admin);
  const [createActivation, activationValues] = useMutation(ACTIVATE_ACCOUNT);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);



  useEffect(()=>{

      createActivation({
        variables: {
          activateAccountId: window.location.pathname.split('/')[2].toString()         
        }
      }).then((result) => {
        if (result.data) {
          toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Account Activated Succesfully', life: 3000 });
        }
      })


  } , [])

  return (
    <Content>
      <Toast ref={toast} />
      <>
        <LoginMain>
          <LoginContainer>
            <Heading>Account Activated Succesfully</Heading>
            <Button tooltip="Reset Password" tooltipOptions={{ position: 'bottom' }} onClick={()=>{ navigate('/admin-login') }} >
              SignIn
            </Button>

          </LoginContainer>
        </LoginMain>
      </>
    </Content>
  );
};

export default Activate;
