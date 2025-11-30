/**
 * Create Your Own Kit - Storefront Widget
 * 
 * Usage:
 * <div id="kit-builder" data-kit-id="YOUR_KIT_ID"></div>
 * <script src="https://your-app.railway.app/kit-builder.js"></script>
 */

(function() {
  'use strict';

  class KitBuilder {
    constructor(containerId, kitId) {
      this.container = document.getElementById(containerId);
      this.kitId = kitId;
      this.shopDomain = window.Shopify?.shop || '';
      this.selectedProducts = [];
      this.kitConfig = null;
      this.products = [];
      
      this.init();
    }

    async init() {
      try {
        await this.loadKitConfig();
        await this.loadProducts();
        this.render();
        this.attachEventListeners();
      } catch (error) {
        console.error('Kit Builder initialization error:', error);
        this.showError('Failed to load kit builder');
      }
    }

    async loadKitConfig() {
      const response = await fetch(`/storefront/kits/${this.kitId}?shop=${this.shopDomain}`);
      const data = await response.json();
      this.kitConfig = data.kit;
    }

    async loadProducts() {
      // In production, this would fetch from Shopify API
      // For now, using mock data
      this.products = await this.fetchShopifyProducts();
    }

    async fetchShopifyProducts() {
      // This should integrate with Shopify Storefront API
      // Mock data for demonstration
      return [
        { id: '1', title: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/200' },
        { id: '2', title: 'Product 2', price: 39.99, image: 'https://via.placeholder.com/200' },
        { id: '3', title: 'Product 3', price: 49.99, image: 'https://via.placeholder.com/200' },
        { id: '4', title: 'Product 4', price: 59.99, image: 'https://via.placeholder.com/200' },
        { id: '5', title: 'Product 5', price: 69.99, image: 'https://via.placeholder.com/200' },
      ];
    }

    render() {
      const { customMessage, minProducts, maxProducts, layoutStyle } = this.kitConfig;
      
      this.container.innerHTML = `
        <div class="kit-builder-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <style>
            .kit-builder-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
            .kit-header { text-align: center; margin-bottom: 30px; }
            .kit-title { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
            .kit-message { font-size: 16px; color: #666; margin-bottom: 20px; }
            .kit-progress { background: #f0f0f0; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 20px; }
            .kit-progress-bar { height: 100%; background: #4CAF50; transition: width 0.3s; }
            .kit-products { display: ${layoutStyle === 'grid' ? 'grid' : 'flex'}; 
                           ${layoutStyle === 'grid' ? 'grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));' : 'flex-direction: column;'}
                           gap: 20px; margin-bottom: 30px; }
            .kit-product { border: 2px solid #e0e0e0; border-radius: 8px; padding: 15px; cursor: pointer; transition: all 0.3s; }
            .kit-product:hover { border-color: #999; transform: translateY(-2px); }
            .kit-product.selected { border-color: #4CAF50; background: #f0fff0; }
            .kit-product-image { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px; }
            .kit-product-title { font-weight: 600; margin-bottom: 5px; }
            .kit-product-price { color: #666; font-size: 18px; font-weight: bold; }
            .kit-summary { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .kit-summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .kit-summary-total { font-size: 20px; font-weight: bold; padding-top: 10px; border-top: 2px solid #ddd; }
            .kit-add-button { width: 100%; padding: 15px; font-size: 18px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
            .kit-add-button:disabled { opacity: 0.5; cursor: not-allowed; }
            .kit-error { color: #d32f2f; text-align: center; padding: 20px; }
          </style>

          <div class="kit-header">
            <h2 class="kit-title">${this.kitConfig.title}</h2>
            ${customMessage ? `<p class="kit-message">${customMessage}</p>` : ''}
            <div class="kit-progress">
              <div class="kit-progress-bar" id="kitProgressBar" style="width: 0%"></div>
            </div>
            <p id="kitProgressText" style="color: #666; font-size: 14px;">
              Select ${minProducts} ${maxProducts ? `to ${maxProducts}` : 'or more'} products
            </p>
          </div>

          <div class="kit-products" id="kitProducts">
            ${this.renderProducts()}
          </div>

          <div class="kit-summary" id="kitSummary">
            ${this.renderSummary()}
          </div>

          <button 
            class="kit-add-button" 
            id="kitAddButton"
            style="background-color: ${this.kitConfig.buttonColor}; color: ${this.kitConfig.buttonTextColor};"
            disabled
          >
            ${this.kitConfig.buttonText}
          </button>
        </div>
      `;
    }

    renderProducts() {
      return this.products.map(product => `
        <div class="kit-product" data-product-id="${product.id}">
          ${this.kitConfig.showProductImages ? `<img src="${product.image}" alt="${product.title}" class="kit-product-image">` : ''}
          <div class="kit-product-title">${product.title}</div>
          ${this.kitConfig.showProductPrices ? `<div class="kit-product-price">$${product.price.toFixed(2)}</div>` : ''}
        </div>
      `).join('');
    }

    renderSummary() {
      const total = this.calculateTotal();
      const discount = this.calculateDiscount(total);
      const final = total - discount;

      return `
        <div class="kit-summary-row">
          <span>Selected Products:</span>
          <span>${this.selectedProducts.length}</span>
        </div>
        <div class="kit-summary-row">
          <span>Subtotal:</span>
          <span>$${total.toFixed(2)}</span>
        </div>
        ${discount > 0 ? `
          <div class="kit-summary-row" style="color: #4CAF50;">
            <span>Discount (${this.kitConfig.discountValue}${this.kitConfig.discountType === 'percentage' ? '%' : '$'}):</span>
            <span>-$${discount.toFixed(2)}</span>
          </div>
        ` : ''}
        <div class="kit-summary-row kit-summary-total">
          <span>Total:</span>
          <span>$${final.toFixed(2)}</span>
        </div>
      `;
    }

    attachEventListeners() {
      // Product selection
      this.container.querySelectorAll('.kit-product').forEach(el => {
        el.addEventListener('click', () => this.toggleProduct(el.dataset.productId));
      });

      // Add to cart button
      document.getElementById('kitAddButton').addEventListener('click', () => this.addToCart());
    }

    toggleProduct(productId) {
      const index = this.selectedProducts.indexOf(productId);
      const product = this.container.querySelector(`[data-product-id="${productId}"]`);
      
      if (index > -1) {
        this.selectedProducts.splice(index, 1);
        product.classList.remove('selected');
      } else {
        if (this.kitConfig.maxProducts && this.selectedProducts.length >= this.kitConfig.maxProducts) {
          alert(`You can only select up to ${this.kitConfig.maxProducts} products`);
          return;
        }
        this.selectedProducts.push(productId);
        product.classList.add('selected');
      }

      this.updateUI();
    }

    updateUI() {
      // Update progress bar
      const progress = Math.min((this.selectedProducts.length / this.kitConfig.minProducts) * 100, 100);
      document.getElementById('kitProgressBar').style.width = `${progress}%`;

      // Update progress text
      const remaining = Math.max(0, this.kitConfig.minProducts - this.selectedProducts.length);
      document.getElementById('kitProgressText').textContent = 
        remaining > 0 ? `Select ${remaining} more product${remaining !== 1 ? 's' : ''}` : '✓ Ready to add to cart!';

      // Update summary
      document.getElementById('kitSummary').innerHTML = this.renderSummary();

      // Enable/disable button
      const button = document.getElementById('kitAddButton');
      button.disabled = this.selectedProducts.length < this.kitConfig.minProducts;
      button.style.opacity = button.disabled ? '0.5' : '1';
    }

    calculateTotal() {
      return this.selectedProducts.reduce((sum, productId) => {
        const product = this.products.find(p => p.id === productId);
        return sum + (product ? product.price : 0);
      }, 0);
    }

    calculateDiscount(total) {
      if (this.selectedProducts.length < this.kitConfig.minProducts) return 0;
      
      if (this.kitConfig.discountType === 'percentage') {
        return total * (this.kitConfig.discountValue / 100);
      } else {
        return this.kitConfig.discountValue;
      }
    }

    async addToCart() {
      try {
        const total = this.calculateTotal();
        const discount = this.calculateDiscount(total);
        const final = total - discount;

        // Track the order
        await fetch('/storefront/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shopDomain: this.shopDomain,
            kitId: this.kitId,
            orderId: 'pending',
            selectedProducts: this.selectedProducts,
            totalPrice: total,
            discountApplied: discount,
            finalPrice: final,
          }),
        });

        // Add to Shopify cart (this would use Shopify's Cart API)
        alert('Kit added to cart! (In production, this would add items to your Shopify cart)');
        
        // Reset selection
        this.selectedProducts = [];
        this.container.querySelectorAll('.kit-product').forEach(el => el.classList.remove('selected'));
        this.updateUI();
      } catch (error) {
        console.error('Add to cart error:', error);
        alert('Failed to add kit to cart');
      }
    }

    showError(message) {
      this.container.innerHTML = `<div class="kit-error">${message}</div>`;
    }
  }

  // Auto-initialize
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('kit-builder');
    if (container) {
      const kitId = container.dataset.kitId;
      if (kitId) {
        new KitBuilder('kit-builder', kitId);
      }
    }
  });

  // Export for manual initialization
  window.KitBuilder = KitBuilder;
})();
