export function env() {
	const { NODE_ENV, VITE_APP_CODE, VITE_APP_BASE_URL, VITE_API_BASE_URL, VITE_API_PXY_URL } = import.meta.env;
	// 如果名字变换了，可以在这里解构别名
	return {
		NODE_ENV,
		VITE_APP_CODE,
		VITE_APP_BASE_URL,
		VITE_API_BASE_URL,
		VITE_API_PXY_URL,
	};
}
