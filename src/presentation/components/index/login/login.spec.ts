import Vue from 'vue'
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import faker from 'faker'
import { MissingParamsError } from '@/presentation/errors'
import login from './login.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

jest.spyOn(console, 'error').mockImplementation(() => {})

interface WrapperTypes {
    wrapper: Wrapper<any>
}

const makeSut = (): WrapperTypes => {

    const wrapper = shallowMount(login, {
        mocks: {
            $t: () => {}
        },
        localVue
    })

    return {
        wrapper
    }

}

describe('Login component', () => {

    const nextTick = async (wrapper: Wrapper<any>): Promise<void> => {
        await Vue.nextTick()
        await wrapper.vm.$nextTick()
    }

    test('Should render the div element in the first tag of the template', () => {

        const { wrapper } = makeSut()

        expect(wrapper.is('div')).toBe(true)

    })

    test('Should render form with login params', () => {

        const { wrapper } = makeSut()

        const usernameInput = wrapper.find('[data-test=username-input]')

        const passwordInput = wrapper.find('[data-test=password-input]')

        expect(usernameInput.exists()).toBe(true)
        expect(passwordInput.exists()).toBe(true)

    })

    test('Should render login button', () => {

        const { wrapper } = makeSut()

        const loginButton = wrapper.find('[data-test=login-button]')

        expect(loginButton.exists()).toBe(true)

    })

    test('Should call handle with correct values', () => {

        const { wrapper } = makeSut()

        const handleSpy = jest.spyOn(wrapper.vm, 'handle')

        const formParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        wrapper.setData({
            form: formParams
        })

        const loginButton = wrapper.find('[data-test=login-button]')

        loginButton.trigger('click')

        expect(handleSpy).toHaveBeenCalledWith(formParams, false, { error: false, message: "" })

    })

    test('Should show error alert if username is not provided', async () => {

        const { wrapper } = makeSut()

        const formParams = {
            username: "",
            password: faker.internet.password()
        }

        wrapper.setData({
            form: formParams
        })

        const loginButton = wrapper.find('[data-test=login-button]')

        loginButton.trigger('click')

        await nextTick(wrapper)

        const { apiResult } = wrapper.vm
        const alertError = wrapper.find('[data-test=alert-error]')

        expect(apiResult.error).toBe(true)
        expect(apiResult.message).toBe(new MissingParamsError("username").message)
        expect(alertError.isVisible()).toBe(true)

    })

    test('Should show error alert if password is not provided', async () => {

        const { wrapper } = makeSut()

        const formParams = {
            username: faker.internet.userName(),
            password: ""
        }

        wrapper.setData({
            form: formParams
        })

        const loginButton = wrapper.find('[data-test=login-button]')

        loginButton.trigger('click')

        await nextTick(wrapper)

        const { apiResult } = wrapper.vm
        const alertError = wrapper.find('[data-test=alert-error]')

        expect(apiResult.error).toBe(true)
        expect(apiResult.message).toBe(new MissingParamsError("password").message)
        expect(alertError.isVisible()).toBe(true)

    })

})
