import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import BookCount from './components/BookCount';
import { Ionicons } from '@expo/vector-icons'
import CustomActionButton from './components/CustomActionButton';
import colors from './assets/colors';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInputData: '',
      books: [],
    }
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true })
  }

  addNewBook = book => {
    // setstate는 2개의 parameter 가짐
    // setState는 비동기이기 때문에 prevState를 변경하는게 안전
    this.setState(
      (prev, props) => ({
        books: [
          ...prev.books,
          book
        ],
        totalCount: prev.totalCount + 1,
        readingCount: prev.readingCount + 1,
      }),
      // *** callBack method 
      //  > setState는 비동기이기 때문에 setState 후에 처리되야 하는 것은 callback으로
      () => {
        console.log(this.state.books)
      }
    )

  }

  cancelAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false })
  }

  onChangeInput = (text) => {
    console.log(text)
    this.setState({ textInputData: text });
  }

  markAsRead = (item, index) => {
    let newList = this.state.books.filter((book) => book !== item);

    this.setState(prev => ({
      books: newList,
      readingCount: prev.readingCount - 1,
      readCount: prev.readCount + 1,
    }))
  }

  renderBooks = (item, index) => {
    return (
      <View style={{ height: 50, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ paddingLeft: 5, }}>{item}</Text>
        </View>
        <CustomActionButton
          onPress={() => this.markAsRead(item, index)}
          style={{ width: 100, backgroundColor: colors.bgSuccess }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Mark as read
          </Text>
        </CustomActionButton>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={{ fontSize: 25 }}> Book worm</Text>
        </View>
        <View style={styles.body}>
          {/* AddBookInput */}
          {this.state.isAddNewBookVisible &&
            <View style={{ height: 50, flexDirection: 'row' }}>
              <TextInput
                style={{ flex: 1, backgroundColor: colors.bgTextInput, padding: 10 }}
                placeholder='Enter book name'
                onChangeText={(text) => this.onChangeInput(text)}
              />
              <CustomActionButton
                style={{ backgroundColor: colors.bgSuccess }}
                onPress={() => this.addNewBook(this.state.textInputData)}>
                <Ionicons
                  name='ios-checkmark'
                  color='white'
                  size={40}
                />
              </CustomActionButton>
              <CustomActionButton
                style={{ backgroundColor: colors.bgError }}
                onPress={this.cancelAddNewBook}>
                <Ionicons
                  name='ios-close'
                  color='white'
                  size={40}
                />
              </CustomActionButton>

            </View>
          }
          {/* BookList */}
          <FlatList
            data={this.state.books}
            // deconstruct item > {item}
            renderItem={({ item }, index) => this.renderBooks(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  No reading book
               </Text>
              </View>
            }
          />
          {/* AddBookBtn */}
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 20, right: 20, }}
            onPress={this.showAddNewBook}>
            <View style={{
              width: 50, height: 50,
              backgroundColor: 'powderblue',
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <BookCount title='Total' count={this.state.totalCount} />
          <BookCount title='Reading' count={this.state.readingCount} />
          <BookCount title='Read' count={this.state.readCount} />
        </View>
        <SafeAreaView />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  body: {
    flex: 1,
    // backgroundColor: 'green',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  footer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
});
