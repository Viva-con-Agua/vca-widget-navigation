<template>
    <div>
        <img v-if="this.showImg" src="{{ this.user.avatar }}" alt="Missing image" />
        <span class="name {{ this.type }}">{{ this.user.firstname }} {{this.user.lastname }}</span>
    </div>
</template>

<script>
    export default {
        name: "UserWidget",
        props: ['uuid', 'type'],
        data () {
            return {
                showImg: (this.type == "medium" || this.type == "large"),
                user: null,
                uuid: this.uuid,
                type: this.type
            }
        },
        methods: {
            init: function() {
                var that = this;
                this.axios
                    .get('http://localhost/drops/widgets/user/' + this.uuid)
                    .then(function (response)
                    {
                        switch (response.status)
                        {
                            case 200:
                                that.user = response.additional_information;
                                break;
                        }
                    }).catch(function (error) {
                    switch (error.response.status) {
                        case 404:
                            // Todo: How to handle error messages?
                            //that.open(that.$t('signin.error'), error.response.data.msg, "error");
                            break;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .name.small {
        font-size: 0.5em;
        font-style: italic;
    }
    .name.medium {
        font-size: 0.9em;
        font-weight: bold;
    }
    .name.large {
        font-size: 1.2em;
        font-weight: bolder;
    }
</style>