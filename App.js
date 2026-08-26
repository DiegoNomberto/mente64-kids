
import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const navy='#081f3b', gold='#f5aa16', bg='#f4f6f9', text='#17263a', muted='#6d7b8c', green='#27915b';

const lessons=[
  {id:1,title:'Bienvenido al mundo del ajedrez',status:'Completada',progress:100},
  {id:2,title:'Conoce tu ejército',status:'Continuar',progress:20},
  {id:3,title:'La torre y el alfil',status:'Pendiente',progress:0},
  {id:4,title:'La dama y el rey',status:'Bloqueada',progress:0},
  {id:5,title:'El caballo y sus saltos',status:'Bloqueada',progress:0},
  {id:6,title:'Los peones y sus secretos',status:'Bloqueada',progress:0},
  {id:7,title:'Jaque, jaque mate y tablas',status:'Bloqueada',progress:0},
  {id:8,title:'Enroque y movimientos especiales',status:'Bloqueada',progress:0},
  {id:9,title:'Cómo empezar bien una partida',status:'Bloqueada',progress:0},
  {id:10,title:'Tu primera estrategia',status:'Bloqueada',progress:0},
];

function App(){
  const [logged,setLogged]=useState(false);
  const [user,setUser]=useState('');
  const [pass,setPass]=useState('');
  const [tab,setTab]=useState('Inicio');

  const login=()=>{
    if(user.trim().toUpperCase()==='M64-0001' && pass.trim()==='A7K9P2') setLogged(true);
    else Alert.alert('Acceso','Usuario o contraseña incorrectos.\nDemo: M64-0001 / A7K9P2');
  };

  if(!logged){
    return <SafeAreaView style={s.login}>
      <StatusBar style="light"/>
      <View style={s.loginCard}>
        <Text style={s.knight}>♞</Text>
        <Text style={s.brand}>MENTE<Text style={{color:gold}}>64</Text></Text>
        <Text style={s.tag}>Piensa • Anticipa • Decide • Triunfa</Text>
        <Text style={s.label}>Usuario</Text>
        <TextInput value={user} onChangeText={setUser} autoCapitalize="characters" placeholder="M64-0001" style={s.input}/>
        <Text style={s.label}>Contraseña</Text>
        <TextInput value={pass} onChangeText={setPass} secureTextEntry placeholder="••••••" style={s.input}/>
        <TouchableOpacity onPress={login} style={s.primary}><Text style={s.primaryText}>Ingresar</Text></TouchableOpacity>
        <Text style={s.hint}>Credenciales generadas desde Mente64 Admin.</Text>
      </View>
    </SafeAreaView>
  }

  return <SafeAreaView style={s.app}>
    <StatusBar style="light"/>
    <View style={s.top}>
      <Text style={s.topBrand}>MENTE<Text style={{color:gold}}>64</Text></Text>
      <TouchableOpacity onPress={()=>setTab('Perfil')} style={s.avatar}><Text style={{fontWeight:'900',color:navy}}>AD</Text></TouchableOpacity>
    </View>

    <ScrollView style={s.content} contentContainerStyle={{paddingBottom:95}}>
      {tab==='Inicio' && <Inicio onGo={setTab}/>}
      {tab==='Aprender' && <Aprender/>}
      {tab==='Retos' && <Retos/>}
      {tab==='Duelo' && <Duelo/>}
      {tab==='Progreso' && <Progreso/>}
      {tab==='Perfil' && <Perfil onLogout={()=>setLogged(false)}/>}
    </ScrollView>

    <View style={s.nav}>
      {['Inicio','Aprender','Retos','Duelo','Progreso'].map((x,i)=>
        <TouchableOpacity key={x} onPress={()=>setTab(x)} style={s.navBtn}>
          <Text style={[s.navIco,{color:tab===x?navy:muted}]}>{['⌂','▣','◎','⚔','↗'][i]}</Text>
          <Text style={[s.navText,{color:tab===x?navy:muted}]}>{x}</Text>
        </TouchableOpacity>
      )}
    </View>
  </SafeAreaView>
}

const Card=({children,style})=><View style={[s.card,style]}>{children}</View>;
const Btn=({children,onPress,soft=false})=><TouchableOpacity onPress={onPress} style={[s.btn,soft?s.soft:s.primary]}><Text style={soft?s.softText:s.primaryText}>{children}</Text></TouchableOpacity>;

