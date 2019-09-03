<template>
<div class="post flex-column" :id="post.id">
    <div class="flex-column my-3 w-100 justify-content-between fadeIn">
        <div class="d-flex flex-lg-row flex-column-reverse align-items-center flex-equal">
            <div id="post-stub" class="d-flex flex-column flex-equal align-self-lg-start align-items-center align-items-lg-start align-items-lg-center">
                <div id="post-meta" class="mt-1 d-flex flex-row">
                    <div id="post-tag" class="mt-1 align-items-start align-self-center font-size-number mr-3 text-uppercase"><span class="post-invite border border-left-0 border-right-0 border-top-0"><g-link :to="`/tag/${post.Tag[0].Name.toLowerCase()}`">{{post.Tag[0].Name}}</g-link></span></div>
                    <div id="post-date" class="mt-1 ml-3 align-items-start font-size-sm">{{sanitiseDate(post.Date)}}</div>
                </div>
                <div id="post-heading" class="mt-1 align-items-start text-center text-lg-left display-4">{{post.Heading}}</div>
                <div id="post-sub-head" class="mt-1 text-secondary" v-html="post.Description"></div>
                <div id="post-reading-time" class="text-time mt-1">{{post.Reading_Time}} min read</div>
                <div id="post-writer" class="text-writer mt-2">
                    <span class="post-invite border border-left-0 border-right-0 border-top-0" v-for="(writer, index) in authors" :key="index"><g-link :to="`/author/${writer.replace(' ','-').toLowerCase()}`">{{writer}}</g-link></span>
                </div>
                <hr class="v-divide w-75 mb-0 p-2" />
                <div id="post-text" class="w-75 mt-3 text-justify" v-html="post.Notes"></div>
            </div>   
        </div>
        <image-gallery v-if="post.Pics.length" :pics="post.Pics"></image-gallery>
        <!-- <post-actions  :comments="post.Comments" :likes="post.Likes" :post="post.id" @toggle-like="toggleLike" :liked="post.Liked" @submit-comment="submitComment"></post-actions> -->
    </div>

    <hr class="v-divide mt-2 mb-0 v-divide-double v-divide-strong pb-2" />
    <div v-if="post.Writer[0].belongsTo.edges.length" class="d-flex flex-column justify-content-center mt-3 font-weight-light font-size-large">
         <span class="d-flex align-self-center font-text font-size-huge mt-3">More by <span class="ml-2 border border-left-0 border-right-0 border-top-0 post-invite"><g-link :to="`/author/${post.Writer[0].Name.replace(' ','-').toLowerCase()}`">this writer</g-link></span></span>
         <post-reco-card v-for="(edge, index) in post.Writer[0].belongsTo.edges" :key="index" :post="edge.node" v-observe-visibility="visibilityObserver"></post-reco-card>
    </div>
</div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
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
        ImageGallery
    },
    data: function () {
        return {
        overPost: false,
        dateOptions: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
            },
        }
    },
    computed: { 
        visibilityObserver() {
            return {    
                callback: this.visibilityChanged,
                threshold: 1.0
                }
        },
        authors: function () {
            return this.post.Writer.map(writer => writer ? writer.Name : "");
        },
        ...mapState([
            'viewport',
            'fetchedTags'
        ])
    },
    methods: {
        sanitiseDate(date) {
            let dateObject = new Date(date);
            return dateObject.toLocaleDateString('en-IN', this.dateOptions);
        },
        toggleLike(status) {
            this.$emit("update-likes", status, this.post.id);
        },
        submitComment(comment) {
            this.postComment( {comment: comment, postId: this.post.id} );
        },
         fadeElementIn(id) {
            let post = document.getElementById(id);
            post.classList.add("fade-in");
            post.classList.remove("pre-load");
        },
        visibilityChanged(isVisible, entry) {
            if(isVisible === true) this.fadeElementIn(entry.target.id);
        },
        ...mapActions([
            'postComment'
        ])
    }
}
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

#post-heading, #post-date {
    font-family: 'Catamaran', sans-serif;
    /* font-weight: 500; */
}

#post-sub-head {
    font-family: 'Catamaran', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 0.02cm;
}

/** ======================================
 * POST META Styles
 */
 #post-meta {
    color: #FF416C;
    opacity: 0.75;
 } 

 #post-tag:after {
     content: "//";
     position: relative;
     top: 0;
     bottom: 0;
     right: 0;
     left: 12px;
 }

/** ====================================== 
 * POST TEXT Styles 
 */

#post-text {
    font-family: 'Halant', serif;
    font-size: 1.5rem;
    /* line-height: 2rem; */
}

.post-invite {
    font-family: 'Catamaran', sans-serif;
    color: #FF416C;
    cursor: pointer;
    transition: all ease-in-out 0.1s;
}
.post-invite:hover {
    border-color: #FF416C!important;
}

.text-time {
    font-family: 'Catamaran', sans-serif;
    font-size: 12px;
    color: #333;
}

.text-writer {
    font-family: 'Catamaran', sans-serif;
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
    border-top-color: rgba(0,0,0,0.4);
}

hr.v-divide-emphasis {
    border-top-color: #FF416C!important;
}
/** ======================================
* IMAGE BANNER Styles
*/

.post-banner-image {
    max-height: 300px;
    /* max-width: 85vw; */
    max-width: 400px;
    object-fit: contain; 
}

/** ======================================
* IMAGE BANNER Styles
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
    ost: 0.9rem;
    margin-top: 0.1rem;
}

</style>