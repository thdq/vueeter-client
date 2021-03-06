import { SignUpParams } from '@/domain/usecases/signup'
import { mount, Wrapper, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vue from 'vue'
import faker from 'faker'
import vuesax from 'vuesax'
import signup from './signup.vue'

jest.spyOn(console, 'error').mockImplementation(() => {})

const nextTick = async (wrapper: Wrapper<any>): Promise<void> => {
    await Vue.nextTick()
    await wrapper.vm.$nextTick()
    await flushPromises()
}

interface WrapperTypes {
    wrapper: Wrapper<any>
}

const makeSut = (): WrapperTypes => {

    const Vue = createLocalVue()
    Vue.use(vuesax)
    const localVue = Vue

    const wrapper = mount(signup, {
        mocks: {
            $t: () => {}
        },
        localVue
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

    test('Should show error when name input is not provided', async () => {

        const { wrapper } = makeSut()

        const nameInput = wrapper.find('input[data-test=name-input]')
        const nameDiv = wrapper.find('[data-test=name-input]')

        await nameInput.setValue('')

        await nextTick(wrapper)

        const nameInputError = nameDiv.find('.vs-input__message--danger')

        expect(nameInputError.isVisible()).toBe(true)

    })

    test('Should show error when name input contains more than 50 characters', async () => {

        const { wrapper } = makeSut()

        const nameInput = wrapper.find('input[data-test=name-input]')
        const nameDiv = wrapper.find('[data-test=name-input]')

        await nameInput.setValue(faker.random.words(50))

        await nextTick(wrapper)

        const nameInputError = nameDiv.find('.vs-input__message--danger')

        expect(nameInputError.isVisible()).toBe(true)

    })

    test('Should show error when email input is not provided', async () => {

        const { wrapper } = makeSut()

        const emailInput = wrapper.find('input[data-test=email-input]')
        const emailDiv = wrapper.find('[data-test=email-input]')

        await emailInput.setValue('')

        await nextTick(wrapper)

        const divInputError = emailDiv.find('.vs-input__message--danger')

        expect(divInputError.isVisible()).toBe(true)

    })

    test('Should show error when email input is not a valid email', async () => {

        const { wrapper } = makeSut()

        const emailInput = wrapper.find('input[data-test=email-input]')
        const emailDiv = wrapper.find('[data-test=email-input]')

        await emailInput.setValue(faker.random.word())

        await nextTick(wrapper)

        const divInputError = emailDiv.find('.vs-input__message--danger')

        expect(divInputError.isVisible()).toBe(true)

    })

    test('Should show error when birth date input is not provided', async () => {

        const { wrapper } = makeSut()

        const birthDateInput = wrapper.find('input[data-test=birthDate-input]')
        const birthDateDiv = wrapper.find('[data-test=birthDate-input]')

        await birthDateInput.setValue('')

        await nextTick(wrapper)

        const birthDateError = birthDateDiv.find('.vs-input__message--danger')

        expect(birthDateError.isVisible()).toBe(true)

    })

    test('Should show error when password input is not provided', async () => {

        const { wrapper } = makeSut()

        const passwordInput = wrapper.find('input[data-test=password-input]')
        const passwordDiv = wrapper.find('[data-test=password-input]')

        await passwordInput.setValue('')

        await nextTick(wrapper)

        const passwordInputError = passwordDiv.find('.vs-input__message--danger')

        expect(passwordInputError.isVisible()).toBe(true)

    })

    test('Should show error when password confirmation input is not provided', async () => {

        const { wrapper } = makeSut()

        const passwordInput = wrapper.find('input[data-test=passwordConfirm-input]')
        const passwordDiv = wrapper.find('[data-test=passwordConfirm-input]')

        await passwordInput.setValue('')

        await nextTick(wrapper)

        const passwordInputError = passwordDiv.find('.vs-input__message--danger')

        expect(passwordInputError.isVisible()).toBe(true)

    })

    test('Should show error when username input is not provided', async () => {

        const { wrapper } = makeSut()

        const usernameInput = wrapper.find('input[data-test=username-input]')
        const usernameDiv = wrapper.find('[data-test=username-input]')

        await usernameInput.setValue('')

        await nextTick(wrapper)

        const usernameInputError = usernameDiv.find('.vs-input__message--danger')

        expect(usernameInputError.isVisible()).toBe(true)

    })

    test('Should show error when password and password confirmation input is not equals', async () => {

        const { wrapper } = makeSut()

        const passwordInput = wrapper.find('input[data-test=password-input]')
        const passwordConfirmInput = wrapper.find('input[data-test=passwordConfirm-input]')

        const passwordDiv = wrapper.find('[data-test=password-input]')

        await passwordInput.setValue(faker.random.words(1))
        await passwordConfirmInput.setValue(faker.random.words(2))

        await nextTick(wrapper)

        const passwordInputError = passwordDiv.find('.vs-input__message--danger')

        expect(passwordInputError.isVisible()).toBe(true)

    })

})
