import { shallowMount, Wrapper } from '@vue/test-utils'
import index from './login.vue'

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

describe('Login component', () => {

    test('Should render the div element in the first tag of the template', () => {

        const { wrapper } = makeSut()

        expect(wrapper.is('div')).toBe(true)

    })

})
