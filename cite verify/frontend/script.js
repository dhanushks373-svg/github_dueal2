/* =========================================
   CITEVERIFY — COMPLETE ANIMATION ENGINE
   CRIMSON EMBERS + PAGE 1 + PAGE 2 +
   Z-TUNNEL UPLOAD + HINGE EXTRACT +
   GYRO-ORBIT RETRIEVE + COUNTER-SHEAR COMPARE +
   GSAP HYPER-PRISM REPORT +
   GSAP PENDULUM DOSSIER DEMO & TRUST
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const $ = function (id) {
    return document.getElementById(id);
  };

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================
     AMBIENT CRIMSON EMBERS (DARK BACKGROUND)
  ======================================= */

  const emberField = $("emberField");
  if (emberField && !reduceMotion) {
    const emberCount = window.innerWidth < 650 ? 14 : 26;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < emberCount; i++) {
      const ember = document.createElement("span");
      ember.className = "crimson-ember";
      const size = 3 + (i % 5) * 1.4;
      const leftPos = ((i * 37) % 100);
      const duration = 9 + (i % 7) * 2.2;
      const delay = -((i * 1.9) % duration);
      const driftX = ((i % 2 === 0 ? 1 : -1) * (14 + (i % 4) * 10)) + "px";

      ember.style.width = size + "px";
      ember.style.height = size + "px";
      ember.style.left = leftPos + "%";
      ember.style.animationDuration = duration + "s";
      ember.style.animationDelay = delay + "s";
      ember.style.setProperty("--drift-x", driftX);
      frag.appendChild(ember);
    }

    emberField.appendChild(frag);
  }


  /* =======================================
     PAGE 1 — HERO ANIMATION
  ======================================= */

  const hero = $("hero");

  if (hero) {

    const wm = $("wm");
    const word = "CiteVerify";

    wm.innerHTML = word.split("").map(function (letter) {
      return (
        '<span aria-hidden="true">' +
        '<i>' + letter + '</i>' +
        '</span>'
      );
    }).join("");

    const letters = wm.querySelectorAll("i");
    const particles = document.querySelectorAll("#px .p");
    const connectionLines = document.querySelectorAll("#ci .dr");
    const connectionDots = document.querySelectorAll("#ci .e");

    function segment(progress, start, end) {
      return Math.min(1, Math.max(0, (progress - start) / (end - start)));
    }

    function animateHero() {
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      const progress = reduceMotion
        ? 1
        : Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));

      const shield = segment(progress, 0, .16);
      const lock = segment(progress, .12, .28);
      const particlesProgress = segment(progress, .20, .38);
      const textProgress = segment(progress, .40, .64);
      const finalProgress = segment(progress, .68, .84);

      $("sh").style.strokeDashoffset = 1 - shield;
      $("sk").style.strokeDashoffset = 1 - lock;
      $("bd").style.opacity = segment(lock, .4, 1);

      particles.forEach(function (element, index) {
        const p = segment(particlesProgress, index * .08, index * .08 + .45);
        element.style.opacity = p;
        element.style.transform = "translateX(" + ((1 - p) * -36) + "px)";
      });

      connectionLines.forEach(function (element) {
        element.style.strokeDashoffset = 1 - particlesProgress;
      });

      connectionDots.forEach(function (element) {
        element.style.opacity = segment(particlesProgress, .7, 1);
      });

      $("glow").style.opacity = Math.min(1, particlesProgress * 1.2);
      $("mark").style.transform = "scale(" + (1.3 - .3 * textProgress) + ")";

      letters.forEach(function (element, index) {
        const p = segment(textProgress, index * .07, index * .07 + .4);
        element.style.transform = "translateY(" + ((1 - p) * 105) + "%)";
      });

      $("tag").style.opacity = finalProgress;
      $("tag").style.transform = "translateY(" + ((1 - finalProgress) * 16) + "px)";

      $("cta").style.opacity = finalProgress;
      $("cta").style.transform = "translateY(" + ((1 - finalProgress) * 16) + "px)";

      $("hint").style.opacity = 1 - segment(progress, 0, .06);
    }

    window.addEventListener("scroll", animateHero, { passive: true });
    window.addEventListener("resize", animateHero);
    animateHero();
  }


  /* =======================================
     PAGE 2 — 3D WORKFLOW
  ======================================= */

  const how = $("how");

  if (how) {

    const ring = $("ring");
    const slides = how.querySelectorAll(".slide");
    const pillContainer = $("pills");
    const progressBar = $("pb");
    const title = $("st");
    const description = $("sd");

    const workflow = [
      ["Upload", "Upload your paper", "Drop a research paper or paste the text."],
      ["Extract", "Find claims and citations", "Every claim is pulled out with its citation attached to it."],
      ["Retrieve", "Find the original paper", "The cited paper is located by title, author, or DOI."],
      ["Compare", "Read claim against source", "The claim is checked against the source passage, scope and limitations."],
      ["Report", "Get an evidence-backed report", "A verdict, confidence and source link for every claim. You make the final call."]
    ];

    let previousStep = -1;
    let radius = 0;

    pillContainer.innerHTML = workflow.map(function (item, index) {
      return '<span class="pill">' + (index + 1) + " " + item[0] + '</span>';
    }).join("");

    const pills = pillContainer.querySelectorAll(".pill");

    function arrangeRing() {
      if (!slides.length) return;
      const width = slides[0].offsetWidth;
      radius = (width / 2) / Math.tan(Math.PI / 5) + 14;
      slides.forEach(function (slide, index) {
        slide.style.transform =
          "rotateY(" + (index * 72) + "deg) " +
          "translateZ(" + radius + "px)";
      });
    }

    function animateWorkflow() {
      const rect = how.getBoundingClientRect();
      const total = how.offsetHeight - window.innerHeight;
      const progress = reduceMotion
        ? 1
        : Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));

      const position = progress * 4;
      const currentStep = Math.min(4, Math.max(0, Math.round(position)));

      if (!reduceMotion) {
        ring.style.transform =
          "translateZ(" + (-radius) + "px) " +
          "rotateY(" + (-position * 72) + "deg)";
      } else {
        ring.style.transform = "translateZ(" + (-radius) + "px)";
      }

      slides.forEach(function (slide, index) {
        const distance = Math.abs(index - position);
        slide.style.opacity = Math.max(.15, 1 - distance * .6);
      });

      if (currentStep !== previousStep) {
        previousStep = currentStep;
        title.textContent = workflow[currentStep][1];
        description.textContent = workflow[currentStep][2];

        [title, description].forEach(function (element) {
          element.classList.remove("swap");
          void element.offsetWidth;
          element.classList.add("swap");
        });

        pills.forEach(function (pill, index) {
          pill.className = "pill";
          if (index < currentStep) pill.classList.add("done");
          if (index === currentStep) pill.classList.add("on");
        });
      }

      progressBar.style.width = (progress * 100) + "%";
    }

    arrangeRing();
    window.addEventListener("scroll", animateWorkflow, { passive: true });
    window.addEventListener("resize", function () {
      arrangeRing();
      animateWorkflow();
    });
    animateWorkflow();
  }


  /* =======================================
     UPLOAD SECTION — 3D Z-TUNNEL WARP SLIDES
  ======================================= */

  const uploadSec = $("upload");

  if (uploadSec) {

    const upHead = $("upHead");
    const upSlides = uploadSec.querySelectorAll(".up-3d-slide");
    const upTabs = uploadSec.querySelectorAll(".up-tab");
    const upProgressBar = $("upProgressBar");
    const upSlideCounter = $("upSlideCounter");
    const upScrollHint = $("upScrollHint");

    const SAMPLE_PAPER_TEXT =
      "A particular study found that a learning app improved test scores by 30% [3]. " +
      "Structured retrieval practice over eight weeks improved delayed recall in introductory biology [1].";

    const manuscriptArea = $("manuscriptArea");
    const paperInput = $("paperInput");
    const dropZone = $("dropZone");

    function syncIngestionSummary(docLabel, modeLabel) {
      const text = manuscriptArea ? manuscriptArea.value.trim() : "";
      const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
      const chars = text.length;

      if ($("wordCountChip")) {
        $("wordCountChip").textContent = words + " words · " + chars + " chars";
      }
      if ($("selectedFileName") && docLabel) {
        $("selectedFileName").textContent = docLabel;
      }
      if ($("docBadge") && docLabel) {
        $("docBadge").textContent = docLabel + " · Ready";
      }
      if ($("summaryDocName") && docLabel) {
        $("summaryDocName").textContent = docLabel;
      }
      if ($("summaryMode") && modeLabel) {
        $("summaryMode").textContent = modeLabel;
      }
      if ($("summarySnippet")) {
        $("summarySnippet").textContent =
          text || "No text pasted yet. Click Load Sample Paper or drop a file.";
      }
      if ($("readyChip")) {
        $("readyChip").textContent = words > 0 ? "Staged (" + words + " words)" : "Waiting for input";
      }
    }

    function loadSamplePaper() {
      if (manuscriptArea) {
        manuscriptArea.value = SAMPLE_PAPER_TEXT;
      }
      syncIngestionSummary("sample-learning-study.pdf", "1-Click Sample Paper");
    }

    function scrollToUpSlide(slideIdx) {
      const scrollable = Math.max(uploadSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = uploadSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateUploadZTunnel() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (upHead) {
          upHead.style.opacity = 1;
          upHead.style.transform = "none";
        }
        return;
      }

      const rect = uploadSec.getBoundingClientRect();
      const total = Math.max(uploadSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (upHead) {
        upHead.style.opacity = headTrigger;
        upHead.style.transform =
          "translate3d(0," + ((1 - headTrigger) * 28) + "px,0)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      upSlides.forEach(function (slide, idx) {
        const delta = idx - slidePos;
        const absDelta = Math.abs(delta);

        const tz = delta < 0 ? Math.abs(delta) * 280 : -delta * 420;
        const ty = delta * -28;
        const rx = delta * 14;
        const scale = Math.max(0.72, 1 - absDelta * 0.16);
        const opacity = Math.max(0, 1 - absDelta * 0.85);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDelta < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(20 - Math.round(absDelta * 8));
        slide.style.transform =
          "perspective(1700px) " +
          "translate3d(0, " + ty + "px, " + tz + "px) " +
          "rotateX(" + rx + "deg) " +
          "scale(" + scale + ")";
      });

      upTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (upProgressBar) upProgressBar.style.width = (p * 100) + "%";
      if (upSlideCounter) upSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (upScrollHint) {
        upScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D Z-WARP SLIDES ↓" : "DOCUMENT READY FOR EXTRACTION ↓";
      }
    }

    if ($("loadSampleBtn")) {
      $("loadSampleBtn").addEventListener("click", function () {
        loadSamplePaper();
        scrollToUpSlide(1);
      });
    }

    if ($("loadSampleBtn2")) {
      $("loadSampleBtn2").addEventListener("click", loadSamplePaper);
    }

    if ($("toSlide2Btn")) {
      $("toSlide2Btn").addEventListener("click", function () {
        scrollToUpSlide(1);
      });
    }

    if ($("toSlide3Btn")) {
      $("toSlide3Btn").addEventListener("click", function () {
        syncIngestionSummary(
          ($("selectedFileName") && $("selectedFileName").textContent) || "manuscript.pdf",
          "Pasted Manuscript Text"
        );
        scrollToUpSlide(2);
      });
    }

    if ($("backSlide1Btn")) {
      $("backSlide1Btn").addEventListener("click", function () {
        scrollToUpSlide(0);
      });
    }

    upTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToUpSlide(Number(tab.getAttribute("data-up-slide")));
      });
    });

    if (manuscriptArea) {
      manuscriptArea.addEventListener("input", function () {
        syncIngestionSummary(
          ($("selectedFileName") && $("selectedFileName").textContent) || "manuscript.pdf",
          "Pasted Manuscript Text"
        );
      });
    }

    if (paperInput) {
      paperInput.addEventListener("change", function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        syncIngestionSummary(file.name, "Uploaded File");

        if (/\.txt|\.md$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onload = function () {
            if (manuscriptArea) {
              manuscriptArea.value = String(reader.result || "").slice(0, 1500);
            }
            syncIngestionSummary(file.name, "Uploaded Text File");
          };
          reader.readAsText(file);
        }
      });
    }

    if (dropZone) {
      ["dragenter", "dragover"].forEach(function (evtName) {
        dropZone.addEventListener(evtName, function (e) {
          e.preventDefault();
          dropZone.classList.add("dragover");
        });
      });

      ["dragleave", "drop"].forEach(function (evtName) {
        dropZone.addEventListener(evtName, function (e) {
          e.preventDefault();
          dropZone.classList.remove("dragover");
        });
      });

      dropZone.addEventListener("drop", function (e) {
        const files = e.dataTransfer && e.dataTransfer.files;
        if (!files || !files.length) return;
        const file = files[0];
        syncIngestionSummary(file.name, "Dropped File");
      });
    }

    window.addEventListener("scroll", animateUploadZTunnel, { passive: true });
    window.addEventListener("resize", animateUploadZTunnel);

    syncIngestionSummary("manuscript.pdf", "Awaiting Upload or Sample");
    animateUploadZTunnel();
  }


  /* =======================================
     4TH PAGE — STEP 2: 3D HINGE-FOLD SLIDES
  ======================================= */

  const extractSec = $("extract");

  if (extractSec) {

    const exHead = $("exHead");
    const ex3DTag = $("ex3DTag");
    const exSlides = extractSec.querySelectorAll(".ex-3d-slide");
    const exTabs = extractSec.querySelectorAll(".ex-tab");
    const exProgressBar = $("exProgressBar");
    const exSlideCounter = $("exSlideCounter");
    const exScrollHint = $("exScrollHint");
    const exRefCard = $("exRefCard");

    const REF_MAP = {
      "3": {
        id: "REF [3] · MATCHED TO 30% CLAIM",
        title: "Smith, J., & Patel, R. (2021)",
        desc: "Classroom Mobile Learning Pilot & Assessment Outcomes, Journal of Educational Practice, Vol. 18, pp. 41–56.",
        status: "Ready for Source Retrieval"
      },
      "1": {
        id: "REF [1] · MATCHED TO RECALL CLAIM",
        title: "Lin, H., & Gomez, M. (2023)",
        desc: "Spaced Retrieval Schedules in Introductory Biology Labs, Quarterly Review of STEM Pedagogy, pp. 112–128.",
        status: "Ready for Source Retrieval"
      },
      "ay": {
        id: "REF (SMITH, 2021) · AUTHOR-YEAR LINKED",
        title: "Smith, J. (2021)",
        desc: "Matched by author surname and publication year against bibliography entry #3.",
        status: "Author-Year Citation Resolved"
      }
    };

    document.querySelectorAll(".ex-token-card").forEach(function (card) {
      card.addEventListener("click", function () {
        document.querySelectorAll(".ex-token-card").forEach(function (c) {
          c.classList.remove("active-token");
        });
        card.classList.add("active-token");

        const key = card.getAttribute("data-ref");
        const ref = REF_MAP[key];
        if (ref && exRefCard) {
          exRefCard.innerHTML =
            '<div class="ex-ref-id">' + ref.id + '</div>' +
            '<h4>' + ref.title + '</h4>' +
            '<p><em>' + ref.desc + '</em></p>' +
            '<span class="ex-ref-status">' + ref.status + '</span>';
        }
      });
    });

    function scrollToExSlide(slideIdx) {
      const scrollable = Math.max(extractSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = extractSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateExtractHingeFold() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (exHead) {
          exHead.style.opacity = 1;
          exHead.style.transform = "none";
        }
        return;
      }

      const rect = extractSec.getBoundingClientRect();
      const total = Math.max(extractSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (exHead) {
        exHead.style.opacity = headTrigger;
        exHead.style.transform =
          "translate3d(0," + ((1 - headTrigger) * 32) + "px," + ((1 - headTrigger) * -40) + "px) " +
          "rotateX(" + ((1 - headTrigger) * 8) + "deg)";
      }

      if (ex3DTag) {
        ex3DTag.style.transform =
          "translate3d(" + (-p * 42) + "px," + (p * 18) + "px,0) " +
          "rotateY(" + (-10 + p * 45) + "deg)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      exSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const hingeAngle = diff < 0 ? diff * 78 : diff * 22;
        const tz = diff < 0 ? 40 : -absDiff * 110;
        const scale = Math.max(0.86, 1 - absDiff * 0.08);
        const opacity = diff < -0.95 ? 0 : Math.max(0, 1 - absDiff * 0.85);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(30 - Math.round(absDiff * 10));
        slide.style.transform =
          "perspective(1750px) " +
          "translate3d(0, 0, " + tz + "px) " +
          "rotateY(" + hingeAngle + "deg) " +
          "scale(" + scale + ")";
      });

      exTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (exProgressBar) exProgressBar.style.width = (p * 100) + "%";
      if (exSlideCounter) exSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (exScrollHint) {
        exScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D HINGE-FOLD SLIDES ↓" : "CLAIMS & CITATIONS EXTRACTED ↓";
      }
    }

    exTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToExSlide(Number(tab.getAttribute("data-ex-slide")));
      });
    });

    if ($("exToSlide2Btn")) {
      $("exToSlide2Btn").addEventListener("click", function () {
        scrollToExSlide(1);
      });
    }

    if ($("exToSlide3Btn")) {
      $("exToSlide3Btn").addEventListener("click", function () {
        scrollToExSlide(2);
      });
    }

    if ($("exBackSlide1Btn")) {
      $("exBackSlide1Btn").addEventListener("click", function () {
        scrollToExSlide(0);
      });
    }

    if ($("exBackSlide2Btn")) {
      $("exBackSlide2Btn").addEventListener("click", function () {
        scrollToExSlide(1);
      });
    }

    window.addEventListener("scroll", animateExtractHingeFold, { passive: true });
    window.addEventListener("resize", animateExtractHingeFold);

    animateExtractHingeFold();
  }


  /* =======================================
     5TH PAGE — STEP 3: 3D DIAGONAL GYRO-ORBIT SLIDES
  ======================================= */

  const retrieveSec = $("retrieve");

  if (retrieveSec) {

    const retHead = $("retHead");
    const retGyroBadge = $("retGyroBadge");
    const retSlides = retrieveSec.querySelectorAll(".ret-3d-slide");
    const retTabs = retrieveSec.querySelectorAll(".ret-tab");
    const retProgressBar = $("retProgressBar");
    const retSlideCounter = $("retSlideCounter");
    const retScrollHint = $("retScrollHint");

    const SOURCE_CATALOG = {
      smith2021: {
        badge: "Primary Source Located",
        title: "Classroom Mobile Learning Pilot & Assessment Outcomes",
        author: "Smith, J., & Patel, R.",
        year: "2021",
        pageSec: "Page 4 · Section 2.1 (pp. 41–56)",
        doiText: "https://doi.org/10.1080/edup.2021.0419 ↗",
        doiHref: "https://doi.org/10.1080/edup.2021.0419"
      },
      lin2023: {
        badge: "Primary Source Located",
        title: "Spaced Retrieval Schedules in Introductory Biology Labs",
        author: "Lin, H., & Gomez, M.",
        year: "2023",
        pageSec: "Page 115 · Section 3.2 (pp. 112–128)",
        doiText: "https://doi.org/10.1016/j.stemped.2023.08.004 ↗",
        doiHref: "https://doi.org/10.1016/j.stemped.2023.08.004"
      }
    };

    document.querySelectorAll(".ret-pick-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".ret-pick-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        const key = btn.getAttribute("data-source");
        const item = SOURCE_CATALOG[key];
        if (!item) return;

        if ($("retMatchBadge")) $("retMatchBadge").textContent = item.badge;
        if ($("retPaperTitle")) $("retPaperTitle").textContent = item.title;
        if ($("retAuthor")) $("retAuthor").textContent = item.author;
        if ($("retYear")) $("retYear").textContent = item.year;
        if ($("retYearBadge")) $("retYearBadge").textContent = item.year;
        if ($("retPageSec")) $("retPageSec").textContent = item.pageSec;
        if ($("retDoiLink")) {
          $("retDoiLink").textContent = item.doiText;
          $("retDoiLink").setAttribute("href", item.doiHref);
        }
      });
    });

    function scrollToRetSlide(slideIdx) {
      const scrollable = Math.max(retrieveSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = retrieveSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateRetrieveGyroOrbit() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (retHead) {
          retHead.style.opacity = 1;
          retHead.style.transform = "none";
        }
        return;
      }

      const rect = retrieveSec.getBoundingClientRect();
      const total = Math.max(retrieveSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (retHead) {
        retHead.style.opacity = headTrigger;
        retHead.style.transform =
          "translate3d(0," + ((1 - headTrigger) * 34) + "px," + ((1 - headTrigger) * -50) + "px) " +
          "rotateX(" + ((1 - headTrigger) * 10) + "deg)";
      }

      if (retGyroBadge) {
        retGyroBadge.style.transform =
          "translate3d(" + (-p * 55) + "px," + (p * 24) + "px,0) " +
          "rotateZ(" + (p * 32) + "deg) rotateY(" + (-18 + p * 50) + "deg)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      retSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const tx = diff * 52;
        const ty = diff * -34;
        const tz = -absDiff * 290;
        const rx = diff * -18;
        const ry = diff * 28;
        const rz = diff * -5;
        const scale = Math.max(0.76, 1 - absDiff * 0.15);
        const opacity = Math.max(0, 1 - absDiff * 0.78);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(25 - Math.round(absDiff * 8));
        slide.style.transform =
          "perspective(1850px) " +
          "translate3d(" + tx + "%, " + ty + "px, " + tz + "px) " +
          "rotateX(" + rx + "deg) " +
          "rotateY(" + ry + "deg) " +
          "rotateZ(" + rz + "deg) " +
          "scale(" + scale + ")";
      });

      retTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (retProgressBar) retProgressBar.style.width = (p * 100) + "%";
      if (retSlideCounter) retSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (retScrollHint) {
        retScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D GYRO-ORBIT SLIDES ↓" : "PRIMARY SOURCES RETRIEVED ↓";
      }
    }

    retTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToRetSlide(Number(tab.getAttribute("data-ret-slide")));
      });
    });

    if ($("retToSlide2Btn")) {
      $("retToSlide2Btn").addEventListener("click", function () {
        scrollToRetSlide(1);
      });
    }

    if ($("retToSlide3Btn")) {
      $("retToSlide3Btn").addEventListener("click", function () {
        scrollToRetSlide(2);
      });
    }

    if ($("retBackSlide1Btn")) {
      $("retBackSlide1Btn").addEventListener("click", function () {
        scrollToRetSlide(0);
      });
    }

    if ($("retBackSlide2Btn")) {
      $("retBackSlide2Btn").addEventListener("click", function () {
        scrollToRetSlide(1);
      });
    }

    window.addEventListener("scroll", animateRetrieveGyroOrbit, { passive: true });
    window.addEventListener("resize", animateRetrieveGyroOrbit);

    animateRetrieveGyroOrbit();
  }


  /* =======================================
     6TH PAGE — STEP 4: 3D GUILLOTINE COUNTER-SHEAR SLIDES
  ======================================= */

  const compareSec = $("compare");

  if (compareSec) {

    const cmpHead = $("cmpHead");
    const cmpDialBadge = $("cmpDialBadge");
    const cmpShearRail = $("cmpShearRail");
    const cmpSlides = compareSec.querySelectorAll(".cmp-3d-slide");
    const cmpTabs = compareSec.querySelectorAll(".cmp-tab");
    const cmpProgressBar = $("cmpProgressBar");
    const cmpSlideCounter = $("cmpSlideCounter");
    const cmpScrollHint = $("cmpScrollHint");
    const cmpClaimPane = $("cmpClaimPane");
    const cmpSourcePane = $("cmpSourcePane");

    function scrollToCmpSlide(slideIdx) {
      const scrollable = Math.max(compareSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = compareSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateCompareCounterShear() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (cmpHead) {
          cmpHead.style.opacity = 1;
          cmpHead.style.transform = "none";
        }
        return;
      }

      const rect = compareSec.getBoundingClientRect();
      const total = Math.max(compareSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (cmpHead) {
        cmpHead.style.opacity = headTrigger;
        cmpHead.style.transform =
          "translate3d(" + ((1 - headTrigger) * -28) + "px," + ((1 - headTrigger) * 32) + "px,0) " +
          "rotateX(" + ((1 - headTrigger) * 10) + "deg)";
      }

      if (cmpDialBadge) {
        const rock = Math.cos(p * Math.PI * 2) * 16;
        cmpDialBadge.style.transform =
          "translate3d(" + (-p * 44) + "px," + (p * 20) + "px,0) " +
          "rotateZ(" + rock + "deg) rotateX(" + (14 - p * 28) + "deg)";
      }

      if (cmpShearRail) {
        cmpShearRail.style.transform =
          "translate3d(" + ((p - 0.5) * 90) + "px, " + ((p - 0.5) * -60) + "px, 0)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      cmpSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const ty = diff < 0 ? diff * 140 : diff * 95;
        const tz = -absDiff * 260;
        const rx = diff * -22;
        const rz = diff * 6;
        const scale = Math.max(0.78, 1 - absDiff * 0.14);
        const opacity = Math.max(0, 1 - absDiff * 0.82);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(28 - Math.round(absDiff * 9));
        slide.style.transform =
          "perspective(2050px) " +
          "translate3d(0, " + ty + "px, " + tz + "px) " +
          "rotateX(" + rx + "deg) " +
          "rotateZ(" + rz + "deg) " +
          "scale(" + scale + ")";
      });

      if (cmpClaimPane && cmpSourcePane) {
        const shearWave = Math.sin(p * Math.PI);
        cmpClaimPane.style.transform =
          "perspective(1300px) " +
          "translate3d(" + (-shearWave * 14) + "px, " + (-shearWave * 8) + "px, " + (shearWave * 18) + "px) " +
          "rotateY(" + (shearWave * 11) + "deg) rotateZ(" + (-shearWave * 1.4) + "deg)";

        cmpSourcePane.style.transform =
          "perspective(1300px) " +
          "translate3d(" + (shearWave * 14) + "px, " + (shearWave * 8) + "px, " + (shearWave * 18) + "px) " +
          "rotateY(" + (-shearWave * 11) + "deg) rotateZ(" + (shearWave * 1.4) + "deg)";
      }

      cmpTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (cmpProgressBar) cmpProgressBar.style.width = (p * 100) + "%";
      if (cmpSlideCounter) cmpSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (cmpScrollHint) {
        cmpScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D COUNTER-SHEAR SLIDES ↓" : "EVIDENCE & SCOPE AUDIT COMPLETE ↓";
      }
    }

    cmpTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToCmpSlide(Number(tab.getAttribute("data-cmp-slide")));
      });
    });

    if ($("cmpToSlide2Btn")) {
      $("cmpToSlide2Btn").addEventListener("click", function () {
        scrollToCmpSlide(1);
      });
    }

    if ($("cmpToSlide3Btn")) {
      $("cmpToSlide3Btn").addEventListener("click", function () {
        scrollToCmpSlide(2);
      });
    }

    if ($("cmpBackSlide1Btn")) {
      $("cmpBackSlide1Btn").addEventListener("click", function () {
        scrollToCmpSlide(0);
      });
    }

    if ($("cmpBackSlide2Btn")) {
      $("cmpBackSlide2Btn").addEventListener("click", function () {
        scrollToCmpSlide(1);
      });
    }

    window.addEventListener("scroll", animateCompareCounterShear, { passive: true });
    window.addEventListener("resize", animateCompareCounterShear);

    animateCompareCounterShear();
  }


  /* =======================================
     7TH PAGE — STEP 5: GSAP + SCROLLTRIGGER
     3D HYPER-PRISM REPORT SLIDES
  ======================================= */

  const reportSec = $("report");

  if (reportSec) {

    const repHead = $("repHead");
    const rep3DPrism = $("rep3DPrism");
    const repPrismWire = $("repPrismWire");
    const repSlides = reportSec.querySelectorAll(".rep-3d-slide");
    const repFieldBoxes = reportSec.querySelectorAll(".rep-field-box");
    const repTabs = reportSec.querySelectorAll(".rep-tab");
    const repProgressBar = $("repProgressBar");
    const repSlideCounter = $("repSlideCounter");
    const repScrollHint = $("repScrollHint");

    const REPORT_CASES = {
      c1: {
        prismVerdict: "PARTLY SUPPORTED",
        claim: "“A particular study found that a learning app improved test scores by 30% [3].”",
        citation: "[3] Smith, J., & Patel, R. (2021)",
        pub: "Journal of Educational Practice · Vol. 18, pp. 41–56 (Sec. 2.1)",
        evidence: "Source reports score gains in a <u>small pilot group</u>, with <u>no 30% increase</u> observed; limited sample size and pilot scope.",
        verdictPill: "PARTLY SUPPORTED",
        verdictShort: "Partly Supported — Direction matches, 30% figure unverified.",
        confScore: "68% CALIBRATED",
        confWidth: "68%",
        confNote: "Evidence strength & uncertainty indicator—not a guarantee.",
        loc: "Page 4 · Section 2.1 · Paragraph 2",
        traceText: "Inspect DOI: 10.1080/edup.2021.0419 ↗",
        traceHref: "https://doi.org/10.1080/edup.2021.0419"
      },
      c2: {
        prismVerdict: "SUPPORTED · PILOT SCOPE",
        claim: "“Structured retrieval practice over eight weeks improved delayed recall in introductory biology [1].”",
        citation: "[1] Lin, H., & Gomez, M. (2023)",
        pub: "Quarterly Review of STEM Pedagogy · pp. 112–128 (Sec. 3.2)",
        evidence: "Passage confirms delayed-recall gains over an <u>8-week lab schedule</u> in introductory biology students.",
        verdictPill: "SUPPORTED",
        verdictShort: "Supported — Matches 8-week recall finding within study scope.",
        confScore: "82% CALIBRATED",
        confWidth: "82%",
        confNote: "Strong passage alignment; reviewer should verify lab cohort details.",
        loc: "Page 115 · Section 3.2 · Table 2",
        traceText: "Inspect DOI: 10.1016/j.stemped.2023.08.004 ↗",
        traceHref: "https://doi.org/10.1016/j.stemped.2023.08.004"
      }
    };

    function applyReportCase(caseKey) {
      const data = REPORT_CASES[caseKey];
      if (!data) return;

      if ($("repPrismVerdict")) $("repPrismVerdict").textContent = data.prismVerdict;
      if ($("repFieldClaim")) $("repFieldClaim").textContent = data.claim;
      if ($("repFieldCitation")) $("repFieldCitation").textContent = data.citation;
      if ($("repFieldPub")) $("repFieldPub").textContent = data.pub;
      if ($("repFieldEvidence")) $("repFieldEvidence").innerHTML = data.evidence;
      if ($("repFieldVerdictPill")) $("repFieldVerdictPill").textContent = data.verdictPill;
      if ($("repFieldVerdictShort")) $("repFieldVerdictShort").textContent = data.verdictShort;
      if ($("repFieldConfScore")) $("repFieldConfScore").textContent = data.confScore;
      if ($("repFieldConfFill")) $("repFieldConfFill").style.width = data.confWidth;
      if ($("repFieldConfNote")) $("repFieldConfNote").textContent = data.confNote;
      if ($("repFieldLoc")) $("repFieldLoc").textContent = data.loc;
      if ($("repFieldTraceLink")) {
        $("repFieldTraceLink").textContent = data.traceText;
        $("repFieldTraceLink").setAttribute("href", data.traceHref);
      }
    }

    document.querySelectorAll(".rep-case-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".rep-case-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        applyReportCase(btn.getAttribute("data-case"));
      });
    });

    function scrollToRepSlide(slideIdx) {
      const scrollable = Math.max(reportSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = reportSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function updateReportFromProgress(p) {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (repHead) {
          repHead.style.opacity = 1;
          repHead.style.transform = "none";
        }
        return;
      }

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (repHead) {
        repHead.style.opacity = headTrigger;
        repHead.style.transform =
          "translate3d(0," + ((1 - headTrigger) * 34) + "px," + ((1 - headTrigger) * -50) + "px) " +
          "rotateX(" + ((1 - headTrigger) * 10) + "deg)";
      }

      if (rep3DPrism) {
        rep3DPrism.style.transform =
          "translate3d(" + (-p * 52) + "px," + (p * 20) + "px,0) " +
          "rotateY(" + (-20 + p * 60) + "deg) rotateX(" + (16 - p * 32) + "deg)";
      }

      if (repPrismWire) {
        repPrismWire.style.transform =
          "translate3d(" + ((0.5 - p) * 70) + "px," + ((p - 0.5) * 50) + "px,0) " +
          "rotateZ(" + ((p - 0.5) * 6) + "deg)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      repSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const ry = diff * -34;
        const rx = absDiff * 14;
        const tz = -absDiff * 270;
        const tx = diff * 26;
        const scale = Math.max(0.78, 1 - absDiff * 0.14);
        const opacity = Math.max(0, 1 - absDiff * 0.82);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(28 - Math.round(absDiff * 9));
        slide.style.transform =
          "perspective(2150px) " +
          "translate3d(" + tx + "%, 0, " + tz + "px) " +
          "rotateX(" + rx + "deg) " +
          "rotateY(" + ry + "deg) " +
          "scale(" + scale + ")";
      });

      if (repFieldBoxes.length) {
        const wave = Math.sin(p * Math.PI);
        repFieldBoxes.forEach(function (box, idx) {
          const offset = ((idx % 3) - 1) * wave * 7;
          const zLift = (idx % 2 === 0 ? 1 : -1) * wave * 10;
          box.style.transform =
            "perspective(1200px) translate3d(0," + offset + "px," + zLift + "px)";
        });
      }

      repTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (repProgressBar) repProgressBar.style.width = (p * 100) + "%";
      if (repSlideCounter) repSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (repScrollHint) {
        repScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D HYPER-PRISM REPORT SLIDES ↓" : "STRUCTURED VERIFICATION REPORT READY ↓";
      }
    }

    function animateReportFallback() {
      const rect = reportSec.getBoundingClientRect();
      const total = Math.max(reportSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      updateReportFromProgress(p);
    }

    if (window.gsap && window.ScrollTrigger && !reduceMotion) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.create({
        trigger: reportSec,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: function (self) {
          updateReportFromProgress(self.progress);
        }
      });
    } else {
      window.addEventListener("scroll", animateReportFallback, { passive: true });
    }

    window.addEventListener("resize", animateReportFallback);

    repTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToRepSlide(Number(tab.getAttribute("data-rep-slide")));
      });
    });

    if ($("repToSlide2Btn")) {
      $("repToSlide2Btn").addEventListener("click", function () {
        scrollToRepSlide(1);
      });
    }

    if ($("repToSlide3Btn")) {
      $("repToSlide3Btn").addEventListener("click", function () {
        scrollToRepSlide(2);
      });
    }

    if ($("repBackSlide1Btn")) {
      $("repBackSlide1Btn").addEventListener("click", function () {
        scrollToRepSlide(0);
      });
    }

    if ($("repBackSlide2Btn")) {
      $("repBackSlide2Btn").addEventListener("click", function () {
        scrollToRepSlide(1);
      });
    }

    animateReportFallback();
  }


  /* =======================================
     SLIDES 07 & 08 — LIVE DEMO WALKTHROUGH &
     ACADEMIC TRUST CLOSING (GSAP + 3D PENDULUM DOSSIER)
  ======================================= */

  const demoTrustSec = $("demo-trust");

  if (demoTrustSec) {

    const dtHead = $("dtHead");
    const dtPendulumTag = $("dtPendulumTag");
    const dtOrbitRing = $("dtOrbitRing");
    const dtSlides = demoTrustSec.querySelectorAll(".dt-3d-slide");
    const dtTabs = demoTrustSec.querySelectorAll(".dt-tab");
    const dtProgressBar = $("dtProgressBar");
    const dtSlideCounter = $("dtSlideCounter");
    const dtScrollHint = $("dtScrollHint");

    const DEMO_STAGES = {
      ingest: {
        badge: "STAGE 01 / INPUT & PARSE",
        status: "PROTOTYPE READY",
        title: "Upload or Paste Manuscript Text",
        desc: "Users drop a paper or paste draft text to immediately stage claims and inline citations for inspection.",
        log: "• Input staged: “A particular study found that a learning app improved test scores by 30% [3].”"
      },
      extract: {
        badge: "STAGE 02 / EXTRACTED CLAIMS",
        status: "2 CLAIMS MAPPED",
        title: "Inspect Extracted Claims & Matched Citations",
        desc: "Highlights quantitative claims and links inline markers like [3] to Smith & Patel (2021) and [1] to Lin & Gomez (2023).",
        log: "• Claim #01 [3] → 30% score claim linked to Ref [3] (Smith & Patel, 2021, p. 4)."
      },
      compare: {
        badge: "STAGE 03 / EVIDENCE & FLAGS",
        status: "EXAGGERATION FLAGGED",
        title: "Evidence Comparison & Flagged Issues",
        desc: "Compares the 30% claim against the cited paper's small pilot group—flagging that no 30% increase appears.",
        log: "• Flagged: Claim overstates small-pilot score improvement; no 30% figure in source."
      },
      history: {
        badge: "STAGE 04 / REVIEW HISTORY",
        status: "AUDIT TRAIL LOGGED",
        title: "Inspect Review History & Human Sign-Off",
        desc: "Tracks claim verdicts, calibrated confidence (68%), DOI/page traces, and human reviewer decisions.",
        log: "• History #04: Marked 'Partly Supported · Needs Human Review' with DOI link attached."
      }
    };

    document.querySelectorAll(".dt-step-pill").forEach(function (pill) {
      pill.addEventListener("click", function () {
        document.querySelectorAll(".dt-step-pill").forEach(function (p) {
          p.classList.remove("active-dt");
        });
        pill.classList.add("active-dt");

        const key = pill.getAttribute("data-demo");
        const stg = DEMO_STAGES[key];
        if (!stg) return;

        if ($("dtInspBadge")) $("dtInspBadge").textContent = stg.badge;
        if ($("dtInspStatus")) $("dtInspStatus").textContent = stg.status;
        if ($("dtInspTitle")) $("dtInspTitle").textContent = stg.title;
        if ($("dtInspDesc")) $("dtInspDesc").textContent = stg.desc;
        if ($("dtInspLog")) $("dtInspLog").textContent = stg.log;
      });
    });

    function scrollToDtSlide(slideIdx) {
      const scrollable = Math.max(demoTrustSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx;
      const y = demoTrustSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Style F: 3D Pendulum Swing + Horizontal Fold-Out Dossier
    function updateDemoTrustFromProgress(p) {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (dtHead) {
          dtHead.style.opacity = 1;
          dtHead.style.transform = "none";
        }
        return;
      }

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (dtHead) {
        dtHead.style.opacity = headTrigger;
        dtHead.style.transform =
          "translate3d(0," + ((1 - headTrigger) * 34) + "px," + ((1 - headTrigger) * -50) + "px) " +
          "rotateX(" + ((1 - headTrigger) * 10) + "deg)";
      }

      if (dtPendulumTag) {
        const swing = Math.sin(p * Math.PI * 2) * 18;
        dtPendulumTag.style.transform =
          "translate3d(" + (-p * 48) + "px," + (p * 18) + "px,0) " +
          "rotateZ(" + swing + "deg) rotateY(" + (-14 + p * 40) + "deg)";
      }

      if (dtOrbitRing) {
        dtOrbitRing.style.transform =
          "translate(-50%, -50%) rotateX(68deg) rotateZ(" + (p * 140) + "deg)";
      }

      const slidePos = p;
      const activeIdx = Math.min(1, Math.max(0, Math.round(slidePos)));

      dtSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const rz = diff * -7;
        const ry = diff * 26;
        const tx = diff * 34;
        const tz = -absDiff * 240;
        const scale = Math.max(0.8, 1 - absDiff * 0.14);
        const opacity = Math.max(0, 1 - absDiff * 0.85);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(26 - Math.round(absDiff * 8));
        slide.style.transform =
          "perspective(2250px) " +
          "translate3d(" + tx + "%, 0, " + tz + "px) " +
          "rotateY(" + ry + "deg) " +
          "rotateZ(" + rz + "deg) " +
          "scale(" + scale + ")";
      });

      dtTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (dtProgressBar) dtProgressBar.style.width = (p * 100) + "%";
      if (dtSlideCounter) dtSlideCounter.textContent = "SLIDE 0" + (activeIdx + 7) + " / 08";
      if (dtScrollHint) {
        dtScrollHint.textContent =
          activeIdx === 0 ? "SCROLL TO SLIDE 08: ACADEMIC TRUST ↓" : "ACADEMIC TRUST CLOSING REACHED ↓";
      }
    }

    function animateDemoTrustFallback() {
      const rect = demoTrustSec.getBoundingClientRect();
      const total = Math.max(demoTrustSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      updateDemoTrustFromProgress(p);
    }

    if (window.gsap && window.ScrollTrigger && !reduceMotion) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.create({
        trigger: demoTrustSec,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: function (self) {
          updateDemoTrustFromProgress(self.progress);
        }
      });
    } else {
      window.addEventListener("scroll", animateDemoTrustFallback, { passive: true });
    }

    window.addEventListener("resize", animateDemoTrustFallback);

    dtTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToDtSlide(Number(tab.getAttribute("data-dt-slide")));
      });
    });

    if ($("dtToTrustBtn")) {
      $("dtToTrustBtn").addEventListener("click", function () {
        scrollToDtSlide(1);
      });
    }

    if ($("dtBackDemoBtn")) {
      $("dtBackDemoBtn").addEventListener("click", function () {
        scrollToDtSlide(0);
      });
    }

    animateDemoTrustFallback();
  }

});