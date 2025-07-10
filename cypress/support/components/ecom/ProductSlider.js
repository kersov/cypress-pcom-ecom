const BasicComponent = require('../base/BasicComponent');
const ProductTileGroup = require('./ProductTileGroup');
const Link = require('../base/Link');

/**
 * Represents a product slider carousel component on the ecommerce page.
 * @extends BasicComponent
 */
class ProductSlider extends BasicComponent {
    /**
     * Creates a new instance of ProductSlider.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.container] - Selector for the main slider container.
     * @param {string} [selectors.title] - Selector for the slider title.
     * @param {string} [selectors.slides] - Selector for all slides.
     * @param {string} [selectors.prevButton] - Selector for the previous button.
     * @param {string} [selectors.nextButton] - Selector for the next button.
     */
    constructor(uid, selectors = {}) {
        // Default slider container selector
        const containerSelector = selectors.container || '.recommended_items';
        super(uid, containerSelector);
        
        // Initialize subcomponents with default selectors based on parent selector
        this.title = new BasicComponent(
            `${uid}-title`,
            selectors.title || `${this.selector} .title`
        );
        
        this.slides = new ProductTileGroup(
            `${uid}-productTiles`,
            selectors.productTiles || `${this.selector} .product-image-wrapper`
        );
        
        this.prevButton = new Link(
            `${uid}-prevButton`,
            selectors.prevButton || `${this.selector} .recommended-item-control[data-slide="prev"]`
        );
        
        this.nextButton = new Link(
            `${uid}-nextButton`,
            selectors.nextButton || `${this.selector} .recommended-item-control[data-slide="next"]`
        );
    }

    /**
     * Clicks the next button to go to the next slide.
     * @returns {ProductSlider} This instance of ProductSlider for chaining calls.
     */
    clickNext() {
        this.nextButton.click();
        return this;
    }

    /**
     * Clicks the previous button to go to the previous slide.
     * @returns {ProductSlider} This instance of ProductSlider for chaining calls.
     */
    clickPrev() {
        this.prevButton.click();
        return this;
    }
}

module.exports = ProductSlider;
