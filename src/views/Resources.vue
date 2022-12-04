<template>
    <div class="home">
        <div v-if="access_token">
            Enter the resource you want to get:
            <input @keyup.enter=get_resource() placeholder="myresource" v-model="resource_name">
            <button @click="get_resource()">GET</button>
            <br>
            <br>
            <div v-if="response">
                <b>Response:</b>
                <br>
                <code>{{ response }}</code>
                <br>
                <br>
                <div v-if="(this.response.token_type)"> Got a new token with upgraded permissions, send a new request to view the resource </div>
                <div v-if="(statusCode == 401)"> Failed getting the resource <br>
                    <code>{{ statusCode }}, {{ statusText }} </code> You might want to <a href="/login">login</a> first
                </div>
                <div v-else-if="(statusCode != 200)"> 
                    Failed getting the resource <br> 
                    <code>{{ statusCode }}, {{ statusText }} </code>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import configFile from '../../../config'

export default {
    name: 'Resources',
    data() {
        return {
            config: configFile,
            access_token: '',
            resource_name: 'testresource',
            response: '',
            statusCode: 0,
            statusText: ''
        }
    },
    created() {
        this.access_token = this.$cookies.get("access_token");
    },
    methods: {
        get_resource() {
            axios.get(`${this.config.backend.url}/resources/${this.resource_name}`, { headers: { 'content-type': 'text/json', 'Authorization': `Bearer ${this.access_token}` } })
                .then((res) => {
                    this.response = res.data
                    this.statusCode = res.status
                    this.statusText = res.statusText
                    if (this.response.token_type == "Bearer") {
                        this.$cookies.set('access_token', this.response.access_token)
                    }
                })
                .catch(err => {
                    this.response = err.response.data;
                    this.statusCode = err.response.status
                    this.statusText = err.response.statusText
                })
        }
    }
}
</script>
  