<template>
  <div
    id="footer"
    ref="footer"
    :class="{ night: nightMode }"
    class="d-flex flex-column w-100 align-items-center justify-content-center pb-5"
  >
    <div class="subscribe-box">
      <span
        id="subscribe-heading"
        class="ml-1 mt-1 subscribe-heading text-left full-width-sub"
        >{{ subscriptionStatus ? "Thank you!" : "Stay in touch" }}
      </span>
      <span v-if="!subscriptionStatus" class="ml-1 mt-2 share-email text-left">
        Subscribe to receive emails when new posts go up on
        <span class="text-heading font-heading">Auraq</span>. No spam, ever.
      </span>
      <span v-else class="ml-1 mt-2 thanks-email">
        Look out for emails from <code>Auraq</code> 😁
      </span>
      <div
        v-if="!subscriptionStatus"
        class="sub-form d-flex mt-2 justify-content-lg-center"
      >
        <input ref="email" v-model="email" placeholder="Email" type="email" />
        <button
          class="arrow"
          type="submit"
          value=""
          @click="subscribe"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Footer",
  data() {
    return {
      email: null,
    };
  },
  methods: {
    subscribe(e) {
      if (!this.$refs.email.checkValidity()) this.$refs.email.reportValidity();
      else {
        this.mutateSubscriberEmail(this.email);
        this.addSubscriber();
      }
    },
    ...mapMutations(["mutateSubscriberEmail"]),
    ...mapActions(["addSubscriber"]),
  },
  computed: {
    ...mapState([
      "nightMode",
      "subscriberEmail",
      "subscriptionStatus",
      "subscriptionStatusPending",
    ]),
  },
  mounted() {
    if (this.subscriberEmail) this.email = this.subscriberEmail;
  },
};
</script>

<style>
#footer {
  background-color: #262626;
  color: #767676;
  text-align: center;
  transition: opacity 0.5s ease-in, background-color 0.2s ease-in;
}

.subscribe-box {
  width: 75%;
  border-top: 4px solid #ff416c;
  margin-top: -4px;
  padding: 3em 4em;
  color: #767676;
  background-color: #fff;
  transition: all 0.1s ease-in;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
}
.subscribe-heading {
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #000;
}

.share-email {
  font-family: "Halant", sans-serif;
}

.thanks-email {
  grid-column-start: 1;
  grid-column-end: 3;
}

.sub-form input {
  font-family: "DM Sans", sans-serif;
  padding-left: 18px;
  border: 0;
  height: 24px;
  outline: 0;
  background: #f2f2f2;
}

.sub-form button,
.sub-form button:focus {
  height: 24px !important;
  width: 24px !important;
  border: 0;
  outline: 0;
  background-repeat: no-repeat;
}

.full-width-sub {
  grid-column-start: 1;
  grid-column-end: 2;
}

.night .subscribe-box {
  background-color: #1e1d2a;
}

.night .subscribe-box .subscribe-heading {
  color: #fff;
}

@media screen and (min-width: 768px) {
  .subscribe-box {
    width: 55%;
    grid-template-columns: 0.4fr 0.6fr;
  }
  .sub-form input {
    height: 48px;
  }
  .sub-form button,
  .sub-form button:focus {
    height: 48px !important;
    width: 48px !important;
  }
  .image-svg.arrow {
    background-size: 40%;
  }
  .full-width-sub {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
