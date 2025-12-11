// src/components/Card.ts
export type CardVariant = 'feature' | 'pricing' | 'feature-detail' | 'default';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardOptions {
    title: string;
    content: string;
    image?: string;
    variant?: 'default' | 'feature' | 'pricing';
}

export function createCard(options: CardOptions): HTMLDivElement {
    const card = document.createElement('div');
    
    // Base class
    let classes = ['card'];
    
    // Variant
    if (options.variant) {
        classes.push(`card--${options.variant}`);
    }
    
    // Size
    if (options.size) {
        classes.push(`card--${options.size}`);
    }
    
    // Popular badge
    if (options.badge) {
        const badge = document.createElement('div');
        badge.className = 'card__badge';
        badge.textContent = options.badge;
        card.appendChild(badge);
    }
    
    // Custom class
    if (options.className) {
        classes.push(options.className);
    }
    
    card.className = classes.join(' ');
    
    // Icon
    if (options.icon) {
        const icon = document.createElement('div');
        icon.className = 'card__icon';
        icon.textContent = options.icon;
        card.appendChild(icon);
    }
    
    // Title
    if (options.title) {
        const title = document.createElement('h3');
        title.textContent = options.title;
        card.appendChild(title);
    }
    
    // Price
    if (options.price) {
        const price = document.createElement('div');
        price.className = 'card__price';
        price.textContent = options.price;
        card.appendChild(price);
    }
    
    // Features list
    if (options.features && options.features.length > 0) {
        const featuresList = document.createElement('ul');
        featuresList.className = 'card__features';
        
        options.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = feature;
            featuresList.appendChild(li);
        });
        
        card.appendChild(featuresList);
    }
    
    // Content
    const content = document.createElement('p');
    content.textContent = options.content;
    card.appendChild(content);
    
    // Click event
    if (options.onClick) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', options.onClick);
    }
    
    return card;
}