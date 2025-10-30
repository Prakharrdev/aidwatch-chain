import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

type ProtectedRouteProps = {
	children: JSX.Element;
	requireRole?: boolean;
};

const ProtectedRoute = ({
	children,
	requireRole = false,
}: ProtectedRouteProps) => {
	const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded) return null;
	if (!isSignedIn) return <Navigate to="/sign-in" replace />;

	if (requireRole) {
		const role = (user.unsafeMetadata?.role as string) || "";
		const onboarded = Boolean(user.unsafeMetadata?.onboarded);
		if (!role || !onboarded) return <Navigate to="/onboarding" replace />;
	}

	return children;
};

export default ProtectedRoute;
