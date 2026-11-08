// Uśmiechnie — skrypty strony mobilnej

// Podświetlenie aktywnej zakładki w dolnym pasku
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.tabbar a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// Cennik: wyszukiwarka + liczniki pozycji
(function () {
  var input = document.getElementById('cennik-search');
  if (!input) return;

  var groups = Array.prototype.slice.call(document.querySelectorAll('details.group'));
  var noResults = document.getElementById('no-results');

  groups.forEach(function (g) {
    var count = g.querySelectorAll('tbody tr').length;
    var c = g.querySelector('.count');
    if (c) c.textContent = count + ' poz.';
  });

  function normalize(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
  }

  input.addEventListener('input', function () {
    var q = normalize(input.value.trim());
    var anyVisible = false;

    groups.forEach(function (g) {
      var rows = g.querySelectorAll('tbody tr');
      var visible = 0;
      rows.forEach(function (r) {
        var match = !q || normalize(r.textContent).indexOf(q) !== -1;
        r.classList.toggle('hidden', !match);
        if (match) visible++;
      });
      g.classList.toggle('hidden', visible === 0);
      if (q) g.open = visible > 0; else g.open = false;
      if (visible) anyVisible = true;
    });

    noResults.classList.toggle('show', !anyVisible);
  });
})();
