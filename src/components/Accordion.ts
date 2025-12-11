// src/components/Accordion.ts
export interface AccordionItem {
    header: string;
    content: string;
    isOpen?: boolean;
}

export class Accordion {
    private container: HTMLElement;
    private items: AccordionItem[];
    
    constructor(containerId: string, items: AccordionItem[]) {
        this.container = document.getElementById(containerId) as HTMLElement;
        this.items = items;
        
        this.render();
        this.initialize();
    }
    
    private render(): void {
        this.container.innerHTML = '';
        
        this.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'accordion__item';
            
            const header = document.createElement('button');
            header.className = 'accordion__header';
            header.textContent = item.header;
            header.setAttribute('aria-expanded', 'false');
            header.setAttribute('aria-controls', `accordion-content-${index}`);
            header.id = `accordion-header-${index}`;
            
            const content = document.createElement('div');
            content.className = 'accordion__content';
            content.id = `accordion-content-${index}`;
            content.setAttribute('aria-labelledby', `accordion-header-${index}`);
            
            const contentParagraph = document.createElement('p');
            contentParagraph.textContent = item.content;
            content.appendChild(contentParagraph);
            
            itemElement.appendChild(header);
            itemElement.appendChild(content);
            this.container.appendChild(itemElement);
            
            // Set initial state
            if (item.isOpen) {
                header.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    }
    
    private initialize(): void {
        const headers = this.container.querySelectorAll('.accordion__header');
        
        headers.forEach((header, index) => {
            const content = header.nextElementSibling as HTMLElement;
            
            header.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = header.classList.contains('active');
                
                if (isActive) {
                    header.classList.remove('active');
                    header.setAttribute('aria-expanded', 'false');
                    content.style.maxHeight = '';
                } else {
                    header.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
            
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    (header as HTMLElement).click();
                }
                
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const headersArray = Array.from(headers);
                    const currentIndex = headersArray.indexOf(header);
                    let nextIndex;
                    
                    if (e.key === 'ArrowDown') {
                        nextIndex = (currentIndex + 1) % headersArray.length;
                    } else {
                        nextIndex = (currentIndex - 1 + headersArray.length) % headersArray.length;
                    }
                    
                    (headersArray[nextIndex] as HTMLElement).focus();
                    (headersArray[nextIndex] as HTMLElement).click();
                }
            });
        });
    }
    
    openAll(): void {
        const headers = this.container.querySelectorAll('.accordion__header');
        headers.forEach(header => {
            const content = header.nextElementSibling as HTMLElement;
            header.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
        });
    }
    
    closeAll(): void {
        const headers = this.container.querySelectorAll('.accordion__header');
        headers.forEach(header => {
            const content = header.nextElementSibling as HTMLElement;
            header.classList.remove('active');
            header.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = '';
        });
    }
}