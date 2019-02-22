# Vuex xhr state 
 
Use Vuex to manage the state of you're ajax calls.

- Keep data from ajax calls in your Vuex store
- Track the state of an individual network load calls in your Vuex store
- Only fetch data when needed and not already fetching

This package is still in development.

#instalation
### npm
```
npm install vuex-xhr-state
```
### yarn
```
yarn add  vuex-xhr-state
```

# Example 
Could be outdated and incomplete feel free to ask questions on gitter (ricky-rick) or e-mail 
### Store module file logs/index.js
```js 
export const xhrLogList = new VuexXhrGet({
  method: (id) => { return api.getAllLogs(id) },
  default: [],
  cache: true,
  store: {
    ...
  },
})

export const logs = new VuexXhrCreator('logs', [ xhrLogList ])
```

### Store 
```js
import VueXhrState from 'vuex-xhr-state'
import { logs } from './logs/'

Vue.use(VueXhrState)

const xhrPlugins = [
  logs,
]

export default new Vuex.Store({
  plugins: [
    ...xhrPlugins.map((plugin) => plugin.plugin()),
  ],
})
```

### Component
```js
    import { mapActions } from 'vuex'
    import { xhrLogList } from '@/store/logs'
    import { mapXhrGetters } from 'vuex-xhr-state'
    
    export default {
     computed: {
       ...mapXhrGetters({
         logs: xhrLogList.mapData(),
         isLoading: xhrLogList.mapPending(),
       }),
       isLoading: function () {
         return xhrLogList.pending(this.$store.getters)
       },
     },
     methods: {
       ...mapActions({
         fetchLogs: xhrLogList.fetch(),
         forceReload: xhrLogList.forceFetch(),
       }),
     },
     created () {
       this.fetchLogs()
       /**
        * or with custom error handling
        * if the closure returns true the error will not apear in the global VXS store
        */
       const errorHandler(error => {
         return true
       }) 
       this.fetchLogs({ errorHandler })
     },
    }
 ```
