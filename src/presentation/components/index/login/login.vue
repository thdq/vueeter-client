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
                <vs-row v-if="apiResult.error">
                    <vs-alert class="alert-error" data-test="alert-error" color="danger">
                        <template #icon>
                            <i class="bx bx-error-circle" />
                        </template>
                        <template class="py-0" #title>
                            {{ $t('welcome.login.form.error.unauthorized.title') }}
                        </template>
                        {{ apiResult.message }}
                    </vs-alert>
                </vs-row>
                <vs-row class="py-2">
                    <vs-button
                        data-test="login-button"
                        :loading="waitingAPIResponse"
                        block
                        border
                        flat
                        @click="handle(form, waitingAPIResponse, apiResult)"
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
import { defineComponent, ref } from '@vue/composition-api'
import { AuthenticationParams } from "@/domain/usecases/authentication"
import { makeCreateAuthentication } from "@/main/factories/components"
import { LoginAPIResult } from './login.protocols'

export default defineComponent({
    name: "VLogin",
    setup () {
        const waitingAPIResponse = ref<boolean>(false)
        const apiResult = ref<LoginAPIResult>({
            error: false,
            message: ""
        })

        const form = ref<AuthenticationParams>({
            username: "",
            password: ""
        })

        const handle = async (form: AuthenticationParams, waitingAPIResponse: boolean, apiResult: LoginAPIResult): Promise<void> => {

            try {

                waitingAPIResponse = true

                const remoteAuthenticationService = makeCreateAuthentication()

                await remoteAuthenticationService.auth(form)

            } catch (error) {

                apiResult.error = true
                apiResult.message = error.message

            } finally {

                waitingAPIResponse = false

            }

        }

        return {
            waitingAPIResponse,
            apiResult,
            form,
            handle
        }
    }
})

</script>