function Inicio({onGo}){
  return <>
    <Text style={s.hello}>Hola, Alumno Demo 👋</Text>
    <Text style={s.sub}>Continúa construyendo tu estrategia.</Text>
    <View style={s.hero}>
      <Text style={s.heroTitle}>Tu siguiente paso</Text>
      <Text style={s.heroSub}>Clase 2 · Conoce tu ejército</Text>
      <Btn onPress={()=>onGo('Aprender')}>Continuar aprendiendo</Btn>
    </View>
    <View style={s.grid}>
      <Card><Text style={s.metricLabel}>XP total</Text><Text style={s.metric}>320</Text></Card>
      <Card><Text style={s.metricLabel}>Racha</Text><Text style={s.metric}>4 días</Text></Card>
      <Card><Text style={s.metricLabel}>Clases</Text><Text style={s.metric}>1 / 10</Text></Card>
      <Card><Text style={s.metricLabel}>Nivel</Text><Text style={[s.metric,{fontSize:18}]}>Explorador II</Text></Card>
    </View>
    <Text style={s.section}>Hoy</Text>
    <Card><Text style={s.cardTitle}>🎯 Reto diario</Text><Text style={s.sub}>¿Cómo captura el peón?</Text><Text style={s.goldPill}>+20 XP</Text></Card>
    <Card><Text style={s.cardTitle}>⚔️ Duelo pendiente</Text><Text style={s.sub}>Carlos te retó · 3 preguntas</Text></Card>
  </>;
}

function Aprender(){
  return <>
    <Text style={s.hello}>Aprender</Text><Text style={s.sub}>Tus clases publicadas por la academia.</Text>
    {lessons.map(l=><Card key={l.id}>
      <View style={s.row}><Text style={s.pill}>Clase {l.id}</Text><Text style={[s.status,l.status==='Completada'&&{color:green}]}>{l.status}</Text></View>
      <Text style={s.cardTitle}>{l.title}</Text>
      <View style={s.progress}><View style={[s.progressBar,{width:`${l.progress}%`}]} /></View>
      <Btn soft={l.status==='Bloqueada'} onPress={()=>Alert.alert('Clase',l.status==='Bloqueada'?'Esta clase aún está bloqueada.':'Aquí se abrirá el video publicado desde Mente64 Admin.')}>{l.status==='Completada'?'Repasar':'Abrir clase'}</Btn>
    </Card>)}
  </>;
}

function Retos(){
  return <>
    <Text style={s.hello}>Retos</Text><Text style={s.sub}>Misiones, retos diarios y desafíos grupales.</Text>
    <Card><Text style={s.cardTitle}>🎯 Reto diario</Text><Text style={s.sub}>Identifica todas las casillas que controla un caballo desde el centro.</Text><Text style={s.goldPill}>+20 XP</Text></Card>
    <Card><Text style={s.cardTitle}>🏆 Reto del grupo</Text><Text style={s.sub}>Completa las clases 1 a 3 antes del viernes.</Text><View style={s.progress}><View style={[s.progressBar,{width:'33%'}]}/></View></Card>
    <Card><Text style={s.cardTitle}>🧠 Práctica individual</Text><Text style={s.sub}>Resuelve 5 posiciones tácticas a tu ritmo.</Text><Btn onPress={()=>Alert.alert('Práctica','Módulo preparado para integrar ejercicios tácticos.')}>Empezar</Btn></Card>
  </>;
}

function Duelo(){
  const [cpu,setCpu]=useState(false);
  return <>
    <Text style={s.hello}>Duelo</Text><Text style={s.sub}>Practica solo o desafía a otros alumnos.</Text>
    <View style={s.grid}>
      <TouchableOpacity style={s.choice} onPress={()=>setCpu(true)}><Text style={s.choiceIco}>🤖</Text><Text style={s.choiceText}>Vs Computadora</Text></TouchableOpacity>
      <TouchableOpacity style={s.choice} onPress={()=>Alert.alert('Duelo entre alumnos','Se activará con el backend de la V0.2.')}><Text style={s.choiceIco}>👥</Text><Text style={s.choiceText}>Vs Alumno</Text></TouchableOpacity>
    </View>
    {cpu && <Card>
      <Text style={s.cardTitle}>Duelo vs Computadora</Text>
      <Text style={s.sub}>Nivel sugerido: Explorador II</Text>
      <View style={s.fakeBoard}>
        {[...Array(64)].map((_,i)=><View key={i} style={[s.square,{backgroundColor:(Math.floor(i/8)+i%8)%2?'#966436':'#ecd7b1'}]} />)}
      </View>
      <Text style={s.notice}>En la V0.2 conectaremos un motor de ajedrez y ajustaremos la dificultad al nivel del alumno.</Text>
    </Card>}
  </>;
}

function Progreso(){
  return <>
    <Text style={s.hello}>Mi progreso</Text><Text style={s.sub}>Tu evolución dentro de Mente64.</Text>
    <Card>
      {[
        ['Progreso del curso','10%'],['XP total','320'],['Retos completados','6'],['Duelos ganados','2'],['Racha máxima','4 días']
      ].map(x=><View key={x[0]} style={s.stat}><Text>{x[0]}</Text><Text style={{fontWeight:'800'}}>{x[1]}</Text></View>)}
    </Card>
    <Text style={s.section}>Insignias</Text>
    <View style={s.grid}><Card><Text style={s.choiceIco}>🏅</Text><Text style={s.cardTitle}>Primer paso</Text></Card><Card><Text style={s.choiceIco}>♘</Text><Text style={s.cardTitle}>Caballo curioso</Text></Card></View>
  </>;
}

