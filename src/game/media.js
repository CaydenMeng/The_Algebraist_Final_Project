window.DwellerMedia = (() => {
  const backgroundSources = {
    base: "../assets/video/base-background.mp4",
    good: "../assets/video/good-ending-background.mp4",
    bad: "../assets/video/bad-ending-background.mp4",
  };

  const portraitSources = {
    neutral: "../assets/video/dweller-neutral.mp4",
    attentive: "../assets/video/dweller-attentive.mp4",
    reflective: "../assets/video/dweller-reflective.mp4",
    amused: "../assets/video/dweller-amused.mp4",
    disturbed: "../assets/video/dweller-disturbed.mp4",
    withdrawn: "../assets/video/dweller-withdrawn.mp4",
  };

  function getLayers(videoA, videoB) {
    if (videoA.classList.contains("is-active")) {
      return { active: videoA, inactive: videoB };
    }

    return { active: videoB, inactive: videoA };
  }

  function waitForVideo(video) {
    return new Promise((resolve) => {
      if (video.readyState >= 2) {
        resolve();
        return;
      }

      video.addEventListener("loadeddata", () => resolve(), { once: true });
    });
  }

  async function primeVideo(video, src) {
    if (!video || !src) {
      return;
    }

    if (video.getAttribute("src") !== src) {
      video.src = src;
      video.load();
    }

    video.dataset.src = src;
    await waitForVideo(video);

    try {
      await video.play();
    } catch (error) {
      // Muted autoplay should usually work; if not, the poster and first frame still help.
    }
  }

  async function transitionVideo(videoA, videoB, src) {
    if (!videoA || !videoB || !src) {
      return;
    }

    const { active, inactive } = getLayers(videoA, videoB);

    if (active.dataset.src === src) {
      try {
        await active.play();
      } catch (error) {
        // Keep the last visible frame if autoplay is blocked.
      }
      return;
    }

    if (inactive.getAttribute("src") !== src) {
      inactive.src = src;
      inactive.load();
    }

    await waitForVideo(inactive);

    try {
      inactive.currentTime = 0;
    } catch (error) {
      // Some browsers prevent seeking before metadata is fully ready.
    }

    inactive.dataset.src = src;

    try {
      await inactive.play();
    } catch (error) {
      // Muted autoplay should usually succeed, but keeping the source swapped is still useful.
    }

    inactive.classList.add("is-active");
    active.classList.remove("is-active");

    window.setTimeout(() => {
      active.pause();
    }, 720);
  }

  function setPortraitVisible(dom, visible) {
    dom.characterPanel.classList.toggle("character-panel--ending", !visible);
    dom.characterSlot.classList.toggle("media-frame--hidden", !visible);
  }

  function showEndingBanner(dom, banner) {
    if (!banner) {
      dom.endingBanner.classList.remove("is-visible", "ending-banner--good", "ending-banner--bad", "ending-banner--mixed");
      dom.endingBanner.setAttribute("hidden", "hidden");
      return;
    }

    dom.endingEyebrow.textContent = banner.eyebrow || "Ending";
    dom.endingTitle.textContent = banner.title || "Outcome recorded.";
    dom.endingNote.textContent = banner.note || "";
    dom.endingBanner.classList.remove("ending-banner--good", "ending-banner--bad", "ending-banner--mixed");
    dom.endingBanner.classList.add(`ending-banner--${banner.tone || "mixed"}`);
    dom.endingBanner.removeAttribute("hidden");

    window.requestAnimationFrame(() => {
      dom.endingBanner.classList.add("is-visible");
    });
  }

  function setup(dom) {
    dom.backgroundVideoA.classList.add("is-active");
    dom.backgroundVideoB.classList.remove("is-active");
    dom.portraitVideoA.classList.add("is-active");
    dom.portraitVideoB.classList.remove("is-active");
    dom.backgroundVideoB.dataset.src = "";
    dom.portraitVideoB.dataset.src = "";

    primeVideo(dom.backgroundVideoA, backgroundSources.base);
    primeVideo(dom.portraitVideoA, portraitSources.neutral);
    setPortraitVisible(dom, true);
    showEndingBanner(dom, null);
  }

  function applySceneMedia(dom, scene, options = {}) {
    setPortraitVisible(dom, true);
    showEndingBanner(dom, null);

    transitionVideo(
      dom.backgroundVideoA,
      dom.backgroundVideoB,
      backgroundSources[scene.backgroundState] || backgroundSources.base
    );

    const portraitState = options.portraitState || scene.portraitState;
    if (portraitState) {
      transitionVideo(
        dom.portraitVideoA,
        dom.portraitVideoB,
        portraitSources[portraitState] || portraitSources.neutral
      );
    }
  }

  function applyEndingMedia(dom, ending) {
    transitionVideo(
      dom.backgroundVideoA,
      dom.backgroundVideoB,
      backgroundSources[ending.backgroundState] || backgroundSources.base
    );
    setPortraitVisible(dom, false);
    showEndingBanner(dom, ending.banner);
  }

  return {
    setup,
    applySceneMedia,
    applyEndingMedia,
  };
})();
