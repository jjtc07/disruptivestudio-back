const { faker } = require('@faker-js/faker')

export const generateUniqueCategoryNames = (count: number): string[] => {
  const uniqueNames = new Set()

  while (uniqueNames.size < count) {
    const departmentName: string = faker.commerce.department()

    uniqueNames.add(departmentName)
  }

  return Array.from(uniqueNames) as string[]
}
