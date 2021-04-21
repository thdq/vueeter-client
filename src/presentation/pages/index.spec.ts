import { shallowMount, Wrapper } from '@vue/test-utils'
import index from './index.vue'

jest.spyOn(console, 'error').mockImplementation(() => {})

interface WrapperTypes {
    wrapper: Wrapper<any>
}

const makeSut = (): WrapperTypes => {

    const wrapper = shallowMount(index, {
        mocks: {
            $t: () => {}
        }
    })

    return {
        wrapper
    }

}

describe('Index page', () => {

    test('Should render the div element in the first tag of the template', () => {

        const { wrapper } = makeSut()

        expect(wrapper.is('div')).toBe(true)

    })

    test('Should not show the SignUp modal initially', () => {

        const { wrapper } = makeSut()

        const modalSignUp = wrapper.find('[data-test=modal-signup]')

        expect(modalSignUp.isVisible()).toBe(false)

    })

    test('Should return modal.signup as true when clicks in SignUp button', () => {

        const { wrapper } = makeSut()

        const buttonSignUp = wrapper.find('[data-test=button-signup]')

        buttonSignUp.trigger('click')

        const modal = wrapper.vm.modal

        expect(modal.signup).toBe(true)

    })

    test('Should exists v-login component', () => {

        const { wrapper } = makeSut()

        const loginComponent = wrapper.findComponent({ name: 'v-login' })

        expect(loginComponent.exists()).toBe(true)

    })

    test('Should exists v-signup component inside SignUp modal', async () => {

        const { wrapper } = makeSut()

        await wrapper.setData({
            modal: {
                signup: true
            }
        })

        const modalSignUp = wrapper.find('[data-test=modal-signup]')
        const signupComponent = wrapper.findComponent({ name: 'v-signup' })

        expect(modalSignUp.isVisible()).toBe(true)
        expect(signupComponent.exists()).toBe(true)

    })

})
