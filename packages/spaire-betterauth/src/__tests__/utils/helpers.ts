import { vi } from "vitest";
import type { SpaireOptions } from "../../types";
import { createMockSpaireClient } from "./mocks";

export const createTestSpaireOptions = (
	overrides: Partial<SpaireOptions> = {},
): SpaireOptions => ({
	client: createMockSpaireClient(),
	createCustomerOnSignUp: true,
	use: [],
	...overrides,
});

export { createMockSpaireClient };

export const mockApiError = (status: number, message: string) => {
	const error = new Error(message) as any;
	error.status = status;
	error.response = {
		status,
		data: { error: { message } },
	};
	return error;
};

export const mockApiResponse = <T>(data: T) => Promise.resolve({ data });

export const createMockMiddleware = () => {
	const middleware = vi.fn();
	middleware.mockImplementation((context, next) => next());
	return middleware;
};
