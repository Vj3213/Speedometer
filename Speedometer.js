import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import SVG, { Path, Text, Circle } from "react-native-svg";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default class Speedometer extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0
    };
  }

  static propTypes = {
    size: PropTypes.number,
    curveWidth: PropTypes.number,
    visibleColor: PropTypes.string,
    maxValue: PropTypes.number,
    visibleValue: PropTypes.number,
    lengthOfStrokes: PropTypes.number,
    totalNumberOfStrokes: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    numberColor: PropTypes.string,
    numberSize: PropTypes.number
  };

  static defaultProps = {
    size: 150,
    curveWidth: 50,
    visibleColor: "#E5E5E5",
    maxValue: 0,
    visibleValue: 0,
    lengthOfStrokes: 0,
    totalNumberOfStrokes: 0,
    strokeWidth: 2,
    strokeColor: "#E5E5E5",
    numberColor: "#000000",
    numberSize: 18
  };

  onLayout = event => {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    });
  };

  createStrokes = (
    center,
    radius,
    curveWidth,
    maxValue,
    numberOfStrokes,
    lengthOfStrokes,
    strokeWidth,
    invisibleStrokeLength,
    strokeColor,
    numberColor,
    numberSize
  ) => {
    let strokeList = [];
    const totalSection = numberOfStrokes !== 1 ? numberOfStrokes - 1 : 1; //sections are created when  curves gets divided into different parts by strokes
    totalStrokes = numberOfStrokes !== 1 ? numberOfStrokes : 2;
    const angleDiff = 180 / totalSection;
    // const constRatio = parseFloat(totalSection / 10);
    for (let index = 0; index < totalStrokes; index++) {
      // if (index > 7 * constRatio) {
      //   textHorizontalAlignment = "end";
      //   textVerticalAlignment = "middle";
      // } else if (index > 6 * constRatio && index <= 7 * constRatio) {
      //   textHorizontalAlignment = "end";
      //   textVerticalAlignment = "baseline";
      // } else if (index > 3 * constRatio) {
      //   textHorizontalAlignment = "middle";
      //   textVerticalAlignment = "after-edge";
      // } else if (index > 2 * constRatio && index <= 3 * constRatio) {
      //   textHorizontalAlignment = "start";
      //   textVerticalAlignment = "baseline";
      // } else {
      //   textHorizontalAlignment = "start";
      //   textVerticalAlignment = "middle";
      // }

      const x =
        (radius + curveWidth + lengthOfStrokes) *
        Math.cos((angleDiff * index * Math.PI) / 180);

      const y =
        -(radius + curveWidth + lengthOfStrokes) *
        Math.sin((angleDiff * index * Math.PI) / 180);

      strokeList.push(
        <React.Fragment key={index}>
          <Path
            d={"M" + center.x + "," + center.y + "l" + x + "," + y}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={
              "0," +
              invisibleStrokeLength.toString() +
              "," +
              lengthOfStrokes.toString() +
              ",0"
            }
          />
          <Text
            stroke={numberColor}
            fontSize={numberSize}
            textAnchor="middle"
            alignmentBaseline="middle"
            x={x + center.x}
            y={y + center.y}
          >
            {parseInt((totalSection - index) * (maxValue / totalSection))}
          </Text>
        </React.Fragment>
      );
    }
    return strokeList;
  };

  render() {
    const {
      size,
      curveWidth,
      maxValue,
      visibleValue,
      visibleColor,
      lengthOfStrokes,
      totalNumberOfStrokes,
      strokeWidth,
      strokeColor,
      numberColor,
      numberSize
    } = this.props;
    const { width, height } = this.state;
    const primaryCircleRadius = size / 2;
    const primaryCircleCenterX = width / 2;
    const primaryCircleCenterY = height / 2;
    const primaryCircleCircumference = 2 * Math.PI * primaryCircleRadius;
    const primaryCircleDashLength = primaryCircleCircumference / 2;
    const primaryCircleGapLength =
      2 * Math.PI * primaryCircleRadius - primaryCircleDashLength;
    const invisibleStrokeLength = primaryCircleRadius + curveWidth / 2;
    const strokeList = this.createStrokes(
      { x: primaryCircleCenterX, y: primaryCircleCenterY },
      primaryCircleRadius,
      curveWidth,
      maxValue,
      totalNumberOfStrokes,
      lengthOfStrokes,
      strokeWidth,
      invisibleStrokeLength,
      strokeColor,
      numberColor,
      numberSize
    );
    const newVisibleValue =
      visibleValue > maxValue ? 100 : (visibleValue / maxValue) * 100;
    const fillValue = (
      (primaryCircleCircumference * newVisibleValue) /
      200
    ).toString();
    console.log("Visible======", newVisibleValue, "|||||", visibleValue);
    return (
      <View
        onLayout={this.onLayout}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <SVG width="100%" height="100%">
          {/* <Path
            d="M110,300 a100,100 0 0 1 200,0"
            stroke="black"
            strokeWidth="3"
            fill="white"
          />  */}
          {strokeList.map(item => item)}
          <Circle
            r={primaryCircleRadius}
            cx={primaryCircleCenterX}
            cy={primaryCircleCenterY}
            stroke="#E5E5E5"
            strokeWidth={curveWidth}
            fill="none"
            strokeDasharray={
              primaryCircleDashLength + "," + primaryCircleGapLength
            }
            transform={{
              rotation: 180,
              originX: primaryCircleCenterX,
              originY: primaryCircleCenterY
            }}
          />
          <Circle
            r={primaryCircleRadius}
            cx={primaryCircleCenterX}
            cy={primaryCircleCenterY}
            stroke={visibleColor}
            strokeWidth={curveWidth}
            fill="none"
            transform={{
              rotation: 180,
              originX: primaryCircleCenterX,
              originY: primaryCircleCenterY
            }}
            strokeDasharray={fillValue + "," + primaryCircleCircumference}
          />
          {/* <Path
            d="M110,300 l-60,0 a160,160 0 0 1 320,0 l-60,0"
            stroke="black"
            strokeWidth="3"
            fill="yellow"
          /> */}
        </SVG>
      </View>
    );
  }
}
