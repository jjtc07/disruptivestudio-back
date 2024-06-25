import { TypeContentEnum } from '../../category/enums'

export const getInfoPostPipeline = [
  {
    $unwind: '$content',
  },
  {
    $group: {
      _id: '$content.typeContent',
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      typeContent: '$_id',
      count: 1,
    },
  },
  {
    $match: {
      typeContent: {
        $in: [
          TypeContentEnum.IMAGE,
          TypeContentEnum.VIDEO,
          TypeContentEnum.TEXT,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      image: {
        $sum: {
          $cond: [
            { $eq: ['$typeContent', TypeContentEnum.IMAGE] },
            '$count',
            0,
          ],
        },
      },
      video: {
        $sum: {
          $cond: [
            { $eq: ['$typeContent', TypeContentEnum.VIDEO] },
            '$count',
            0,
          ],
        },
      },
      text: {
        $sum: {
          $cond: [{ $eq: ['$typeContent', TypeContentEnum.TEXT] }, '$count', 0],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]
