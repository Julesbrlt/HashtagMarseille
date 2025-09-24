import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["track", "card"];
  static values = {
    step: { type: Number, default: 0.9 },
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 5000 },
  };

  connect() {
    this._onKey = this._onKey.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onWheel = this._onWheel.bind(this);

    window.addEventListener("keydown", this._onKey);
    window.addEventListener("resize", this._onResize, { passive: true });
    this.trackTarget.addEventListener("wheel", this._onWheel, {
      passive: false,
    });

    this._bindTouch();
    this._setSnap();
    this._maybeAutoplay();
  }

  disconnect() {
    window.removeEventListener("keydown", this._onKey);
    window.removeEventListener("resize", this._onResize);
    this.trackTarget.removeEventListener("wheel", this._onWheel);
    this._stopAutoplay?.();
  }

  prev() {
    this._scrollBy(-this._slideBy());
  }
  next() {
    this._scrollBy(this._slideBy());
  }

  // --- helpers ---
  _slideBy() {
    return this.trackTarget.clientWidth * (this.stepValue || 0.9);
  }

  _scrollBy(dx) {
    this.trackTarget.scrollBy({ left: dx, behavior: "smooth" });
  }

  _setSnap() {
    // assure un alignement propre quand on resize
    const x =
      Math.round(this.trackTarget.scrollLeft / this._slideBy()) *
      this._slideBy();
    this.trackTarget.scrollTo({ left: x, behavior: "instant" });
  }

  _onKey(e) {
    if (e.key === "ArrowLeft") this.prev();
    if (e.key === "ArrowRight") this.next();
  }

  _onResize() {
    this._setSnap();
  }

  _onWheel(e) {
    // horizontalize la molette (shift implicite)
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      this.trackTarget.scrollLeft += e.deltaY;
    }
  }

  _bindTouch() {
    let startX = 0,
      startScroll = 0,
      dragging = false;

    this.trackTarget.addEventListener("pointerdown", (e) => {
      dragging = true;
      this.trackTarget.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startScroll = this.trackTarget.scrollLeft;
    });

    this.trackTarget.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      this.trackTarget.scrollLeft = startScroll - dx;
    });

    this.trackTarget.addEventListener("pointerup", (e) => {
      dragging = false;
      this.trackTarget.releasePointerCapture(e.pointerId);
    });
  }

  _maybeAutoplay() {
    if (!this.autoplayValue) return;
    const tick = () => this.next();
    const id = setInterval(tick, this.intervalValue || 5000);
    this._stopAutoplay = () => clearInterval(id);
  }
}
