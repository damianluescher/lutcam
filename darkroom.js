// The darkroom on the home page: drag to compare RAW and film, tap a can to change the film.
(function () {
  var compare = document.querySelector('.compare');
  if (!compare) return;
  var slider = compare.querySelector('.slider');
  var film = document.getElementById('compare-film');
  var tag = document.getElementById('tag-film');
  var capName = document.getElementById('cap-name');
  var capProcess = document.getElementById('cap-process');
  var capLine = document.getElementById('cap-line');
  var cans = document.querySelectorAll('.shelf .can');

  function setPos() { compare.style.setProperty('--pos', slider.value + '%'); }
  slider.addEventListener('input', setPos);
  setPos();

  // Warm the cache so a tap swaps at once.
  cans.forEach(function (can) {
    var img = new Image();
    img.src = 'assets/films/' + can.dataset.film + '.jpg';
  });

  cans.forEach(function (can) {
    can.addEventListener('click', function () {
      var d = can.dataset;
      film.src = 'assets/films/' + d.film + '.jpg';
      film.alt = 'The same facade in the ' + d.name + ' look';
      tag.textContent = d.name + ' · ' + d.process;
      capName.textContent = d.name;
      capProcess.textContent = d.process + ' · ' + d.kind + ' · ISO ' + d.iso;
      capLine.textContent = d.line;
      compare.style.setProperty('--can', getComputedStyle(can).getPropertyValue('--can'));
      cans.forEach(function (c) { c.setAttribute('aria-pressed', c === can ? 'true' : 'false'); });
    });
  });
})();
