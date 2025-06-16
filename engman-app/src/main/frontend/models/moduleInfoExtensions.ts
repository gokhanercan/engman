import ModuleInfoM from 'Frontend/generated/com/engman/models/ModuleInfoM'

export function extractModuleName(fieldKey: string): string {
  return fieldKey.split('_')[0]
}
