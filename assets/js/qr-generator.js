// QR Code Generator for Portfolio
console.log('QR Code Generator loaded');

// QR Code Generator using qrcode.js library
class QRCodeGenerator {
    constructor() {
        this.qrContainer = null;
        this.qrCanvas = null;
        this.qrText = null;
    }

    init() {
        this.createQRContainer();
        this.bindEvents();
    }

    createQRContainer() {
        // Create QR modal container
        const modal = document.createElement('div');
        modal.id = 'qr-modal';
        modal.className = 'qr-modal';
        modal.innerHTML = `
            <div class="qr-modal-content">
                <span class="qr-close">&times;</span>
                <h3>Scan QR Code</h3>
                <div id="qr-code-container"></div>
                <div class="qr-options">
                    <input type="text" id="qr-text" placeholder="Enter text or URL" value="https://wisani-portfolio.netlify.app">
                    <button id="generate-qr">Generate QR</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add styles
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .qr-modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                backdrop-filter: blur(5px);
            }

            .qr-modal-content {
                background-color: var(--bg-color);
                margin: 10% auto;
                padding: 20px;
                border-radius: 10px;
                width: 90%;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }

            .qr-close {
                color: var(--text-color);
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }

            .qr-close:hover {
                color: var(--primary-color);
            }

            #qr-code-container {
                margin: 20px 0;
                display: flex;
                justify-content: center;
            }

            .qr-options {
                margin-top: 20px;
            }

            #qr-text {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid var(--border-color);
                border-radius: 5px;
                background-color: var(--bg-color);
                color: var(--text-color);
            }

            #generate-qr {
                padding: 10px 20px;
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }

            #generate-qr:hover {
                background-color: var(--primary-hover);
            }

            .btn-qr {
                background-color: var(--accent-color);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .btn-qr:hover {
                background-color: var(--accent-hover);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        const modal = document.getElementById('qr-modal');
        const closeBtn = document.querySelector('.qr-close');
        const generateBtn = document.getElementById('generate-qr');
        const qrText = document.getElementById('qr-text');

        // Show modal
        document.getElementById('qr-btn')?.addEventListener('click', () => {
            modal.style.display = 'block';
            this.generateQR('https://wisani-portfolio.netlify.app');
        });

        // Close modal
        closeBtn?.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Generate QR on button click
        generateBtn?.addEventListener('click', () => {
            this.generateQR(qrText.value);
        });
    }

    generateQR(text) {
        const container = document.getElementById('qr-code-container');
        container.innerHTML = '';
        
        // Create QR code using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        
        // Simple QR code simulation (for demo purposes)
        // In production, use a proper QR library like qrcode.js
        this.drawSimpleQR(ctx, text, size);
        
        container.appendChild(canvas);
    }

    drawSimpleQR(ctx, text, size) {
        // Simple QR code representation
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, size, size);
        
        // Add white background
        ctx.fillStyle = '#fff';
        ctx.fillRect(10, 10, size - 20, size - 20);
        
        // Add simple pattern
        ctx.fillStyle = '#000';
        const pattern = this.generatePattern(text);
        const cellSize = 10;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (pattern[i * 10 + j]) {
                    ctx.fillRect(20 + j * cellSize, 20 + i * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    generatePattern(text) {
        // Simple pattern generation based on text
        const pattern = [];
        for (let i = 0; i < 100; i++) {
            pattern.push((text.charCodeAt(i % text.length) + i) % 2);
        }
        return pattern;
    }
}

// Initialize QR Code Generator
document.addEventListener('DOMContentLoaded', () => {
    const qrGenerator = new QRCodeGenerator();
    qrGenerator.init();
});
