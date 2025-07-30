const BasicComponent = require('../base/BasicComponent');
const Link = require('../base/Link');

/**
 * Represents the hero carousel component on the homepage.
 * @extends BasicComponent
 */
class HeroCarousel extends BasicComponent {
    /**
     * Creates a new instance of HeroCarousel.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.carousel] - Selector for the main carousel container.
     * @param {string} [selectors.carouselInner] - Selector for the carousel inner container.
     * @param {string} [selectors.carouselItems] - Selector for carousel items.
     * @param {string} [selectors.title] - Selector for the main title.
     * @param {string} [selectors.subtitle] - Selector for the subtitle.
     * @param {string} [selectors.description] - Selector for the description text.
     * @param {string} [selectors.testCasesButton] - Selector for the Test Cases button.
     * @param {string} [selectors.apiListButton] - Selector for the APIs list button.
     * @param {string} [selectors.prevButton] - Selector for the previous button.
     * @param {string} [selectors.nextButton] - Selector for the next button.
     * @param {string} [selectors.indicators] - Selector for carousel indicators.
     */
    constructor(uid, selectors = {}) {
        // Default carousel selector
        const carouselSelector = selectors.carousel || '#slider-carousel';
        super(uid, carouselSelector);
        
        // Initialize subcomponents with default selectors
        this.carouselInner = new BasicComponent(
            `${uid}-carouselInner`,
            selectors.carouselInner || `${this.selector} .carousel-inner`
        );
        
        this.carouselItems = new BasicComponent(
            `${uid}-carouselItems`,
            selectors.carouselItems || `${this.selector} .carousel-inner .item`
        );
        
        this.title = new BasicComponent(
            `${uid}-title`,
            selectors.title || `${this.selector} .carousel-inner .item.active h1`
        );
        
        this.subtitle = new BasicComponent(
            `${uid}-subtitle`,
            selectors.subtitle || `${this.selector} .carousel-inner .item.active h2`
        );
        
        this.description = new BasicComponent(
            `${uid}-description`,
            selectors.description || `${this.selector} .carousel-inner .item.active p`
        );
        
        this.testCasesButton = new Link(
            `${uid}-testCasesButton`,
            selectors.testCasesButton || `${this.selector} .carousel-inner .item.active a.test_cases_list`
        );
        
        this.apiListButton = new Link(
            `${uid}-apiListButton`,
            selectors.apiListButton || `${this.selector} .carousel-inner .item.active a.apis_list`
        );
        
        this.prevButton = new Link(
            `${uid}-prevButton`,
            selectors.prevButton || `${this.selector} .left.control-carousel`
        );
        
        this.nextButton = new Link(
            `${uid}-nextButton`,
            selectors.nextButton || `${this.selector} .right.control-carousel`
        );
        
        this.indicators = new BasicComponent(
            `${uid}-indicators`,
            selectors.indicators || `${this.selector} .carousel-indicators`
        );
        
        // Add all subcomponents as nested components
        this.addNestedComponent(this.carouselInner);
        this.addNestedComponent(this.carouselItems);
        this.addNestedComponent(this.title);
        this.addNestedComponent(this.subtitle);
        this.addNestedComponent(this.description);
        this.addNestedComponent(this.testCasesButton);
        this.addNestedComponent(this.apiListButton);
        this.addNestedComponent(this.prevButton);
        this.addNestedComponent(this.nextButton);
        this.addNestedComponent(this.indicators);
    }
    
    /**
     * Gets the main title component.
     * @returns {BasicComponent} The title component.
     */
    getTitle() {
        return this.title;
    }
    
    /**
     * Gets the subtitle component.
     * @returns {BasicComponent} The subtitle component.
     */
    getSubtitle() {
        return this.subtitle;
    }
    
    /**
     * Gets the description component.
     * @returns {BasicComponent} The description component.
     */
    getDescription() {
        return this.description;
    }
    
    /**
     * Clicks the Test Cases button.
     * @returns {HeroCarousel} This instance of HeroCarousel for chaining calls.
     */
    clickTestCases() {
        this.testCasesButton.click();
        return this;
    }
    
    /**
     * Clicks the APIs list button.
     * @returns {HeroCarousel} This instance of HeroCarousel for chaining calls.
     */
    clickApiList() {
        this.apiListButton.click();
        return this;
    }
    
    /**
     * Clicks the previous button to go to the previous slide.
     * @returns {HeroCarousel} This instance of HeroCarousel for chaining calls.
     */
    clickPrev() {
        this.prevButton.click();
        return this;
    }
    
    /**
     * Clicks the next button to go to the next slide.
     * @returns {HeroCarousel} This instance of HeroCarousel for chaining calls.
     */
    clickNext() {
        this.nextButton.click();
        return this;
    }
    
    /**
     * Clicks on a specific carousel indicator by index.
     * @param {number} index - The index of the indicator to click (0-based).
     * @returns {HeroCarousel} This instance of HeroCarousel for chaining calls.
     */
    clickIndicator(index) {
        cy.get(`${this.indicators.selector} li`).eq(index).click();
        return this;
    }
    
    /**
     * Waits for the carousel to be loaded and visible.
     * @returns {HeroCarousel} This instance of HeroCarousel for chaining calls.
     */
    shouldBeLoaded() {
        this.shouldBeVisible();
        this.carouselInner.shouldBeVisible();
        this.title.shouldBeVisible();
        this.subtitle.shouldBeVisible();
        return this;
    }
}

module.exports = HeroCarousel;
