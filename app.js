import React, { Component } from "react";
import { View, Text, StyleSheet, ListView, Platform, Image } from "react-native";
import Header from './header';
import ImageResult from './image_result';

class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      searchQuery: '',
      dataSource: ds
    }

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch() {
    fetch(`https://gifcities.archive.org/api/v1/gifsearch?q=${this.state.searchQuery}`)
      .then((res) => {
        res.json().then((resJson) => {
          this.setState({dataSource: this.state.dataSource.cloneWithRows(resJson)})
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
          <ListView
            enableEmptySections
            contentContainerStyle={styles.listContainer}
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(data) => {
              return (
                  <Image
                    source={{uri: `https://web.archive.org/web/${data.gif}`}}
                    style={{
                      position: 'relative',
                      width: (data.width > 300) ? undefined : data.width,
                      height: data.height,
                      resizeMode: 'contain'
                    }}
                    resizeMode={'contain'} />
              )
            }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf: 'stretch',
    backgroundColor: "#F5F5F5",
    ... Platform.select({
      ios: {
        paddingTop: 10
      }
    })
  },
  content: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-around'
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  list: {
    flex: 1,
    // flexDirection: 'row',s
    flexWrap: 'wrap',
    // justifyContent: 'space-around'
    // alignItems: 'flex-end',
  },
  listContainer: {
    // flex: 1,
    height: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-around'
  },
  listElement: {
    flex: 1
  }
})

export default App;
