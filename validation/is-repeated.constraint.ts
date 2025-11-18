import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsRepeated(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRepeated',
      target: object.constructor,
      propertyName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as Record<string, unknown>)[
            property
          ];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} needs to be identical to ${property}`;
        },
      },
    });
  };
}
