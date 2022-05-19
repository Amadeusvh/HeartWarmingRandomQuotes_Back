
export type ValidationRule<T> = {
  readonly condition: (v: T) => boolean; 
  readonly message: string;
}
