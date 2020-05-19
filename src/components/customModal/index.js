import React from 'react';
import ReactDOM from 'react-dom'
const SuccessModal = () => <div>this is success modal</div>;
const ErrorModal = () => <div>this is error modal</div>;
const WaringModal = () => <div>this is waring modal</div>;

export default function CustomModal() {

    this.offsetTop = 200;
    this.cover = Object.create(null);

    this._uiComponents = {
        'default_modal': () => <div>this is defalut modal</div>,
        'gray_cover': () => {
            let cover = document.createElement('div>');
            cover.id = 'custom_gray_cover';
            cover.style = {
                display:'none',/** 将元素属性设置为display:none, */
                width: "100%",
                height: "100%",
                background: 'rgba(0,0,0,0.2)',
                position: 'fixed',
                left: 0,
                right: 0,
                margin: 'auto',
                top: this.offsetTop,
                zIndex: 9999
            }
            cover.addEventListener('touchmove', (event) => { event.preventDefault(); }, { passive: false })
            return cover;
        },
    };

    this._modalsMap = new Map([['default', this._uiComponents['default_modal']()]]);

    this.init = function (modalEl) {
        if (this.cover) {
            return false;
        }
        this.cover = this._uiComponents["gray_cover"]();
        document.body.appendChild(this.cover);
        ReactDOM.render(modalEl, this.cover);
    }

    this.show = function () {
        if (this.cover) {
            this.cover.style.display = 'block';
        } else {
            this.init(modalEl);
        }
    }

    this.hide = function () {
        if (this.cover) {
            
        }
    }
}
