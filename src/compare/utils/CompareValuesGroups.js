export default {
  SCGroup: [
    {
      name: "Score",
      key: "score",
    },
    {
      name: "Crystals",
      key: "cry"
    },
  ],

  KDGroup: [
    {
      name: "Kills",
      key: "kills",
    },
    {
      name: "Deaths",
      key: "deaths",
    }, 
  ],
  
  RatioGroup: [
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
}
