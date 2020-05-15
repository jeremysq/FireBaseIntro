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
        class="mx-3"
      >
        Authentication
      </v-btn>
      <v-btn
        v-if="loginError === false"
        color="primary"
        small
        class="mx-3"
        @click="signOut"
      >
        Sign Out
      </v-btn>
      <v-layout
        justify-center
      >
        <h1
          class="subtitle-2 text-center"
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
      loginError: state => state.loginError
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
