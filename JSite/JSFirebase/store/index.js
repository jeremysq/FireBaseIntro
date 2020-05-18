// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import createLogger from 'vuex/dist/logger'
export const debug = true
export const strict = debug
export const plugins = debug ? [createLogger()] : []
export const firebase = require('firebase/app')
export const auth = require('firebase/auth')
export const firestore = require('firebase/firestore')
const firebaseConfig = {
  apiKey: 'apiKey',
  authDomain: 'authDomain',
  databaseURL: 'databaseURL',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId',
  measurementId: 'measurementId'
}

const defaultProject = firebase.initializeApp(firebaseConfig)
console.log(defaultProject.name)

const admin = defaultProject.auth()
const db = defaultProject.firestore()
console.log(admin)
console.log(db)

export const state = {
  collectionName: null,
  documentName: null,
  documentAction: null,
  documentError: null,
  documentData: null,
  emailSignUp: null,
  passwordSignUp: null,
  signUpError: null,
  emailLogin: null,
  passwordLogin: null,
  loginError: null,
  signOutError: null,
  isLoggedIn: false,
  errorLog: null
}

export const mutations = {
  setCollectionName (state, name) {
    state.collectionName = name
  },
  setDocumentName (state, name) {
    state.documentName = name
  },
  setDocumentAction (state, action) {
    state.documentAction = action
  },
  doAdd (state, payload) {
    const docRef = db.collection(state.collectionName).doc(state.documentName)
    console.log(docRef)
    const setData = docRef.set(payload)
    console.log(setData)
    state.documentError = false
  },
  doRead (state, data) {
    state.documentData = data
  },
  resetDocumentError (state) {
    state.documentError = null
  },
  resetSignUpError (state) {
    state.signUpError = null
  },
  resetLoginError (state) {
    state.loginError = null
  },
  resetSignOutError (state) {
    state.signOutError = null
  },
  setDocumentError (state, value) {
    state.documentError = value
  },
  setSignUpError (state, value) {
    state.signUpError = value
  },
  setLoginError (state, value) {
    state.loginError = value
  },
  setSignOutError (state, value) {
    state.signOutError = value
  },
  setErrorLog (state, error) {
    state.errorLog = error
  },
  setIsLoggedIn (state, value) {
    state.isLoggedIn = value
  }
}

export const actions = {
  setCollectionName (context, name) {
    return new Promise((resolve) => {
      context.commit('setCollectionName', name)
      resolve()
    })
  },
  setDocumentName (context, name) {
    return new Promise((resolve) => {
      context.commit('setDocumentName', name)
      resolve()
    })
  },
  setDocumentAction (context, action) {
    return new Promise((resolve) => {
      context.commit('setDocumentAction', action)
      resolve()
    })
  },
  doAdd (context, data) {
    return new Promise((resolve) => {
      let index
      let payload = null
      payload = {}
      for (index = 0; index < data.length; index++) {
        console.log(data[index].index)
        console.log(data[index].key)
        console.log(data[index].value)
        payload[data[index].key] = data[index].value
      }
      context.commit('doAdd', payload)
      resolve()
    }).catch((err) => {
      context.commit('setErrorLog', err)
      context.commit('setDocumentError', true)
    })
  },
  doRead (context, data) {
    return new Promise((resolve) => {
      let docData
      console.log(data)
      const docRef = db.collection(data[0]).doc(data[1])
      console.log(docRef)
      const getDoc = docRef.get()
        .then((doc) => {
          console.log(getDoc)
          if (!doc.exists) {
            context.commit('setErrorLog', 'Error: No such document exists')
            context.commit('setDocumentError', true)
          } else {
            docData = doc.data()
            console.log('Document data:', docData)
            context.commit('doRead', docData)
            context.commit('setDocumentError', false)
          }
        })
      resolve()
    }).catch((err) => {
      context.commit('setErrorLog', err)
      context.commit('setDocumentError', true)
    })
  },
  doDelete (context, data) {
    return new Promise((resolve) => {
      const docRef = db.collection(data[0]).doc(data[1]).delete()
        .catch((err) => {
          context.commit('setErrorLog', err)
          context.commit('setDocumentError', true)
        })
      console.log(docRef)
      context.commit('setDocumentError', false)
      resolve()
    }).catch((err) => {
      context.commit('setErrorLog', err)
      context.commit('setDocumentError', true)
    })
  },
  resetDocumentError (context) {
    return new Promise((resolve) => {
      context.commit('resetDocumentError')
      resolve()
    })
  },
  createUser (context, payload) {
    return new Promise((resolve) => {
      console.log(admin)
      admin.createUserWithEmailAndPassword(payload[0], payload[1])
        .catch((err) => {
          context.commit('setErrorLog', err)
          context.commit('setSignUpError', true)
        })
      context.commit('setSignUpError', false)
      resolve()
    })
  },
  loginUser (context, payload) {
    return new Promise((resolve) => {
      console.log(admin)
      const userDetails = admin.signInWithEmailAndPassword(payload[0], payload[1])
        .catch((err) => {
          context.commit('setErrorLog', err)
          context.commit('setLoginError', true)
          context.commit('resetSignOutError')
        })
      console.log(userDetails)
      context.commit('setLoginError', false)
      context.commit('setIsLoggedIn', true)
      resolve()
    })
  },
  signOut (context) {
    admin.signOut()
      .then(() => {
        context.commit('setSignOutError', false)
        context.commit('setIsLoggedIn', false)
      }).catch((err) => {
        console.log(err)
        context.commit('setSignOutError', true)
        context.commit('setloginError', null)
        context.commit('setErrorLog', err)
      })
  },
  resetLoginError (context) {
    context.commit('resetLoginError')
  },
  resetSignOutError (context) {
    context.commit('resetSignOutError')
  },
  resetSignUpError (context) {
    context.commit('resetSignUpError')
  }
}
