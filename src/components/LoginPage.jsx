import { SignInButton } from "@clerk/clerk-react";

export default function LoginPage() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-black">

        <h1 className="text-5xl font-bold text-white mb-12 tracking-wide">
            OBER
        </h1>

            <SignInButton mode="modal">
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
                    Sign In / Sign Up
                </button>
            </SignInButton>

    </div>
  );
}