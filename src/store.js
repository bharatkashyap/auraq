import { fetch as gridFetch } from "gridsome";

export default {
  state: {
    viewport: {
      height: 0,
      width: 0,
    },
    nightMode: true,
    stickHeader: false,
    config: {
      backendAPI: {
        production: "https://badarpur.bharatk.in",
        development: "http://localhost:3000",
      },
      CDN_PATH: "https://badarpur.bharatk.in/static/auraq",
      env: {
        dev: "development",
        prod: "production",
      },
      postsEndpoint: "/posts",
      postEndpoint: "/post",
      commentsEndpoint: "/comments",
      commentEndpoint: "/comment",
      tagsEndpoint: "/tags",
      likeEndpoint: "/like",
      userEndpoint: "/user",
      subscribeEndpoint: "/subscribe",
      googleVerifyUserEndpoint:
        "https://oauth2.googleapis.com/tokeninfo?id_token=",
    },
    fetchedPosts: [],
    computedPosts: [],
    fetchedTags: [],
    fetchedPostsStatus: false,
    fetchedTagsStatus: false,
    googleAuth: {},
    googleSignInStatus: false,
    googleUser: {},
    verifiedGoogleUser: {},
    verifiedGoogleUserStatus: false,
    googleSignInError: {},
    idToken: "",
    fetchedUser: {},
    likedPosts: [],
    fetchedUserStatus: false,
    foundNoGoogleUser: false,
    postedCommentPending: false,
    postedCommentSuccess: false,
    subscriberEmail: null,
    subscriptionStatus: false,
    subscrptionStatusPending: false,
  },

  mutations: {
    mutateNightMode(state, payload) {
      state.nightMode = payload;
    },
    mutateViewport(state, payload) {
      state.viewport = payload;
    },
    mutateStickHeader(state, payload) {
      state.stickHeader = payload;
    },
    mutateFetchedPosts(state, payload) {
      state.fetchedPosts = payload;
    },
    mutateFetchedPostsStatus(state, payload) {
      state.fetchedPostsStatus = payload;
    },
    mutateComputedPosts(state, payload) {
      state.computedPosts = payload;
    },
    mutateComputedPostsPost(state, post) {
      state.computedPosts.forEach((p, i) => {
        if (p.id === post.id) {
          Vue.set(state.computedPosts[i], "Likes", post.Likes);
          Vue.set(state.computedPosts[i], "Comments", post.Comments);
        }
      });
    },
    mutateFetchedTags(state, payload) {
      state.fetchedTags = payload;
    },
    mutateFetchedTagsStatus(state, payload) {
      state.fetchedTagsStatus = payload;
    },
    mutateFetchedUserLikedPosts(state, payload) {
      if (!state.fetchedUser.hasOwnProperty("Likes"))
        Vue.set(state.fetchedUser, "Likes", payload);
      else state.fetchedUser.Likes = payload;
    },
    mutateFetchedPostsPost(state, payload) {
      state.fetchedPosts.forEach((p, i) => {
        if (p.id === payload.id) {
          Vue.set(state.fetchedPosts[i].fields, "Likes", payload.fields.Likes);
          Vue.set(
            state.fetchedPosts[i].fields,
            "Comments",
            payload.fields.Comments
          );
        }
      });
    },
    mutateLikedPosts(state) {
      if (state.fetchedUserStatus) {
        state.computedPosts.forEach((post) => {
          if (state.fetchedUser.Likes) {
            if (state.fetchedUser.Likes.indexOf(post.id) === -1) {
              Vue.set(post, "Liked", false);
            } else Vue.set(post, "Liked", true);
          }
        });
        state.likedPosts = state.fetchedUser.Likes
          ? state.fetchedUser.Likes
          : [];
      }
    },
    mutateGoogleAuth(state, payload) {
      state.googleAuth = payload;
    },
    mutateGoogleSignInStatus(state, payload) {
      state.googleSignInStatus = payload;
    },
    mutateGoogleUser(state, payload) {
      state.googleUser = payload;
    },
    mutateVerifiedGoogleUser(state, payload) {
      state.verifiedGoogleUser = payload;
    },
    mutateVerifiedGoogleUserStatus(state, payload) {
      state.verifiedGoogleUserStatus = payload;
    },
    mutateGoogleSignInError(state, payload) {
      state.googleSignInError = payload;
    },
    mutateIdToken(state, payload) {
      state.idToken = payload;
    },
    mutateGraphFetchedUser(state, payload) {
      state.fetchedUser = payload;
    },
    mutateFetchedUser(state, payload) {
      state.fetchedUser = payload;
    },
    mutateFetchedUserStatus(state, payload) {
      state.fetchedUserStatus = payload;
    },
    mutateFoundNoGoogleUser(state, payload) {
      state.foundNoGoogleUser = payload;
    },
    mutatePostedCommentSuccess(state, payload) {
      state.postedCommentSuccess = payload;
    },
    mutatePostedCommentPending(state, payload) {
      state.postedCommentPending = payload;
    },
    mutateSubscriberEmail(state, payload) {
      state.subscriberEmail = payload;
    },
    mutateSubscriptionStatus(state, payload) {
      state.subscriptionStatus = payload;
    },
    mutateSubscriptionStatusPending(state, payload) {
      state.subscriptionStatusPending = payload;
    },
  },
  actions: {
    addSubscriber({ commit, state }) {
      commit("mutateSubscriptionStatusPending", true);
      let backendEnvironment = process.env.NODE_ENV;
      let bearerToken =
        backendEnvironment === state.config.env.prod
          ? process.env.API_BEARER_TOKEN
          : process.env.GRIDSOME_DEV_BEARER_TOKEN;

      fetch(
        `${state.config.backendAPI[backendEnvironment]}${
          state.config.subscribeEndpoint
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ email: state.subscriberEmail }),
        }
      )
        .then((response) => {
          return response.text();
        })
        .then((res) => {
          commit("mutateSubscriptionStatus", true);
          commit("mutateSubscriptionStatusPending", false);
        });
    },
    fetchPosts({ commit, state, dispatch }) {
      dispatch("fetchTags");
      let backendEnvironment = process.env.NODE_ENV;
      fetch(
        state.config.backendAPI[backendEnvironment] +
          state.config.postsEndpoint,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          commit("mutateFetchedPosts", res);
          commit("mutateFetchedPostsStatus", true);
          dispatch("computePosts");
        });
    },

    fetchPost({ commit, state, dispatch }, id) {
      let backendEnvironment = process.env.NODE_ENV;
      fetch(
        state.config.backendAPI[backendEnvironment] +
          state.config.postEndpoint +
          "/" +
          id,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          commit("mutateFetchedPostsPost", res);
          dispatch("computePost", res);
        });
    },

    fetchTags({ commit, state }) {
      let backendEnvironment = process.env.NODE_ENV;
      fetch(
        state.config.backendAPI[backendEnvironment] + state.config.tagsEndpoint,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          commit("mutateFetchedTags", res);
          commit("mutateFetchedTagsStatus", true);
        });
    },

    loadGapiAuth2({ dispatch }) {
      window.gapi.load("auth2", () => {
        dispatch("initAuth2", window.gapi.auth2);
      });
    },

    computePosts({ state, commit }) {
      let computedPosts = state.fetchedPosts.map((record) => {
        return { ...record.fields, id: record.id };
      });
      commit("mutateComputedPosts", computedPosts);
      commit("mutateLikedPosts");
    },

    computePost({ commit }, post) {
      let computedPost = { ...post.fields, id: post.id };
      commit("mutateComputedPostsPost", computedPost);
    },

    async initAuth2({ commit, state, dispatch }, gapiAuth2) {
      let googleClientId =
        process.env.NODE_ENV === state.config.env.dev
          ? process.env.GRIDSOME_GOOGLE_DEV_CLIENT_ID
          : process.env.GOOGLE_PROD_CLIENT_ID;
      let gapiAuth2Params = {
        client_id: `${googleClientId}.apps.googleusercontent.com`,
      };
      let googleAuth = await gapiAuth2.init(gapiAuth2Params);
      commit("mutateGoogleAuth", googleAuth);
      dispatch("getCurrentUser");
    },

    getCurrentUser({ state, commit, dispatch }) {
      if (state.googleAuth.isSignedIn.get() === true) {
        let googleUser = state.googleAuth.currentUser.get();
        dispatch("setUser", googleUser);
      } else commit("mutateFoundNoGoogleUser", true);
    },

    async googleSignIn({ commit, state, dispatch }) {
      try {
        let googleUser = await state.googleAuth.signIn();
        dispatch("setUser", googleUser);
      } catch (err) {
        commit("mutateGoogleSignInStatus", false);
        commit("mutateGoogleSignInError", err);
      }
    },

    setUser({ commit, dispatch }, googleUser) {
      commit("mutateGoogleSignInStatus", true);
      commit("mutateGoogleUser", googleUser);
      let idToken = googleUser.getAuthResponse().id_token;
      commit("mutateIdToken", idToken);
      dispatch("verifyCurrentUser");
    },

    verifyCurrentUser({ commit, state, dispatch }) {
      fetch(state.config.googleVerifyUserEndpoint + state.idToken)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          commit("mutateVerifiedGoogleUser", res);
          commit("mutateVerifiedGoogleUserStatus", true);
          dispatch("graphFetchUser");
          //dispatch('fetchUser', res);
        });
    },

    async graphFetchUser({ state, commit }) {
      let slug = state.verifiedGoogleUser.email.replace(/\./g, "");
      try {
        const results = await gridFetch(`/user/${slug}`);
        const data = results.data;
        const user = data.user;
        commit("mutateGraphFetchedUser", user);
        commit("mutateFetchedUserStatus", true);
      } catch (error) {
        console.log(error);
      }
    },

    fetchUser({ state, dispatch }, verifiedGoogleUser) {
      let backendEnvironment = process.env.NODE_ENV;
      let bearerToken =
        backendEnvironment === state.config.env.prod
          ? process.env.API_BEARER_TOKEN
          : process.env.VUE_APP_API_BEARER_TOKEN;

      const user = {
        name: verifiedGoogleUser.name,
        email: verifiedGoogleUser.email,
        picture: verifiedGoogleUser.picture,
      };

      fetch(
        state.config.backendAPI[backendEnvironment] + state.config.userEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            user: user,
          }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          if (res) {
            dispatch("computeFetchedUser", res);
          }
        });
    },

    computeFetchedUser({ commit }, fetchedRecord) {
      let fetchedUser = {
        ...fetchedRecord.fields,
        id: fetchedRecord.id,
      };
      commit("mutateFetchedUser", fetchedUser);
      commit("mutateFetchedUserStatus", true);
    },

    likePost({ commit, state, dispatch }, { posts, id }) {
      let backendEnvironment = process.env.NODE_ENV;
      let bearerToken =
        backendEnvironment === state.config.env.prod
          ? process.env.API_BEARER_TOKEN
          : process.env.VUE_APP_API_BEARER_TOKEN;
      fetch(
        state.config.backendAPI[backendEnvironment] + state.config.likeEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            posts: posts,
            user: state.fetchedUser.id,
          }),
        }
      )
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          return text.length ? JSON.parse(text) : [];
        })
        .then((res) => {
          console.log(res);
          commit("mutateFetchedUserLikedPosts", res);
          commit("mutateLikedPosts");
          dispatch("fetchPost", id);
        });
    },

    postComment({ commit, state, dispatch }, { comment, postId }) {
      commit("mutatePostedCommentPending", true);
      let backendEnvironment = process.env.NODE_ENV;
      let bearerToken =
        backendEnvironment === state.config.env.prod
          ? process.env.API_BEARER_TOKEN
          : process.env.VUE_APP_API_BEARER_TOKEN;
      const { name, email, picture, id } = state.fetchedUser;
      fetch(
        state.config.backendAPI[backendEnvironment] +
          state.config.commentEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            payload: {
              Comment: comment,
              name: name,
              email: email,
              picture: picture,
              User: [id],
              Posts: [postId],
            },
          }),
        }
      )
        .then((response) => {
          return response.text();
        })
        .then((res) => {
          console.log(res);
          if (res.length) {
            commit("mutatePostedCommentSuccess", true);
            commit("mutatePostedCommentPending", false);
            dispatch("fetchPost", postId);
          }
        });
    },
  },
};
