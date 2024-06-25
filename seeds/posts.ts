import 'dotenv/config'

import { roleRepository } from '../src/modules/role/domain'
import { userRepository } from '../src/modules/user/domain'
import { RolesEnum } from '../src/modules/role/enums'
import { themeRepository } from '../src/modules/theme/domain'
import { faker } from '@faker-js/faker'
import { getRandomElement, getRandomIndex } from './utils'
import { postRepository } from '../src/modules/posts/domain'
import { TypeContentEnum } from '../src/modules/category/enums'

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

  const resultThemes = await themeRepository.find({}, undefined, ['category'])

  const postsData = Array.from({ length: numberOfPublications }, generatePost)

  for await (const postData of postsData) {
    try {
      let countThemes = getRandomIndex(resultThemes)
      const themes: any[] = []
      const content = []
      let textFlag = false
      let imageFlag = false
      let videoFlag = false

      if (countThemes === 0) {
        countThemes = 1
      }

      for (let index = 0; index < countThemes; index++) {
        const newElement: any = getRandomElement(resultThemes)
        const { category } = newElement
        const idNewElement = String(newElement?._id)

        const isDuplicate = themes.some((item) => item === idNewElement)

        if (isDuplicate) {
          continue
        }

        if (category.typeContent === TypeContentEnum.TEXT && !textFlag) {
          content.push({
            value: 'https://www.gutenberg.org/cache/epub/16780/pg16780.txt',
            typeContent: TypeContentEnum.TEXT,
          })

          textFlag = true
        }

        if (category.typeContent === TypeContentEnum.IMAGE && !imageFlag) {
          content.push({
            value: 'https://loremflickr.com/640/480?lock=4212393353674752',
            typeContent: TypeContentEnum.IMAGE,
          })

          imageFlag = true
        }

        if (category.typeContent === TypeContentEnum.VIDEO && !videoFlag) {
          content.push({
            value: 'https://www.youtube.com/watch?v=bQL2FsHe7G4',
            typeContent: TypeContentEnum.VIDEO,
          })

          videoFlag = true
        }

        themes.push(idNewElement)
      }

      const newPostData: any = {
        ...postData,
        themes,
        content,
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
