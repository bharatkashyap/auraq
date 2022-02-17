<template>
<div class="post fade-in flex-column" :class="{ 'headline': post.isHeadline}" :id="post.id">    
        <div class="fadeIn d-flex mb-5 flex-column align-items-center">
            <div @click="navigateToPost" class="d-flex justify-content-center cursor-pointer">
                <img v-if="post.Pics.length" :src="post.Pics[0].url" class="mt-3 post-banner-image" />
            </div>

            <div id="post-stub" @click="navigateToPost" class="d-flex flex-column ml-3 align-items-center cursor-pointer">
                <div id="post-meta" class="mt-1 d-flex flex-row">
                    <div id="post-tag" class="mt-2 align-items-start align-self-center mr-3 text-uppercase">{{post.Tag[0].Name}}</div>                   
                    <div id="post-writer" class="text-writer mt-2 ml-2">
                        <span v-for="(writer, index) in authors" :key="index"><g-link :to="`/author/${writer.replace(' ','-').toLowerCase()}`">{{writer}}</g-link></span>
                    </div>
                </div>
                <div id="post-heading" class="mt-2 align-items-start text-center display-4">{{post.Heading}}</div>
                <div id="post-sub-head" class="mt-3 text-center text-secondary" v-html="post.Description"></div>
                <div id="post-reading-time" class="text-time mt-2">
                    {{ post.Reading_Time }} min read
                </div>
                <div
                    id="post-date"
                    class="mt-1 ml-3 text-center font-size-sm"
                >
                    {{ sanitiseDate(post.Date) }}
                </div>
                <!-- <div id="post-sub-meta" class="d-flex flex-row text-center">
                    <div id="post-date" class="text-time mt-2">{{sanitiseDate(post.Date)}}</div> -->
                    <!-- <div id="post-reading-time" class="text-time ml-4 mt-2">{{post.Reading_Time}} min read</div>                     
                </div> -->
                <!-- <div id="post-writer" class="text-writer mt-3">
                    <span v-for="(writer, index) in authors" :key="index"><g-link :to="`/author/${writer.replace(' ','-').toLowerCase()}`">{{writer}}</g-link></span>
                </div> -->
            </div>        
        </div>            

    <!-- <hr class="v-divide mt-5 mb-0 v-divide-double v-divide-strong pb-5 w-45" /> -->
</div>
</template>


<script>
//import { mapState, mapActions } from 'vuex';
//import postPostComponent from "@/components/postPostComponent.vue";
//import postImageGalleryComponent from "@/components/postImageGalleryComponent.vue";

export default {
    name: "PostCard",
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
        readingTime: function () {
            if(this.post.Notes) return Math.round((this.post.Notes.split(" ").length / this.averageReadingSpeed) * 0.6)
            else return 0
        },
        authors: function () {
            return this.post.Writer.map(writer => writer ? writer.Name : "");
        },
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
 * HEADLINE CARD STYLES 
*/
@media screen and (min-width: 768px) {
    
    .headline {
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .headline #post-stub {
        flex-basis: 30%;
        margin-left: 4rem!important;
    }

    .headline #post-heading {
        font-family: 'DM Serif Text', serif;    
        font-size: 2.8rem;    
    }

    .headline #post-sub-head {
        font-family: 'DM Sans', sans-serif;  
        text-align: center;      
    }

    .headline > div {
        flex-direction: row!important;
        justify-content: space-evenly!important;
        width: 80vw;
        margin: 0 auto;
    }

    .headline .post-banner-image {
        max-width: 500px;
    }

}

/** ====================================== 
 * HEADING TYPOGRAPHY Styles 
 */

#post-heading {
    font-family: 'DM Sans', serif;
    font-size: 2rem;
    font-weight: 600;
}

#heading-text {
    width: fit-content;    
}

.text-heading {
    letter-spacing: 0.15em;
}


#post-date {
    font-family: 'DM Sans', sans-serif;
    /* font-weight: 500; */
}

@media screen and (max-width: 768px) {
    #post-heading {
        font-family: 'DM Serif Text', sans-serif;
    }
    #post-sub-head {
        font-family: 'DM Sans', sans-serif;
    }
}

#post-sub-head {
    font-family: 'Libre Caslon Text', serif;
    font-weight: 300;
    font-size: 1rem;
    color: #595959;
    letter-spacing: 0.01cm;
}

/** ======================================
 * POST META, SUB-META Styles
 */
 #post-meta {
    color: #FF416C;
    opacity: 0.75;
 } 

 #post-tag {
     font-size: 12px;
 }

 #post-date {
     opacity: 0.50;
 }

 #post-tag:after {
     content: "//";
     position: relative;
     top: 0;
     bottom: 0;
     right: 0;
     left: 0.5rem;
 }

/** ====================================== 
 * POST TEXT Styles 
 */

.post-invite {
    font-family: 'DM Sans', sans-serif;
    color: #FF416C;
    cursor: pointer;
    transition: all ease-in-out 0.1s;
}
.post-invite:hover {
    border-color: #FF416C!important;
}

.text-time {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #333;
}

.text-writer {
    font-family: 'DM Sans', sans-serif;
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
* CARD UNDERLINE Styles
*/

#post-stub::after {
    content: "";
    width: 25%;
    height: 4px;
    background-color: #4c4c4c;
    text-align: center;
    margin-top: 0.5em;    
    animation: contract 0.5s forwards;    
}

#post-stub:hover::after {
    animation: expand 0.5s forwards;
}

@keyframes contract {
    0% {
        width: 100%;
    }
    100% {
        width: 25%;
    }
}

@keyframes expand {
    100% {
        width: 100%;
    }    
}

/** ======================================
* IMAGE BANNER Styles
*/

.post-banner-image {
    max-height: 300px;
    min-height: 300px;
    /* max-width: 85vw; */
    min-width: 400px;
    max-width: 400px;
    object-fit: contain; 
}

@media screen and (max-width: 768px) {
    .post-banner-image {
        min-width: 300px;
        max-width: 300px;
    }

    .headline #post-stub {
        margin-top: -4rem;
    }
}

</style>