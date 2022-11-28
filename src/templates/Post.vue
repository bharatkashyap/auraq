<template>
  <layout>
    <div v-if="true" id="posts-container mb-1" class="main-content">
      <post-long :post="$page.post" @update-likes="updateLikes"></post-long>
    </div>
    <Loader v-else />
  </layout>
</template>

<page-query>
query Post($id: String!) {
  post (id: $id) {  
    id,
    Heading,
    Date,
    Description,
    Blurb, 
    Tag {
        Name
    }
    Writer {
        Name,
        belongsTo (limit: 3, sortBy: "Date", filter: {id: { ne: $id}}) {
            edges {
                node {
                    ... on Post {
                        id,
                        Heading,                        
                        Date,
                        isHidden,
                        Reading_Time
                        Pics {
                            url
                        },
                        Tag {
                            Name
                        } 
                    }
                }
            }
        }
    },
    Notes,
    Reading_Time,
    Pics {
        url,
        thumbnails {
        small {
            url
        },
        large {
            url
        }
        }
    }
    }
}
</page-query>

<script>
import { mapState, mapActions } from "vuex";
import PostLong from "~/components/PostLong.vue";

export default {
  name: "Post",
  metaInfo() {
    return {
      meta: [
        { property: "og:title", content: this.$page.post.Heading },
        { property: "og:description", content: this.$page.post.Description },
        {
          property: "og:image",
          content: `${config.CDN_PATH}/${post.id}/0.jpg`,
        },
        { property: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  data: () => {
    return {
      localLikedPosts: [],
    };
  },
  components: {
    PostLong,
  },
  computed: {
    ...mapState(["likedPosts"]),
  },
  methods: {
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
    ...mapActions(["likePost"]),
  },
};
</script>
