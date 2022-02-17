<template>
  <div class="post-post d-flex flex-column align-items-center mt-3">
    <div class="d-flex flex-row">
      <div id="likes" class="align-self-center mx-3">
        <img
          class="icon-svg icon-svg-small"
          :class="{ liked: mutableLiked }"
          src="@/assets/img/like.svg"
          @click="signIn(toggleLike)"
        />
        <span class="text-muted number ml-1" id="likes-number">{{
          count(likes)
        }}</span>
      </div>
      <!-- <div v-if="!isStub" id="comments" class="d-flex align-items-center align-self-center ml-2">
                <span @click="toggleViewComments" id="comments-indication" class="mx-1"> 
                    <img id="comments-icon" class="icon-svg icon-svg-small" src="@/assets/img/black-bubble-speech.svg" />
                    <span class="text-muted number ml-1" id="comments-number">{{count(comments)}}</span>
                </span>
                <div class="d-flex ml-1" id="comments-invite">
                    <span id="comments-input" :class="{inputActive: typing}">
                        <input type="text" id="comments-input-text" v-model="comment" @focus="typingStatus(true)" @blur="typingStatus(false)" class="ml-1 text-muted" :disabled="postedCommentPending" placeholder="Say something" />
                        <div id="comments-input-button" @click="signIn(submitComment)" :class="{disabled: postedCommentPending}"> 
                            <transition name="fade" mode="out-in">
                                <img key="action" v-if="!postedCommentSuccess" class="icon-svg icon-svg-small" :class="{buttonVisible: commentButtonVisibility}" src="@/assets/img/paper-plane-dark.svg" />
                                <img key="success" v-else class="icon-svg icon-svg-small" :class="{buttonVisible: postedCommentSuccess}" src="@/assets/img/check.svg" />
                            </transition>
                        </div>
                    </span>
                </div>
            </div> -->
    </div>
    <!-- <comments-list-component v-if="!isStub" class="commentsList" :class="{listVisible: commentsListVisibility}" :comments="comments"></comments-list-component> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
//import commentsListComponent from "@/components/commentsListComponent.vue";

export default {
  name: "postPostComponent",
  data() {
    return {
      typing: false,
      comment: "",
      commentButtonVisibility: false,
      commentsListVisibility: false,
    };
  },
  components: {
    // commentsListComponent
  },
  props: {
    comments: Array,
    // isStub: Boolean,
    post: String,
    liked: Boolean,
    likes: Array,
  },
  computed: {
    mutableLiked() {
      return this.liked;
    },
    ...mapState([
      "googleAuth",
      "googleSignInStatus",
      "googleUser",
      "googleSignInError",
      "verifiedGoogleUserStatus",
      "verifiedGoogleUser",
      "postedCommentPending",
      "postedCommentSuccess",
    ]),
  },
  methods: {
    count(array) {
      if (array !== undefined) return array.length;
      return 0;
    },
    async signIn(cb) {
      if (this.verifiedGoogleUserStatus === true) {
        cb();
      } else {
        try {
          await this.googleSignIn();
          cb();
        } catch (err) {
          console.log(err);
        }
      }
    },
    toggleLike() {
      this.$emit("toggle-like", !this.mutableLiked);
    },
    typingStatus(status) {
      if (this.comment.length) {
        this.typing = true;
        this.commentsListVisibility = true;
      } else {
        this.typing = status;
        this.commentsListVisibility = status;
      }
    },
    toggleViewComments() {
      this.commentsListVisibility = !this.commentsListVisibility;
    },
    submitComment() {
      this.$emit("submit-comment", this.comment);
    },
    refreshComment() {
      this.comment = "";
    },
    ...mapActions(["googleSignIn"]),
    ...mapMutations(["mutatePostedCommentSuccess"]),
  },
  watch: {
    comment: function(value) {
      if (value.length) this.commentButtonVisibility = true;
      else this.commentButtonVisibility = false;
    },
    postedCommentSuccess: function(value) {
      if (value) {
        setTimeout(() => {
          this.mutatePostedCommentSuccess(false);
          this.refreshComment();
        }, 3000);
      }
    },
  },
  mounted() {
    this.mutatePostedCommentSuccess(false);
  },
};
</script>

<style>
/** ====================================== 
 * POST POST Section Styles 
 */

.post-post div:hover {
  cursor: pointer;
}

#comments-input-text {
  border: 0;
  background-color: transparent;
  vertical-align: text-bottom;
}

#comments-input-text:focus {
  outline: 0;
}

#comments-input:after {
  content: "";
  display: block;
  position: relative;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #86afe4;
  transition: width 0.3s ease-in-out;
}

#comments-input.inputActive:after {
  width: 100%;
}

#comments-input img {
  opacity: 0;
  transition: opacity 0.2s ease-in;
}

#comments-input img.buttonVisible {
  opacity: 0.6;
}

#comments-input img.buttonVisible:hover {
  opacity: 0.8;
}

#comments-input-button {
  display: inline-flex;
}

#comments-input-button.disabled {
  pointer-events: none;
  cursor: not-allowed;
}

span#comments-indication {
  cursor: auto;
}

.font-size-number {
  font-size: 0.8rem;
}

.number {
  font-size: 0.9rem;
}

.commentsList.list-visible {
  height: 0px;
  transition: height 1s ease;
}

.list-visible {
  height: fit-content;
}
</style>
