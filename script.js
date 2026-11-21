(function () {
    var root = document.documentElement;
    try { var t = localStorage.getItem('al-theme'); if (t) root.setAttribute('data-theme', t); } catch (e) { }
    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('theme');
        function icon() { btn.textContent = root.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️'; }
        icon();
        btn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('al-theme', next); } catch (e) { }
            icon();
        });

        var sb = document.getElementById('sidebar');
        document.getElementById('burger').addEventListener('click', function (e) { e.stopPropagation(); sb.classList.toggle('open'); });
        document.addEventListener('click', function (e) { if (!sb.contains(e.target)) sb.classList.remove('open'); });

        var fb = document.querySelectorAll('.filters button');
        fb.forEach(function (b) {
            b.addEventListener('click', function () {
                fb.forEach(function (x) { x.classList.remove('on'); });
                b.classList.add('on');
                var f = b.dataset.f;
                document.querySelectorAll('[data-fam]').forEach(function (c) {
                    c.style.display = (f === 'all' || c.dataset.fam === f) ? '' : 'none';
                });
            });
        });

        var count = 0;
        document.querySelectorAll('[data-add]').forEach(function (b) {
            b.addEventListener('click', function () {
                count++; b.textContent = 'Ditambahkan ✓';
                setTimeout(function () { b.textContent = 'Tambah'; }, 1200);
            });
        });

        document.querySelectorAll('[data-copy]').forEach(function (b) {
            b.addEventListener('click', function () {
                var c = b.dataset.copy;
                if (navigator.clipboard) navigator.clipboard.writeText(c).catch(function () { });
                var old = b.innerHTML; b.innerHTML = 'Tersalin ✓';
                setTimeout(function () { b.innerHTML = old; }, 1400);
            });
        });

        var cd = document.getElementById('countdown');
        if (cd) {
            var end = Date.now() + 3 * 24 * 3600 * 1000;
            (function tick() {
                var s = Math.max(0, Math.floor((end - Date.now()) / 1000));
                var v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
                cd.querySelectorAll('b').forEach(function (el, i) { el.textContent = String(v[i]).padStart(2, '0'); });
                setTimeout(tick, 1000);
            })();
        }

        var links = document.querySelectorAll('[data-read]');
        if (links.length) {
            var modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = '<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Tutup">✕</button><div class="em"></div><time></time><h2></h2><div class="body"></div></div>';
            document.body.appendChild(modal);
            var box = modal.querySelector('.modal-box');
            function close() { modal.classList.remove('open'); document.body.style.overflow = ''; }
            links.forEach(function (a) {
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    var card = a.closest('.post'), full = card.querySelector('.full');
                    box.querySelector('.em').innerHTML = '<img src="' + full.dataset.img + '" alt="">';
                    box.querySelector('time').textContent = card.querySelector('time').textContent;
                    box.querySelector('h2').textContent = card.querySelector('h3').textContent;
                    box.querySelector('.body').innerHTML = full.innerHTML;
                    modal.classList.add('open'); document.body.style.overflow = 'hidden'; box.scrollTop = 0;
                });
            });
            modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
            box.querySelector('.modal-close').addEventListener('click', close);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
        }

        var form = document.getElementById('contact-form');
        if (form) form.addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('ok').style.display = 'block';
            form.reset();
        });
    });
})();