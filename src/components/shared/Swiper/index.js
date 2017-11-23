import combine from './utils/combine';
export class Swiper {
    constructor(container, options = {}) {
        this._container = null;
        this._options = {};
        // will be changed during sliding
        this._index = 0; // current slide index.
        this._touchStartPosition = { x: 0, y: 0 }; // position where slide start, will be update during touch
        this._touchStartTime = 0; // timestamp (in ms)
        this._delta = { x: 0, y: 0 }; // vector of touch delta
        this._isPastingBounds = false; // flag if current swipe is pasting bounds
        // /**
        //  * Slide the swiper to specified index.
        //  * @param index
        //  * @param callback
        //  */
        // public slideTo(index: number, callback: (currentIndex: number) => void) {
        // }
        this._onTouchStart = (e) => {
            if (e.touches.length === 1) {
                // we record this two values to calculate swipe speed.
                this._touchStartPosition = {
                    x: e.touches[0].pageX,
                    y: e.touches[0].pageY,
                };
                this._touchStartTime = Date.now();
            }
        };
        this._onTouchMove = (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const options = this._options;
                // dx will be changed due to resistance.
                let dx = this._delta.x = touch.pageX - this._touchStartPosition.x;
                this._delta.y = touch.pageY - this._touchStartPosition.y;
                this._isPastingBounds =
                    (!this._index && dx > 0) || // if first slide and slide amt is greater than 0
                        (this._index === this._slides.length - 1 && dx < 0); // or if last slide and slide amt is less than 0
                if (this._isPastingBounds && !options.continuous) {
                    // We will make resistance for better xp
                    // Use this function as resistance function:
                    // ^ y
                    // |                                 y = x^(1-r/2), 0 <= r <= 1.
                    // |                                                   XXXX
                    // |                                 XXXXX XX XXXX XXXX
                    // |                      XXXXXXXXX X
                    // |                 XXXXX
                    // |             XXXX
                    // |          XXX
                    // |        XX
                    // |      XX
                    // |    XX
                    // |   XX
                    // |  XX
                    // | X
                    // |X
                    // X---------------------------------------------------------> x
                    const sign = Math.abs(dx) / dx;
                    dx = (sign * (Math.pow(Math.abs(dx), (1 - ((options.resistance || 0) / 2)))));
                }
                const cachedCurrentTranslate = this._currentTranslate;
                const [t1, t2, t3] = [
                    dx + cachedCurrentTranslate[this._circle(this._index - 1)],
                    dx + cachedCurrentTranslate[this._circle(this._index)],
                    dx + cachedCurrentTranslate[this._circle(this._index + 1)],
                ];
                this._translate(this._index, t2);
                // this._translate(this._index - 1, t1)
                // this._translate(this._index + 1, t3)
                if (options.continuous) {
                    // when user want it continuous, we need to translate
                    // both left & right.
                    this._translate(this._index - 1, t1);
                    this._translate(this._index + 1, t3);
                }
                else if (!this._index && dx > 0) {
                    // when user want it not continuous, if it is pasting
                    // left bounds, we won't show the left.
                    this._translate(this._index + 1, t3);
                }
                else if (this._index === this._slides.length - 1 && dx < 0) {
                    // when user want it not continuous, if it is pasting
                    // right bounds, we won't show the right.
                    this._translate(this._index - 1, t1);
                }
                else {
                    this._translate(this._index - 1, t1);
                    this._translate(this._index + 1, t3);
                }
            }
        };
        this._onTouchEnd = (e) => {
            if (e.changedTouches.length === 1) {
                // After a touch is end, we need to know if this
                // touch is a valid swipe.
                const duration = Date.now() - this._touchStartTime;
                // cache for better performance, `let` is used for re-cache
                const dx = this._delta.x;
                const slideWidth = this._slideWidth;
                let cachedIndex = this._index;
                // this judgement is acceptable to most people.
                const isValidSlide = (duration < 250 && // if slide duration is less than 250ms
                    Math.abs(dx) > 20 // and if slide amt is greater than 20px
                ) ||
                    Math.abs(dx) > this._slideWidth / 2; // or if slide amt is greater than half the width
                // user accept continuous, so we allow swipe.
                if (this._options.continuous) {
                    this._isPastingBounds = false;
                }
                // determine direction of swipe (true:right, false:left)
                const direction = dx < 0;
                const speed = this._options.speed || 0;
                if (isValidSlide && !this._isPastingBounds) {
                    if (direction) {
                        cachedIndex = this._index = this._circle(cachedIndex + 1);
                    }
                    else {
                        cachedIndex = this._index = this._circle(cachedIndex - 1);
                    }
                }
                else {
                    cachedIndex = this._index = this._circle(cachedIndex);
                }
                const [i1, i2, i3] = [
                    this._circle(this._index - 1),
                    this._circle(this._index),
                    this._circle(this._index + 1),
                ];
                // This is most important because without this statement,
                // our slides will slide through the wrapper Element, giving
                // our current slide a flash.
                this._translate(this._circle(this._index + 2), this._slideWidth);
                // Then we just need to deal with left, current, right slides.
                this._translate(i1, -slideWidth, speed);
                this._translate(i2, 0, speed);
                this._translate(i3, slideWidth, speed);
                this._currentTranslate[i1] = -slideWidth;
                this._currentTranslate[i2] = 0;
                this._currentTranslate[i3] = slideWidth;
            }
        };
        if (typeof container === 'string') {
            this._container = document.querySelector(container);
        }
        this._container = this._container || null;
        if (!this._container) {
            throw new TypeError('A container is needed as `Element` to create an instance of Swiper.');
        }
        // init the config
        this._options = combine({
            resistance: 0.5,
            speed: 300,
            startSlideIndex: 1,
            // auto: 0,
            continuous: false,
            // disableScroll: false,
            // stopPropagation: false,
            shouldSlideChange: () => true,
            slideDidChange: () => undefined,
        }, options);
        // Written for modern browser, we assume that the
        // environment supports transition, transfrom, and
        // addEventListener
        // I prefer DOM structure like this:
        //
        // <div class='swipe'>
        //   <div class='swipe-wrap'>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //   </div>
        // </div>
        // So, we will check if DOM structure matches.
        // Use children instead of childNodes to filter Text node.
        if (this._container.children.length <= 0) {
            throw new ReferenceError('The container element you provide has no child.');
        }
        this._wrapper = this._container.children[0];
        this._slides = Array.from(this._wrapper.children);
        this._slideWidth = this._container.clientWidth;
        // We extend the wrapper's width to `slides.length * slideWidth`
        this._wrapper.style.width = `${this._slideWidth * this._slides.length}px`;
        // So, obviously, container must have style `overflow: hidden`.
        this._container.style.overflow = 'hidden';
        this._container.style.overflow = 'relative';
        // Then we set all slides to `float: left`.
        // like this:
        //                                      wrapper
        // +---------------+---------------+---------------+----------------+----------------+
        // |               |               |               |                |                |
        // |               |               |               |                |                |
        // |               |               |               |                |                |
        // |    slide 1    |       2       |       3       |       4        |       5        |
        // |               |               |               |                |                |
        // |               |               |               |                |                |
        // |   container   |               |               |                |                |
        // |               |               |               |                |                |
        // |               |               |               |                |                |
        // |               |               |               |                |                |
        // +---------------+---------------+---------------+----------------+----------------+
        this._currentTranslate = new Array(this._slides.length).fill(0);
        // `float: left` is the most important style for each slide.
        // We also need to add `left: -${i * slideWidth}px`
        this._slides.forEach((slide, i) => {
            slide.style.cssFloat = 'left';
            slide.style.position = 'relative';
            slide.style.width = `${this._slideWidth}px`;
            slide.style.left = `${-i * this._slideWidth}px`;
            slide.style.transform = `translate3d(${this._slideWidth}px, 0px, 0px)`;
            this._currentTranslate[i] = this._slideWidth;
        });
        // But in this way, our wrapper element will be height: 0,
        // so we add `overflow: hidden` to wrapper's style to avoid
        // wrapper element collapsing.
        this._wrapper.style.overflow = 'hidden';
        this._wrapper.style.overflow = 'relative';
        // After we add `left: -${i * slideWidth}px`
        //                                      wrapper
        // +---------------+
        // |               |
        // |               |
        // |               |
        // |    slide 5    |
        // |               |
        // |               |
        // |   container   |
        // |               |
        // |               |
        // |               |
        // +---------------+
        // You can see, all other slides have been covered by the last one.
        // We have finished basic layout.
        this._index = this._circle(this._options.startSlideIndex || 0) || 0;
        this._translate(this._index - 1, -this._slideWidth);
        this._translate(this._index, 0);
        this._translate(this._index + 1, this._slideWidth);
        // slides[circle(this.index - 1)].style.transform = `translate3d(${slideWidth}px, 0px, 0px)`
        this._currentTranslate[this._circle(this._index - 1)] = -this._slideWidth;
        this._currentTranslate[this._index] = 0;
        this._currentTranslate[this._circle(this._index + 1)] = this._slideWidth;
        // we need to add Event listener to make our swiper be live.
        this._wrapper.addEventListener('touchstart', this._onTouchStart, false);
        this._wrapper.addEventListener('touchmove', this._onTouchMove, false);
        this._wrapper.addEventListener('touchend', this._onTouchEnd, false);
    }
    _translate(index, translateValue, transition = 0) {
        const circledIndex = this._circle(index);
        // cache the style reference to make it faster.
        const style = this._slides[circledIndex].style;
        // Only when transition is valid can we set transition & EventListener
        if (transition > 0) {
            style.transition = `transform ${transition}ms`;
            const slideElement = this._slides[circledIndex];
            // const preTransitionValue: string | null = style.transition
            const onTransitionEnd = () => {
                style.transition = '';
                slideElement.removeEventListener('transitionend', onTransitionEnd);
            };
            slideElement.addEventListener('transitionend', onTransitionEnd);
        }
        else {
            if (style.transition) {
                // when `style.transition` has a valid value, we need to
                // remove it, otherwise we will have a transition even though
                // `transition = 0`.
                style.transition = '';
            }
        }
        // use transition3d to accelerate.
        style.transform = `translate3d(${translateValue}px, 0px, 0px)`;
    }
    // Then we define a helper function to calculate correct index.
    // This function help us calculate next or prev slide's index.
    _circle(index) {
        return (this._slides.length + (index % this._slides.length)) % this._slides.length;
    }
    /**
     * set current slide's index and slide to the specified slide.
     */
    get currentIndex() {
        return this._index;
    }
    set currentIndex(index) {
        this._index = index;
    }
}
window.Swiper = Swiper;
export default Swiper;
