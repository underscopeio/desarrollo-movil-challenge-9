import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { authorize, logout, getUserArtistsPromise } from '../spotify-api-client'
import ArtistaFavorito from '../ArtistaFavorito'

import { connect } from 'react-redux'

class FavoritesScreen extends React.Component {
  render() {
    const { artistas } = this.props
    const artistasFavoritos = []
    //TODO: mostrar artistas que estén marcados como favoritos en Firebase

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistasFavoritos &&
            artistasFavoritos.map(artist => (
              <ArtistaFavorito artista={artist} key={artist.nombre} esFavorito={this.props.favoritos[artist.nombre]} />
            ))}
        </ScrollView>
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

export default connect(mapStateToProps)(FavoritesScreen)
