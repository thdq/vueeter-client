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
                <vs-row v-if="apiResponse.error">
                    <vs-alert class="alert-error" data-test="alert-error" color="danger">
                        <template #icon>
                            <i class="bx bx-error-circle" />
                        </template>
                        <template class="py-0" #title>
                            {{ $t('welcome.signup.form.error.title') }}
                        </template>
                        {{ apiResponse.messageError }}
                    </vs-alert>
                </vs-row>
                <vs-row class="py-2">
                    <vs-button
                        data-test="signup-button"
                        :loading="apiResponse.waiting"
                        block
                        border
                        flat
                    >
                        {{ $t('welcome.signup.form.buttons.create') }}
                    </vs-button>
                </vs-row>
            </vs-col>
        </vs-row>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { SignUpParams } from "@/domain/usecases/signup"
import { SignupAPIResponse } from "./signup.protocols"

export default defineComponent({
    name: 'VSignup',
    setup () {

        const apiResponse = reactive<SignupAPIResponse>({
            waiting: false,
            error: false,
            messageError: ""
        })

        const form = reactive<SignUpParams>({
            name: "",
            email: "",
            birth_date: null,
            password: "",
            passwordConfirm: "",
            username: ""
        })

        return {
            form,
            apiResponse
        }

    }
})
</script>
