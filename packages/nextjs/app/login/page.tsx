"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { OktoContextType, useOkto } from "okto-sdk-react";

function LoginPage() {
  const { authenticate, getWallets } = useOkto() as OktoContextType;
  const [authToken, setAuthToken] = useState(null);

  const handleGoogleLogin = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    authenticate(idToken, (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log("Authenticated successfully, auth token:", authResponse.auth_token);
      } else if (error) {
        console.error("Authentication error:", error);
      }
    });
    const wallets = await getWallets();
  };

  return (
    <div>
      <h1>Login</h1>
      {!authToken ? (
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error("Login Failed")} />
      ) : (
        <p>Authenticated</p>
      )}
    </div>
  );
}

export default LoginPage;
