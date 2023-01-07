export const shuffle = <T extends unknown[] | undefined>(array: T): T | undefined => {
	if (!array) return;
	return array.sort((a, b) => Math.random() > 0.5 ? 1 : -1) as T;
};