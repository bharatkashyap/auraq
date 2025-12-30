<template>
  <layout>
    <div id="posts-container mb-1" class="grid-container">
      <post-card
        v-for="edge in orderedPosts"
        :key="edge.node.id"
        :post="edge.node"
      ></post-card>
    </div>
  </layout>
</template>

<page-query>
query Post {
  posts: allPost {
    edges {
      node {
        id,
        Heading,
        Date,
        Description,
        Blurb, 
        isHidden,
        isHeadline,
        Tag {
          Name
        }
        Writer {
          Name
        },
        Reading_Time,
        Pics {
        	url,
          thumbnails {
            large {
              url
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import { mapState, mapActions } from "vuex";
import PostCard from "~/components/PostCard.vue";
import Loader from "~/components/Loader.vue";

export default {
  data: () => {
    return {
      // fetchedComments: [],
      // fetchedCommentsStatus: false,
      // computedComments: [],
      // postComments: [],
      localLikedPosts: [],
      // isStub: true
      gapiAuth2Loaded: false,
    };
  },
  components: {
    PostCard,
    Loader,
  },
  computed: {
    filteredPosts() {
      return this.$page.posts.edges.filter(
        (post) => post.node.isHidden == "False"
      );
    },
    orderedPosts() {
      return this.filteredPosts.sort(
        (a, b) => new Date(b.node.Date) - new Date(a.node.Date)
      );
    },
    // visibilityObserver() {
    //   return {
    //       callback: this.visibilityChanged,
    //       threshold: 0.2,
    //       once: true
    //     }
    // },
    ...mapState([
      //'verifiedGoogleUserStatus',
      //'verifiedGoogleUser'
      //   'config',
      //   'viewport',
      //   'fetchedPosts',
      //   'fetchedPostsStatus',
      //   'fetchedTagsStatus',
      //   'computedPosts',
      "fetchedUser",
      //   'likedPosts'
    ]),
  },
  methods: {
    // fadeElementIn(id) {
    //   let post = document.getElementById(id);
    //   post.classList.add("fade-in");
    //   post.classList.remove("pre-load");
    // },
    // visibilityChanged(isVisible, entry) {
    //   if(isVisible === true) this.fadeElementIn(entry.target.id);
    // },
    updateLikes(status, id) {
      // status => to be set
      this.localLikedPosts = this.likedPosts;
      if (status) {
        this.localLikedPosts = this.likedPosts.concat([id]);
      } else {
        this.localLikedPosts = this.likedPosts.filter((p) => p !== id);
      }
      this.likePost({ posts: this.localLikedPosts, id: id });
    },
    ...mapActions(["loadGapiAuth2"]),
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
