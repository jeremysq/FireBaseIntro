<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-btn
        color="primary"
        small
        class="mx-3"
        @click="toFirestore"
      >
        Firestore
      </v-btn>
      <v-btn
        color="primary"
        small
        @click="toAuth"
      >
        Authentication
      </v-btn>
      <v-layout
        justify-center
      >
        <h1
          class="subtitle-2"
        >
          FireBase Demonstration
        </h1>
      </v-layout>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      fixed: false
    }
  },
  methods: {
    toAuth () {
      this.$router.push('/auth')
    },
    toFirestore () {
      this.$router.push('/')
    }
  }
}
</script>
