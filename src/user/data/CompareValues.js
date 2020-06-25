const SCGroup = [
  {
    name: "Score",
    key: "score",
  },
  {
    name: "Crystals",
    key: "cry"
  },
]

const KDGroup = [
  {
    name: "Kills",
    key: "kills",
  },
  {
    name: "Deaths",
    key: "deaths",
  }, 
]

const RatioGroup = [
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
  SCGroup,
  KDGroup,
  RatioGroup
}

export default CompareValues
