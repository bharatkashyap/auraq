const airtable = require('airtable');

const airtableConfig = {
    posts: "Posts",
    comments: "Comments",
    users: "Users",
    tags: "Tags",
    writers: "Writers"
}

    
module.exports = function (api, opts) {
    const base = new airtable({apiKey: opts.apiKey}).base(opts.base);
    
    api.loadSource(async store => {
        const posts = store.addContentType({
            typeName: 'Post'
        });

        const tags = store.addContentType({
            typeName: 'Tag',
            route: '/tag/:slug'
        })

        const users = store.addContentType({
            typeName: 'User'
        })

        const writers = store.addContentType({
            typeName: 'Writer',
            route: '/author/:slug'
        })

        posts.addReference('Tag', 'Tag'); // 'Tag' field of 'Post' GraphQL collection linked to 'Tag' Type of GraphQL collection.
        posts.addReference('Writer', 'Writer');
            
        await base(airtableConfig.posts).select({
            sort: [{
                field: "Date", 
                direction: "asc"
            }]
        }).eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                const item = record._rawJson;
                
                posts.addNode({
                    id: item.id,
                    path: `post/${item.id}`,
                    fields: item.fields
                });
            });
            fetchNextPage();
        });

        await base(airtableConfig.tags).select().eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                const item = record._rawJson;
                
                tags.addNode({
                    id: item.id,
                    slug: item.fields.Name,
                    fields: item.fields
                });
            });
            fetchNextPage();
        });

        await base(airtableConfig.writers).select().eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                const item = record._rawJson;
                
                writers.addNode({
                    id: item.id,
                    slug: item.fields.Name,
                    fields: item.fields
                });
            });
            fetchNextPage();
        });

        await base(airtableConfig.users).select().eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                const item = record._rawJson;
                
                users.addNode({
                    id: item.id,
                    path: `user/${item.fields.email.replace(/\./g, '')}`,
                    fields: item.fields
                });
            });
            fetchNextPage();
        });
    });
};

/* Banished to Aali Gaon
// //const express = require('express');
// const airtable = require('airtable');
// //const bodyParser = require('body-parser');


// //if(process.env.NODE_ENV !== "production") {
// //    const dotenv = require('dotenv');
// //    dotenv.config();
// //}

// //const app = express();
// //app.use(express.static("img"));
// //let port = process.env.PORT || 3000;

// //const airtableAPIKey = process.env.AIRTABLE_API_KEY;
// //const airtableBaseId = process.env.AIRTABLE_BASE_ID;
// //const apiBearerToken = process.env.API_BEARER_TOKEN;
// //const base = new airtable({apiKey: airtableAPIKey}).base(airtableBaseId);
// // const airtableConfig = {
// //     posts: "Posts",
// //     comments: "Comments",
// //     users: "Users",
// //     tags: "Tags"
// // }


// app.use( (req, res, next) => {
//     if(req.method === "OPTIONS") res.header('Access-Control-Allow-Origin', req.headers.origin ? req.headers.origin : "*");
//     else res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
//     next();
// })


// app.use(bodyParser.json());


// app.get("/", index);
// app.get("/comments", fetchComments);
// app.get("/posts", fetchPosts);
// app.get("/post/:id", fetchPost);
// app.get("/tags", fetchTags);
// app.post("/like", validateToken, likePost);
// app.post("/comment", validateToken, postComment);
// app.post("/user", validateToken, fetchUser);


// const indexComponent = require('./index');
// function index(req, res) {
//     res.send(indexComponent.template);
// }


// function validateToken(req, res, next) {
//     const authorizationHeader = req.headers.authorization;
//     if(authorizationHeader) {
//         const token = authorizationHeader.split(' ')[1];
//         if (token === apiBearerToken) next();
//         else {
//             result = {
//                 status: 401,
//                 error: 'Unauthorized.'
//             }
//             res.status(401).send(result);
//         }
//     }
//     else {
//         result = {
//             status: 403,
//             error: 'Forbidden.'
//         }
//         res.status(403).send(result);
//     }
// }

// function fetchPosts(req, res) {
//     base(airtableConfig.posts).select({
//         sort: [{
//             field: "Date", 
//             direction: "desc"
//         }]
//     }).eachPage(function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.
        
//         res.write(JSON.stringify(records));
        
    
//         // To fetch the next page of records, call `fetchNextPage`.
//         // If there are more records, `page` will get called again.
//         // If there are no more records, `done` will get called.
//         fetchNextPage();
    
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//         res.end();
//     });
// }

// function fetchPost(req, res) {
//     const id = req.params.id;
//     base(airtableConfig.posts).find(id, (err, record) => {
//         if(err) { console.error(err); return; res.status(501).send(err); }
//         res.status(200).send(record);
//     });
// }

// function fetchTags(req, res) {
//     base(airtableConfig.tags).select({}).eachPage( function page(records, fetchNextPage) {
//         res.write(JSON.stringify(records));
//         fetchNextPage();
//     }, function done(err) { 
//         if(err) { console.error(err); return; }
//         res.end();
//     })
// }

// function fetchComments() {

// }

// async function findUser(user) {
    
//     let foundUserFlag = false;
//     let foundUser = new Promise( (resolve, reject) => {
        
//         base(airtableConfig.users).select({}).eachPage(function page(records, fetchNextPage) {
            
//             records.some(function(record) {
//                 if(record.get('email') === user.email) { foundUserFlag = true; resolve(record); }
//             });
//             fetchNextPage();
//         }, function done(err) {
//             if(err) { console.error(err); }
//             if(foundUserFlag === false) { resolve(null) }
//         })

//     });
    
//     return await foundUser;

// }

// async function fetchUser(req, res) {
//     const user = req.body.user;
//     let userExists = await findUser(user);
    
//     if(userExists) { res.status(200).send(userExists); return; }
    
//     let createdUser = new Promise( (resolve, reject) => {
//         base(airtableConfig.users).create(user, (err, record) => {
//             if(err) { console.error(err); return; }
//             resolve(record);
//         })
//     });

//     res.status(200).send(await createdUser);

// }

// async function likePost(req, res) {
//     const user = req.body.user;
//     const posts = req.body.posts;
//     let likedPosts = new Promise( (resolve, reject) => {
//         base(airtableConfig.users).update(user, {
//             "Likes": posts
//         }, (err, record) => {
//             if(err) { console.error(err); reject(false); return; }
//             resolve(record.get('Likes'));
//         })
//     });

//     res.status(200).send(await likedPosts);
// }

// function postComment(req, res) {
//     base(airtableConfig.comments).create(req.body.payload, function(err, record) {
//         if(err) { console.error(err); return; }
//         res.status(200).send(record.getId());
//     });
// }


// app.listen(port, console.log("Backend running on port", port));
*/