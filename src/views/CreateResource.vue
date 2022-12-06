<template>
    <div class="home">
        ADMIN VIEW
        <br><br>
        This page is for demo purposes <br>
        Creation of resources should be done inside the backend, by the backend. <br>
        Resource name: <input type="text" v-model="resource_name"> <br>
        Resource owner: <input type="text" v-model="resource_owner"> <br>
        Scopes: <input type="text" v-model="resource_scopes"> <br>
        Data: <textarea type="text" v-model="resource_data"></textarea> <br>
        <br>
        <button @click="create_resource()">CREATE</button> <br>
        <br>
        <div v-if="(success==true)">SUCCESS</div>
        <div v-if="(success==false)">FAILED <br><code>{{response}}</code></div>
        <br>
        <div v-if="(statusCode == 401)"> Failed getting the resource <br>
            <code>{{ statusCode }}, {{ statusText }} </code> You might want to <a href="/login">login</a> first
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import configFile from '../../../config'

export default {
    name: 'CreateResource',
    data() {
        return {
            config: configFile,
            access_token: "",
            resource_name: "myresource",
            resource_owner: "testuser",
            resource_scopes: '["scope1","scope2"]',
            resource_data: "{}",
            success: null,
            response: "",
            statusCode: 0,
            statusText: ""
        }
    },
    created() {
        this.access_token = this.$cookies.get("access_token");
    },
    methods: {
        create_resource() {
            let data = {
                name: this.resource_name,
                owner: this.resource_owner,
                resource_scopes: JSON.parse(this.resource_scopes),
                data: this.resource_data
            }
            axios({method: "post", url: `${this.config.backend.url}/resources/${this.resource_name}`, headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.access_token}`}, data: data })
            .then((res) => {
                this.success = true
            })
            .catch(err => {
                this.success = false
                this.response = err.response.data;
                this.statusCode = err.response.status
                this.statusText = err.response.statusText
            })
        }
    }
}
</script>
  