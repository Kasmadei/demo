import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Easing, TouchableNativeFeedback, Alert, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import SlidingUpPanel from "rn-sliding-up-panel";

interface IProps {}

interface IState {
  progressFill: number;
  animationStarted: boolean;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      progressFill: 0,
      animationStarted: false,
    };
  }

  _panel: any;
  circularProgress: any;
  progress: any;

  render() {
    const onAnimComplete = () => {
      console.log(this.state.progressFill);
      if (this.state.progressFill === 100) {
        Alert.alert("done");
      }
    };

    const onAnimStart = () => {
      this.circularProgress.animate(100, 3000, Easing.quad);
    };

    const onAnimStop = () => {
      this.circularProgress.animate().stop();
    };

    const onAnimReset = () => {
      this.circularProgress.reAnimate(0, 0, Easing.quad);
    };

    return (
      <View style={styles.container}>
        <View style={{ width: "100%", backgroundColor: "white", display: "flex", alignItems: "center", marginTop: 60}}>
          <AnimatedCircularProgress
            ref={(ref) => (this.circularProgress = ref)}
            size={180}
            width={15}
            rotation={0}
            fill={0}
            children={(value: number) => <Text>{Math.round(value)}</Text>}
            // tintColor="#FFD15A"
            tintColor="#d2f8d2"
            // works, but has unexpected behavior
            // onAnimationComplete={onAnimComplete}
            backgroundColor="#E5E5E5"
          />
        </View>

        <View style={{ width: "100%", height: 60, marginTop: 20, display: "flex", flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={onAnimStop}>
            <View style={{ ...styles.button, backgroundColor: "pink" }}>
              <Text>Stop</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onAnimStart}>
            <View style={{ ...styles.button, backgroundColor: "#d2f8d2" }}>
              <Text>Start</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableNativeFeedback onPress={onAnimReset}>
            <View style={{ ...styles.button, backgroundColor: "#FFFFE0" }}>
              <Text>Reset</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* Open slideup component */}
        <View style={{ width: "100%", height: 140, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
          <TouchableWithoutFeedback onPress={() => { console.log("open"); this._panel.show(); }}>
            <View style={{ height: 40, paddingLeft: 12, paddingRight: 12, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
              <Text style={{ color: "white" }}>Open</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <SlidingUpPanel ref={c => (this._panel = c)}>
          {dragHandler => (
            <View style={styles.slidingUpPanel}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>drag handler</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ height: 100, flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <TouchableWithoutFeedback onPress={() => { console.log("close"); this._panel.hide(); }}>
                    <View style={{ height: 40, paddingLeft: 12, paddingRight: 12, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
                      <Text style={{ color: "white" }}>Close</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
                <Text style={{ paddingTop: 80, paddingBottom: 80 }}>Scrollable component</Text>
              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 0,
  },
  slidingUpPanel: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 120
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  },
  button: {
    width: "33%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
