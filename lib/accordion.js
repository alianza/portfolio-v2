export default class Accordion {
  constructor(el) {
    this.el = el; // <details> element
    this.summary = el.querySelector('summary'); // <summary> element
    this.content = el.querySelector('div'); // <div> element

    this.contentPadding = this.getContentPadding();
    this.animDuration = 2500; // (ms)

    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    if (!this.el.hasAttribute('data-accordion')) {
      this.el.setAttribute('data-accordion', '');
      this.summary.addEventListener('click', (e) => this.onDetailsClick(e)); // Only add event listener once
    }
  }

  getContentPadding() {
    const contentStyle = window.getComputedStyle(this.content);
    return (
      parseInt(contentStyle.marginTop.replace('px', ''), 10) + parseInt(contentStyle.marginBottom.replace('px', ''), 10)
    );
  }

  onDetailsClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight - this.contentPadding + 8}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      { height: [startHeight, endHeight] },
      { duration: this.animDuration, easing: 'ease-in-out' },
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight + this.contentPadding - 8}px`; // + 16px (1em) for padding

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      { height: [startHeight, endHeight] },
      { duration: this.animDuration, easing: 'ease-in-out' },
    );

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = '';
    this.el.style.overflow = '';
    // if (open) {
    //   this.summary.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' }); // Scroll to start of accordion
    // }
  }
}
