// src/components/Modal.ts
export interface ModalOptions {
    title: string;
    message: string;
    onClose?: () => void;
    showCloseButton?: boolean;
}

export class Modal {
    private modal: HTMLElement | null;
    private titleElement: HTMLElement | null;
    private messageElement: HTMLElement | null;
    
    constructor(modalId: string = 'success-modal') {
        this.modal = document.getElementById(modalId);
        this.titleElement = document.getElementById('modal-title');
        this.messageElement = this.modal?.querySelector('.modal__message') || null;
        
        this.initializeEventListeners();
    }
    
    private initializeEventListeners(): void {
        if (!this.modal) return;
        
        const modalClose = this.modal.querySelector('.modal__close');
        const modalOk = document.getElementById('modal-ok');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.close());
        }
        
        if (modalOk) {
            modalOk.addEventListener('click', () => this.close());
        }
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.style.display === 'flex') {
                this.close();
            }
        });
        
        // Click outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Focus trap
        this.modal.addEventListener('keydown', (e) => {
            if (this.modal?.style.display !== 'flex') return;
            
            if (e.key === 'Tab') {
                const focusableElements = this.modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (focusableElements.length === 0) return;
                
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    show(options: ModalOptions): void {
        if (!this.modal || !this.titleElement || !this.messageElement) {
            console.error('Modal elements not found!');
            return;
        }
        
        this.titleElement.textContent = options.title;
        this.messageElement.textContent = options.message;
        
        this.modal.removeAttribute('hidden');
        this.modal.style.display = 'flex';
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            const closeBtn = this.modal?.querySelector('.modal__close') as HTMLElement;
            if (closeBtn) closeBtn.focus();
        }, 10);
    }
    
    close(): void {
        if (!this.modal) return;
        
        this.modal.setAttribute('hidden', 'true');
        this.modal.style.display = 'none';
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}