/* =========================================================
   <image-slot> — 사용자가 채우는 이미지 자리
   원본 Design Canvas 컴포넌트를 정적 사이트용으로 가볍게 다시 구현한 것입니다.
   원본은 omelette 런타임의 사이드카 파일에 저장하지만, 여기서는
   브라우저 localStorage에 저장해 새로고침해도 유지되도록 했습니다.

   속성:
     id           저장 키. 페이지 안에서 겹치지 않게 지정합니다. (필수)
     shape        rect | rounded | circle | pill      (기본 rounded)
     radius       shape="rounded"일 때 모서리 반경 px  (기본 12)
     fit          cover | contain                     (기본 cover)
     placeholder  비어 있을 때 안내 문구
     src          초기 이미지 URL (사용자가 채우면 그 이미지가 우선)

   사용법:
     <div style="position:relative;width:100%;height:100%">
       <image-slot id="hero" shape="rect" placeholder="대표 이미지"></image-slot>
     </div>
   ========================================================= */

(() => {
  const STORAGE_PREFIX = 'resume:image-slot:';

  const read = (id) => {
    try { return localStorage.getItem(STORAGE_PREFIX + id); } catch { return null; }
  };
  const write = (id, value) => {
    try {
      if (value) localStorage.setItem(STORAGE_PREFIX + id, value);
      else localStorage.removeItem(STORAGE_PREFIX + id);
    } catch {
      /* 용량 초과·프라이빗 모드 등 저장 불가 — 화면 표시는 그대로 유지 */
    }
  };

  const TEMPLATE = `
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
      }
      /* 부모 높이가 정해지지 않은 경우 3:2로 대체 */
      :host(:not([style*="height"])) { min-height: 0; }

      .slot {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
        width: 100%;
        height: 100%;
        font: inherit;
        color: inherit;
        transition: background 140ms;
      }
      .slot:focus-visible { outline: 2px solid #1B2ED6; outline-offset: -2px; }
      .slot.is-dragging { background: rgba(27, 46, 214, 0.12); }

      img {
        width: 100%;
        height: 100%;
        object-fit: var(--slot-fit, cover);
        display: block;
      }

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        text-align: center;
        color: rgba(27, 46, 214, 0.75);
        font-family: 'Gothic A1', sans-serif;
        font-size: 13px;
        font-weight: 700;
        line-height: 1.5;
        pointer-events: none;
      }
      .empty svg { opacity: 0.55; }
      .empty small {
        font-weight: 500;
        font-size: 11px;
        color: rgba(27, 46, 214, 0.55);
      }

      .clear {
        position: absolute;
        top: 8px;
        right: 8px;
        z-index: 2;
        background: #1B2ED6;
        color: #FDEDE2;
        border: none;
        font-family: 'Gothic A1', sans-serif;
        font-size: 11px;
        font-weight: 700;
        padding: 5px 9px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 140ms;
      }
      :host(:hover) .clear,
      .clear:focus-visible { opacity: 1; }

      input[type="file"] { display: none; }
    </style>

    <button type="button" class="slot" part="slot">
      <span class="empty">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="4" width="18" height="16" />
          <path d="M3 16l5-5 4 4 3-3 6 6" />
          <circle cx="9" cy="9" r="1.6" />
        </svg>
        <span class="label"></span>
        <small>클릭하거나 이미지를 끌어다 놓으세요</small>
      </span>
      <img alt="" hidden>
    </button>
    <button type="button" class="clear" hidden>지우기</button>
    <input type="file" accept="image/*">
  `;

  class ImageSlot extends HTMLElement {
    static get observedAttributes() { return ['src', 'placeholder', 'shape', 'radius', 'fit']; }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = TEMPLATE;
      this._slot = this.shadowRoot.querySelector('.slot');
      this._img = this.shadowRoot.querySelector('img');
      this._empty = this.shadowRoot.querySelector('.empty');
      this._label = this.shadowRoot.querySelector('.label');
      this._clear = this.shadowRoot.querySelector('.clear');
      this._file = this.shadowRoot.querySelector('input[type="file"]');
      this._dropped = null; // 사용자가 채운 이미지 (src보다 우선)
    }

    connectedCallback() {
      this._dropped = read(this.id);

      this._slot.addEventListener('click', () => this._file.click());
      this._file.addEventListener('change', () => {
        const file = this._file.files && this._file.files[0];
        if (file) this._load(file);
        this._file.value = '';
      });

      ['dragenter', 'dragover'].forEach((type) =>
        this.addEventListener(type, (e) => {
          e.preventDefault();
          this._slot.classList.add('is-dragging');
        })
      );
      ['dragleave', 'drop'].forEach((type) =>
        this.addEventListener(type, () => this._slot.classList.remove('is-dragging'))
      );
      this.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) this._load(file);
      });

      this._clear.addEventListener('click', (e) => {
        e.stopPropagation();
        this._dropped = null;
        write(this.id, null);
        this._render();
      });

      this._render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this._render();
    }

    /** 파일을 data URL로 읽어 슬롯에 채우고 저장합니다. */
    _load(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this._dropped = String(reader.result);
        write(this.id, this._dropped);
        this._render();
      };
      reader.readAsDataURL(file);
    }

    _render() {
      const shape = this.getAttribute('shape') || 'rounded';
      const radius = this.getAttribute('radius') || '12';
      const borderRadius =
        shape === 'rect' ? '0' :
        shape === 'circle' ? '50%' :
        shape === 'pill' ? '9999px' :
        radius + 'px';

      this.style.borderRadius = borderRadius;
      this.style.overflow = 'hidden';
      this.style.setProperty('--slot-fit', this.getAttribute('fit') || 'cover');

      this._label.textContent = this.getAttribute('placeholder') || '이미지 놓기';

      const src = this._dropped || this.getAttribute('src') || '';
      const filled = Boolean(src);

      this._img.hidden = !filled;
      this._empty.hidden = filled;
      this._clear.hidden = !this._dropped;
      if (filled) {
        this._img.src = src;
        this._img.alt = this.getAttribute('placeholder') || '';
      } else {
        this._img.removeAttribute('src');
      }
      this._slot.setAttribute(
        'aria-label',
        (this.getAttribute('placeholder') || '이미지') + (filled ? ' 바꾸기' : ' 넣기')
      );
    }
  }

  if (!customElements.get('image-slot')) customElements.define('image-slot', ImageSlot);
})();