function Perfil({onLogout}){
  return <>
    <Text style={s.hello}>Perfil</Text><Text style={s.sub}>Datos de tu cuenta Mente64.</Text>
    <Card>
      {[
        ['Alumno','Alumno Demo'],['Usuario','M64-0001'],['Grupo','Exploradores'],['Nivel','Explorador II']
      ].map(x=><View key={x[0]} style={s.stat}><Text>{x[0]}</Text><Text style={{fontWeight:'800'}}>{x[1]}</Text></View>)}
    </Card>
    <Btn soft onPress={onLogout}>Cerrar sesión</Btn>
  </>;
}

const s=StyleSheet.create({
  app:{flex:1,backgroundColor:bg},login:{flex:1,backgroundColor:navy,justifyContent:'center',padding:22},
  loginCard:{backgroundColor:'white',borderRadius:24,padding:24},knight:{fontSize:72,textAlign:'center',color:gold},
  brand:{fontSize:34,fontWeight:'900',textAlign:'center',color:navy},tag:{textAlign:'center',color:muted,marginBottom:18},
  label:{fontSize:13,fontWeight:'800',marginTop:12,marginBottom:6},input:{borderWidth:1,borderColor:'#dde3eb',borderRadius:12,padding:13},
  primary:{backgroundColor:navy},soft:{backgroundColor:'#edf2f7'},btn:{padding:13,borderRadius:12,marginTop:12,alignItems:'center'},
  primaryText:{color:'white',fontWeight:'900'},softText:{color:navy,fontWeight:'900'},hint:{fontSize:12,color:muted,textAlign:'center',marginTop:12},
  top:{backgroundColor:navy,paddingHorizontal:17,paddingVertical:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  topBrand:{fontSize:20,fontWeight:'900',color:'white'},avatar:{width:38,height:38,borderRadius:19,backgroundColor:gold,alignItems:'center',justifyContent:'center'},
  content:{padding:16},hello:{fontSize:25,fontWeight:'900',color:text,marginTop:5},sub:{color:muted,marginTop:3,marginBottom:12},
  hero:{backgroundColor:'#11375f',borderRadius:20,padding:18,marginBottom:14},heroTitle:{color:'white',fontSize:20,fontWeight:'900'},
  heroSub:{color:'#dce8f5',marginTop:4},grid:{flexDirection:'row',flexWrap:'wrap',gap:10},card:{backgroundColor:'white',borderWidth:1,borderColor:'#dde3eb',borderRadius:17,padding:14,marginBottom:10,flexGrow:1},
  metricLabel:{fontSize:13,color:muted},metric:{fontSize:26,fontWeight:'900',marginTop:4},section:{fontSize:19,fontWeight:'900',marginTop:18,marginBottom:9},
  cardTitle:{fontSize:17,fontWeight:'900',color:text},goldPill:{alignSelf:'flex-start',backgroundColor:'#fff1ca',color:'#875e00',paddingHorizontal:8,paddingVertical:5,borderRadius:999,fontSize:12,fontWeight:'900'},
  row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},pill:{fontSize:11,fontWeight:'800',backgroundColor:'#edf2f7',paddingHorizontal:8,paddingVertical:5,borderRadius:999},
  status:{fontSize:12,fontWeight:'800',color:muted},progress:{height:8,backgroundColor:'#e9edf2',borderRadius:99,overflow:'hidden',marginTop:9},progressBar:{height:'100%',backgroundColor:gold},
  choice:{width:'48%',backgroundColor:'white',borderWidth:1,borderColor:'#dde3eb',borderRadius:16,padding:18,alignItems:'center'},choiceIco:{fontSize:30,textAlign:'center'},choiceText:{fontWeight:'900',marginTop:6,textAlign:'center'},
  fakeBoard:{width:'100%',aspectRatio:1,flexDirection:'row',flexWrap:'wrap',borderWidth:3,borderColor:'#6b4a2a',marginTop:10},
  square:{width:'12.5%',height:'12.5%'},notice:{marginTop:12,backgroundColor:'#fff7dc',borderRadius:12,padding:11,fontSize:13,color:'#66501d'},
  stat:{flexDirection:'row',justifyContent:'space-between',paddingVertical:11,borderBottomWidth:1,borderBottomColor:'#eef1f4'},
  nav:{position:'absolute',bottom:0,left:0,right:0,backgroundColor:'white',borderTopWidth:1,borderTopColor:'#dde3eb',flexDirection:'row',paddingVertical:7},
  navBtn:{flex:1,alignItems:'center'},navIco:{fontSize:20,fontWeight:'900'},navText:{fontSize:10,fontWeight:'800',marginTop:2},
});

export default App;
