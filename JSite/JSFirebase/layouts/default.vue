<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title
        class="white--text"
      >
        Firebase Demonstration
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        color="primary"
        small
        class="ml-3"
        @click="toFirestore"
      >
        Firestore
      </v-btn>
      <v-btn
        color="primary"
        small
        class="ml-3"
        @click="toAuth"
      >
        Authentication
      </v-btn>
      <v-btn
        v-if="isLoggedIn === true"
        color="primary"
        small
        class="mx-3"
        @click="signOut"
      >
        Sign Out
      </v-btn>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      clipped: false,
      fixed: false
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn
    })
  },
  methods: {
    toAuth () {
      this.$router.push('/auth')
    },
    toFirestore () {
      this.$router.push('/')
    },
    signOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
