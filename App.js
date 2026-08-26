
import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Pressable, ScrollView, Image, StatusBar, Alert} from 'react-native';

const C={navy:'#061f3c',navy2:'#0b2b50',gold:'#f5a900',white:'#ffffff',muted:'#9fb0c3',green:'#29a65a',purple:'#6c43d9',blue:'#1684d6',red:'#d84c4c',card:'#0c2a4b'};
const classes=[
 {n:1,t:'Bienvenido al mundo del ajedrez',s:'Completada',p:100},
 {n:2,t:'Conoce tu ejército',s:'En progreso',p:35},
 {n:3,t:'La torre y el alfil',s:'Pendiente',p:0},
 {n:4,t:'La dama y el rey',s:'Bloqueada',p:0},
 {n:5,t:'El jaque mate básico',s:'Bloqueada',p:0},
];

function Header(){return <View style={s.header}><Image source={require('./assets/mente64-logo.png')} style={s.logo} resizeMode="contain"/><Text style={s.bell}>♟</Text></View>}
const Btn=({title,onPress,color=C.gold,disabled=false})=><Pressable disabled={disabled} onPress={onPress} style={[s.btn,{backgroundColor:disabled?'#53677a':color}]}><Text style={[s.btnText,{color:color===C.gold?C.navy:C.white}]}>{title}</Text></Pressable>;

function Home({go}){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>¡Hola, Campeón!</Text><Text style={s.sub}>Sigamos entrenando tu mente.</Text>
<View style={s.hero}><Text style={s.heroTitle}>Tu progreso general</Text><View style={s.stats}><Stat a="Nivel" b="2"/><Stat a="XP" b="160"/><Stat a="Racha" b="5 días"/></View><Bar p={53}/><Text style={s.small}>160 / 300 XP</Text></View>
<Text style={s.h2}>Continuar aprendiendo</Text><View style={s.card}><Text style={s.tag}>CLASE 2</Text><Text style={s.cardTitle}>Conoce tu ejército</Text><Bar p={35}/><Text style={s.small}>35%</Text><Btn title="Continuar" onPress={()=>go('Aprender')}/></View>
<Text style={s.h2}>Accesos rápidos</Text><View style={s.grid}><Quick t="🎯 Retos" c={C.green} f={()=>go('Retos')}/><Quick t="⚔ Duelo" c={C.purple} f={()=>go('Duelo')}/><Quick t="📊 Progreso" c={C.blue} f={()=>go('Progreso')}/><Quick t="📚 Clases" c={C.gold} f={()=>go('Aprender')}/></View></ScrollView>}
function Stat({a,b}){return <View style={s.stat}><Text style={s.small}>{a}</Text><Text style={s.statN}>{b}</Text></View>}
function Bar({p}){return <View style={s.bar}><View style={[s.fill,{width:`${p}%`}]}/></View>}
function Quick({t,c,f}){return <Pressable onPress={f} style={[s.quick,{backgroundColor:c}]}><Text style={s.quickText}>{t}</Text></Pressable>}

