<template>
    <div>
        <vs-row align="center" justify="space-around" direction="column">
            <vs-col w="12">
                <vs-row class="py-4">
                    <vs-input v-model="form.username" :label-placeholder="$t('welcome.login.form.label.username')" block data-test="username-input" />
                </vs-row>
                <vs-row class="py-4">
                    <vs-input
                        v-model="form.password"
                        icon-after
                        type="password"
                        :label-placeholder="$t('welcome.login.form.label.password')"
                        block
                        data-test="password-input"
                    />
                </vs-row>
                <vs-row class="py-2">
                    <vs-button block border flat data-test="login-button">
                        {{ $t('welcome.login.form.buttons.login') }}
                    </vs-button>
                </vs-row>
                <vs-row>
                    <hr class="border-gray-300 border-1 w-full rounded-md my-2">
                </vs-row>
            </vs-col>
        </vs-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { LoginParams } from './login'

export default defineComponent({
    name: "VLogin",
    setup () {
        const form = ref<LoginParams>({
            username: "",
            password: ""
        })

        return {
            form
        }
    }
})

</script>
