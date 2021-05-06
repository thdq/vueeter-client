import { shallowMount, Wrapper } from '@vue/test-utils'
import signup from './signup.vue'

jest.spyOn(console, 'error').mockImplementation(() => {})

interface WrapperTypes {
    wrapper: Wrapper<any>
}

const makeSut = (): WrapperTypes => {

    const wrapper = shallowMount(signup, {
        mocks: {
            $t: () => {}
        }
    })

    return {
        wrapper
    }

}

describe('SignUp component', () => {

    test('Should render the div element in the first tag of the template', () => {

        const { wrapper } = makeSut()

        expect(wrapper.is('div')).toBe(true)

    })

    test('Should render form with signup params', () => {

        const { wrapper } = makeSut()

        const nameInput = wrapper.find('[data-test=name-input]')
        const emailInput = wrapper.find('[data-test=email-input]')
        const passwordInput = wrapper.find('[data-test=password-input]')
        const passwordConfirmInput = wrapper.find('[data-test=passwordConfirm-input]')
        const birthDateInput = wrapper.find('[data-test=birthDate-input]')
        const usernameInput = wrapper.find('[data-test=username-input]')

        expect(nameInput.exists()).toBe(true)
        expect(emailInput.exists()).toBe(true)
        expect(passwordInput.exists()).toBe(true)
        expect(passwordConfirmInput.exists()).toBe(true)
        expect(birthDateInput.exists()).toBe(true)
        expect(usernameInput.exists()).toBe(true)

    })

})
