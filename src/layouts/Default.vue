<template>
  <div id="app">
    <div class="container-fluid p-0 w-100" id="main-wrapper">
      <div class="wrapper-main" :class="{night: nightMode}">

        <Header />
        <transition name="fade" appear>
          <main>  
            <slot />
          </main>
        </transition>
        <!-- <Loader v-else></Loader> -->
        <Return-Home v-if="!root"/>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Header from '~/components/Header.vue'
import ReturnHome from '~/components/ReturnHome.vue'

export default {
  data: function () {
    return {
      //nightMode: false,
      viewport: {},
      gapiAuth2Loaded: false
    }
  },
  components: {
    Header,
    ReturnHome
  },
  computed: {
    root () {
      return this.$route.path === "/" ? true : false;
    },
    ...mapState([
      'nightMode',
      'fetchedUserStatus',
      'foundNoGoogleUser',
      'likedPosts',
      'stickHeader'
    ])
  },
  methods: {
    toggleNightMode() {
      this.nightMode = !this.nightMode;
    },
    captureAndTransmitViewport() {
      this.viewport.width = screen.availWidth;
      this.viewport.height= screen.availHeight;
      this.mutateViewport(this.viewport);
    },
    handleResize() {
      this.captureAndTransmitViewport();
    },
    handleScroll() {
      let header = document.getElementById("header");
      if(window.pageYOffset > (header && header.clientHeight)) this.mutateStickHeader(true);
      else this.mutateStickHeader(false);
    },
    ...mapMutations([
      'mutateViewport',
      'mutateStickHeader'
    ]),
    ...mapActions([
      'loadGapiAuth2'
    ])
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    // window.initGapi = () => {
    //   if(this.gapiAuth2Loaded == false) {
    //     this.loadGapiAuth2();
    //     this.gapiAuth2Loaded = true;
    //   }
    // }
    // if(window.gapi && this.gapiAuth2Loaded == false) {
    //   this.loadGapiAuth2();
    //   this.gapiAuth2Loaded = true;
    // }

    this.captureAndTransmitViewport();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  
}
</script>

<style>
#header {
  /* background-image: url("~@/assets/img/undraw_not_found_60pq.svg");  */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-blend-mode: hue;
  background-color: rgba(255,255,255,0.8);
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
  height: 2rem;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
}

</style>