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
                <vs-row v-if="apiResponse.error">
                    <vs-alert class="alert-error" data-test="alert-error" color="danger">
                        <template #icon>
                            <i class="bx bx-error-circle" />
                        </template>
                        <template class="py-0" #title>
                            {{ $t('welcome.login.form.error.title') }}
                        </template>
                        {{ $t(apiResponse.messageError) }}
                    </vs-alert>
                </vs-row>
                <vs-row class="py-2">
                    <vs-button
                        data-test="login-button"
                        :loading="apiResponse.waiting"
                        block
                        border
                        flat
                        @click="handle(form, apiResponse)"
                    >
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
import { defineComponent, ref, useStore, useRouter } from '@nuxtjs/composition-api'
import { LoginAPIResponse, AuthenticationParams, LoginService } from './login.protocols'

export default defineComponent({
    name: "VLogin",
    setup ({ context }) {
        const store = useStore()
        const router = useRouter()

        const apiResponse = ref<LoginAPIResponse>({
            waiting: false,
            error: false,
            messageError: ""
        })

        const form = ref<AuthenticationParams>({
            username: "",
            password: ""
        })

        const handle = async (form: AuthenticationParams, apiResponse: LoginAPIResponse): Promise<void> => {

            try {

                apiResponse.waiting = true

                const loginService = new LoginService(store)

                await loginService.auth(form)

                router.push('/home')

            } catch (error) {

                apiResponse.error = true
                apiResponse.messageError = error.message

            } finally {

                apiResponse.waiting = false

            }

        }

        return {
            apiResponse,
            form,
            handle
        }
    }
})

</script>
