import { Link } from "react-router-dom";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		window.location.replace("/dashboard");
		return null;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-4">
			<SignIn
				signInUrl="/sign-in"
				signUpUrl="/sign-up"
				afterSignInUrl="/dashboard"
				appearance={{
					variables: {
						colorPrimary: "#0ea5e9",
						colorText: "#0f172a",
						fontSize: "14px",
						borderRadius: "0.75rem",
					},
					elements: {
						formButtonPrimary:
							"bg-sky-500 hover:bg-sky-600 text-white rounded-lg",
						card: "shadow-none border-0",
						headerTitle: "text-xl",
					},
				}}
			/>
		</div>
	);
};

export default SignInPage;
