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
import InputField from 'components/common/inputField/inputField';

import useForm from "components/common/customHooks/useForm";
import { adminValidate } from "components/validation/customValidator";
import { useAppDispatch, useAppSelector } from "store/store";
import { resetAdmin, setAdmin } from "store/redux/slices/adminSlice";
import { ErrorMessage , InfoMessage } from "components/adminLogin/adminLoginElements";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { useQuery, useMutation } from "@apollo/react-hooks";

import { CREATE_ADMIN , SEND_MAIL  } from "gql/mutations";
import { Toast } from 'primereact/toast';
const CryptoJS = require("crypto-js");
const config  = require("config");


const SignUp = () => {
  const { admin } = useAppSelector((state) => state.admin);
  const [createmail, createmailValues] = useMutation(SEND_MAIL);
  const [createAdmin, createValues] = useMutation(CREATE_ADMIN);
  const [strength , setStrength] = useState(true);
  const [msg , setMsg] = useState('');
  const [passlength , setLength] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const LENGTH = 7;



  useEffect(()=>{
    if(admin.password == '' ){
     setStrength(true);
     setMsg('');
     setLength(0);

    }
  })


  const changeStates = (e)=>{
    dispatch( setAdmin({ ...admin, password: e.target.value }) ) 
    if(admin.password != ''){
      if(admin.password.length+1 < LENGTH){
          setMsg('Password Too short It should be atleast 8 characters long');
          setLength(admin.password.length+1);
          setStrength(false);
        }
      else if(admin.password.match(/\d+/g) == null){
        setMsg('Password must contain Numbers')
        setStrength(false)
        setLength(admin.password.length+1);

      }

      else if(!admin.password.includes("_")){
        setMsg('Password must contain underscores')
        setStrength(false)
        setLength(admin.password.length+1);

      }
      else if(admin.password.length+1 >= LENGTH  && admin.password.match(/\d+/g)!= null ){ 
        setStrength(true) 
        setLength(admin.password.length+1);        
      } 
    }
   else{
     setStrength(true);
     setMsg('');
   }
  

  }

  const signup_user =  ()=>{
    if(strength){
        createAdmin({
          variables: {
            values : { user_name : admin.user_name , password : admin.password , email : admin.email }
          }
        }).then((result) => {
          if (result.data) {
            let id_ = result.data.createAdmin.id
            createmail({
              variables: {
                reciepent: admin.email , body : `Click the link below to activate your account \n\n http://localhost:3000/activate/${id_}` , 
                subject :  'Activation Link'
              }
            }).then((result) => {
              if (result.data) {
                dispatch(resetAdmin());
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Account created Succeddfully. Check Email to Activate Your Account', life: 10000 })  }
            })
          }
        })
      

      }}

  const { handleSubmit, errors } = useForm( signup_user , adminValidate, admin);


  return (
    <Content>
      <Toast ref={toast} />
      <>
        <LoginMain>
          <LoginContainer>
            <Heading>SignUp</Heading>
            {createValues.error? <ErrorMessage>{'Account with these credentials already exist'}</ErrorMessage> : ''}
            <EmailInputField
              value={admin.user_name}
              onChange={(e) => {
                dispatch( setAdmin({ ...admin, user_name: e.target.value }) )
              }}
              placeholder="User Name"
              type={"text"}
            />
            <ErrorMessage>{errors.user_name && errors.user_name}</ErrorMessage>

            <EmailInputField
              value={admin.email}
              onChange={(e) =>
                dispatch(
                    setAdmin({ ...admin ,email: e.target.value })
                )

              }
              placeholder="Email"
              type={"text"}
            />
            <ErrorMessage>{errors.email && errors.email}</ErrorMessage>

            <PasswordInputField
              value={admin.password}
              onChange={(e) => {
                changeStates(e)
              }}
              placeholder="Password"
              type={"password"}
              pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <ErrorMessage>{errors.password && errors.password}</ErrorMessage>
            { passlength<LENGTH? <ErrorMessage>{`Password Length : ${passlength}`}</ErrorMessage> : <InfoMessage>{"Password Strength : Good"}</InfoMessage>}
            {!strength? <ErrorMessage>{msg}</ErrorMessage> : passlength>=LENGTH? <InfoMessage>{"Strong Password Good to go"}</InfoMessage> : null}            

            <LoginButton
              disabled={false}
              onClick={handleSubmit}
            >
              {createValues.loading && !createValues.error ? "Creating..." : "SignUp"}

            </LoginButton>

            <Button tooltip="Reset Password" tooltipOptions={{ position: 'bottom' }} onClick={()=>{ navigate('/admin-login') }} >
              SignIn
            </Button>

          </LoginContainer>
        </LoginMain>
      </>
    </Content>
  );
};

export default SignUp;
