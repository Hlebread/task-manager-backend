import { registerDecorator, ValidationOptions, isHexColor, isRgbColor } from 'class-validator';

export function IsColor(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isColor',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isHexColor(value) || isRgbColor(value);
        },
      },
    });
  };
}
