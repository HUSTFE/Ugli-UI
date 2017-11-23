export interface ISwiperOptions {
    startSlideIndex?: number;
    speed?: number;
    continuous?: true;
    resistance?: number;
    shouldSlideChange?(slideIndex: number): boolean;
    slideDidChange?(slideIndex: number): any;
}
export declare class Swiper {
    private _container;
    private _options;
    private _slides;
    private _wrapper;
    private _slideWidth;
    private _index;
    private _currentTranslate;
    private _touchStartPosition;
    private _touchStartTime;
    private _delta;
    private _isPastingBounds;
    constructor(container: HTMLElement | string, options?: ISwiperOptions);
    private _onTouchStart;
    private _onTouchMove;
    private _onTouchEnd;
    private _translate(index, translateValue, transition?);
    private _circle(index);
    /**
     * set current slide's index and slide to the specified slide.
     */
    currentIndex: number;
}
export default Swiper;
