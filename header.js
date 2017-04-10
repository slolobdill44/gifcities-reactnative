import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    }

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch() {

  }

  render() {
    return (
      <View style={styles.header}>
        <TextInput
          placeholder='Search all gifs...'
          returnKeyType='done'
          style={styles.input}
          underlineColorAndroid={'transparent'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 18,
    fontFamily: "serif",
    borderWidth: 3,
    borderColor: 'black',
    flex: 1,
    height: 50
  }
})

export default Header;
