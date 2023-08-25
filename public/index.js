const $ = selector => document.querySelector(selector);

const input = $('input[name="url"]');
const custom = $('input[name="custom"]');

const overlay = $('.overlay');

// Let's avoid havinig to re-select the elements every time we want to show a popup
const popupTitle = $('#popup__title');
const popupBody = $('#popup__body');

function popup(title, body) {
  popupTitle.innerHTML = title;
  popupBody.innerHTML = body;

  overlay.style.visibility = 'visible';
  overlay.style.opacity = 1;
}

$('button[type="submit"]').addEventListener('click', async () => {
  const url = input.value;
  const slug = custom.value;

  if (url === '') return popup('Whoops!', "An empty URL was provided! I can't shorten that...");

  const request = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, custom: slug }),
  });

  const response = await request.json();

  if (request.status !== 200) return popup('Whoops!', response.message);

  const newURL = `${window.location.origin}/${response.data.slug}`;

  popup(
    'Meow!',
    `Your shortened URL is <a href="${newURL}">${newURL}</a>!<br/>If you want to delete it, use the deletion key (<code>${response.data.deletionKey}</code>)`,
  );
});

// Clicking on the popup should not close it
// despite the overlay being above it
$('.popup').addEventListener('click', event => {
  event.stopPropagation();
});

overlay.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => (overlay.style.visibility = 'hidden'), 500);
});
