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

    test('Should return modal.signup as true when clicks in SignUp button', () => {

        const { wrapper } = makeSut()

        const buttonSignUp = wrapper.find('[data-test=button-signup]')

        buttonSignUp.trigger('click')

        const modal = wrapper.vm.modal

        expect(modal.signup).toBe(true)

    })

})
