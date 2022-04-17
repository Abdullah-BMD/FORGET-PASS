const adminValidate = (values: any) => {
    const errors: any = {};

    if (!values.user_name) {
        errors.user_name = ' User Name is required'
    }
    if (!values.password) {
        errors.password = 'Password is required'
    }
    if (!values.email) {
        errors.email = 'Email is required'
    }

    return errors;
}

const loginValidate = (values : any)=>{
    const errors: any = {};

    if (!values.user_name) {
        errors.user_name = ' User Name is required'
    }
    if (!values.password) {
        errors.password = 'Password is required'
    }

    return errors;    
}

const emailValidate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
        errors.email = 'Email is required'
    }
    return errors;
}

const otpValidate = (values: any) => {
    const errors: any = {};

    if (!values.OTP) {
        errors.OTP = 'OTP is required'
    }
    return errors;
}


const passwordValidate = (values: any) => {
    const errors: any = {};

    if (!values.password) {
        errors.password = 'Password is required'
    }


    return errors;
}



export {
    adminValidate , 
    emailValidate , 
    otpValidate , 
    passwordValidate , 
    loginValidate
}