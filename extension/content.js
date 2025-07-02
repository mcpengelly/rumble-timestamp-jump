function parseTimestamp(text) {
  const parts = text.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return null;
}

function createOverlay(text, y) {
  const overlay = document.createElement('div');
  overlay.textContent = `⏩ Jumped to ${text}`;
  overlay.style.position = 'fixed';
  overlay.style.left = '50%';
  overlay.style.top = `${y}px`;
  overlay.style.transform = 'translateX(-50%)';
  overlay.style.background = '#202020';
  overlay.style.color = '#59BF40';
  overlay.style.border = '1px solid #59BF40';
  overlay.style.padding = '6px 10px';
  overlay.style.borderRadius = '6px';
  overlay.style.fontSize = '14px';
  overlay.style.fontWeight = 'bold';
  overlay.style.zIndex = 9999;
  overlay.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4)';
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 1600);
}

function enhanceTimestamps() {
  const commentSelector = 'p.comment-text, div.comment-text';
  const regex = /\b(\d{1,2}:\d{2}(?::\d{2})?)\b/g;

  document.querySelectorAll(commentSelector).forEach(node => {
    if (!node.dataset.processed) {
      node.innerHTML = node.innerHTML.replace(regex, (match) => {
        const seconds = parseTimestamp(match);
        if (seconds === null) return match;

        return `<span style="
          color: #59BF40;
          cursor: pointer;
          font-weight: bold;
          text-decoration: underline dotted;"
          title="Jump to ${match}"
          onclick="(() => {
            const video = document.querySelector('video');
            if (video) {
              video.currentTime = ${seconds};
              video.play();
              const e = new MouseEvent('click', { clientY: 100 }); // dummy
              (${createOverlay.toString()})('${match}', e.clientY);
            }
          })()"
        >${match}</span>`;
      });
      node.dataset.processed = 'true';
    }
  });
}
function waitForCommentsAndEnhance() {
  const commentSelector = '[class*="comment"], [class*="Comment"]';

  const observer = new MutationObserver((mutations, obs) => {
    const comments = document.querySelectorAll(commentSelector);

    if (comments.length === 0) return; // Still no comments

    enhanceTimestamps(); // Once comments are there, enhance
    const observer = new MutationObserver(enhanceTimestamps);
    observer.observe(document.body, { childList: true, subtree: true });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener('load', () => {
  waitForCommentsAndEnhance();
});

