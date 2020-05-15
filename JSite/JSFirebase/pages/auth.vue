<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card
        elevation="7"
        outlined
        width="500"
      >
        <v-card-title
          class="headline"
        >
          Create an Account
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="signUpEmail"
              :rules="emailRules"
              label="User Email"
              required
            />
            <v-text-field
              v-model="signUpPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              required
              @click:append="show1 = !show1"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!valid"
            color="primary"
            nuxt
            @click="submitSignUp"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        v-if="signUpError === true"
        class="my-3"
      >
        <v-card-text
          class="subtitle-2"
        >
          There was an error creating your account.
        </v-card-text>
        <v-card-text
          class="overline"
        >
          {{ errorLog }}
        </v-card-text>
      </v-card>
      <v-card
        v-if="signUpError === false"
        class="my-3"
      >
        <v-card-text
          class="subtitle-2"
        >
          Your account was created successfully!
        </v-card-text>
      </v-card>
      <v-card
        elevation="7"
        outlined
        width="500"
        class="my-8"
      >
        <v-card-title
          class="headline"
        >
          Try Logging In!
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="loginEmail"
              :rules="emailRules"
              label="User Email"
              required
            />
            <v-text-field
              v-model="loginPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="passwordRules"
              label="Password"
              required
              @click:append="show2 = !show2"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!valid"
            color="primary"
            nuxt
            @click="submitLogin"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        v-if="loginError === true"
        class="my-3"
      >
        <v-card-text
          class="subtitle-2"
        >
          There was an error logging in.
        </v-card-text>
        <v-card-text
          class="overline"
        >
          {{ errorLog }}
        </v-card-text>
      </v-card>
      <v-card
        v-if="loginError === false"
        class="my-3"
      >
        <v-card-text
          class="subtitle-2"
        >
          Your account was logged in successfully!
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      show1: false,
      show2: false,
      failure: false,
      valid: true,
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v.length > 7) || 'Password must be longer than 6 characters'
      ]
    }
  },
  computed: {
    ...mapState({
      emailSignUp: state => state.emailSignUp,
      passwordSignUp: state => state.passwordSignUp,
      signUpError: state => state.signUpError,
      emailLogin: state => state.emailLogin,
      passwordLogin: state => state.passwordLogin,
      loginError: state => state.loginError,
      errorLog: state => state.errorLog
    })
  },
  methods: {
    submitSignUp () {
      const payload = [this.signUpEmail, this.signUpPassword]
      this.$store.dispatch('createUser', payload)
    },
    submitLogin () {
      const payload = [this.loginEmail, this.loginPassword]
      this.$store.dispatch('loginUser', payload)
    }
  }
}
</script>
