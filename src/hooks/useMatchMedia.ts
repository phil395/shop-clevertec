import { useEffect, useReducer } from "react";

/**
 * A strict sequence is required. 
 * The difference between the records is 1px. 
 * Intersections of values are not allowed.
 * Correct:  
 * 		first: '(max-width: 479px)', second: '(min-width: 480px) and (max-width: 575px)'
 * Incorrect:
 * 		first: '(max-width: 479px)', second: '(min-width: 481px) and (max-width: 575px)'
 * 		first: '(max-width: 479px)', second: '(min-width: 479px) and (max-width: 575px)'
 * 		first: '(max-width: 479px)', second: '(min-width: 478px) and (max-width: 575px)'
 */
const SCREEN_SIZES = {
	/** <= 479 */
	xs: '(max-width: 479px)',
	/**  480 - 575 */
	sm: '(min-width: 480px) and (max-width: 575px)',
	/**  576 - 767  */
	md: '(min-width: 576px) and (max-width: 767px)',
	/** 768 - 991 */
	lg: '(min-width: 768px) and (max-width: 991px)',
	/** >= 992 */
	xl: '(min-width: 992px)'
};

const SERVER_STATE: ScreenState = { xs: false, sm: false, md: false, lg: false, xl: true };

type ScreenState = {
	[Screen in keyof typeof SCREEN_SIZES]: boolean
};

const mqlsMap = new Map(
	Object.entries(SCREEN_SIZES)
		.map(([screen, query]) => [query, screen]) as [string, keyof ScreenState][]
);

const isServer = typeof window === 'undefined';
const screenChangeEvent = isServer ? null : new CustomEvent('screen-changed');

let currentState: ScreenState = SERVER_STATE;
let qtySubscribers = 0;
let mqls: MediaQueryList[] | null = null;

const getInitialMatches = () => {
	for (const [screen, query] of Object.entries(SCREEN_SIZES) as [keyof ScreenState, string][]) {
		currentState[screen] = window.matchMedia(query).matches;
	}
};

const changeHandler = (e: MediaQueryListEvent) => {
	// the function is called twice with an interval of a couple of milliseconds
	// first call:  e.matches === true (first string); second:  e.matches === false (second string)
	// the media query strings are different (they neighbors)
	// Example. Transition from 400 px to 500px
	//    media: '(max-width: 479px)', matches: false
	//    media: '(min-width: 480px) and (max-width: 575px)', matches: true
	const screen = mqlsMap.get(e.media);
	if (!screen) return;
	currentState[screen] = e.matches;
	if (e.matches === false) return; // skip one of two calls
	window.dispatchEvent(screenChangeEvent as Event);
};


export const useMatchMedia = () => {
	const [_, forceUpdate] = useReducer((v: number) => v + 1, 0);

	useEffect(() => {
		window.addEventListener('screen-changed', forceUpdate);
		return () => window.removeEventListener('screen-changed', forceUpdate);
	}, []);

	useEffect(() => {
		qtySubscribers++;

		if (currentState === SERVER_STATE) {
			getInitialMatches();
			forceUpdate();
		}

		return () => {
			qtySubscribers--;
			if (qtySubscribers) return;

			for (const mql of mqls || []) {
				mql.removeEventListener('change', changeHandler);
			}
			mqls = null;
		};
	}, []);


	useEffect(() => {
		if (mqls) return;

		mqls = Object.values(SCREEN_SIZES).map(value => window.matchMedia(value));

		for (const mql of mqls) {
			mql.addEventListener('change', changeHandler);
		}

	}, [mqls]);

	return currentState;
};