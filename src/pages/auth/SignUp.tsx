import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-4">
				<SignUp
					signInUrl="/sign-in"
					afterSignUpUrl="/onboarding"
					appearance={{
						variables: {
							colorPrimary: "#0ea5e9",
							colorText: "#0f172a",
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
		</>
	);
}

export default SignUpPage;
