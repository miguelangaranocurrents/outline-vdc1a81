import type Model from "../base/Model";

// Keyed by the class itself rather than its name: class names are mangled by
// the production bundler, so two different models can share a name and end up
// with each other's fields (e.g. a Template picking up Document.preferences).
const fields = new Map<object, (string | number | symbol)[]>();

/**
 * Returns the keys recorded as serializable fields on a model.
 *
 * @param target the model to inspect.
 * @returns the keys decorated with @Field.
 */
export const getFieldsForModel = <T extends Model>(target: T) =>
  getFieldsForModelClass(target.constructor);

/**
 * Returns the keys recorded as serializable fields on a model class.
 *
 * @param model the model class to inspect.
 * @returns the keys decorated with @Field.
 */
export function getFieldsForModelClass(model: object) {
  return fields.get(model) ?? [];
}

/**
 * A decorator that records this key as a serializable field on the model.
 * Properties decorated with @Field will be included in API requests by default.
 *
 * @param target the model the property is defined on.
 * @param propertyKey the key to record as a field.
 */
const Field = (target: Model, propertyKey: string | symbol) => {
  const modelClass = target.constructor;
  fields.set(modelClass, [...(fields.get(modelClass) ?? []), propertyKey]);
};

export default Field;
