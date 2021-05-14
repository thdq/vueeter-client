import { SignUpParams } from '@/domain/usecases/signup'
import { mount, Wrapper } from '@vue/test-utils'
import faker from 'faker'
import signup from './signup.vue'

jest.spyOn(console, 'error').mockImplementation(() => {})

interface WrapperTypes {
    wrapper: Wrapper<any>
}

const makeSut = (): WrapperTypes => {

    const wrapper = mount(signup, {
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

    test('Should render create button', () => {

        const { wrapper } = makeSut()

        const createButton = wrapper.find('[data-test=signup-button]')

        expect(createButton.exists()).toBe(true)

    })

    test('Should call handle with correct values', async () => {

        const { wrapper } = makeSut()

        const handleSpy = jest.spyOn(wrapper.vm, 'handle')

        const password = faker.internet.password()

        const formParams: SignUpParams = {
            birth_date: faker.datatype.datetime().toISOString(),
            email: faker.internet.email(),
            name: faker.random.words(),
            password,
            passwordConfirm: password,
            username: faker.internet.userName()
        }

        const apiResponseParams = wrapper.vm.apiResponse

        wrapper.setData({
            form: formParams
        })

        const createButton = wrapper.find('[data-test=signup-button]')

        await createButton.trigger('submit.prevent')

        expect(handleSpy).toHaveBeenCalledWith(formParams, apiResponseParams, false)

    })

    test('Should not call handle when form is imcomplete', async () => {

        const { wrapper } = makeSut()

        const handleSpy = jest.spyOn(wrapper.vm, 'handle')

        const password = faker.internet.password()

        const formParams: SignUpParams = {
            birth_date: faker.datatype.datetime().toISOString(),
            email: faker.internet.email(),
            name: faker.random.words(),
            password,
            passwordConfirm: password,
            username: ""
        }

        wrapper.setData({
            form: formParams
        })

        const createButton = wrapper.find('[data-test=signup-button]')

        await createButton.trigger('click')

        expect(handleSpy).not.toHaveBeenCalled()

    })

})
