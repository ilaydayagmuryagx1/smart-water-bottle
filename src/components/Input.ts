// src/components/Input.ts
export type InputType = 'text' | 'email' | 'password' | 'textarea' | 'number';

export interface InputOptions {
    id: string;
    type?: InputType;
    label?: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    errorMessage?: string;
    className?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export class Input {
    private container: HTMLDivElement;
    private input: HTMLInputElement | HTMLTextAreaElement;
    private errorElement: HTMLDivElement;
    
    constructor(options: InputOptions) {
        this.container = document.createElement('div');
        this.container.className = 'form-group';
        
        // Label
        if (options.label) {
            const label = document.createElement('label');
            label.className = 'form-group__label';
            label.htmlFor = options.id;
            label.textContent = options.label;
            if (options.required) {
                label.innerHTML += ' *';
            }
            this.container.appendChild(label);
        }
        
        // Input field
        if (options.type === 'textarea') {
            this.input = document.createElement('textarea');
            (this.input as HTMLTextAreaElement).rows = 4;
        } else {
            this.input = document.createElement('input');
            this.input.type = options.type || 'text';
        }
        
        this.input.id = options.id;
        this.input.name = options.id;
        this.input.className = 'form-group__input';
        
        if (options.className) {
            this.input.classList.add(options.className);
        }
        
        if (options.placeholder) {
            this.input.placeholder = options.placeholder;
        }
        
        if (options.value) {
            this.input.value = options.value;
        }
        
        if (options.required) {
            this.input.required = true;
        }
        
        // Error element
        this.errorElement = document.createElement('div');
        this.errorElement.id = `${options.id}-error`;
        this.errorElement.className = 'form-group__error';
        this.errorElement.setAttribute('aria-live', 'polite');
        
        // Events
        if (options.onChange) {
            this.input.addEventListener('input', (e) => {
                options.onChange?.((e.target as HTMLInputElement).value);
                this.clearError();
            });
        }
        
        if (options.onFocus) {
            this.input.addEventListener('focus', options.onFocus);
        }
        
        if (options.onBlur) {
            this.input.addEventListener('blur', options.onBlur);
        }
        
        this.container.appendChild(this.input);
        this.container.appendChild(this.errorElement);
    }
    
    getElement(): HTMLDivElement {
        return this.container;
    }
    
    getValue(): string {
        return this.input.value;
    }
    
    setValue(value: string): void {
        this.input.value = value;
    }
    
    showError(message: string): void {
        this.errorElement.textContent = message;
        this.input.setAttribute('aria-invalid', 'true');
        this.input.classList.add('form-group__input--error');
    }
    
    clearError(): void {
        this.errorElement.textContent = '';
        this.input.removeAttribute('aria-invalid');
        this.input.classList.remove('form-group__input--error');
    }
    
    focus(): void {
        this.input.focus();
    }
    
    disable(): void {
        this.input.disabled = true;
    }
    
    enable(): void {
        this.input.disabled = false;
    }
}