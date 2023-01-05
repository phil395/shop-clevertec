import { useEffect, useRef } from "react";

interface ISliderController {
	previews?: Element[];
	elements?: Element[];
	root?: HTMLElement;
	rootBounds?: DOMRectReadOnly;
	subscribers: ISubscribers;
}

type SubscriberCallback = React.Dispatch<React.SetStateAction<boolean>>;

export type SliderSubscribe = (callback: SubscriberCallback) => () => void;

interface ISubscribers {
	onFirstSlide?: SubscriberCallback;
	onLastSlide?: SubscriberCallback;
}

const INACTIVE_CLASS_PREVIEW = 'grayscale';

type ContainerType = Extract<keyof ISliderController, 'elements' | 'previews'>;

export const useSlider = () => {
	const controller = useRef<ISliderController>({ subscribers: {} } /* initController */);

	const selectPreview = (element: Element) => {
		const { previews, elements } = controller.current;
		if (!previews || !elements) return;

		const index = elements.indexOf(element);
		const targetPreview = previews[index];
		if (!targetPreview) return;

		for (const preview of previews) {
			preview.classList.add(INACTIVE_CLASS_PREVIEW);
		}
		targetPreview.classList.remove(INACTIVE_CLASS_PREVIEW);

		requestIdleCallback(() => {
			// browser can't scroll 2 elements at the same time
			// so make sure that the scrolling of the slide with the elements is completed
			targetPreview.scrollIntoView();
		});

	};

	const selectElement = (index: number) => {
		const { elements } = controller.current;

		if (!elements) return;

		if (
			index > elements.length - 1 ||
			index < 0
		) {
			return;
		}

		elements[index]?.scrollIntoView();
	};

	const toggleSlide = (direction: 'left' | 'right') => {
		return () => {
			const { root, rootBounds } = controller.current;
			if (!root || !rootBounds) return;
			const { width } = rootBounds;

			if (direction === 'left') {
				root.scrollBy(width, 0);
			} else {
				root.scrollBy(0 - width, 0);
			}
		};
	};

	const checkAndNotify = (firstVisible: Element, lastVisible: Element) => {
		const { elements, subscribers } = controller.current;
		if (!elements || !subscribers) return;

		let isFirstSlide = elements[0] === firstVisible;
		let isLastSlide = elements[elements.length - 1] === lastVisible;

		subscribers.onFirstSlide?.(isFirstSlide);
		subscribers.onLastSlide?.(isLastSlide);
	};

	useEffect(() => {
		const { elements, root, previews } = controller.current;
		if (!elements) return;

		const handleIntersect: IntersectionObserverCallback = (entries) => {
			const activeEntries: IntersectionObserverEntry[] = [];
			for (const entry of entries) {
				if (entry.isIntersecting) {
					activeEntries.push(entry);
				}
			}

			const lastEntry = activeEntries.pop();
			const firstEntry = activeEntries.length ? activeEntries[0] : lastEntry;
			if (!lastEntry || !firstEntry) return;

			controller.current.rootBounds = lastEntry.rootBounds as DOMRectReadOnly; // rewrite to detect in 'toggleSlide' ???

			checkAndNotify(firstEntry.target, lastEntry.target);
			if (previews) selectPreview(lastEntry.target);
		};

		const observer = new IntersectionObserver(handleIntersect, {
			root,
			threshold: 1
		});

		for (const element of elements) {
			observer.observe(element);
		}

		return () => observer.disconnect();

	}, [controller.current.elements]);

	const initializeController = (type: ContainerType) => {
		return (node: HTMLElement | null) => {
			if (!node) {
				controller.current = { subscribers: {} }; /* reset Controller */
				return;
			}
			controller.current[type] = Array.from(node.children);
			if (type === 'previews') return;
			controller.current.root = node;
		};
	};

	const initializeElements = initializeController('elements');
	const initializePreviews = initializeController('previews');


	const subscribe = <T extends keyof ISubscribers>(type: T) => {
		return (callback: ISubscribers[T]) => {
			const { subscribers } = controller.current;
			subscribers[type] = callback;
			console.log('Add subscriber', { type, callback, subscribers });

			return () => {
				subscribers[type] = undefined;
				console.log('Remove subscriber', { type, callback, subscribers });
			};
		};
	};

	// TODO: add useMemo
	return {
		initializeElements,
		initializePreviews,
		nextSlide: toggleSlide('right'),
		prevSlide: toggleSlide('left'),
		selectElement, // scrollToElement,
		subscribeOnFirst: subscribe('onFirstSlide'),
		subscribeOnLast: subscribe('onLastSlide')
	};
};