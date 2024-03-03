<template>
  <!-- <div id="header-sticky" v-if="stickHeader" ref="header-sticky" :class="{night: nightMode, 'o-1': stickHeader}" class="o-0 d-flex flex-row w-100 align-items-center box-shadow pb-2">
          <div id="night-mode" class="pl-2">
            <div class="night-mode-button icon-svg icon-svg-small" :class="{day: nightMode}" @click="toggleNightMode"></div>
          </div>
          <div id="heading-container" class="d-flex flex-row w-100 pr-3 justify-content-center align-items-center">
            <div id="heading-illustration" class="fade-in text-center mt-4 d-flex flex-column mr-2">
              <img src="~@/assets/img/undraw_not_found_60pq.svg" />
            </div>
            <div id="heading-text" class="fade-in text-center mt-4 d-flex flex-column ml-2">
              <span class="font-heading text-heading"><g-link to="/">Auraq</g-link></span>
            </div>
          </div>
        </div> -->

  <div
    id="header"
    ref="header"
    :class="{ night: nightMode, 'o-0': stickHeader }"
    class="d-flex flex-row w-100 align-items-center"
  >
    <!-- <div id="night-mode" class="pl-2">
      <div
        class="night-mode-button icon-svg icon-svg-small"
        :class="{ day: nightMode }"
        @click="toggleNightMode"
      ></div>
    </div> -->
    <!-- <div id="subscribe-button" class="pl-2">
            <div class="sub-button icon-svg icon-svg-small" :class="{day: nightMode}" @click="scrollToSubscriberBox"></div>
          </div> -->

    <div
      id="heading-container"
      class="d-flex flex-row w-100 pr-3 justify-content-center align-items-center mb-3"
    >
      <div
        id="heading-illustration"
        class="fade-in text-center align-self-center mt-4 d-flex flex-column mr-2"
      >
        <img src="~@/assets/img/auraq_logo.png" />
      </div>
      <div
        id="heading-text"
        class="fade-in text-center mt-4 d-flex flex-column"
      >
        <span class="display-3 font-heading text-heading"
          ><g-link to="/">Auraq</g-link></span
        >
        <!-- <div id="subheading-text" class="subheading-menu font-size-xl font-subheading d-flex justify-content-center align-self-center">
                <span class="text-center align-self-center">A magazine of life, culture and cities</span>
              </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["nightMode", "stickHeader"]),
  },
  methods: {
    toggleNightMode() {
      this.mutateNightMode(!this.nightMode);
    },
    ...mapMutations(["mutateNightMode"]),
    ...mapActions(["loadGapiAuth2"]),
  },
};
</script>

<style>
#header {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-blend-mode: hue;
  background-color: rgba(255, 255, 255, 0.8);
  transition: opacity 0.5s ease-in, background-color 0.2s ease-in;
}

#header-sticky {
  position: sticky;
  z-index: 20;
  top: -1px;
  background-color: #fff;
  background-image: none;
  transition: opacity 0.1s ease-in, background-color 0.2s ease-in;
}

#header-sticky #heading-text span {
  font-size: 2.2rem;
}

#heading-illustration img {
  scale: 1.45;
  aspect-ratio: 1/1;
}
</style>
