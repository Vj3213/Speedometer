import color from "color";

export const getStyles = (size, percent = 0.5) => ({
  outerCircle: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: size,
    height: size / 2,
    borderTopLeftRadius: size / 2,
    borderTopRightRadius: size / 2,
    overflow: "hidden"
  },
  innerCircle: {
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    width: size * percent,
    height: (size / 2) * percent,
    borderTopLeftRadius: size / 2,
    borderTopRightRadius: size / 2,
    paddingLeft: 3,
    paddingRight: 3
  },
  halfCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: size / 2,
    height: size,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: size / 2
  },
  labelsView: {
    flexDirection: "row"
  },
  initialLabel: {
    flex: 1
  },
  finalLabel: {
    flex: 0
  },
  indicator: {
    height: 4,
    zIndex: 1000,
    justifyContent: "center"
  },
  pointIndicator: {
    borderRadius: 50,
    width: 15,
    height: 15,
    alignSelf: "flex-end"
  }
});

export const getColorPointIndicator = cor => {
  return color(cor)
    .darken(0.2)
    .hex();
};
