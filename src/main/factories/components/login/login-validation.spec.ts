import { RequiredFieldValidation } from '@/presentation/protocols/validation/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/protocols/validation/validators/validation-composite'
import { Validation } from '@/presentation/protocols/validation'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../../presentation/protocols/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {

    test('Should call ValidationComposite with all validatations', () => {

        makeLoginValidation()

        const validations: Validation[] = []

        for (const field of ['username', 'password']) {

            validations.push(new RequiredFieldValidation(field))

        }

        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
