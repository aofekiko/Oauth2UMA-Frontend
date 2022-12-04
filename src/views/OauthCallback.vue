<template>
    <div class="home">
      The code and state have been retrieved from the backend. 
      <br>
      <b>code:</b> {{this.$route.query.code}}
      <br>
      <b>state:</b> {{this.$route.query.state}}
      <br>
      This code will be send to the backend to get a tokenSet
      <br>
      <button @click="login()" >Press this button to be send the request to the backend</button>
      <br>
      {{access_token}}
      <br>
      <div v-if="access_token" >
        Exchanged code to tokenSet in the backend and got the access token from the backend 
        <br>
        The access token has been saved as a cookie
        <br>
        You can no go to <router-link to="/resources">Resources</router-link>!
      </div>
    </div>
</template>
  
<script>
    import axios from 'axios'
    import configFile from '../../../config'

    export default {
        name: 'OauthCallback',
        data() {
            return {
                config: configFile,
                access_token: ''
            }
        },
        created() {
        },
        methods: {
            login() {
                axios.post(`${this.config.backend.url}/code-to-token-exchange`, {
                code: this.$route.query.code,
                state: this.$route.query.state
               })
                .then(res => {
                    this.access_token = res.data
                    //alert("Exchanged code to tokenSet in the backend and got the access token from the backend")
                    //alert(`The access_token is saved in a cookie, access_token=${access_token}`)
                    //document.cookie = `access_token=${this.access_token}`;
                    this.$cookies.set('access_token', this.access_token)
                    //window.location.href = '/'
                }).catch(err => {
                    alert(err)
                    //window.location.href = '/'
                })
            }
        }
    }
</script>
  