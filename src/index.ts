import { handleRequest } from "./handlers/requestHandler";

// biome-ignore lint/suspicious/noEmptyInterface: interface is required for the Cloudflare Workers type system
export interface Env {}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		return handleRequest(request);
	},
} satisfies ExportedHandler<Env>;
