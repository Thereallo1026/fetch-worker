import { corsHeaders, handleCorsPreflightRequest } from "../utils/corsHeaders";
import { executeFetch } from "./fetchExecutor";
import type { FetchConfig } from "./fetchExecutor";

const usageInfo = {
	description: "Fetch Worker API Proxy",
	usage:
		"Send a POST request with a JSON payload containing fetch configuration",
	example: {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: {
			url: "https://api.example.com/data",
			method: "GET",
			headers: {
				Authorization: "Bearer YOUR_TOKEN",
			},
		},
	},
	responseFormat: {
		success: true,
		status: 200,
		statusText: "OK",
		headers: {
			"content-type": "application/json",
		},
		data: "Response data from the target API",
	},
};

/**
 * Handles incoming requests to the worker
 *
 * @param request The incoming request
 * @returns Response object
 */
export async function handleRequest(request: Request): Promise<Response> {
	if (request.method === "OPTIONS") {
		return handleCorsPreflightRequest();
	}

	if (
		request.method === "GET" ||
		request.headers.get("content-type") !== "application/json"
	) {
		return new Response(JSON.stringify(usageInfo, null, 2), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				...corsHeaders,
			},
		});
	}

	try {
		const payload = (await request.json()) as FetchConfig;

		if (!payload || typeof payload !== "object") {
			throw new Error("Invalid payload format");
		}

		if (!payload.url) {
			throw new Error("URL is required");
		}

		return await executeFetch(payload);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Error processing request";

		return new Response(
			JSON.stringify({
				success: false,
				error: errorMessage,
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
					...corsHeaders,
				},
			},
		);
	}
}