function Learn({go}){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>Aprender</Text><Text style={s.sub}>Tus clases de la academia</Text>{classes.map(x=><Pressable key={x.n} onPress={()=>x.s==='Bloqueada'?Alert.alert('Clase','Esta clase aún está bloqueada.'):go('Clase')} style={s.card}><View style={s.row}><Text style={s.tag}>Clase {x.n}</Text><Text style={{color:x.s==='Completada'?C.green:C.muted,fontWeight:'800'}}>{x.s}</Text></View><Text style={s.cardTitle}>{x.t}</Text><Bar p={x.p}/></Pressable>)}</ScrollView>}
function Lesson(){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>Clase 2</Text><Text style={s.sub}>Conoce tu ejército</Text><View style={s.video}><Image source={require('./assets/mente64-logo.png')} style={s.videoLogo} resizeMode="contain"/><Text style={s.play}>▶</Text><Text style={s.videoText}>Video de la clase</Text></View><Text style={s.h2}>Conoce tu ejército</Text><Text style={s.body}>Aprende el movimiento y el valor de cada pieza en el ajedrez.</Text><View style={s.card}><Text style={s.body}>▶ Lección en video · 6:30 min</Text><Text style={s.body}>♟ Ejercicios · 5 ejercicios</Text><Text style={s.body}>▣ Material de apoyo</Text></View><Btn title="Marcar como completada +20 XP" onPress={()=>Alert.alert('¡Excelente!','Has ganado 20 XP.')}/></ScrollView>}
function Challenges(){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>Retos</Text><Text style={s.sub}>Completa retos y gana XP</Text><Challenge t="Resolver 3 ejercicios" p="0/3" xp="+15 XP"/><Challenge t="Ver 1 clase" p="1/1 ✓" xp="+10 XP"/><Challenge t="Jugar 1 partida" p="0/1" xp="+20 XP"/><Text style={s.h2}>Retos semanales</Text><Challenge t="Ganar 3 partidas" p="1/3" xp="+50 XP"/></ScrollView>}
function Challenge({t,p,xp}){return <View style={s.card}><Text style={s.cardTitle}>{t}</Text><View style={s.row}><Text style={s.body}>{p}</Text><Text style={{color:C.gold,fontWeight:'900'}}>{xp}</Text></View></View>}
function Duel({go}){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>Duelo</Text><Text style={s.sub}>Pon a prueba lo que sabes</Text><DuelCard t="🤖 Contra la computadora" d="Enfréntate a diferentes niveles" c={C.purple} f={()=>go('Nivel')}/><DuelCard t="👥 Contra un amigo" d="Desafía a otro alumno" c={C.blue} f={()=>Alert.alert('Próximamente','El duelo entre alumnos se habilitará con el backend.')}/><DuelCard t="⚡ Partida rápida" d="Juega una partida al azar" c='#087b9b' f={()=>go('Nivel')}/></ScrollView>}
function DuelCard({t,d,c,f}){return <Pressable onPress={f} style={[s.duelCard,{backgroundColor:c}]}><Text style={s.duelTitle}>{t}</Text><Text style={s.duelSub}>{d}</Text></Pressable>}
function Level({go}){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>Selecciona nivel</Text><Text style={s.sub}>Elige tu desafío</Text><DuelCard t="♙ Fácil" d="Para principiantes" c={C.green} f={()=>go('Tablero')}/><DuelCard t="♘ Medio" d="Para jugadores en desarrollo" c={C.gold} f={()=>go('Tablero')}/><DuelCard t="♛ Difícil" d="Para jugadores avanzados" c={C.red} f={()=>go('Tablero')}/></ScrollView>}
const pieces=['♜','♞','♝','♛','♚','♝','♞','♜','♟','♟','♟','♟','♟','♟','♟','♟','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','♙','♙','♙','♙','♙','♙','♙','♙','♖','♘','♗','♕','♔','♗','♘','♖'];
function Board({go}){return <View style={s.pad}><Text style={s.h1}>Duelo vs computadora</Text><Text style={s.sub}>Nivel fácil · 10:00</Text><View style={s.board}>{pieces.map((p,i)=><View key={i} style={[s.square,{backgroundColor:((Math.floor(i/8)+i)%2)?'#6c8b50':'#e8e3c6'}]}><Text style={s.piece}>{p}</Text></View>)}</View><Text style={s.body}>Tu turno. Toca una pieza para comenzar.</Text><Btn title="Finalizar partida de prueba" onPress={()=>go('Victoria')}/></View>}
function Victory({go}){return <View style={[s.pad,{alignItems:'center'}]}><Text style={s.win}>¡Ganaste!</Text><Image source={require('./assets/icon.png')} style={s.winLogo}/><Text style={s.stars}>★ ★ ☆</Text><Text style={s.h1}>+50 XP</Text><Btn title="Nueva partida" onPress={()=>go('Nivel')}/><Btn title="Volver al menú" color={C.navy2} onPress={()=>go('Duelo')}/></View>}
function Progress(){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>Progreso</Text><Text style={s.sub}>Tu evolución en la academia</Text><View style={s.hero}><Text style={s.heroTitle}>♞ Nivel 2</Text><Bar p={53}/><Text style={s.small}>160 / 300 XP</Text></View><View style={s.stats}><Stat a="Clases" b="2"/><Stat a="Partidas" b="4"/><Stat a="Ejercicios" b="12"/></View><Text style={s.h2}>Historial de XP</Text><View style={s.card}><Text style={s.chart}>▂ ▃ ▄ ▆ █</Text><Text style={s.small}>20   40   60   90   160</Text></View></ScrollView>}
function Profile(){return <ScrollView contentContainerStyle={s.pad}><Text style={s.h1}>Perfil</Text><View style={[s.card,{alignItems:'center'}]}><Text style={s.avatar}>♞</Text><Text style={s.cardTitle}>M64-0001</Text><Text style={s.sub}>Alumno Mente64 Kids</Text><Text style={s.stars}>★★</Text></View><View style={s.card}><Text style={s.body}>🏆 Nivel 2</Text><Text style={s.body}>🔥 Racha: 5 días</Text><Text style={s.body}>⭐ XP total: 160</Text></View></ScrollView>}

