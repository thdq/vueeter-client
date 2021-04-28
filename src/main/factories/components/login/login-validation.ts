import { Validation } from "@/presentation/protocols/validation"
import { RequiredFieldValidation } from "@/presentation/protocols/validation/validators/required-field-validation"
import { ValidationComposite } from "@/presentation/protocols/validation/validators/validation-composite"

export const makeLoginValidation = (): ValidationComposite => {

    const validations: Validation[] = []

    for (const field of ['username', 'password']) {
        validations.push(new RequiredFieldValidation(field))
    }

    return new ValidationComposite(validations)

}
