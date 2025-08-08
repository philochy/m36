const baseUrl = process.env.ORIGIN?.startsWith('www')
	? `https://${process.env.ORIGIN}`
	: `https://www.${process.env.ORIGIN}`;
export const baseConfig = {
	baseUrl,
	allowRobots: false,
};
