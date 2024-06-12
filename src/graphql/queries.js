/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSaturnTestData = /* GraphQL */ `
  query GetSaturnTestData($id: ID!) {
    getSaturnTestData(id: $id) {
      id
      totalPoints
      totalTime
      executiveMiniTrailsB
      executiveStroop
      math
      meanPredictiveZScores
      memoryFiveWords
      memoryIncidental
      motorSpeed
      orientation
      readingSpeed
      simpleAttention
      visuospatialImageCombos
      visuospatialMiniTrailsA
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSaturnTestData = /* GraphQL */ `
  query ListSaturnTestData(
    $filter: ModelSaturnTestDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSaturnTestData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalPoints
        totalTime
        executiveMiniTrailsB
        executiveStroop
        math
        meanPredictiveZScores
        memoryFiveWords
        memoryIncidental
        motorSpeed
        orientation
        readingSpeed
        simpleAttention
        visuospatialImageCombos
        visuospatialMiniTrailsA
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
