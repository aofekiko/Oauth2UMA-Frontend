<template>
    <div class="home">
      You are about to start the login process to: <a v-bind:href="config.backend.url+'/login'">{{ config.backend.url }}/login</a>
      <br>
      <button @click="login()" >Press this button to be send the login request to the backend</button>
      <br>
      <br>
      The backend responded with an authorizationUrl we need to redirect to: 
      <br>
      <a v-bind:href=redirect>{{ redirect }}</a>
      <br>
      <b v-if="redirect" >Click the link above to continue the login process</b>
    </div>
</template>
  
<script>
    import axios from 'axios'
    import configFile from '../../../config'
    
    export default {
        name: 'Login',
        data() {
            return {
                config: configFile,
                redirect: ''
            }
        },
        created() {
        },
        methods: {
            login() {
                axios.get(`${this.config.backend.url}/login`)
                .then(res => {
                    this.redirect = res.data
                    //alert(`The authorizationUrl we need to redirect to is:\n ${res.data}`)
                    //window.location.href = res.data
                }).catch(err => {
                    alert(err)
                    window.location.href = '/'
                })
            }
        }
    }
</script>
  