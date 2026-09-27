/* Latin America food & music trip — static SPA, no dependencies. */
(function () {
  "use strict";

  var LANG_KEY = "latam-lang";
  var app = document.getElementById("app");

  var I18N = {
    en: {
      brand: "Latin America",
      footer: "Made with ❤️ for our canteen · ¡Buen provecho!",
      kicker: "¡Bienvenidos!",
      heroTitle: "Take a trip to Latin America",
      heroText: "{n} countries, {n} dishes, {n} songs. Tap a flag to discover a signature dish, a song to listen to and a fun fact.",
      surprise: "Surprise me",
      countries: "Countries",
      nCountries: "{n} countries",
      search: "Search a country or dish…",
      noResults: "No country matches your search.",
      allCountries: "All countries",
      capital: "Capital",
      countryOf: "{i} of {n}",
      taste: "Taste",
      alsoTry: "Also try",
      listen: "Listen",
      play: "Play",
      playing: "Playing",
      openYouTube: "Open on YouTube",
      openLink: "Open song",
      searchYouTube: "Find on YouTube",
      funFact: "Did you know?",
      writtenBy: "Written by",
      typicalMusic: "Typical music",
      prev: "Previous",
      next: "Next",
      loading: "Loading…",
      loadError: "Sorry, the content could not be loaded. Please check your connection and try again.",
      retry: "Try again",
      notFound: "We couldn't find that country.",
      sample: "⚠️ SAMPLE CONTENT — the full list of countries is coming soon.",
      pageTitle: "Take a trip to Latin America",
      metaDescription: "Discover the food and music of {n} countries of Latin America and the Caribbean.",
      playerTitle: "Music player"
    },
    it: {
      brand: "America Latina",
      footer: "Fatto con ❤️ per la nostra mensa · ¡Buen provecho!",
      kicker: "¡Bienvenidos!",
      heroTitle: "Fai un viaggio in America Latina",
      heroText: "{n} paesi, {n} piatti, {n} canzoni. Tocca una bandiera per scoprire un piatto tipico, una canzone da ascoltare e una curiosità.",
      surprise: "Sorprendimi",
      countries: "Paesi",
      nCountries: "{n} paesi",
      search: "Cerca un paese o un piatto…",
      noResults: "Nessun paese corrisponde alla ricerca.",
      allCountries: "Tutti i paesi",
      capital: "Capitale",
      countryOf: "{i} di {n}",
      taste: "Assaggia",
      alsoTry: "Prova anche",
      listen: "Ascolta",
      play: "Riproduci",
      playing: "In riproduzione",
      openYouTube: "Apri su YouTube",
      openLink: "Apri la canzone",
      searchYouTube: "Cerca su YouTube",
      funFact: "Lo sapevi?",
      writtenBy: "Scritta da",
      typicalMusic: "Musica tipica",
      prev: "Precedente",
      next: "Successivo",
      loading: "Caricamento…",
      loadError: "Spiacenti, non è stato possibile caricare i contenuti. Controlla la connessione e riprova.",
      retry: "Riprova",
      notFound: "Non abbiamo trovato questo paese.",
      sample: "⚠️ CONTENUTI DI ESEMPIO — l'elenco completo dei paesi arriverà a breve.",
      pageTitle: "Fai un viaggio in America Latina",
      metaDescription: "Scopri il cibo e la musica di {n} paesi dell'America Latina e dei Caraibi.",
      playerTitle: "Lettore musicale"
    }
  };

  /* Flag-inspired accent colours, keyed by id with non-letters removed. */
  var ACCENTS = {
    argentina: ["#3d8fd1", "#74acdf", "#f6b40e"],
    bolivia: ["#d52b1e", "#f4c300", "#007934"],
    brazil: ["#009c3b", "#f2c500", "#002776"],
    brasil: ["#009c3b", "#f2c500", "#002776"],
    chile: ["#0039a6", "#5a7fd6", "#d52b1e"],
    colombia: ["#003893", "#f2b900", "#ce1126"],
    costarica: ["#002b7f", "#6a7fc0", "#ce1126"],
    cuba: ["#002a8f", "#4a6fd0", "#cf142b"],
    dominicanrepublic: ["#002d62", "#ce1126", "#1f5fa8"],
    republicadominicana: ["#002d62", "#ce1126", "#1f5fa8"],
    ecuador: ["#034ea2", "#f2c200", "#ed1c24"],
    elsalvador: ["#0f47af", "#4f86e0", "#1a9c5b"],
    salvador: ["#0f47af", "#4f86e0", "#1a9c5b"],
    guatemala: ["#1f6fb0", "#4997d0", "#2e8b57"],
    honduras: ["#0060b0", "#18a3cf", "#0a3d7a"],
    mexico: ["#006847", "#c9a227", "#ce1126"],
    nicaragua: ["#0058b0", "#3f95e0", "#c9a227"],
    panama: ["#072357", "#3b5ba5", "#da121a"],
    paraguay: ["#0038a8", "#7a4fb0", "#d52b1e"],
    peru: ["#b00d1d", "#e0303f", "#f28b82"],
    puertorico: ["#0050f0", "#6a3fc0", "#ed0000"],
    uruguay: ["#0038a8", "#4a78d0", "#f2b900"],
    venezuela: ["#00247d", "#f2b900", "#cf142b"],
    antiguaandbarbuda: ["#ce1126", "#0072c6", "#fcd116"],
    bahamas: ["#00778b", "#ffc72c", "#1a1a1a"],
    barbados: ["#00267f", "#ffc726", "#00267f"],
    dominica: ["#006b3f", "#d41c30", "#fcd116"],
    grenada: ["#ce1126", "#fcd116", "#007a5e"],
    haiti: ["#00209f", "#d21034", "#00209f"],
    jamaica: ["#009b3a", "#fed100", "#1a1a1a"],
    saintkittsandnevis: ["#009e49", "#fcd116", "#ce1126"],
    saintlucia: ["#1f8fd6", "#fcd116", "#1a1a1a"],
    saintvincentandthegrenadines: ["#0072c6", "#fcd116", "#009e60"],
    trinidadandtobago: ["#ce1126", "#1a1a1a", "#ce1126"]
  };

  var state = { lang: "en", countries: [], isSample: false, loaded: false, error: false, query: "" };

  /* ---------- helpers ---------- */
  function t(key, vars) {
    var s = (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function pick(obj, base) {
    if (!obj) return "";
    var v = obj[base + "_" + state.lang];
    if (v == null || v === "") v = obj[base + "_en"];
    if (v == null || v === "") v = obj[base];
    return v == null ? "" : v;
  }
  function countryName(c) { return pick(c, "name") || c.id; }
  function dishName(c) {
    var d = c.dish || {};
    return (typeof d === "string") ? d : (d["name_" + state.lang] || d.name_en || d.name || "");
  }
  function alternatives(c) {
    var d = c.dish || {};
    var a = d["alternatives_" + state.lang] || d.alternatives_en || d.alternatives || [];
    if (typeof a === "string") a = a.split(/\s*[,;]\s*/);
    return (Array.isArray(a) ? a : []).map(function (x) {
      return (x && typeof x === "object") ? (x["name_" + state.lang] || x.name || x.name_en || "") : x;
    }).filter(Boolean);
  }
  function hashHue(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360; return h; }
  function lum(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return 0.5;
    var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }
  function accents(c) {
    var key = norm(c.id).replace(/[^a-z]/g, "");
    var a = (Array.isArray(c.colors) && c.colors.length >= 2) ? c.colors : ACCENTS[key];
    if (!a) {
      var h = hashHue(key);
      a = ["hsl(" + h + ",70%,40%)", "hsl(" + ((h + 40) % 360) + ",85%,55%)", "hsl(" + ((h + 180) % 360) + ",60%,40%)"];
    }
    if (a.length < 3) a = [a[0], a[1], a[0]];
    var dark = a.slice().sort(function (x, y) { return lum(x) - lum(y); })[0];
    return "--a1:" + a[0] + ";--a2:" + a[1] + ";--a3:" + a[2] + ";--ad:" + dark + ";";
  }
  function sorted() {
    var loc = state.lang === "it" ? "it" : "en";
    return state.countries.slice().sort(function (a, b) { return countryName(a).localeCompare(countryName(b), loc); });
  }
  function youtubeId(url) {
    if (!url) return null;
    try {
      var u = new URL(url);
      var host = u.hostname.replace(/^www\.|^m\.|^music\./, "");
      if (host === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
      if (host === "youtube.com" || host === "youtube-nocookie.com") {
        if (u.searchParams.get("v")) return u.searchParams.get("v");
        var m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{6,})/);
        if (m) return m[1];
      }
    } catch (e) { /* not a URL */ }
    return null;
  }
  function youtubeStart(url) {
    try {
      var s = new URL(url).searchParams.get("t") || new URL(url).searchParams.get("start");
      if (!s) return 0;
      var m = String(s).match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/);
      return m ? (+(m[1] || 0) * 3600 + +(m[2] || 0) * 60 + +(m[3] || 0)) : 0;
    } catch (e) { return 0; }
  }
  function ytSearch(m) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent([m.song, m.artist].filter(Boolean).join(" "));
  }

  /* ---------- language ---------- */
  function setLang(lang, persist) {
    state.lang = (lang === "it") ? "it" : "en";
    if (persist) { try { localStorage.setItem(LANG_KEY, state.lang); } catch (e) { /* private mode */ } }
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === state.lang ? "true" : "false");
    });
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
  }
  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* ignore */ }
    setLang(saved || "en", false);
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-lang") === state.lang) return;
        setLang(b.getAttribute("data-lang"), true);
        render(false);
      });
    });
  }

  /* ---------- views ---------- */
  function sampleBanner() { return state.isSample ? '<p class="sample-banner">' + esc(t("sample")) + "</p>" : ""; }

  function tileHTML(c) {
    return '<li><a class="tile" href="#/' + encodeURIComponent(c.id) + '" style="' + accents(c) + '">' +
      '<span class="flag" aria-hidden="true">' + esc(c.flag || "🏳️") + "</span>" +
      '<span class="name">' + esc(countryName(c)) + "</span>" +
      '<span class="dish">' + esc(dishName(c)) + "</span></a></li>";
  }

  function renderHome() {
    document.title = t("pageTitle");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("metaDescription", { n: state.countries.length }));
    var list = sorted();
    app.innerHTML =
      sampleBanner() +
      '<section class="hero">' +
        '<div class="kicker">' + esc(t("kicker")) + "</div>" +
        "<h1>" + esc(t("heroTitle")) + "</h1>" +
        "<p>" + esc(t("heroText", { n: state.countries.length })) + "</p>" +
        '<div class="hero-emojis" aria-hidden="true"><span>🌮</span><span>🥘</span><span>🎺</span><span>🪇</span><span>💃</span><span>🥑</span></div>' +
        '<div class="hero-actions"><button type="button" class="btn" id="surprise">🎲 ' + esc(t("surprise")) + "</button></div>" +
      "</section>" +
      '<label class="search"><span class="sr" hidden>' + esc(t("search")) + '</span>' +
        '<input id="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(t("search")) + '" aria-label="' + esc(t("search")) + '" value="' + esc(state.query) + '"></label>' +
      '<div class="section-title"><h2>' + esc(t("countries")) + '</h2><span>' + esc(t("nCountries", { n: list.length })) + "</span></div>" +
      '<ul class="grid" id="grid">' + list.map(tileHTML).join("") + "</ul>" +
      '<p class="empty" id="empty" hidden>' + esc(t("noResults")) + "</p>";

    var q = document.getElementById("q");
    q.addEventListener("input", function () { state.query = q.value; filter(); });
    document.getElementById("surprise").addEventListener("click", function () {
      var c = state.countries[Math.floor(Math.random() * state.countries.length)];
      if (c) location.hash = "#/" + encodeURIComponent(c.id);
    });
    if (state.query) filter();
  }

  function filter() {
    var q = norm(state.query.trim());
    var items = document.querySelectorAll("#grid li");
    var list = sorted(), shown = 0;
    list.forEach(function (c, i) {
      var mu = c.music || {}, di = c.dish || {};
      var hay = norm([c.name_en, c.name_it, c.capital, c.capital_en, c.capital_it, dishName(c), di.name, di.name_en, di.name_it,
        alternatives(c).join(" "), [].concat(di.alternatives_en || [], di.alternatives_it || []).join(" "),
        mu.genre, mu.genre_en, mu.genre_it, mu.song_genre, mu.song_genre_en, mu.song_genre_it, mu.song, mu.artist, mu.artist_en, mu.artist_it].join(" "));
      var ok = !q || hay.indexOf(q) !== -1;
      if (items[i]) items[i].hidden = !ok;
      if (ok) shown++;
    });
    document.getElementById("empty").hidden = shown !== 0;
  }

  function musicActions(m) {
    var yt = youtubeId(m.url);
    if (yt) {
      return '<button type="button" class="btn btn-play" data-yt="' + esc(yt) + '" data-start="' + youtubeStart(m.url) + '"><span class="e" aria-hidden="true">▶️</span> ' + esc(t("play")) + "</button>" +
        '<a class="btn btn-ghost" href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(t("openYouTube")) + " ↗</a>";
    }
    if (m.url && /^https?:\/\//i.test(m.url)) {
      return '<a class="btn btn-play" href="' + esc(m.url) + '" target="_blank" rel="noopener"><span class="e" aria-hidden="true">▶️</span> ' + esc(t("play")) + "</a>" +
        '<a class="btn btn-ghost" href="' + esc(ytSearch(m)) + '" target="_blank" rel="noopener">' + esc(t("searchYouTube")) + " ↗</a>";
    }
    return '<a class="btn btn-play" href="' + esc(ytSearch(m)) + '" target="_blank" rel="noopener"><span class="e" aria-hidden="true">🔎</span> ' + esc(t("searchYouTube")) + " ↗</a>";
  }

  function renderCountry(id) {
    var list = sorted();
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id || slug(list[i].id) === slug(id) || slug(list[i].name_en) === slug(id) || slug(list[i].name_it) === slug(id)) { idx = i; break; }
    }
    if (idx === -1) {
      document.title = t("pageTitle");
      app.innerHTML = '<div class="notice"><p style="font-size:48px;margin:0">🧭</p><p>' + esc(t("notFound")) + '</p><a class="btn btn-dark" href="#/">' + esc(t("allCountries")) + "</a></div>";
      return;
    }
    var c = list[idx];
    var prev = list[(idx - 1 + list.length) % list.length];
    var next = list[(idx + 1) % list.length];
    var d = c.dish || {};
    var m = c.music || {};
    var alts = alternatives(c);
    var story = pick(d, "story");
    var fact = pick(c, "fun_fact");
    var capital = pick(c, "capital");
    /* every visible music field is language-aware: *_it / *_en, falling back to the plain key */
    var songGenre = pick(m, "song_genre") || pick(m, "genre");
    var typical = pick(m, "genre");
    var note = pick(c, "note");
    var artist = pick(m, "artist");
    var composerRaw = pick(m, "composer");
    var composer = (composerRaw && norm(composerRaw) !== norm(artist)) ? composerRaw : "";
    var byline = [artist, pick(m, "year")].filter(function (x) { return x != null && x !== ""; }).join(" · ");
    document.title = countryName(c) + " · " + t("pageTitle");

    app.innerHTML =
      sampleBanner() +
      '<div style="' + accents(c) + '">' +
      '<nav class="crumbs"><a href="#/">← ' + esc(t("allCountries")) + "</a></nav>" +
      '<section class="c-hero">' +
        '<div class="flag" aria-hidden="true">' + esc(c.flag || "🏳️") + "</div>" +
        "<h1>" + esc(countryName(c)) + "</h1>" +
        '<div class="meta">' +
          (capital ? '<span class="pill">📍 ' + esc(t("capital")) + ": " + esc(capital) + "</span>" : "") +
          '<span class="pill">' + esc(t("countryOf", { i: idx + 1, n: list.length })) + "</span>" +
        "</div>" +
        (note ? '<p class="c-note">ℹ️ ' + esc(note) + "</p>" : "") +
      "</section>" +
      '<section class="card dish-card" aria-labelledby="dish-h">' +
        '<span class="plate" aria-hidden="true">🍽️</span>' +
        '<div class="label"><span class="e" aria-hidden="true">🍽️</span>' + esc(t("taste")) + "</div>" +
        '<h2 id="dish-h">' + esc(dishName(c)) + "</h2>" +
        (story ? '<p class="story">' + esc(story) + "</p>" : "") +
        (alts.length ? '<div class="also"><div class="also-title">' + esc(t("alsoTry")) + '</div><div class="chips">' +
          alts.map(function (a) { return '<span class="chip">' + esc(a) + "</span>"; }).join("") + "</div></div>" : "") +
      "</section>" +
      '<section class="card music-card" aria-labelledby="music-h">' +
        '<span class="vinyl" aria-hidden="true"></span>' +
        '<div class="label"><span class="e" aria-hidden="true">🎵</span>' + esc(t("listen")) + "</div>" +
        '<h2 id="music-h">' + esc(m.song || "") + "</h2>" +
        (byline ? '<div class="artist">' + esc(byline) + "</div>" : "") +
        (songGenre ? '<div class="genre"><span class="pill">🎶 ' + esc(songGenre) + "</span></div>" : "") +
        (composer ? '<p class="composer"><span>' + esc(t("writtenBy")) + ":</span> " + esc(composer) + "</p>" : "") +
        '<div class="player-actions">' + musicActions(m) + "</div>" +
        '<div class="embed" id="embed" hidden></div>' +
        (typical ? '<div class="typical"><span class="e" aria-hidden="true">🥁</span><div><small>' + esc(t("typicalMusic")) + "</small><strong>" + esc(typical) + "</strong></div></div>" : "") +
      "</section>" +
      (fact ? '<section class="card fact-card"><div class="label"><span class="e" aria-hidden="true">💡</span>' + esc(t("funFact")) + "</div><p>" + esc(fact) + "</p></section>" : "") +
      (list.length > 1 ?
        '<nav class="pager" aria-label="' + esc(t("prev")) + " / " + esc(t("next")) + '">' +
          '<a class="prev" href="#/' + encodeURIComponent(prev.id) + '" rel="prev"><small>← ' + esc(t("prev")) + '</small><strong><span class="f" aria-hidden="true">' + esc(prev.flag || "") + "</span> " + esc(countryName(prev)) + "</strong></a>" +
          '<a class="next" href="#/' + encodeURIComponent(next.id) + '" rel="next"><small>' + esc(t("next")) + ' →</small><strong>' + esc(countryName(next)) + ' <span class="f" aria-hidden="true">' + esc(next.flag || "") + "</span></strong></a>" +
        "</nav>" : "") +
      '<div class="all-link"><a class="btn" href="#/">🌎 ' + esc(t("allCountries")) + "</a></div>" +
      "</div>";

    var playBtn = app.querySelector("[data-yt]");
    if (playBtn) playBtn.addEventListener("click", function () {
      var box = document.getElementById("embed");
      var vid = playBtn.getAttribute("data-yt");
      var start = +playBtn.getAttribute("data-start") || 0;
      if (!box.firstChild) {
        var f = document.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(vid) + "?autoplay=1&playsinline=1&rel=0" + (start ? "&start=" + start : "");
        f.title = t("playerTitle") + ": " + (m.song || "");
        f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        f.referrerPolicy = "strict-origin-when-cross-origin";
        box.appendChild(f);
      }
      box.hidden = false;
      playBtn.closest(".music-card").classList.add("playing");
      playBtn.innerHTML = '<span class="e" aria-hidden="true">🎶</span> ' + esc(t("playing"));
      playBtn.disabled = true;
      box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function renderError() {
    document.title = t("pageTitle");
    app.innerHTML = '<div class="notice"><p style="font-size:48px;margin:0">📡</p><p>' + esc(t("loadError")) + '</p><button type="button" class="btn btn-dark" id="retry">' + esc(t("retry")) + "</button></div>";
    document.getElementById("retry").addEventListener("click", load);
  }

  function currentRoute() {
    var h = decodeURIComponent((location.hash || "").replace(/^#\/?/, "")).replace(/\/+$/, "");
    return h;
  }

  function render(scroll) {
    if (state.error) return renderError();
    if (!state.loaded) { app.innerHTML = '<div class="loading" aria-live="polite"><span class="spinner" aria-hidden="true"></span></div>'; return; }
    var r = currentRoute();
    if (r) renderCountry(r); else renderHome();
    if (scroll) window.scrollTo(0, 0);
  }

  /* ---------- data ---------- */
  function load() {
    state.error = false; state.loaded = false; render(false);
    fetch("content.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        var arr = Array.isArray(data) ? data : (data && (data.countries || data.items)) || [];
        state.countries = arr.filter(function (c) { return c && (c.id || c.name_en); }).map(function (c) {
          if (!c.id) c.id = slug(c.name_en);
          return c;
        });
        state.isSample = !!(data && data.sample) || state.countries.some(function (c) { return /SAMPLE/.test(c.name_en || ""); });
        state.loaded = true;
        render(false);
      })
      .catch(function () { state.error = true; render(false); });
  }

  window.addEventListener("hashchange", function () { render(true); });
  initLang();
  load();
})();
