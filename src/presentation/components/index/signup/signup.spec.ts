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

})
