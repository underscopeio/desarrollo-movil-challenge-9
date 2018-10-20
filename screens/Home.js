import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { filter, has } from 'lodash'

import { authorize, logout, getUserArtistsPromise } from '../spotify-api-client'
import ArtistaFavorito from '../ArtistaFavorito'

import { connect } from 'react-redux'
import { SET_AS_FAVORITE_TYPE, ADD_ARTISTS_TYPE } from '../reducers/artists'

import { setArtistAsFavoriteOnFirebase } from '../firebase'

class HomeScreen extends React.Component {
  state = {
    result: null,
  }

  componentDidMount() {
    getUserArtistsPromise().then(artistas => {
      this.props.loadArtists(artistas)
      // this.setState({ artistas })
    })
  }

  _handleLogoutButtonPress = () => {
    logout().then(() => {
      this.props.navigation.navigate('Auth')
    })
  }

  handleFavoriteButtonPress = artist => {
    setArtistAsFavoriteOnFirebase(artist.nombre, !this.props.favoritos[artist.nombre] )
    this.props.setArtistAsFavorite(artist.nombre)
    
  }

  render() {
    const { artistas } = this.props
    const { loggedIn } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistas &&
            artistas.map(artist => (
              <ArtistaFavorito
                artista={artist}
                key={artist.nombre}
                esFavorito={this.props.favoritos[artist.nombre]}
                onFavoriteButtonPress={() => this.handleFavoriteButtonPress(artist)}
              />
            ))}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <Button title="Logout" onPress={this._handleLogoutButtonPress} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000C0',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
})

const mapStateToProps = state => {
  return {
    favoritos: state.artists.favoritos,
    artistas: state.artists.artistas,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setArtistAsFavorite: id => dispatch({ type: SET_AS_FAVORITE_TYPE, payload: { id } }),
    loadArtists: artistas => dispatch({ type: ADD_ARTISTS_TYPE, payload: { artistas } }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
