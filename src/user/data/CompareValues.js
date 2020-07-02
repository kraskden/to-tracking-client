let CompareValues = {}

CompareValues.SCGroup = [
  {
    name: "Score",
    key: "score",
  },
  {
    name: "Crystals",
    key: "cry"
  },
]

CompareValues.KDGroup = [
  {
    name: "Kills",
    key: "kills",
  },
  {
    name: "Deaths",
    key: "deaths",
  }, 
]

CompareValues.RatioGroup = [
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

export default CompareValues
