import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import faker from 'faker'
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

        expect(handleSpy).toHaveBeenCalledWith(formParams)

    })

})
