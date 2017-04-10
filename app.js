import React, { Component } from "react";
import { View, Text, StyleSheet, ListView, Platform } from "react-native";
import Header from './header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchResults: []
    }

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch() {
    fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${this.state.searchQuery}`, {
      method: 'GET'
    })
      .then((results) => console.log(results.json()))
      .then((resultsJson) => this.setState({searchResults: resultsJson}))
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onChange={(value) => this.setState({searchQuery: value})}
          submitSearch={this.submitSearch}/>
        <View style={styles.content}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ... Platform.select({
      ios: {
        paddingTop: 10
      }
    })
  },
  content: {
    flex: 1
  }
})

export default App;
