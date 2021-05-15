<template>
    <div>
        <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="handle(form, apiResponse, invalid)">
                <vs-row align="center" justify="space-around" direction="column">
                    <vs-col w="12">
                        <vs-row class="py-4">
                            <ValidationProvider v-slot="{ errors }" class="w-full" name="name" rules="required">
                                <vs-input v-model="form.name" :label-placeholder="$t('welcome.signup.form.label.name')" block data-test="name-input" :danger="errors.length > 0">
                                    <template v-if="errors.length > 0" #message-danger>
                                        {{ errors[0] }}
                                    </template>
                                </vs-input>
                            </ValidationProvider>
                        </vs-row>
                        <vs-row class="py-4">
                            <ValidationProvider v-slot="{ errors }" class="w-full" name="email" rules="required|email">
                                <vs-input v-model="form.email" :label-placeholder="$t('welcome.signup.form.label.email')" block data-test="email-input" :danger="errors.length > 0">
                                    <template v-if="errors.length > 0" #message-danger>
                                        {{ errors[0] }}
                                    </template>
                                </vs-input>
                            </ValidationProvider>
                        </vs-row>
                        <vs-row class="py-4">
                            <ValidationProvider v-slot="{ errors }" class="w-full" name="birth_date" rules="required">
                                <vs-input
                                    v-model="form.birth_date"
                                    type="date"
                                    :label-placeholder="$t('welcome.signup.form.label.birth_date')"
                                    block
                                    data-test="birthDate-input"
                                    :danger="errors.length > 0"
                                >
                                    <template v-if="errors.length > 0" #message-danger>
                                        {{ errors[0] }}
                                    </template>
                                </vs-input>
                            </ValidationProvider>
                        </vs-row>
                        <vs-row class="py-4">
                            <ValidationProvider v-slot="{ errors }" class="w-full" name="password" rules="required|confirmed:confirmation">
                                <vs-input
                                    v-model="form.password"
                                    type="password"
                                    :label-placeholder="$t('welcome.signup.form.label.password')"
                                    block
                                    data-test="password-input"
                                    :danger="errors.length > 0"
                                >
                                    <template v-if="errors.length > 0" #message-danger>
                                        {{ errors[0] }}
                                    </template>
                                </vs-input>
                            </ValidationProvider>
                        </vs-row>
                        <vs-row class="py-4">
                            <ValidationProvider v-slot="{ errors }" class="w-full" name="passwordConfirm" vid="confirmation" rules="required">
                                <vs-input
                                    v-model="form.passwordConfirm"
                                    type="password"
                                    :label-placeholder="$t('welcome.signup.form.label.passwordConfirm')"
                                    block
                                    data-test="passwordConfirm-input"
                                    :danger="errors.length > 0"
                                >
                                    <template v-if="errors.length > 0" #message-danger>
                                        {{ errors[0] }}
                                    </template>
                                </vs-input>
                            </ValidationProvider>
                        </vs-row>
                        <vs-row class="py-4">
                            <ValidationProvider v-slot="{ errors }" class="w-full" name="username" rules="required">
                                <vs-input v-model="form.username" :label-placeholder="$t('welcome.signup.form.label.username')" block data-test="username-input" :danger="errors.length > 0">
                                    <template v-if="errors.length > 0" #message-danger>
                                        {{ errors[0] }}
                                    </template>
                                </vs-input>
                            </ValidationProvider>
                        </vs-row>
                        <vs-row v-if="apiResponse.error">
                            <vs-alert class="alert-error" data-test="alert-error" color="danger">
                                <template #icon>
                                    <i class="bx bx-error-circle" />
                                </template>
                                <template class="py-0" #title>
                                    {{ $t('welcome.signup.form.error.title') }}
                                </template>
                                {{ $t(apiResponse.messageError) }}
                            </vs-alert>
                        </vs-row>
                        <vs-row class="py-2">
                            <vs-button
                                :disabled="invalid"
                                data-test="signup-button"
                                :loading="apiResponse.waiting"
                                block
                                border
                                flat
                                type="submit"
                            >
                                {{ $t('welcome.signup.form.buttons.create_account') }}
                            </vs-button>
                        </vs-row>
                    </vs-col>
                </vs-row>
            </form>
        </ValidationObserver>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, useStore, useRouter } from '@nuxtjs/composition-api'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import { SignUpParams } from "@/domain/usecases/signup"
import { SignUpService } from '@/presentation/services/user/signup'
import { SignupAPIResponse } from "./signup.protocols"

export default defineComponent({
    components: {
        ValidationProvider,
        ValidationObserver
    },
    name: 'VSignup',
    setup () {
        const store = useStore()
        const router = useRouter()

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

        const handle = async (form: SignUpParams, apiResponse: SignupAPIResponse, invalid: boolean = true): Promise<void> => {

            try {

                if (invalid) return
                apiResponse.waiting = true

                const signUpService = new SignUpService(store)

                await signUpService.create(form)

                router.push('/home')

            } catch (error) {

                apiResponse.error = true
                apiResponse.messageError = error.message

            } finally {

                apiResponse.waiting = false

            }

        }

        return {
            form,
            apiResponse,
            handle
        }

    }
})
</script>
