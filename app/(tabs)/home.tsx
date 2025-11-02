import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import FarmaciasScroller from '@/components/FarmaciasScroller';

function Propagandas() {
  return (
    <View>
      <Image 
        source={require('../../assets/images/Porpagandas.png')}
        style={{
          width: '100%'
        }}
        resizeMode='contain'
      />
    </View>
  )
}

function Destaque(){
  type ItemProps = {
    image: any,
    nome: string,
    descricao?: string,
    preco: string,
  }

  function Item(props: ItemProps){
    
    

    return (
      <View style={styleDestaque.item}>
        {props.image && (
          <Image source={props.image} style={styleDestaque.image} resizeMode="contain" />
        )}
        <Text style={styleDestaque.nome}>{props.nome}</Text>
        {props.descricao && <Text style={styleDestaque.descricao}>{props.descricao}</Text>}
        <Text>{props.descricao}</Text>
        <Text style={styleDestaque.preco}>{props.preco}</Text>
      </View>
    )
  }

  const remedios = [
    {
      id: 1,
      nome: 'Dipirona monoidratada 100mg Generico',
      image: require('../../assets/images/dipirona.png'),
      descricao: '20 Comprimidos',
      preco: 'R$ 9,90'
    },
    {
      id: 2,
      nome: 'Colorio ecoflim 5mg/ml',
      image: require('../../assets/images/colirio.png'),
      preco: 'R$ 15,00'
    },
    {
      id: 3,
      nome: 'Bepantol',
      image: require('../../assets/images/bepantol.png'),
      descricao: '20 Comprimidos',
      preco: 'R$ 15,00'
    },
    {
      id: 4,
      nome: 'Dipirona monoidratada 100mg Generico',
      image: require('../../assets/images/xarope.png'),
      descricao: '20 Comprimidos',
      preco: 'R$ 15,00'
    },
  ]


  return (
    <View style={styleDestaque.grid}>
      {remedios.map((item) => {
        return (
          <Item
            key={item.id}
            nome={item.nome}
            image={item.image}
            preco={item.preco}
          />)
      })}
    </View>
  )
}

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <Header/>
        <View style={styles.separator}/>
        <FarmaciasScroller/>

        <Propagandas/>
        <Destaque/>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    width: '80%'
  },
  separator: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#c2c2c2ff',
    marginVertical: 20,
    height: 1,
  },
});

const styleDestaque = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  item: {
    width: '48%', // 2 colunas com espaço
    backgroundColor: '#ebebebff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddddddff'
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    alignSelf: 'center'
  },
  nome: {
    fontSize: 14,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginBottom: 4,
  },
  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000ff',
  },
})