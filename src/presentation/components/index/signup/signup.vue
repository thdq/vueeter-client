<template>
    <div>
        <vs-row align="center" justify="space-around" direction="column">
            <vs-col w="12">
                <vs-row class="py-4">
                    <vs-input v-model="form.name" :label-placeholder="$t('welcome.signup.form.label.username')" block data-test="name-input" />
                </vs-row>
                <vs-row class="py-4">
                    <vs-input v-model="form.email" :label-placeholder="$t('welcome.signup.form.label.email')" block data-test="email-input" />
                </vs-row>
                <vs-row class="py-4">
                    <vs-input v-model="form.birth_date" type="date" :label-placeholder="$t('welcome.signup.form.label.birthDate')" block data-test="birthDate-input" />
                </vs-row>
                <vs-row class="py-4">
                    <vs-input v-model="form.password" type="password" :label-placeholder="$t('welcome.signup.form.label.password')" block data-test="password-input" />
                </vs-row>
                <vs-row class="py-4">
                    <vs-input v-model="form.passwordConfirm" type="password" :label-placeholder="$t('welcome.signup.form.label.passwordConfirm')" block data-test="passwordConfirm-input" />
                </vs-row>
                <vs-row class="py-4">
                    <vs-input v-model="form.username" :label-placeholder="$t('welcome.signup.form.label.username')" block data-test="username-input" />
                </vs-row>
            </vs-col>
        </vs-row>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { SignUpParams } from "@/domain/usecases/signup"

export default defineComponent({
    name: 'VSignup',
    setup () {

        const form = reactive<SignUpParams>({
            name: "",
            email: "",
            birth_date: null,
            password: "",
            passwordConfirm: "",
            username: ""
        })

        return {
            form
        }

    }
})
</script>
