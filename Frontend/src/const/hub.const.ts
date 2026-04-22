/**
 * Hub Socrates (integration app) — routes and session keys. Navigation remains tab-based
 * today; this matches Launchpad-style `const` so URL routing can be extended later.
 */
export const HUB_SESSION_KEYS = {
	/** Mirrors Launchpad `sessionStorage` keys for prototype bearer token generation */
	prototypeUserEmail: "prototype-user-email",
	prototypeUserRole: "prototype-user-role",
} as const;

export const HUB_LOCAL_KEYS = {
	auth: "meetingTracker_auth",
	integrations: "integrations",
	meetings: "meetings",
} as const;
