// src/components/Button.ts
export type ButtonVariant = 'primary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonOptions {
    text: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    onClick?: () => void;
    className?: string;
}

export function createButton(options: ButtonOptions): HTMLButtonElement {
    const button = document.createElement('button');
    
    // Base class
    let classes = ['btn'];
    
    // Variant
    if (options.variant) {
        classes.push(`btn--${options.variant}`);
    }
    
    // Size
    if (options.size) {
        classes.push(`btn--${options.size}`);
    }
    
    // Custom class
    if (options.className) {
        classes.push(options.className);
    }
    
    button.className = classes.join(' ');
    button.textContent = options.text;
    
    // Icon
    if (options.icon) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'btn__icon';
        iconSpan.textContent = options.icon;
        button.prepend(iconSpan);
    }
    
    // Click event
    if (options.onClick) {
        button.addEventListener('click', options.onClick);
    }
    
    // Accessibility
    button.setAttribute('type', 'button');
    
    return button;
}