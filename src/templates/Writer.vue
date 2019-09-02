<template>
<layout>
    <div>
        <span class="mt-2 d-flex justify-content-center font-subheading font-weight-light font-size-large mt-3"> Posts by <span class="ml-1 post-invite">"{{ $page.writer.Name }}"</span></span>
        <post-card v-for="edge in $page.writer.belongsTo.edges" :key="edge.node.id" :post="edge.node" v-observe-visibility="visibilityObserver"></post-card>
    </div>
</layout>
</template>

<page-query>
query Writer($id: String!) {
  writer(id: $id) {
    Name
    belongsTo {
      edges {
        node {
          ... on Post {
            id,
            Heading,
            Date,
            Description,
            Blurb, 
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
            },
            path
          }
        }
      }
    }
  }
}
</page-query>

<script>
import PostCard from "~/components/PostCard.vue";

export default {
    name: "Tag",
    components: {
        PostCard
    },
    computed: {
        visibilityObserver() {
            return {    
                callback: this.visibilityChanged,
                threshold: 0.2,
                once: true
            }
        }   
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
    }
}
</script>