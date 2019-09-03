<template>
<layout>
        <span class="text-primary d-flex justify-content-center font-size-large">{{$page.user.name}}</span>
</layout>
</template>

<page-query>
query User($id: String!) {
  user(id: $id) {
    name,
    email, 
    picture,
    Comments
    Likes
  }
}
</page-query>

<script>
export default { }
</script>