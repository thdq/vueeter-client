import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
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

})
