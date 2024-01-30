"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEqualTo = void 0;
const class_validator_1 = require("class-validator");
function IsEqualTo(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'isEqualTo',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value === relatedValue;
                },
                defaultMessage(args) {
                    const [relatedPropertyName] = args.constraints;
                    return `${propertyName} 가 ${relatedPropertyName}와 일치 않습니다`;
                },
            },
        });
    };
}
exports.IsEqualTo = IsEqualTo;
//# sourceMappingURL=match.decorator.js.map