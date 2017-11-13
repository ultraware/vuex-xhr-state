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
import { logs } from './logs/'

export default new Vuex.Store({
  plugins: [
    logs.plugin('logs'),
  ],
})
```

### Component
```js
    import { mapActions } from 'vuex'
    import { xhrLogList } from '@/store/logs'
    import { mapXhrGetters } from '@/domains/vuex-xhr'
    
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
     },
    }
 ```
