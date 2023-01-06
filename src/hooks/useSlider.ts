import { useEffect, useRef } from "react";

interface ISliderController {
	previews?: HTMLElement[];
	elements?: HTMLElement[];
	elementsRoot?: HTMLElement;
	// rootBounds?: DOMRectReadOnly;
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


	const selectPreview = (element: HTMLElement) => {
		const { previews, elements } = controller.current;
		if (!previews || !elements) return;

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
		const { offsetTop } = targetPreview;
		const previewRoot = targetPreview.parentElement;
		previewRoot?.scrollTo(0, offsetTop);
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
		elementsRoot.scrollTo(offsetLeft, 0);
	};


	const toggleSlide = (direction: 'left' | 'right') => {
		return () => {
			const { elementsRoot } = controller.current;
			if (!elementsRoot) return;
			const { width } = elementsRoot.getBoundingClientRect();

			if (direction === 'left') {
				elementsRoot.scrollBy(width, 0);
			} else {
				elementsRoot.scrollBy(0 - width, 0);
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
				return;
			}
			controller.current[type] = Array.from(node.children) as HTMLElement[];
			node.classList.add(CSS_CLASS.relative); // set as offsetParent
			if (type === 'previews') return;
			controller.current.elementsRoot = node;
		};
	};


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
		initializeElements: initializeController('elements'),
		initializePreviews: initializeController('previews'),
		nextSlide: toggleSlide('right'),
		prevSlide: toggleSlide('left'),
		selectElement, // scrollToElement,
		subscribeOnFirst: subscribe('onFirstSlide'),
		subscribeOnLast: subscribe('onLastSlide')
	};
};