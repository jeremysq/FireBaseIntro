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
      <v-card>
        <v-card-title
          class="headline"
        >
          Welcome to the FireBase Testing Application
        </v-card-title>
        <v-card-text>
          <p>This is a simple web app built in Vuetify to test FireBase's capabilities.</p>
        </v-card-text>
        <v-form>
          <v-text-field
            v-model="colName"
            solo
            label="Collection Name"
          />
          <v-text-field
            v-model="docName"
            solo
            label="Document Name"
          />
          <v-select
            v-model="docAction"
            solo
            label="Action"
            :items="actions"
            @input="changeDocumentAction()"
          />
          <v-card
            v-if="docAction === 'Add'"
            elevation="0"
          >
            <v-list-item
              v-for="(element, index) in elements"
              :key="element.index"
            >
              <v-text-field
                v-model="element.key"
                label="Element Key"
                class="mx-2"
              />
              <v-text-field
                v-model="element.value"
                label="Element Value"
                class="mx-2"
              />
              <v-btn
                small
                @click="elements.splice(index, 1)"
              >
                Remove
              </v-btn>
            </v-list-item>
          </v-card>
        </v-form>
        <v-card-actions>
          <v-btn
            :disabled="docAction !== 'Add'"
            small
            @click="addElement"
          >
            Add
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="docAction === null"
            color="primary"
            @click="Submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex
      v-if="docAction === 'Read' && documentError === false"
      xs8
      class="mt-3"
    >
      <v-card
        width="300"
        @click="resetDocumentError"
      >
        <v-card-title
          class="subtitle-1"
        >
          Record received:
        </v-card-title>
        <v-card-text
          class="subtitle-2 text-center"
        >
          {{ documentData }}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex
      v-if="documentError === false"
      xs8
      class="mt-3"
    >
      <v-card
        width="300"
        @click="resetDocumentError"
      >
        <v-card-text
          class="subtitle-2 text-center"
        >
          Success!
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex
      v-if="documentError === true"
      xs8
      class="mt-3"
    >
      <v-card
        width="300"
        @click="resetDocumentError"
      >
        <v-card-text
          class="subtitle-2 text-center"
        >
          There was an error doing this operation.
        </v-card-text>
        <v-card-text
          class="overline"
        >
          {{ errorLog }}
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
      colName: null,
      docName: null,
      docAction: null,
      isActionChosen: false,
      elementIndex: 0,
      actions: [
        'Add',
        'Read',
        'Delete'
      ],
      elements: [
        {
          index: 0,
          key: '',
          value: ''
        }
      ]
    }
  },
  computed: {
    ...mapState({
      collectionName: state => state.collectionName,
      documentName: state => state.documentName,
      documentError: state => state.documentError,
      documentData: state => state.documentData,
      errorLog: state => state.errorLog
    })
  },
  methods: {
    Submit () {
      this.$store.dispatch('setCollectionName', this.colName)
      this.$store.dispatch('setDocumentName', this.docName)
      const payload = [this.colName, this.docName]
      if (this.docAction === 'Add') {
        this.$store.dispatch('doAdd', this.elements)
      } else if (this.docAction === 'Read') {
        this.$store.dispatch('doRead', payload)
      } else {
        this.$store.dispatch('doDelete', payload)
      }
    },
    addElement () {
      this.elementIndex++
      this.elements.push({
        index: this.elementIndex,
        key: '',
        value: ''
      })
    },
    changeDocumentAction () {
      this.$store.dispatch('setDocumentAction', this.docAction)
      this.resetDocumentError()
      this.isActionChosen = true
    },
    resetDocumentError () {
      this.$store.dispatch('resetDocumentError')
    }
  }
}
</script>
