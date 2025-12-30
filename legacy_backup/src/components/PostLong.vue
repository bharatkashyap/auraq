<template>
  <div class="post flex-column" :id="post.id">
    <div class="flex-column my-3 w-100 justify-content-between fadeIn">
      <div
        class="d-flex flex-lg-row flex-column-reverse align-items-center flex-equal"
      >
        <div
          id="post-stub-long"
          class="d-flex flex-column flex-equal align-self-lg-start align-items-center align-items-lg-start align-items-lg-center"
        >
          <div id="post-meta" class="mt-2 d-flex flex-row">
            <div id="post-tags" v-if="post.Tag.length" class="d-flex flex-row">
              <div
                v-for="(tag, index) in post.Tag"
                class="mt-2 align-items-start align-self-center mr-3 text-uppercase post-tag"
              >
                <span
                  class="post-invite border border-left-0 border-right-0 border-top-0"
                  ><g-link :to="`/tag/${tag.Name.toLowerCase()}`">{{
                    tag.Name
                  }}</g-link></span
                >
              </div>
            </div>
            <div id="post-writer" class="text-writer mt-2">
              <span
                class="post-invite border border-left-0 border-right-0 border-top-0"
                v-for="(writer, index) in authors"
                :key="index"
                ><g-link
                  :to="`/author/${writer.replace(' ', '-').toLowerCase()}`"
                  >{{ writer }}</g-link
                ></span
              >
            </div>
          </div>
          <div
            id="post-cover-image-container"
            class="mt-2 align-items-start text-center text-lg-left display-4"
          >
            <img
              v-if="post.Pics.length"
              :src="`${config.CDN_PATH}/${post.id}/0.jpg`"
              class="mt-3 post-cover-image"
            />
          </div>
          <div
            id="post-heading-long"
            class="mt-2 align-items-start text-center text-lg-left display-4"
          >
            {{ post.Heading }}
          </div>
          <div
            id="post-sub-head-long"
            class="mt-2 text-center mx-1 text-secondary"
            v-html="post.Description"
          ></div>
          <div id="post-reading-time" class="text-time mt-2">
            {{ post.Reading_Time }} min read
          </div>
          <div
            id="post-date-long"
            class="mt-1 ml-3 align-items-start font-size-sm"
          >
            {{ sanitiseDate(post.Date) }}
          </div>
          <hr class="v-divide w-75 mb-0 p-2" />
          <div id="post-text" class="mt-3" v-html="post.Notes"></div>
        </div>
      </div>
      <image-gallery
        v-if="post.Pics.length"
        :pics="post.Pics"
        :id="post.id"
      ></image-gallery>
      <Disqus />
      <!-- <post-actions  :comments="post.Comments" :likes="post.Likes" :post="post.id" @toggle-like="toggleLike" :liked="post.Liked" @submit-comment="submitComment"></post-actions> -->
    </div>
    <hr class="v-divide w-75 mb-0 p-2" />
    <div
      v-if="filteredPosts.length"
      class="text-center font-text font-size-huge mt-3"
    >
      More by
      <span
        class="ml-2 border border-left-0 border-right-0 border-top-0 post-invite"
        ><g-link
          :to="`/author/${post.Writer[0].Name.replace(' ', '-').toLowerCase()}`"
          >this writer</g-link
        ></span
      >
    </div>
    <div
      id="more"
      v-if="filteredPosts.length"
      class="mt-3 font-weight-light font-size-large"
    >
      <post-reco-card
        v-for="(edge, index) in filteredPosts"
        :key="index"
        :post="edge.node"
        v-observe-visibility="visibilityObserver"
      ></post-reco-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PostActions from "~/components/PostActions.vue";
import PostRecoCard from "~/components/PostRecoCard.vue";
import ImageGallery from "~/components/ImageGallery.vue";

