export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonOptions {
    text: string;
    variant: ButtonVariant;
    onClick: () => void;
    disabled?: boolean;
    icon?: string;
    size?: ButtonSize;
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
    
    // Disabled state
    if (options.disabled) {
        button.disabled = true;
    }
    
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