const tabs=[['Inicio','⌂'],['Aprender','▣'],['Retos','◎'],['Duelo','⚔'],['Progreso','↗'],['Perfil','●']];
export default function App(){
 const [screen,setScreen]=useState('Inicio');
 const main=tabs.some(x=>x[0]===screen);
 return <SafeAreaView style={s.app}><StatusBar barStyle="light-content" backgroundColor={C.navy}/><Header/><View style={s.content}>
 {screen==='Inicio'&&<Home go={setScreen}/>}
 {screen==='Aprender'&&<Learn go={setScreen}/>}
 {screen==='Clase'&&<Lesson/>}
 {screen==='Retos'&&<Challenges/>}
 {screen==='Duelo'&&<Duel go={setScreen}/>}
 {screen==='Nivel'&&<Level go={setScreen}/>}
 {screen==='Tablero'&&<Board go={setScreen}/>}
 {screen==='Victoria'&&<Victory go={setScreen}/>}
 {screen==='Progreso'&&<Progress/>}
 {screen==='Perfil'&&<Profile/>}
 </View>{main&&<View style={s.nav}>{tabs.map(([t,ic])=><Pressable key={t} onPress={()=>setScreen(t)} style={s.navItem}><Text style={[s.navIcon,{color:screen===t?C.gold:C.muted}]}>{ic}</Text><Text style={[s.navText,{color:screen===t?C.gold:C.muted}]}>{t}</Text></Pressable>)}</View>}
 {!main&&<Pressable onPress={()=>setScreen(screen==='Clase'?'Aprender':'Duelo')} style={s.back}><Text style={s.backText}>‹ Volver</Text></Pressable>}
 </SafeAreaView>
}
const s=StyleSheet.create({
 app:{flex:1,backgroundColor:C.navy},content:{flex:1,backgroundColor:'#f4f7fb'},header:{height:76,backgroundColor:C.navy,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18},logo:{width:185,height:58},bell:{fontSize:28,color:C.gold},
 pad:{padding:20,paddingBottom:30},h1:{fontSize:30,fontWeight:'900',color:C.navy,marginBottom:4},h2:{fontSize:20,fontWeight:'900',color:C.navy,marginTop:20,marginBottom:10},sub:{fontSize:15,color:'#64758a',marginBottom:18},body:{fontSize:16,color:C.navy,lineHeight:24,marginVertical:5},small:{fontSize:12,color:C.muted,fontWeight:'700'},
 hero:{backgroundColor:C.navy2,borderRadius:20,padding:18,marginBottom:14},heroTitle:{color:C.white,fontWeight:'900',fontSize:18,marginBottom:12},stats:{flexDirection:'row',gap:8,marginBottom:12},stat:{flex:1,backgroundColor:C.card,padding:12,borderRadius:14,alignItems:'center'},statN:{fontSize:20,fontWeight:'900',color:C.gold,marginTop:4},
 card:{backgroundColor:C.white,borderRadius:20,padding:17,marginBottom:12,borderWidth:1,borderColor:'#dbe3eb'},cardTitle:{fontSize:19,fontWeight:'900',color:C.navy,marginVertical:7},tag:{fontSize:12,fontWeight:'900',color:C.navy},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},bar:{height:9,borderRadius:8,backgroundColor:'#dfe5eb',overflow:'hidden',marginVertical:9},fill:{height:'100%',backgroundColor:C.gold,borderRadius:8},
 btn:{padding:15,borderRadius:13,alignItems:'center',marginTop:12},btnText:{fontWeight:'900',fontSize:16},grid:{flexDirection:'row',flexWrap:'wrap',gap:10},quick:{width:'48%',padding:18,borderRadius:16},quickText:{fontSize:16,fontWeight:'900',color:C.white},
 video:{height:230,backgroundColor:C.navy,borderRadius:20,alignItems:'center',justifyContent:'center',overflow:'hidden'},videoLogo:{width:210,height:85},play:{fontSize:46,color:C.gold},videoText:{color:C.white,fontWeight:'800'},duelCard:{borderRadius:20,padding:22,marginBottom:14},duelTitle:{color:C.white,fontSize:21,fontWeight:'900'},duelSub:{color:C.white,fontSize:14,marginTop:7},
 board:{width:'100%',aspectRatio:1,flexDirection:'row',flexWrap:'wrap',borderWidth:5,borderColor:C.navy,marginVertical:18},square:{width:'12.5%',height:'12.5%',alignItems:'center',justifyContent:'center'},piece:{fontSize:31,color:'#101010'},win:{fontSize:38,fontWeight:'900',color:C.green,marginTop:30},winLogo:{width:150,height:150,margin:20},stars:{fontSize:36,color:C.gold,letterSpacing:8},chart:{fontSize:50,color:C.blue,letterSpacing:10},avatar:{fontSize:70,color:C.gold},
 nav:{height:72,backgroundColor:C.white,borderTopWidth:1,borderTopColor:'#dbe3eb',flexDirection:'row',paddingBottom:8},navItem:{flex:1,alignItems:'center',justifyContent:'center'},navIcon:{fontSize:20,fontWeight:'900'},navText:{fontSize:9,fontWeight:'800',marginTop:3},back:{position:'absolute',top:82,left:10,backgroundColor:C.navy2,paddingVertical:7,paddingHorizontal:12,borderRadius:12,zIndex:5},backText:{color:C.white,fontWeight:'900'}
});
