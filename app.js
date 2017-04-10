import React, { Component } from "react";
import { View, Text, StyleSheet, ListView, Platform } from "react-native";
import Header from './header';
import ImageResult from './image_result';

class App extends Component {
  constructor(props) {
    super(props);

    // const ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged})

    this.state = {
      searchQuery: '',
      searchResults: [],
      // ds: ds.cloneWithRows([])
    }

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch() {
    fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${this.state.searchQuery}`)
      .then((res) => {
        res.json().then((resJson) => {
          this.setState({searchResults: resJson})
        })
      })
      .then(() => console.log(this.state))
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
