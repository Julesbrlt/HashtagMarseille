import { Controller } from "@hotwired/stimulus";

// Carrousel 1 slide au centre, boucle infinie
export default class extends Controller {
  static targets = ["viewport", "track", "slide"];
  static values = { index: Number };

  connect() {
    // bind pour removeEventListener proprement
    this._onResize = this._onResize.bind(this);

    // params init
    this.gap = 24; // doit refléter le gap CSS entre slides
    window.addEventListener("resize", this._onResize, { passive: true });

    this._measure();
    this._apply(true); // sans anim au premier rendu
  }

  disconnect() {
    window.removeEventListener("resize", this._onResize);
  }

  // Actions
  prev() {
    this._goTo(this._wrap(this.indexValue - 1));
  }
  next() {
    this._goTo(this._wrap(this.indexValue + 1));
  }

  // --- internes ---
  _measure() {
    if (!this.hasSlideTarget) return;

    // 1) si tu as défini --slide-w au niveau du viewport, on l'utilise
    const cssSlideW = getComputedStyle(this.viewportTarget).getPropertyValue(
      "--slide-w"
    );
    if (cssSlideW) {
      this.slideW = parseFloat(cssSlideW);
    } else {
      // fallback : mesure réelle du premier slide
      const rect = this.slideTargets[0].getBoundingClientRect();
      this.slideW = rect.width;
    }

    // largeur visible du viewport (pour centrage)
    this.viewportW = this.viewportTarget.getBoundingClientRect().width;

    // gap lu depuis le CSS (si changé)
    const style = getComputedStyle(this.trackTarget);
    const parsedGap = parseFloat(style.columnGap || style.gap || 0);
    if (!Number.isNaN(parsedGap)) this.gap = parsedGap;
  }

  _centerOffsetFor(index) {
    // on veut centrer la slide index :
    // translation X = centre viewport - centre slide index
    const slideCenter = index * (this.slideW + this.gap) + this.slideW / 2;
    const viewportCenter = this.viewportW / 2;
    return viewportCenter - slideCenter;
  }

  _apply(skipAnim = false) {
    if (!this.hasSlideTarget) return;
    const x = this._centerOffsetFor(this.indexValue);

    if (skipAnim) this.trackTarget.style.transition = "none";
    this.trackTarget.style.transform = `translateX(${x}px)`;
    if (skipAnim) {
      // force reflow pour réactiver la transition
      // eslint-disable-next-line no-unused-expressions
      this.trackTarget.offsetHeight;
      this.trackTarget.style.transition = "";
    }
    this._markActive();
  }

  _goTo(i) {
    this.indexValue = this._wrap(i);
    this._apply();
  }

  _wrap(i) {
    const n = this.slideTargets.length;
    return ((i % n) + n) % n;
  }

  _markActive() {
    this.slideTargets.forEach((el, idx) => {
      el.classList.toggle("is-active", idx === this.indexValue);
    });
  }

  _onResize() {
    this._measure();
    this._apply(true);
  }
}
