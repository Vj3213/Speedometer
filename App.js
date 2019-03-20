import React, { useState } from "react";
import { View, TextInput, Button, Animated, Easing } from "react-native";
import Speedometer from "./Speedometer";

export default function App() {
  const AnimatedSpeedometer = Animated.createAnimatedComponent(Speedometer);
  let animation = new Animated.Value(0);
  const [percentage, setPercentage] = useState("");
  const createAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.easeOut
    }).start();
  };

  const animationInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, percentage]
  });

  const colorInterpolate = animation.interpolate(
    percentage < 35
      ? {
          inputRange: [0, 1],
          outputRange: ["#FF5333", "#FF5333"]
        }
      : percentage < 60
      ? {
          inputRange: [0, 35 / percentage, 1],
          outputRange: ["#FF5333", "#FF5333", "#D7722C"]
        }
      : percentage < 75
      ? {
          inputRange: [0, 35 / percentage, 60 / percentage, 1],
          outputRange: ["#FF5333", "#FF5333", "#D7722C", "#DAA520"]
        }
      : {
          inputRange: [0, 35 / percentage, 60 / percentage, 75 / percentage, 1],
          outputRange: ["#FF5333", "#FF5333", "#D7722C", "#DAA520", "#00EEAE"]
        }
  );
  return (
    <View style={{ flex: 1 }}>
      <AnimatedSpeedometer
        size={150}
        curveWidth={30}
        maxValue={20}
        visibleValue={animationInterpolate}
        visibleColor={colorInterpolate}
        lengthOfStrokes={10}
        totalNumberOfStrokes={21}
        strokeWidth={2}
        numberColor="#A9B3C2"
      />
      <TextInput
        value={percentage.toString()}
        onChangeText={value => setPercentage(value)}
        style={{
          marginTop: 50,
          marginBottom: 50,
          alignSelf: "center",
          borderWidth: 1,
          width: "80%"
        }}
      />
      <Button title="Start Animation" onPress={createAnimation} />
    </View>
  );
}
