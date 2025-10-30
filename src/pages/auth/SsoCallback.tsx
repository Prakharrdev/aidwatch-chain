import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const SsoCallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthenticateWithRedirectCallback
        redirectUrl="/sso-callback"
        afterSignInUrl="/onboarding"
        afterSignUpUrl="/onboarding"
      />
    </div>
  );
};

export default SsoCallback;


