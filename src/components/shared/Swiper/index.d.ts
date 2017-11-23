export interface ISwiperOptions {
    startSlideIndex?: number;
    speed?: number;
    auto?: 0;
    continuous?: boolean;
    disableScroll?: false;
    resistance?: number;
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
    private _mousedown;
    private _isScrolling;
    private _autoInterval;
    constructor(container: HTMLElement | string, options?: ISwiperOptions);
    /**
     * Slide the swiper to specified index.
     * @param index
     * @param callback
     */
    slideTo(index: number, callback?: (currentIndex: number) => void): void;
    /**
     * Slide the swiper to previous index.
     */
    preSlide(): void;
    /**
     * Slide the swiper to next index.
     */
    nextSlide(): void;
    /**
     * Destroy this slider.
     */
    destroy(): void;
    /**
     * Start auto play.
     * @param time
     */
    startAuto(time?: number): void;
    /**
     * Stop auto play.
     */
    stopAuto(): void;
    private _slideToOnce(index, speed, callback);
    private _onTouchStart;
    private _onTouchMove;
    private _onTouchEnd;
    private _onMouseDown;
    private _onMouseMove;
    private _onMouseUp;
    private _onMouseOut;
    private _start(x, y);
    private _move(x, y, e);
    private _end;
    private _translate(index, translateValue, transition?, callback?);
    private _circle(index);
    /**
     * set current slide's index and slide to the specified slide.
     */
    currentIndex: number;
}
export default Swiper;
