<template>
    <div class="home">
        <div v-if="access_token">
            Enter the resource you want to get: <br>
            <input @keyup.enter=get_resource() v-model="resource_name"> <br>
            <input @keyup.enter=get_resource() v-model="resource_scopes">
            <button @click="get_resource()">GET</button>
            <br>
            <br>
            <div v-if="response">
                <b>Response:</b>
                <br>
                <code>{{ response }}</code>
                <br>
                <br>
                <div v-if="(this.response.token_type)"> Got a new token with upgraded permissions, send a new request to
                    view the resource </div>
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
    name: 'GetResource',
    data() {
        return {
            config: configFile,
            access_token: '',
            resource_name: 'testresource',
            response: '',
            statusCode: 0,
            statusText: '',
            resource_scopes: 'scope1,scope2'
        }
    },
    created() {
        this.access_token = this.$cookies.get("access_token");
    },
    methods: {
        get_resource() {
            let axios_config = {
                method: "get",
                url: `${this.config.backend.url}/resources/${this.resource_name}`,
                headers: { 'content-type': 'text/json', 'Authorization': `Bearer ${this.access_token}` }
            }
            if (this.resource_scopes != '') {
                axios_config.url = axios_config.url + `?scopes=${this.resource_scopes}`
            }
            axios(axios_config)
                .then((res) => {
                    this.response = res.data
                    this.statusCode = res.status
                    this.statusText = res.statusText
                    if (this.response.token_type == "Bearer") {
                        this.$cookies.set('access_token', this.response.access_token)
                        this.access_token = this.response.access_token
                    }
                })
                .catch(err => {
                    if (err.response) {
                        this.response = err.response.data;
                        this.statusCode = err.response.status
                        this.statusText = err.response.statusText
                    }
                    else {
                        this.response == "A network error has occured, make sure that the backend is running and the config file is correctly configured";
                    }
                })
        }
    }
}
</script>
  