<template>
<div class="post pre-load flex-column" :id="`reco${post.id}`">
    <div class="flex-column my-3 w-100 justify-content-between fadeIn">
        <div class="d-flex flex-lg-row flex-column align-items-center flex-equal">
            <div @click="navigateToPost" class="d-flex flex-equal justify-content-center align-self-lg-start cursor-pointer">
                <img v-if="post.Pics.length" :src="post.Pics[0].url" class="mt-3 post-reco-banner-image" />
            </div>

            <div id="post-stub" @click="navigateToPost" class="d-flex flex-column flex-equal align-self-lg-start align-items-center align-items-lg-start cursor-pointer">
                <div id="post-meta" class="mt-1 d-flex flex-row">
                    <div id="post-tag" class="mt-1 align-items-start align-self-center font-size-small mr-3 text-uppercase">{{post.Tag[0].Name}}</div>
                    <div id="post-date" class="mt-1 ml-3 align-items-start font-size-small">{{sanitiseDate(post.Date)}}</div>
                </div>
                <div id="post-heading" class="mt-1 align-items-start text-center text-lg-left display-5">{{post.Heading}}</div>
                <div id="post-reading-time" class="text-time mt-1">{{post.Reading_Time}} min read</div>
            </div>        
        </div>
    </div>

    <hr class="v-divide mt-2 mb-0 v-divide-double v-divide-strong pb-5 w-25" />
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
    data: function () {
        return {
        overPost: false,
        averageReadingSpeed: 200,
        dateOptions: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
            },
        }
    },
    computed: { 
        // readingTime: function () {
        //     if(this.post.Notes) return Math.round((this.post.Notes.split(" ").length / this.averageReadingSpeed) * 0.6)
        //     else return 0
        // },
        // authors: function () {
        //     return this.post.Writer.map(writer => writer ? writer.Name : "");
        // },
        tag: function () {
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
            return dateObject.toLocaleDateString('en-IN', this.dateOptions);
        },
        toggleLike(status) {
            this.$emit("update-likes", status, this.post.id);
        },
        submitComment(comment) {
            this.postComment( {comment: comment, postId: this.post.id} );
        },
        navigateToPost() {
            this.$router.push({path: `/post/${this.post.id}` })
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

.post-reco-banner-image {
    max-height: 150px;
    /* max-width: 85vw; */
    max-width: 200px;
    object-fit: contain; 
}

</style>