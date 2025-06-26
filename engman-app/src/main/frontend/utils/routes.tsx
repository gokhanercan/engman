export const Routes = {
  developerDetailLink: (id: string, edit: boolean = false) => `/developer/${id}${edit ? '/1' : ''}`,

  // Other static routes
  developers: () => 'developers',
  projects: () => 'projects',
  skills: () => 'skills',
}
