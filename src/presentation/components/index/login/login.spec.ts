import Vue from 'vue'
import { shallowMount, Wrapper } from '@vue/test-utils'
import faker from 'faker'
import login from './login.vue'
import { LoginAPIResponse, MissingParamsError } from './login.protocols'

jest.spyOn(console, 'error').mockImplementation(() => {})

const nextTick = async (wrapper: Wrapper<any>): Promise<void> => {
    await Vue.nextTick()
    await wrapper.vm.$nextTick()
}

interface WrapperTypes {
    wrapper: Wrapper<any>
}

const makeSut = (): WrapperTypes => {

    const wrapper = shallowMount(login, {
        mocks: {
            $t: () => {}
        }
    })

    return {
        wrapper
    }

}

describe('Login component', () => {

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

        const handleParams = {
            formParams,
            apiResponseParams: wrapper.vm.apiResponse
        }

        expect(handleSpy).toHaveBeenCalledWith(handleParams.formParams, handleParams.apiResponseParams)

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

        const apiResponse = wrapper.vm.apiResponse as LoginAPIResponse
        const alertError = wrapper.find('[data-test=alert-error]')

        expect(apiResponse.error).toBe(true)
        expect(apiResponse.messageError).toBe(new MissingParamsError("username").message)
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

        const apiResponse = wrapper.vm.apiResponse as LoginAPIResponse
        const alertError = wrapper.find('[data-test=alert-error]')

        expect(apiResponse.error).toBe(true)
        expect(apiResponse.messageError).toBe(new MissingParamsError("password").message)

        expect(alertError.isVisible()).toBe(true)

    })

})