export default {
  name: "PostLong",
  props: {
    post: Object,
  },
  components: {
    PostActions,
    PostRecoCard,
    ImageGallery,
  },
  data: function() {
    return {
      overPost: false,
      dateOptions: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      },
    };
  },
  computed: {
    filteredPosts() {
      return this.post.Writer[0].belongsTo.edges.filter(
        (post) => post.node.isHidden == "False"
      );
    },
    visibilityObserver() {
      return {
        callback: this.visibilityChanged,
        threshold: 1.0,
      };
    },
    authors: function() {
      return this.post.Writer.map((writer) => (writer ? writer.Name : ""));
    },
    ...mapState(["viewport", "fetchedTags", "config"]),
  },
  methods: {
    sanitiseDate(date) {
      let dateObject = new Date(date);
      return dateObject.toLocaleDateString("en-IN", this.dateOptions);
    },
    toggleLike(status) {
      this.$emit("update-likes", status, this.post.id);
    },
    submitComment(comment) {
      this.postComment({ comment: comment, postId: this.post.id });
    },
    fadeElementIn(id) {
      let post = document.getElementById(id);
      post.classList.add("fade-in");
      post.classList.remove("pre-load");
    },
    visibilityChanged(isVisible, entry) {
      if (isVisible === true) this.fadeElementIn(entry.target.id);
    },
    ...mapActions(["postComment"]),
  },
};
</script>

<style>
/** ====================================== 
 * HEADING TYPOGRAPHY Styles 
 */

#post-heading-long {
  font-family: "DM Serif Text", sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
}

#heading-text {
  width: fit-content;
}

.text-heading {
  letter-spacing: 0.15em;
}

#subheading-text {
  /*text-transform: capitalize; */
}

#post-date-long {
  font-family: "DM Sans", sans-serif;
  color: #949494;
  /* font-weight: 500; */
}

#post-sub-head-long {
  font-family: "DM Sans", sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.02cm;
}

/** ======================================
 * POST META Styles
 */
#post-meta {
  color: #ff416c;
  opacity: 0.75;
}

.post-tag {
  font-size: 12px;
}

div.post-tag:not(:last-child)::after {
  content: "+";
  color: #595959;
  position: relative;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0.5rem;
}

div.post-tag:last-child::after {
  content: "//";
  position: relative;
  top: 0;
  bottom: 0;
  right: 0;
  left: 8px;
}

/** ====================================== 
 * POST TEXT Styles 
 */

#post-text {
  font-family: "Halant", serif;
  font-size: 1.5rem;
  width: 62.5vw;
  text-align: justify;
  /* line-height: 2rem; */
}

@media screen and (max-width: 640px) {
  #post-text {
    width: 75vw;
  }
}

#post-text a {
  color: #ff416c !important;
  text-decoration: none !important;
  transition: all ease-in-out 0.2s;
}

#post-text blockquote,
#post-text cite {
  margin-left: 2rem;
}

.post-invite {
  font-family: "DM Sans", sans-serif;
  color: #ff416c;
  cursor: pointer;
  transition: all ease-in-out 0.1s;
}
.post-invite:hover {
  border-color: #ff416c !important;
}

.text-time {
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  color: #676767;
}

.text-writer {
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #000;
}

/** ====================================== 
 * HORIZONTAL RULE Styles 
 */

.v-divide {
  transition: all ease-in-out 0.2s;
}

hr.v-divide-double {
  border-top-style: double;
}

hr.v-divide-strong {
  border-top-width: 3px;
  border-top-color: rgba(0, 0, 0, 0.4);
}

hr.v-divide-emphasis {
  border-top-color: #ff416c !important;
}
/** ======================================
* IMAGE BANNER/COVER Styles
*/

.post-banner-image {
  max-height: 300px;
  /* max-width: 85vw; */
  max-width: 400px;
  object-fit: contain;
  aspect-ratio: 4/3;
}

.post-cover-image {
  min-height: 400px;
  max-height: 400px;
  max-width: 100vw;
  aspect-ratio: 3/2;
}

/** ======================================
* IMAGE INLINE Styles
*/

#post-text figure img {
  max-height: 450px;
  max-width: 70vw;
  /* max-width: 600px; */
  object-fit: contain;
  display: flex;
  margin: 1rem auto;
}

#post-text figcaption {
  text-align: center;
  font-style: italic;
  font-size: 0.9rem;
  margin-top: 0.1rem;
}

/** ======================================
* MORE Styles
*/

#more {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (max-width: 768px) {
  #more {
    grid-template-columns: 1fr;
  }
}
</style>
