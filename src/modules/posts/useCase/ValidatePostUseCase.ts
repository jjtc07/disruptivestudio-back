import { BaseException } from '../../../core/domain/contracts/BaseException'
import { ICategory } from '../../category/domain'
import { TypeContentEnum } from '../../category/enums'
import { StatusCode } from '../../common/enums'
import { ITheme } from '../../theme/domain'
import { ThemeRepository } from '../../theme/domain/theme-repository'

interface ValidatePublicationUseCaseParams {
  themes: string[]
  content?: string
  contentFiles?: Express.Multer.File[]
}

export class ValidatePostUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async exec({
    themes: themesId,
    contentFiles,
    content,
  }: ValidatePublicationUseCaseParams): Promise<any> {
    if (!themesId?.length) {
      throw new BaseException(
        StatusCode.BAD_REQUEST,
        'Themes fields is required'
      )
    }

    const themes: ITheme[] = await this.themeRepository.find(
      { _id: { $in: themesId } },
      undefined,
      ['category']
    )

    if (!Boolean(themes.length)) {
      throw new BaseException(
        StatusCode.BAD_REQUEST,
        'At least one valid theme is required'
      )
    }

    const categoriesSet = new Set<string>()

    for (const theme of themes) {
      const category = theme.category as ICategory

      categoriesSet.add(category?.typeContent?.toLocaleLowerCase())
    }

    const categories = Array.from(categoriesSet)

    return this.validateContentFiles(categories, contentFiles, content)
  }

  private validateContentFiles(
    categories: string[],
    contentFiles?: Express.Multer.File[],
    content?: string
  ): { value: string; typeContent: TypeContentEnum }[] {
    const result = []

    for (const category of categories) {
      if (category === TypeContentEnum.VIDEO) {
        if (typeof content !== 'string') {
          throw new BaseException(
            StatusCode.BAD_REQUEST,
            'The video url is required and must be a string'
          )
        }

        const isVideoUrl = this.isValidVideoUrl(content)

        if (!isVideoUrl) {
          throw new BaseException(
            StatusCode.BAD_REQUEST,
            'Video url is required or invalid'
          )
        }

        result.push({
          value: content,
          typeContent: TypeContentEnum.VIDEO,
        })
      }

      if (category === TypeContentEnum.TEXT) {
        if (!contentFiles?.length) {
          throw new BaseException(
            StatusCode.BAD_REQUEST,
            'Text file is required'
          )
        }

        const fileIndex = contentFiles.findIndex((file) =>
          this.isValidTextFile(file)
        )

        if (fileIndex === -1) {
          throw new BaseException(
            StatusCode.BAD_REQUEST,
            'Text file is required'
          )
        }

        result.push({
          value: contentFiles[fileIndex].filename,
          typeContent: TypeContentEnum.TEXT,
        })
      }

      if (category === TypeContentEnum.IMAGE) {
        if (!contentFiles?.length) {
          throw new BaseException(
            StatusCode.BAD_REQUEST,
            'Image file is required'
          )
        }

        const fileIndex = contentFiles.findIndex((file) =>
          this.isValidImageFile(file)
        )

        if (fileIndex === -1) {
          throw new BaseException(
            StatusCode.BAD_REQUEST,
            'Image file is required'
          )
        }

        result.push({
          value: contentFiles[fileIndex].filename,
          typeContent: TypeContentEnum.IMAGE,
        })
      }
    }

    return result
  }

  private isValidVideoUrl(content: string): boolean {
    const videoUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/

    return videoUrlRegex.test(content)
  }

  private isValidTextFile(file: Express.Multer.File): boolean {
    const fileExtension = this.getFileExtension(file.filename)

    return fileExtension === '.txt'
  }

  private isValidImageFile(file: Express.Multer.File): boolean {
    const fileExtension = this.getFileExtension(file.filename)

    return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)
  }

  private getFileExtension(fileName: string): string {
    const parts = fileName.split('.')

    return '.' + parts[parts.length - 1]
  }

  private isValidUrl(content: string): boolean {
    try {
      const url = new URL(content)

      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch (error) {
      return false
    }
  }
}
