import { gql } from "apollo-server";

const typeDefs = gql`
input AdminInput{
    email : String,  
    user_name: String , 
    password : String,
}


type Admin{
    id : ID! , 
    email : String , 
    user_name : String , 
    password : String
    isActivated  : Boolean,
}


type Updated{
    updated: Boolean,
}

type Deleted{
    delete_count : Int
}

type Login{
    authenticated: Boolean,
    token: String
}

type Access{
    access : Boolean,
}

type Success{
    sent:Boolean
}

type Query{
    hello_world: String,
    loginAdmin(username: String!, password: String!): Login,
    getAdmins : [Admin] , 
    verifyLogin : Access,
}


type Mutation{
    createAdmin(values : AdminInput!): Admin,
    updateUsername(id : ID! ,  username: String!): Updated,
    updatePassword(id : ID! , current_password: String!, new_password: String! ): Updated , 
    newPassword(email : String! , new_password : String!) : Updated , 
    sendCode(reciepent : String! , body  : String! , subject : String!) : Success
}
`;

export {
    typeDefs
}