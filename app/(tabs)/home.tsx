import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import FarmaciasScroller from '@/components/FarmaciasScroller';
import Button from '@/components/Button';
import { useCart } from '@/contexts/CartContext';

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
  const { addItem } = useCart();

  type ItemProps = {
    id: string,
    image: any,
    nome: string,
    descricao?: string,
    preco: number,
  }

  function Item(props: ItemProps){
    const handleAddToCart = () => {
      addItem({
        id: props.id,
        nome: props.nome,
        descricao: props.descricao,
        image: props.image,
        preco: props.preco,
      });
      Alert.alert('Sucesso', `${props.nome} adicionado ao carrinho!`);
    };

    return (
      <View style={styleDestaque.item}>
        {props.image && (
          <Image source={props.image} style={styleDestaque.image} resizeMode="contain" />
        )}
        <Text style={styleDestaque.nome}>{props.nome}</Text>
        {props.descricao && <Text style={styleDestaque.descricao}>{props.descricao}</Text>}
        <Text style={styleDestaque.preco}>R$ {props.preco.toFixed(2)}</Text>
        
        <Button 
          title="Adicionar"
          onPress={handleAddToCart}
          size="small"
          fullWidth
        />
      </View>
    )
  }

  const remedios = [
    {
      id: '1',
      nome: 'Dipirona monoidratada 100mg Generico',
      image: require('../../assets/images/dipirona.png'),
      descricao: '20 Comprimidos',
      preco: 9.90
    },
    {
      id: '2',
      nome: 'Colorio ecoflim 5mg/ml',
      image: require('../../assets/images/colirio.png'),
      preco: 15.00
    },
    {
      id: '3',
      nome: 'Bepantol',
      image: require('../../assets/images/bepantol.png'),
      descricao: '20 Comprimidos',
      preco: 15.00
    },
    {
      id: '4',
      nome: 'Dipirona monoidratada 100mg Generico',
      image: require('../../assets/images/xarope.png'),
      descricao: '20 Comprimidos',
      preco: 15.00
    },
  ]


  return (
    <View style={styleDestaque.grid}>
      {remedios.map((item) => {
        return (
          <Item
            key={item.id}
            id={item.id}
            nome={item.nome}
            image={item.image}
            preco={item.preco}
            descricao={item.descricao}
          />)
      })}
    </View>
  )
}

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.separator}/>
      <ScrollView 
        style={styles.wrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
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
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

const styleDestaque = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingBottom: 20,
  },
  item: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    alignSelf: 'center'
  },
  nome: {
    fontSize: 13,
    marginBottom: 4,
    color: '#333',
    fontWeight: '500',
  },
  descricao: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff2b59',
    marginBottom: 10,
  },
});