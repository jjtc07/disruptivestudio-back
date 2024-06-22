import 'dotenv/config'

import { roleRepository } from '../src/modules/role/domain'
import { userRepository } from '../src/modules/user/domain'
import { RolesEnum } from '../src/modules/role/enums'
import { themeRepository } from '../src/modules/theme/domain'
import { faker } from '@faker-js/faker'
import { getRandomElement, getRandomIndex } from './utils'
import { postRepository } from '../src/modules/posts/domain'

function generatePost() {
  return {
    title: faker.lorem.sentence({ min: 4, max: 10 }),
    cover: faker.image.url(),
    description: faker.lorem.paragraph({ min: 50, max: 100 }),
    themes: [],
    createdBy: 1,
  }
}

export const postsSeeds = async () => {
  const numberOfPublications = 113
  const resultPosts = []

  const creatorRole = await roleRepository.findOne({
    key: RolesEnum.CREATOR,
  })

  const creators = await userRepository.find({ role: creatorRole?._id })

  const resultThemes = await themeRepository.find({})

  const postsData = Array.from({ length: numberOfPublications }, generatePost)

  for await (const postData of postsData) {
    try {
      let countThemes = getRandomIndex(resultThemes)
      const themes: any[] = []

      if (countThemes === 0) {
        countThemes = 1
      }

      for (let index = 0; index < countThemes; index++) {
        const idNewElement = String(getRandomElement(resultThemes)?._id)

        const isDuplicate = themes.some((item) => item === idNewElement)

        if (isDuplicate) {
          continue
        }

        themes.push(idNewElement)
      }

      const newPostData: any = {
        ...postData,
        themes,
        createdBy: getRandomElement(creators)._id,
      }

      const post = await postRepository.create(newPostData)

      resultPosts.push(post)
    } catch (err) {
      console.log(err)
    }
  }

  return resultPosts
}
