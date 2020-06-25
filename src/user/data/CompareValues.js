const NumArr = [
  {
    name: "Score",
    key: "score",
  },
  {
    name: "Crystals",
    key: "cry"
  },
  {
    name: "Kills",
    key: "kills",
  },
  {
    name: "Deaths",
    key: "deaths",
  },
]

const RatioArr = [
  {
    name: "C/E",
    dividend: "cry",
    divider: "score",
  },
  {
    name: "K/D",
    dividend: "kills",
    divider: "deaths",
  },
]

const CompareValues = {
  NumArr,
  RatioArr
}

export default CompareValues
