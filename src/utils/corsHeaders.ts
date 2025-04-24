export const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

/**
 * CORS preflight response
 */
export function handleCorsPreflightRequest(): Response {
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}
