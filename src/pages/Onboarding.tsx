import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

const roles = [
	{ value: "ngo", label: "NGO" },
	{ value: "beneficiary", label: "Beneficiary" },
	{ value: "donor", label: "Donor" },
	{ value: "govt", label: "Govt Authority" },
];

const Onboarding = () => {
	const { user, isSignedIn } = useUser();
	const [role, setRole] = useState<string>("");
	const [saving, setSaving] = useState(false);

	if (!isSignedIn) {
		window.location.replace("/sign-in");
		return null;
	}
	if (user?.unsafeMetadata?.onboarded === true) {
		window.location.replace("/dashboard");
		return null;
	}

	const handleSave = async () => {
		if (!role) return;
		setSaving(true);
		try {
			await user?.update({
				unsafeMetadata: {
					...(user?.unsafeMetadata || {}),
					role,
					onboarded: true,
				},
			});
			await user?.reload();
			window.location.assign("/dashboard");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-4">
			<Card className="w-full max-w-lg shadow-xl border-slate-200">
				<CardContent className="p-6 space-y-6">
					<div className="text-center space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
						<p className="text-sm text-muted-foreground">
							Select your role to complete setup.
						</p>
					</div>

					<div className="space-y-2">
						<Label>Role</Label>
						<Select onValueChange={setRole}>
							<SelectTrigger>
								<SelectValue placeholder="Choose your role" />
							</SelectTrigger>
							<SelectContent>
								{roles.map((r) => (
									<SelectItem key={r.value} value={r.value}>
										{r.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Button
						className="w-full"
						onClick={handleSave}
						disabled={!role || saving}
					>
						{saving ? "Saving..." : "Continue"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default Onboarding;
