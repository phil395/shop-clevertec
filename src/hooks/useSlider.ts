import { useEffect, useMemo, useRef } from "react";

interface ISliderController {
	previews?: HTMLElement[];
	elements?: HTMLElement[];

	previewsRoot?: HTMLElement;
	elementsRoot?: HTMLElement;

	subscribers: ISubscribers;
}

type SubscriberCallback = React.Dispatch<React.SetStateAction<boolean>>;

export type SliderSubscribe = (callback: SubscriberCallback) => () => void;

interface ISubscribers {
	onFirstSlide?: SubscriberCallback;
	onLastSlide?: SubscriberCallback;
}

const CSS_CLASS = {
	inactivePreview: 'grayscale',
	relative: 'relative'
};

type ContainerType = Extract<keyof ISliderController, 'elements' | 'previews'>;

export const useSlider = () => {
	const controller = useRef<ISliderController>({ subscribers: {} } /* initController */);

	const getDirection = (root: HTMLElement) => {
		const { scrollWidth, offsetWidth, scrollHeight, offsetHeight } = root;

		if (scrollWidth > offsetWidth) {
			return 'vertical';
		}

		if (scrollHeight > offsetHeight) {
			return 'horizontal';
		}
	};


	const selectPreview = (element: HTMLElement) => {
		const { previews, elements, previewsRoot } = controller.current;
		if (!previews || !elements || !previewsRoot) return;

		// find target element
		const index = elements.indexOf(element);
		const targetPreview = previews[index];
		if (!targetPreview) return;

		// treat classes
		for (const preview of previews) {
			preview.classList.add(CSS_CLASS.inactivePreview);
		}
		targetPreview.classList.remove(CSS_CLASS.inactivePreview);

		// treat scroll
		const { offsetTop, offsetLeft } = targetPreview;
		const direction = getDirection(previewsRoot);
		if (!direction) return;
		const args: readonly [number, number] = direction === 'vertical'
			? [offsetLeft, 0]
			: [0, offsetTop];
		previewsRoot.scrollTo(...args);
	};


	const selectElement = (index: number) => {
		const { elements, elementsRoot } = controller.current;
		if (
			!elements || !elementsRoot ||
			index > elements.length - 1 || index < 0
		) {
			return;
		}
		const targetElement = elements[index];
		const { offsetLeft } = targetElement;
		// always vertical direction
		console.log({ index, elements, previews: controller.current.previews });
		elementsRoot.scrollTo(offsetLeft, 0);
	};


	const toggleSlide = (type: 'next' | 'prev') => {
		return () => {
			const { elementsRoot } = controller.current;
			if (!elementsRoot) return;
			const { width, height } = elementsRoot.getBoundingClientRect();

			const direction = getDirection(elementsRoot);
			if (!direction) return;
			const args: readonly [number, number] = direction === 'vertical'
				? [(type === 'next' ? width : -width), 0]
				: [0, (type === 'next' ? height : -height)];
			elementsRoot.scrollBy(...args);
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
		const { elements, elementsRoot, previews } = controller.current;
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

			checkAndNotify(firstEntry.target, lastEntry.target);
			if (previews) selectPreview(lastEntry.target as HTMLElement);
		};

		const observer = new IntersectionObserver(handleIntersect, {
			root: elementsRoot,
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
				controller.current = { subscribers: {} }; // reset Controller
				console.log('unsubscribe');
				return;
			}
			controller.current[type] = Array.from(node.children) as HTMLElement[];
			node.classList.add(CSS_CLASS.relative); // set as offsetParent

			if (type === 'previews') {
				controller.current.previewsRoot = node;
			} else {
				controller.current.elementsRoot = node;
			}
		};
	};


	const subscribe = <T extends keyof ISubscribers>(type: T) => {
		return (callback: ISubscribers[T]) => {
			const { subscribers } = controller.current;
			subscribers[type] = callback;
			// console.log('Add subscriber', { type, callback, subscribers });

			return () => {
				subscribers[type] = undefined;
				// console.log('Remove subscriber', { type, callback, subscribers });
			};
		};
	};


	return useMemo(() => ({
		elementsRef: initializeController('elements'),
		previewsRef: initializeController('previews'),
		nextSlide: toggleSlide('next'),
		prevSlide: toggleSlide('prev'),
		selectElement, // scrollToElement,
		subscribeOnFirst: subscribe('onFirstSlide'),
		subscribeOnLast: subscribe('onLastSlide')
	}), []);
};