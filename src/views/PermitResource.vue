<template>
    <div class="home">
        Incomplete page :( <br><br>

        USER VIEW
        <br><br>
        This page is for demo purposes <br>
        Granting permissions should be done by the user, but can also be done by the backend if need be <br>
        <br>
        Resource name: <input type="text" v-model="resource_name"> <br>
        Target: <input type="text" v-model="resource_target"> <br>
        Scopes: <input type="text" v-model="resource_scopes"> <br>
        <button @click="grant_permissions()">Grant</button>
    </div>
</template>
  
<script>
import axios from 'axios'
import configFile from '../../../config'

export default {
    name: 'PermitResource',
    data() {
        return {
            config: configFile,
            access_token: "",
            resource_name: "myresource",
            resource_owner: "testuser",
            resource_scopes: '["scope1","scope2"]',
            resource_target: "user2",
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
        grant_permissions() {
            axios({method: "get", url: `${this.config.backend.url}/resources/${this.resource_name}`, headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${this.access_token}`}})
            .then((res) => {
                let resource_id = res.response.data.resource_id
            })
            let data = {
                "resource": "46067e85-9a03-4683-97d9-95872f692e9f",
                "requester": "3887c4e5-db80-4e30-995d-23ade54a34c8",
                "granted": true,
                "scopeName": ""
            }

        }
    }
}
</script>
  