import React, { useState, useEffect } from "react";

import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/store";
import { AdminLogin  } from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { 
  AdminPage , 
  ResetPasswordPage
} from "./pages";

import { VERIFY_LOGIN } from "./gql/queries";

function App() {

  const { loading, error, data, refetch } = useQuery(VERIFY_LOGIN);


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />}/> 
          <Route path="/admin/update-credentials" element={<AdminPage />} />
          <Route path="/reset-password" element = {<ResetPasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
