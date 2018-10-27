import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { filter, has } from 'lodash'

import { authorize, logout, getUserArtistsPromise } from '../spotify-api-client'
import ArtistaFavorito from '../ArtistaFavorito'

import { connect } from 'react-redux'
import { SET_AS_FAVORITE_TYPE, ADD_ARTISTS_TYPE } from '../reducers/artists'

import { setArtistAsFavorite, favoritesCollection } from './../firebase/artists'
import { db, auth, getCurrentUser } from '../firebase'

class HomeScreen extends React.Component {
  state = {
    result: null,
    favoritos: {},
  }

  componentDidMount() {
    getUserArtistsPromise().then(artistas => this.props.loadArtists(artistas))
    getCurrentUser().then(currentUser => this.setState({ currentUser }))
    favoritesCollection.onSnapshot(querySnapshot => {
      const favoritos = {}
      querySnapshot.forEach(function(doc) {
        favoritos[doc.id] = doc.data()
      })
      this.setState({ favoritos })
    })
  }

  _handleLogoutButtonPress = () => {
    logout().then(() => {
      this.props.navigation.navigate('Auth')
    })
  }

  handleFavoriteButtonPress = artist => {
    const { favoritos, currentUser } = this.state

    const artistaFavorito = favoritos[artist.nombre]
    const eraFavorito = currentUser && artistaFavorito && artistaFavorito[currentUser.uid]

    setArtistAsFavorite(artist.nombre, !eraFavorito)
  }

  render() {
    const { artistas } = this.props
    const { loggedIn, favoritos, currentUser } = this.state
    const userId = currentUser ? currentUser.uid : null

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
                esFavorito={favoritos[artist.nombre] && favoritos[artist.nombre][userId]}
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
    artistas: state.artists.artistas,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // NOTA: ya no usamos más el `setArtistAsFavorite` que hace `dispatch` a Redux
    //    Ahora seteamos directamente en Firebase los favoritos
    // setArtistAsFavorite: id => dispatch({ type: SET_AS_FAVORITE_TYPE, payload: { id } }),
    loadArtists: artistas => dispatch({ type: ADD_ARTISTS_TYPE, payload: { artistas } }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
