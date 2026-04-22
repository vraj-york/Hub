import { API_CONFIG, HUB_SESSION_KEYS, HTTP_STATUS } from "@/const";

/**
 * API response and error types — same shape as `launchpad-frontend/src/lib/apiClient.ts`
 * for interoperability with the shared backend.
 */
export type ApiResponse<T = unknown> = {
	data: T;
	status: number;
	ok: true;
};

export type ApiError = {
	message: string;
	status: number;
	ok: false;
};

/**
 * Prototype / dev token compatible with the Launchpad mock and many gateway tests:
 * `Authorization: Bearer proto.<base64url(json)>.sig`
 */
export async function getBearerToken(): Promise<string | undefined> {
	const email = sessionStorage.getItem(HUB_SESSION_KEYS.prototypeUserEmail);
	if (!email) return undefined;
	const role = sessionStorage.getItem(HUB_SESSION_KEYS.prototypeUserRole) ?? "SuperAdmin";
	const payload = btoa(
		JSON.stringify({
			email,
			"cognito:groups": [role],
		}),
	)
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/g, "");
	return `proto.${payload}.sig`;
}

function ok<T>(data: T, status: number): ApiResponse<T> {
	return { data, status, ok: true };
}

function fail(message: string, status: number): ApiError {
	return { message, status, ok: false };
}

async function request(
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
	endpoint: string,
	body?: unknown,
): Promise<ApiResponse<unknown> | ApiError> {
	const base = API_CONFIG.baseUrl;
	if (!base) {
		return fail("VITE_API_BASE_URL is not set; configure the backend base URL to call APIs.", 503);
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeout);
	try {
		const token = await getBearerToken();
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		const res = await fetch(new URL(endpoint.replace(/^\//, ""), base.endsWith("/") ? base : `${base}/`), {
			method,
			headers,
			body: body === undefined || method === "GET" ? undefined : JSON.stringify(body),
			signal: controller.signal,
		});

		const contentType = res.headers.get("content-type") ?? "";
		const payload = contentType.includes("application/json")
			? await res.json()
			: await res.text();

		if (!res.ok) {
			const message =
				typeof payload === "object" && payload !== null && "message" in payload
					? String((payload as { message: string }).message)
					: res.statusText;
			return fail(message || "Request failed", res.status);
		}

		return ok(payload, res.status);
	} catch (e) {
		if (e instanceof Error && e.name === "AbortError") {
			return fail("Request timed out", 408);
		}
		return fail("An unexpected error occurred", HTTP_STATUS.INTERNAL_SERVER_ERROR);
	} finally {
		clearTimeout(timeout);
	}
}

/**
 * JSON HTTP client for the shared BSP / Launchpad backend. Use `API_ENDPOINTS` from `@/const`.
 */
export const apiClient = {
	get: <T>(endpoint: string) => request("GET", endpoint) as Promise<ApiResponse<T> | ApiError>,
	post: <T>(endpoint: string, body?: unknown) =>
		request("POST", endpoint, body) as Promise<ApiResponse<T> | ApiError>,
	put: <T>(endpoint: string, body?: unknown) =>
		request("PUT", endpoint, body) as Promise<ApiResponse<T> | ApiError>,
	patch: <T>(endpoint: string, body?: unknown) =>
		request("PATCH", endpoint, body) as Promise<ApiResponse<T> | ApiError>,
	delete: <T>(endpoint: string) => request("DELETE", endpoint) as Promise<ApiResponse<T> | ApiError>,
};

export function isApiError(response: ApiResponse<unknown> | ApiError): response is ApiError {
	return !response.ok;
}
