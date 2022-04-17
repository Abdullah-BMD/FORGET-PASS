import { gql } from '@apollo/client'



const LOGIN_ADMIN = gql`
query LoginAdmin($username: String!, $password: String!) {
  loginAdmin(username: $username, password: $password) {
    authenticated
    token
  }
}
`

const GET_ADMINS = gql`
query GetAdmins {
  getAdmins {
    id
    email
    user_name
    password
    isActivated
  }
}
`


const VERIFY_LOGIN = gql`
query VerifyLogin {
  verifyLogin {
    access
  }
}
`




export {
  GET_ADMINS,
  LOGIN_ADMIN,
  VERIFY_LOGIN,
}
