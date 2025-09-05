import { SignedIn, SignedOut } from "@clerk/clerk-react";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

export default function App(){

  return (
    <>
      <SignedOut>
        <LoginPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );

}