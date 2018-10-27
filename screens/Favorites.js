import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { authorize, logout, getUserArtistsPromise } from '../spotify-api-client'
import ArtistaFavorito from '../ArtistaFavorito'
import { find, keys } from 'lodash'

import { connect } from 'react-redux'

import { db } from '../firebase'
import ArtistaConFans from '../ArtistaConFans'

class FavoritesScreen extends React.Component {
  state = {
    favoritos: [],
  }

  componentDidMount() {
    db.collection('favoritos').onSnapshot(querySnapshot => {
      const favoritos = []
      querySnapshot.forEach(doc => {
        const artistFromSpotify = find(this.props.artistas, artista => artista.nombre === doc.id)

        favoritos.push({
          ...artistFromSpotify,
          fans: keys(doc.data()),
        })
      })
      this.setState({ favoritos })
    })
  }

  render() {
    const { artistas } = this.props
    const { favoritos } = this.state

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {favoritos &&
            favoritos.map(artist => <ArtistaConFans artista={artist} key={artist.nombre} fans={artist.fans} />)}
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
