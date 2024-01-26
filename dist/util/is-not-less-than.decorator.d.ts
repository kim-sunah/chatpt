import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function IsNotLessThan(property: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class IsNotLessThanConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
}
