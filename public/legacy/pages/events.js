(() => {
  'use strict';
  const init = () => {
    const buttons = [...document.querySelectorAll('[data-ev-filter]')];
    const cards = [...document.querySelectorAll('[data-ev-card]')];
    const empty = document.getElementById('eventEmpty');
    buttons.forEach((button) => button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.evFilter;
      let visible = 0;
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter || card.dataset.status === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.style.display = visible ? 'none' : 'block';
    }));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
