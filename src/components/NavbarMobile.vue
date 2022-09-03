<template>
  <div class="navigation-bar navigation-bar--stacked navigation-bar--dest-25">
    <div class="navigation-bar--destinations">
      <div class="tab-bar" role="tablist">
        <div class="tab-scroller tab-scroller--align-start">
          <div
            class="tab-scroller--scroll-area tab-scroller--scroll-area--scroll"
          >
            <div class="tab-scroller--scroll-content">
              <button
                :class="{ 'tab--active': i == active }"
                :key="b.path"
                :tabindex="i"
                @click="$emit('navigate', i)"
                :aria-selected="i == active"
                class="tab tab--stacked ripple-upgraded"
                role="tab"
                v-for="(b, i) in buttons"
              >
                <span class="tab--content">
                  <i
                    class="material-symbols-sharp tab--icon"
                    aria-hidden="true"
                  >
                    {{ b.icon }}
                  </i>
                  <span class="tab--text-label">{{ b.text }}</span>
                </span>
                <span
                  class="tab-indicator"
                  :class="{ 'tab-indicator--active': i == active }"
                >
                  <span
                    class="
                      tab-indicator--content tab-indicator--content--underline
                    "
                  />
                </span>
                <span class="tab--ripple"></span>
                <div class="tab--focus-ring"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-bottom",
  props: ["buttons", "active"],
};
</script>

<style scoped>
/*! CSS Used from: Embedded */
.tab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--bs-font-sans-serif);
  font-size: 0.8rem;
  font-weight: 500;
  font-weight: var(--typography-button-font-weight, 500);
  letter-spacing: 0.0892857143em;
  letter-spacing: var(--typography-button-letter-spacing, 0.0892857143em);
  line-height: 2.25rem;
  line-height: var(--typography-button-line-height, 2.25rem);
  position: relative;
  text-decoration: none;
  -webkit-text-decoration: var(--typography-button-text-decoration, none);
  text-decoration: var(--typography-button-text-decoration, none);
  color: var(--bs-on-primary);
}
.tab .tab--text-label {
  color: rgba(var(--bs-secondary), 0.6);
}
.tab .tab--icon {
  fill: currentColor;
  color: rgba(var(--bs-secondary), 0.54);
}
.tab--content {
  position: relative;
}
.tab--icon {
  font-size: 24px;
  height: 24px;
  width: 24px;
}
.tab--active .tab--icon,
.tab--active .tab--text-label {
  color: var(--bs-secondary);
}
.tab--active .tab--icon {
  fill: currentColor;
}
.tab {
  -webkit-appearance: none;
  background: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  margin: 0;
  min-width: 90px;
  outline: none;
  padding: 0 24px;
  text-align: center;
  white-space: nowrap;
  z-index: 1;
}
.tab::-moz-focus-inner {
  border: 0;
  padding: 0;
}
.tab--content {
  align-items: center;
  display: flex;
  height: inherit;
  justify-content: center;
  pointer-events: none;
}
.tab--text-label {
  display: inline-block;
  line-height: 0.6;
}
.tab--icon,
.tab--text-label {
  transition: color 0.15s linear;
  z-index: 2;
}
.tab--stacked .tab--content {
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.tab--stacked .tab--text-label {
  padding-bottom: 5px;
  padding-top: 5px;
}
.tab--active .tab--icon,
.tab--active .tab--text-label {
  transition-delay: 0.1s;
}
.tab {
  --ripple-fg-size: 0;
  --ripple-left: 0;
  --ripple-top: 0;
  --ripple-fg-scale: 1;
  --ripple-fg-translate-end: 0;
  --ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.tab .tab--ripple:after,
.tab .tab--ripple:before {
  border-radius: 50%;
  content: "";
  opacity: 0;
  pointer-events: none;
  position: absolute;
}
.tab .tab--ripple:before {
  transition: opacity 15ms linear, background-color 15ms linear;
  z-index: 1;
  z-index: var(--ripple-z-index, 1);
}
.tab .tab--ripple:after {
  z-index: 0;
  z-index: var(--ripple-z-index, 0);
}
.tab.ripple-upgraded .tab--ripple:before {
  transform: scale(var(--ripple-fg-scale, 1));
}
.tab.ripple-upgraded .tab--ripple:after {
  left: 0;
  top: 0;
  transform: scale(0);
  transform-origin: center center;
}
.tab .tab--ripple:after,
.tab .tab--ripple:before {
  height: 200%;
  left: -50%;
  top: -50%;
  width: 200%;
}
.tab.ripple-upgraded .tab--ripple:after {
  height: var(--ripple-fg-size, 100%);
  width: var(--ripple-fg-size, 100%);
}
.tab .tab--ripple:after,
.tab .tab--ripple:before {
  background-color: var(--bs-secondary);
}
.tab:hover .tab--ripple:before {
  opacity: 0.04;
  opacity: var(--ripple-hover-opacity, 0.04);
}
.tab.ripple-upgraded {
  --ripple-fg-opacity: var(--ripple-press-opacity, 0.12);
}
.tab--ripple {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  will-change: transform, opacity;
}
.tab-bar {
  width: 100%;
}
.tab {
  height: 48px;
}
.tab--stacked {
  height: 56px;
}
.tab-indicator {
  color: var(--bs-secondary);
}
.tab-indicator .tab-indicator--content--underline {
  background-color: var(--bs-secondary);
}
.tab-indicator .tab-indicator--content--underline {
  border-top-width: 2px;
}
.tab-indicator {
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
.tab-indicator--content {
  opacity: 0;
  transform-origin: left;
}
.tab-indicator--content--underline {
  align-self: flex-end;
  border-top-style: solid;
  box-sizing: border-box;
  width: 100%;
}
.tab-indicator--active .tab-indicator--content {
  opacity: 1;
}
.tab-indicator .tab-indicator--content {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.tab-scroller {
  overflow-y: hidden;
}
.tab-scroller--scroll-area {
  -webkit-overflow-scrolling: touch;
  display: flex;
  overflow-x: hidden;
}
.tab-scroller--scroll-area::-webkit-scrollbar {
  display: none;
}
.tab-scroller--scroll-area--scroll {
  overflow-x: scroll;
}
.tab-scroller--scroll-content {
  display: flex;
  flex: 1 0 auto;
  position: relative;
  transform: none;
  will-change: transform;
}
.tab-scroller--align-start .tab-scroller--scroll-content {
  justify-content: flex-start;
}
.navigation-bar {
  background-color: var(--bs-primary);
  bottom: 0;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  height: 48px;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 4;
}
.navigation-bar.navigation-bar--stacked {
  height: 56px;
}
.navigation-bar--destinations .tab-scroller--scroll-content {
  width: 100%;
}
.navigation-bar--dest-25 .tab {
  overflow: hidden;
  width: 25%;
}
</style>
