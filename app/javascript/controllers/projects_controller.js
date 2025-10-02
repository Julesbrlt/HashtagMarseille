// app/javascript/controllers/projects_controller.js
import { Controller } from "@hotwired/stimulus";
import EmblaCarousel from "embla-carousel";

export default class extends Controller {
  static targets = ["viewport", "dots"];

  connect() {
    this.embla = EmblaCarousel(this.viewportTarget, {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      duration: 28, // un poil plus long = plus smooth (20 par défaut)
      dragFree: false,
    });

    this._buildDots();
    this._onSelect = this._onSelect.bind(this);
    this.embla.on("select", this._onSelect);
    this._onSelect();
  }

  disconnect() {
    this.embla?.destroy();
  }

  prev() {
    this.embla?.scrollPrev();
  }
  next() {
    this.embla?.scrollNext();
  }

  _buildDots() {
    if (!this.hasDotsTarget) return;
    const slides = this.embla.slideNodes();
    this.dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "embla__dot";
      dot.addEventListener("click", () => this.embla.scrollTo(i));
      this.dotsTarget.appendChild(dot);
      return dot;
    });
  }

  _onSelect() {
    const selected = this.embla.selectedScrollSnap();
    const slides = this.embla.slideNodes();
    const prev =
      this.embla.scrollSnapList().length > 1
        ? (selected - 1 + slides.length) % slides.length
        : selected;
    const next =
      this.embla.scrollSnapList().length > 1
        ? (selected + 1) % slides.length
        : selected;

    slides.forEach((el, i) => {
      el.classList.toggle("is-selected", i === selected);
      el.classList.toggle("is-prev", i === prev);
      el.classList.toggle("is-next", i === next);
    });
    this.dots?.forEach((d, i) =>
      d.classList.toggle("is-active", i === selected)
    );
  }
}
