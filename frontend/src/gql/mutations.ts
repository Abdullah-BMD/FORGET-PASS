import { gql } from "@apollo/client";




const CREATE_ADMIN = gql`
mutation CreateAdmin($values: AdminInput!) {
  createAdmin(values: $values) {
    id
    email
    user_name
    password
  }
}
`

const UPDATE_USERNAME = gql`
mutation UpdateUsername($updateUsernameId: ID!, $username: String!) {
  updateUsername(id: $updateUsernameId, username: $username) {
    updated
  }
}
`


const UPDATE_PASSWORD = gql`
mutation UpdatePassword($updatePasswordId: ID!, $currentPassword: String!, $newPassword: String!) {
  updatePassword(id: $updatePasswordId, current_password: $currentPassword, new_password: $newPassword) {
    updated
  }
}
`

const NEW_PASSWORD = gql`
mutation NewPassword($email: String!, $newPassword: String!) {
  newPassword(email: $email, new_password: $newPassword) {
    updated
  }
}
`

const SEND_MAIL = gql`
mutation SendCode($reciepent: String!, $code: String!) {
  sendCode(reciepent: $reciepent, code: $code) {
    sent
  }
}
`

export {
 CREATE_ADMIN,
 UPDATE_USERNAME , 
 UPDATE_PASSWORD,
 NEW_PASSWORD , 
 SEND_MAIL
}