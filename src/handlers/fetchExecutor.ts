import { corsHeaders } from "../utils/corsHeaders";

export interface FetchConfig {
	url: string;
	method?: string;
	headers?: Record<string, string>;
	body?: unknown;
	redirect?: "follow" | "error" | "manual";
}

/**
 * Executes a fetch request based on provided configuration
 *
 * @param config The fetch configuration
 * @returns Response object
 */
export async function executeFetch(config: FetchConfig): Promise<Response> {
	const { url, ...fetchOptions } = config;

	if (fetchOptions.body && typeof fetchOptions.body === "object") {
		const contentType =
			fetchOptions.headers?.["Content-Type"] ||
			fetchOptions.headers?.["content-type"];

		if (!contentType || contentType.includes("application/json")) {
			fetchOptions.body = JSON.stringify(fetchOptions.body);

			if (!fetchOptions.headers) {
				fetchOptions.headers = {};
			}

			if (
				!fetchOptions.headers["Content-Type"] &&
				!fetchOptions.headers["content-type"]
			) {
				fetchOptions.headers["Content-Type"] = "application/json";
			}
		}
	}

	const response = await fetch(url, fetchOptions as RequestInit);

	let responseData: unknown;
	const contentType = response.headers.get("Content-Type") || "";

	if (contentType.includes("application/json")) {
		responseData = await response.json();

		return new Response(
			JSON.stringify({
				success: response.ok,
				status: response.status,
				statusText: response.statusText,
				headers: Object.fromEntries([...response.headers]),
				data: responseData,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					...corsHeaders,
				},
			},
		);
	}

	try {
		responseData = await response.text();

		return new Response(
			JSON.stringify({
				success: response.ok,
				status: response.status,
				statusText: response.statusText,
				headers: Object.fromEntries([...response.headers]),
				data: responseData,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					...corsHeaders,
				},
			},
		);
	} catch (error) {
		response.clone();

		return new Response(
			JSON.stringify({
				success: response.ok,
				status: response.status,
				statusText: response.statusText,
				headers: Object.fromEntries([...response.headers]),
				data: "[Binary data not shown]",
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					...corsHeaders,
				},
			},
		);
	}
}
