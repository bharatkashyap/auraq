<template>
<layout>
  <div id="posts-container mb-1" class="main-content">
    <post-card v-for="edge in orderedPosts" :key="edge.node.id" :post="edge.node" v-observe-visibility="visibilityObserver"></post-card>
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
import { mapState, mapActions } from 'vuex';
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
      gapiAuth2Loaded: false
    }
  },
  components: {
    PostCard,
    Loader
  },
  computed : {
    filteredPosts() {
      return this.$page.posts.edges.filter( post => post.node.isHidden == "False" );
    },
    orderedPosts() {
      return this.filteredPosts.sort( (a, b) => new Date(b.node.Date) - new Date(a.node.Date) );
    },
    visibilityObserver() {
      return {    
          callback: this.visibilityChanged,
          threshold: 0.2,
          once: true
        }
    },
    ...mapState([
      //'verifiedGoogleUserStatus',
      //'verifiedGoogleUser'
    //   'config',
    //   'viewport',
    //   'fetchedPosts',
    //   'fetchedPostsStatus',
    //   'fetchedTagsStatus',
    //   'computedPosts',
      'fetchedUser',
    //   'likedPosts'
    ])
  },
  methods: {
    fadeElementIn(id) {
      let post = document.getElementById(id);
      post.classList.add("fade-in");
      post.classList.remove("pre-load");
    },
    visibilityChanged(isVisible, entry) {
      if(isVisible === true) this.fadeElementIn(entry.target.id);
    },
    updateLikes(status, id) {
      // status => to be set
      this.localLikedPosts = this.likedPosts;
      if(status) { this.localLikedPosts = this.likedPosts.concat([id]); }
      else { this.localLikedPosts = this.likedPosts.filter(p => p !== id); }
      this.likePost( { posts: this.localLikedPosts, id: id});
    },
    ...mapActions([
      'loadGapiAuth2'
    ])
  },
 
  mounted() {
    window.scrollTo(0,0);

    window.initGapi = () => {
      if(this.gapiAuth2Loaded == false) {
        this.loadGapiAuth2();
        this.gapiAuth2Loaded = true;
      }
    }
    // If script is not loaded afresh (cached), nitGapi is not fired. 
    if(window.gapi && this.gapiAuth2Loaded == false) {
      this.loadGapiAuth2();
      this.gapiAuth2Loaded = true;
    }
    //if(!this.fetchedPostsStatus) this.fetchPosts();
    /* fetch(`https://api.airtable.com/v0/appvFZdnU9Q1R8Nao/Comments`, {
            method: "GET",
            headers: this.airtableAuthToken
        }).then(response => { return response.json() })
        .then(res => {
            this.fetchedComments = res.records;
        }) */
  }
}

</script>

<style>
</style>
