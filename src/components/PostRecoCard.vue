<template>
  <div
    class="post d-flex flex-column align-items-center"
    :id="`reco${post.id}`"
  >
    <div @click="navigateToPost" class="justify-content-center cursor-pointer">
      <img
        v-if="post.Pics.length"
        :src="post.Pics[0].url"
        class="mt-3 post-reco-banner-image"
      />
    </div>

    <div
      id="post-stub"
      @click="navigateToPost"
      class="align-items-center cursor-pointer"
    >
      <div id="post-meta" class="mt-1 d-flex flex-row justify-content-center">
        <div
          id="post-tag"
          class="mt-1 align-self-center font-size-small text-uppercase"
        >
          {{ post.Tag[0].Name }}
        </div>
        <div id="post-date-long" class="mt-1 ml-3 font-size-small">
          {{ sanitiseDate(post.Date) }}
        </div>
      </div>
      <div
        id="post-heading-reco"
        class="mt-1 align-items-center text-center display-5"
      >
        {{ post.Heading }}
      </div>
      <div id="post-reading-time" class="text-center text-time mt-1">
        {{ post.Reading_Time }} min read
      </div>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions } from 'vuex';
//import postPostComponent from "@/components/postPostComponent.vue";
//import postImageGalleryComponent from "@/components/postImageGalleryComponent.vue";

export default {
  name: "PostRecoCard",
  props: {
    post: Object,
  },
  components: {
    //postPostComponent,
    //postImageGalleryComponent
  },
  data: function() {
    return {
      overPost: false,
      averageReadingSpeed: 200,
      dateOptions: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      },
    };
  },
  computed: {
    // readingTime: function () {
    //     if(this.post.Notes) return Math.round((this.post.Notes.split(" ").length / this.averageReadingSpeed) * 0.6)
    //     else return 0
    // },
    // authors: function () {
    //     return this.post.Writer.map(writer => writer ? writer.Name : "");
    // },
    tag: function() {
      return this.post.Tag ? this.post.Tag[0] : "";
    },
    // ...mapState([
    //     'viewport',
    //     'fetchedTags'
    // ])
  },
  methods: {
    // getTag(id) {
    //     let name;
    //     this.fetchedTags.some( t => {
    //         if(t.id === id) name = t.fields.Name; return;
    //     })
    //     return name;
    // },
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
    navigateToPost() {
      this.$router.push({ path: `/post/${this.post.id}` });
    },
    hoverOverPost() {
      this.overPost = true;
    },
    leavePost() {
      this.overPost = false;
    },
    // ...mapActions([
    //     'postComment'
    // ])
  },
};
</script>

<style>
/** ====================================== 
 * HEADING TYPOGRAPHY Styles 
 */

#heading-text {
  width: fit-content;
}

.text-heading {
  letter-spacing: 0.15em;
}

#subheading-text {
  /*text-transform: capitalize; */
}

#post-heading-reco,
#post-date {
  font-family: "DM Sans", sans-serif;
  /* font-weight: 500; */
}

/** ======================================
 * POST META Styles
 */
#post-meta {
  color: #ff416c;
  opacity: 0.75;
}

#post-tag {
  font-size: 12px;
}

#post-tag:after {
  content: "//";
  position: relative;
  top: 0;
  bottom: 0;
  right: 0;
  left: 8px;
}
@media screen and (max-width: 768px) {
  #post-date {
    margin-top: 0.5rem !important;
  }
}

/** ====================================== 
 * POST TEXT Styles 
 */

#post-text {
  font-family: "Halant", serif;
  font-size: 1.5rem;
  /* line-height: 2rem; */
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
  color: #333;
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
* IMAGE BANNER Styles
*/

.post-reco-banner-image {
  max-height: 150px;
  min-height: 150px;
  /* max-width: 85vw; */
  max-width: 200px;
  object-fit: contain;
}
</style>
