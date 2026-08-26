
import React, {useMemo, useState} from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, Pressable, ScrollView, Image,
  StatusBar, Platform, Alert, Dimensions
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Chess } from 'chess.js';

const COLORS = {
  navy:'#061F3C', navy2:'#0C315A', gold:'#F5A900', gold2:'#FFD56A',
  white:'#FFFFFF', bg:'#F4F7FB', text:'#102238', muted:'#6E7E90',
  line:'#DFE6EE', green:'#24A866', purple:'#7547D8', blue:'#1685D1',
  teal:'#078C9D', red:'#D85353', card:'#FFFFFF'
};

const lessons = [
  {id:1,title:'Bienvenido al mundo del ajedrez',duration:'1:23',xp:20,video:require('./assets/videos/clase01.mp4'),thumb:require('./assets/thumbs/clase01.jpg')},
  {id:2,title:'Conoce tu ejército',duration:'1:14',xp:20,video:require('./assets/videos/clase02.mp4'),thumb:require('./assets/thumbs/clase02.jpg')},
  {id:3,title:'La torre y el alfil',duration:'1:01',xp:20,video:require('./assets/videos/clase03.mp4'),thumb:require('./assets/thumbs/clase03.jpg')},
  {id:4,title:'La dama y el rey',duration:'0:56',xp:20,video:require('./assets/videos/clase04.mp4'),thumb:require('./assets/thumbs/clase04.jpg')},
  {id:5,title:'El caballo y sus saltos',duration:'1:04',xp:20,video:require('./assets/videos/clase05.mp4'),thumb:require('./assets/thumbs/clase05.jpg')},
  {id:6,title:'Los peones y sus secretos',duration:'0:58',xp:20,video:require('./assets/videos/clase06.mp4'),thumb:require('./assets/thumbs/clase06.jpg')},
  {id:7,title:'Jaque, jaque mate y tablas',duration:'0:55',xp:25,video:require('./assets/videos/clase07.mp4'),thumb:require('./assets/thumbs/clase07.jpg')},
  {id:8,title:'Enroque y movimientos especiales',duration:'0:49',xp:25,video:require('./assets/videos/clase08.mp4'),thumb:require('./assets/thumbs/clase08.jpg')},
  {id:9,title:'Cómo empezar bien una partida',duration:'1:10',xp:30,video:require('./assets/videos/clase09.mp4'),thumb:require('./assets/thumbs/clase09.jpg')},
  {id:10,title:'Tu primera estrategia',duration:'1:17',xp:30,video:require('./assets/videos/clase10.mp4'),thumb:require('./assets/thumbs/clase10.jpg')},
];

const nav = [
  ['Inicio','⌂'], ['Aprender','▣'], ['Retos','◎'],
  ['Duelo','⚔'], ['Progreso','↗'], ['Perfil','♟']
];

function PrimaryButton({title,onPress,color=COLORS.gold,disabled=false}) {
  return <Pressable disabled={disabled} onPress={onPress}
    style={({pressed})=>[styles.primaryBtn,{backgroundColor:disabled?'#AAB7C5':color,opacity:pressed?0.82:1}]}>
    <Text style={[styles.primaryBtnText,{color:color===COLORS.gold?COLORS.navy:COLORS.white}]}>{title}</Text>
  </Pressable>
}

function Header(){
  return <View style={styles.header}>
    <Image source={require('./assets/mente64-logo.png')} style={styles.headerLogo} resizeMode="contain"/>
    <View style={styles.headerBadge}><Text style={styles.headerBadgeText}>KIDS</Text></View>
  </View>
}

function ProgressBar({value}){
  return <View style={styles.progressTrack}><View style={[styles.progressFill,{width:`${Math.max(0,Math.min(100,value))}%`}]}/></View>
}

function Login({onLogin}){
  const [user,setUser]=useState('M64-0001');
  const [pass,setPass]=useState('A7K9P2');
  const tryLogin=()=>{
    if(user==='M64-0001' && pass==='A7K9P2') onLogin();
    else Alert.alert('Acceso','Usuario o contraseña incorrectos.');
  };
  return <SafeAreaView style={styles.loginSafe}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.navy}/>
    <View style={styles.loginWrap}>
      <Image source={require('./assets/mente64-logo.png')} style={styles.loginLogo} resizeMode="contain"/>
      <Text style={styles.loginTitle}>Mente64 Kids</Text>
      <Text style={styles.loginSub}>Aprende · Practica · Compite · Progresa</Text>
      <View style={styles.loginCard}>
        <Text style={styles.fieldLabel}>Usuario demo</Text>
        <Pressable onPress={()=>setUser('M64-0001')} style={styles.fakeInput}><Text style={styles.fakeInputText}>{user}</Text></Pressable>
        <Text style={styles.fieldLabel}>Contraseña demo</Text>
        <Pressable onPress={()=>setPass('A7K9P2')} style={styles.fakeInput}><Text style={styles.fakeInputText}>••••••</Text></Pressable>
        <PrimaryButton title="Ingresar" onPress={tryLogin}/>
        <Text style={styles.demoHint}>Demo: M64-0001 / A7K9P2</Text>
      </View>
    </View>
  </SafeAreaView>
}

function Home({go,completed,xp}){
  const completedCount=completed.size;
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <View style={styles.greetingRow}>
      <View><Text style={styles.h1}>¡Hola, Campeón! 👋</Text><Text style={styles.subtitle}>Sigamos entrenando tu mente.</Text></View>
      <View style={styles.avatar}><Text style={styles.avatarText}>♞</Text></View>
    </View>
    <View style={styles.hero}>
      <Text style={styles.heroEyebrow}>TU PROGRESO GENERAL</Text>
      <Text style={styles.heroBig}>Nivel 2 · Explorador</Text>
      <ProgressBar value={Math.min(100,(xp/300)*100)}/>
      <Text style={styles.heroSmall}>{xp} / 300 XP</Text>
      <View style={styles.statsRow}>
        <Stat label="Racha" value="5 días" icon="🔥"/>
        <Stat label="XP" value={String(xp)} icon="⭐"/>
        <Stat label="Clases" value={`${completedCount}/10`} icon="✓"/>
      </View>
    </View>
    <SectionTitle title="Continuar aprendiendo"/>
    <View style={styles.lessonFeature}>
      <Image source={lessons[1].thumb} style={styles.featureThumb}/>
      <View style={{flex:1}}>
        <Text style={styles.tag}>CLASE 2</Text>
        <Text style={styles.cardTitle}>Conoce tu ejército</Text>
        <ProgressBar value={completed.has(2)?100:35}/>
        <PrimaryButton title={completed.has(2)?'Repasar clase':'Continuar'} onPress={()=>go('Clase',2)}/>
      </View>
    </View>
    <SectionTitle title="Accesos rápidos"/>
    <View style={styles.quickGrid}>
      <Quick color={COLORS.green} icon="🎯" title="Retos" onPress={()=>go('Retos')}/>
      <Quick color={COLORS.purple} icon="⚔" title="Duelo" onPress={()=>go('Duelo')}/>
      <Quick color={COLORS.blue} icon="📊" title="Progreso" onPress={()=>go('Progreso')}/>
      <Quick color="#E88914" icon="📚" title="Clases" onPress={()=>go('Aprender')}/>
    </View>
    <SectionTitle title="Misión del día"/>
    <View style={styles.missionCard}>
      <View style={styles.missionIcon}><Text style={{fontSize:24}}>🎁</Text></View>
      <View style={{flex:1}}><Text style={styles.cardTitle}>Completa una clase</Text><Text style={styles.bodyMuted}>Suma experiencia y mantén tu racha.</Text></View>
      <Text style={styles.xpPill}>+10 XP</Text>
    </View>
  </ScrollView>
}

function Stat({label,value,icon}){
  return <View style={styles.statCard}><Text style={styles.statIcon}>{icon}</Text><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>
}
function SectionTitle({title}){return <Text style={styles.sectionTitle}>{title}</Text>}
function Quick({color,icon,title,onPress}){
  return <Pressable onPress={onPress} style={({pressed})=>[styles.quickCard,{backgroundColor:color,opacity:pressed?0.85:1}]}>
    <Text style={styles.quickIcon}>{icon}</Text><Text style={styles.quickTitle}>{title}</Text>
  </Pressable>
}

function Learn({go,completed}){
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Text style={styles.h1}>Aprender</Text><Text style={styles.subtitle}>Tus clases de la academia.</Text>
    {lessons.map((l)=>{
      const done=completed.has(l.id);
      return <Pressable key={l.id} onPress={()=>go('Clase',l.id)} style={({pressed})=>[styles.lessonCard,{opacity:pressed?0.85:1}]}>
        <Image source={l.thumb} style={styles.lessonThumb}/>
        <View style={{flex:1}}>
          <View style={styles.rowBetween}><Text style={styles.tag}>Clase {l.id}</Text><Text style={[styles.status,{color:done?COLORS.green:COLORS.muted}]}>{done?'Completada':'Disponible'}</Text></View>
          <Text style={styles.cardTitle}>{l.title}</Text>
          <Text style={styles.bodyMuted}>▶ {l.duration} · +{l.xp} XP</Text>
          <ProgressBar value={done?100:(l.id===2?35:0)}/>
        </View>
      </Pressable>
    })}
  </ScrollView>
}

function Lesson({lessonId,onComplete,go,completed}){
  const lesson=lessons.find(x=>x.id===lessonId) || lessons[0];
  const player=useVideoPlayer(lesson.video, p=>{ p.loop=false; });
  const done=completed.has(lesson.id);
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Pressable onPress={()=>go('Aprender')}><Text style={styles.backLink}>‹ Volver a clases</Text></Pressable>
    <Text style={styles.tag}>CLASE {lesson.id}</Text>
    <Text style={styles.h1}>{lesson.title}</Text>
    <View style={styles.videoShell}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture nativeControls/>
    </View>
    <View style={styles.lessonInfoCard}>
      <InfoLine icon="▶" title="Lección en video" sub={lesson.duration}/>
      <InfoLine icon="♟" title="Ejercicio de práctica" sub="Incluido en esta versión"/>
      <InfoLine icon="⭐" title="Recompensa" sub={`+${lesson.xp} XP`}/>
    </View>
    <PrimaryButton title={done?'Clase completada ✓':'Marcar como completada'} color={done?COLORS.green:COLORS.gold}
      onPress={()=>done?Alert.alert('Clase','Esta clase ya está completada.'):onComplete(lesson)}/>
  </ScrollView>
}
function InfoLine({icon,title,sub}){return <View style={styles.infoLine}><Text style={styles.infoIcon}>{icon}</Text><View><Text style={styles.infoTitle}>{title}</Text><Text style={styles.bodyMuted}>{sub}</Text></View></View>}

function Challenges(){
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Text style={styles.h1}>Retos</Text><Text style={styles.subtitle}>Completa retos y gana XP.</Text>
    <Challenge title="Resolver 3 ejercicios" progress="0/3" xp="+15 XP" icon="🎯"/>
    <Challenge title="Ver 1 clase" progress="1/1 ✓" xp="+10 XP" icon="✅"/>
    <Challenge title="Jugar 1 partida" progress="0/1" xp="+20 XP" icon="♟"/>
    <SectionTitle title="Retos semanales"/>
    <Challenge title="Ganar 3 partidas" progress="1/3" xp="+50 XP" icon="🏆"/>
    <Challenge title="Completar 4 clases" progress="1/4" xp="+80 XP" icon="📚"/>
  </ScrollView>
}
function Challenge({title,progress,xp,icon}){
  return <View style={styles.challengeCard}>
    <View style={styles.challengeIcon}><Text style={{fontSize:26}}>{icon}</Text></View>
    <View style={{flex:1}}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.bodyMuted}>{progress}</Text></View>
    <Text style={styles.xpPill}>{xp}</Text>
  </View>
}

function DuelMenu({go}){
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Text style={styles.h1}>Duelo</Text><Text style={styles.subtitle}>Pon a prueba lo que sabes.</Text>
    <DuelCard color={COLORS.purple} icon="🤖" title="Contra la computadora" sub="Juega una partida real contra la IA de prueba" onPress={()=>go('Nivel')}/>
    <DuelCard color={COLORS.blue} icon="👥" title="Contra un amigo" sub="Preparado para conectarlo al backend" onPress={()=>Alert.alert('Próximamente','Esta opción se activará cuando conectemos usuarios reales.')}/>
    <DuelCard color={COLORS.teal} icon="⚡" title="Partida rápida" sub="Entra directo a nivel fácil" onPress={()=>go('Tablero','easy')}/>
  </ScrollView>
}
function DuelCard({color,icon,title,sub,onPress}){
  return <Pressable onPress={onPress} style={({pressed})=>[styles.duelCard,{backgroundColor:color,opacity:pressed?0.85:1}]}>
    <Text style={styles.duelIcon}>{icon}</Text><View style={{flex:1}}><Text style={styles.duelTitle}>{title}</Text><Text style={styles.duelSub}>{sub}</Text></View><Text style={styles.duelArrow}>›</Text>
  </Pressable>
}

function Level({go}){
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Pressable onPress={()=>go('Duelo')}><Text style={styles.backLink}>‹ Volver</Text></Pressable>
    <Text style={styles.h1}>Elige tu nivel</Text><Text style={styles.subtitle}>La computadora responderá con una jugada legal.</Text>
    <DuelCard color={COLORS.green} icon="♙" title="Fácil" sub="La computadora juega al azar" onPress={()=>go('Tablero','easy')}/>
    <DuelCard color={COLORS.gold} icon="♘" title="Medio" sub="Respuesta algo más agresiva" onPress={()=>go('Tablero','medium')}/>
    <DuelCard color={COLORS.red} icon="♛" title="Difícil" sub="Prioriza capturas cuando puede" onPress={()=>go('Tablero','hard')}/>
  </ScrollView>
}

const PIECE_UNICODE = {p:'♟',r:'♜',n:'♞',b:'♝',q:'♛',k:'♚'};
const FILES='abcdefgh';

function ChessBoard({difficulty,go,onWin}){
  const [game,setGame]=useState(()=>new Chess());
  const [selected,setSelected]=useState(null);
  const [message,setMessage]=useState('Tu turno: juegas con blancas.');
  const [,force]=useState(0);

  const chooseComputerMove=(moves)=>{
    if(!moves.length) return null;
    if(difficulty==='hard'){
      const caps=moves.filter(m=>m.captured); if(caps.length) return caps[Math.floor(Math.random()*caps.length)];
    }
    if(difficulty==='medium'){
      const caps=moves.filter(m=>m.captured); if(caps.length && Math.random()<0.65) return caps[Math.floor(Math.random()*caps.length)];
    }
    return moves[Math.floor(Math.random()*moves.length)];
  };

  const tapSquare=(sq)=>{
    if(game.isGameOver()) return;
    if(!selected){
      const p=game.get(sq);
      if(p && p.color==='w'){ setSelected(sq); setMessage(`Seleccionaste ${sq}. Elige destino.`); }
      return;
    }
    try{
      const move=game.move({from:selected,to:sq,promotion:'q'});
      if(!move){ setSelected(null); setMessage('Movimiento no válido.'); return; }
      setSelected(null); force(x=>x+1);
      if(game.isGameOver()){ finish(); return; }
      setMessage('La computadora está pensando…');
      setTimeout(()=>{
        const moves=game.moves({verbose:true});
        const cm=chooseComputerMove(moves);
        if(cm) game.move(cm);
        force(x=>x+1);
        if(game.isGameOver()) finish();
        else setMessage('Tu turno.');
      },350);
    }catch(e){ setSelected(null); setMessage('Movimiento no válido.'); }
  };

  const finish=()=>{
    if(game.isCheckmate()){
      const winner=game.turn()==='b'?'Blancas':'Negras';
      if(winner==='Blancas') onWin();
      setMessage(`Jaque mate. Ganan ${winner}.`);
    } else setMessage('Partida terminada.');
  };

  const squares=[];
  for(let rank=8;rank>=1;rank--){
    for(let fi=0;fi<8;fi++){
      const sq=FILES[fi]+rank;
      const p=game.get(sq);
      squares.push({sq,p,light:(fi+rank)%2===0});
    }
  }
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Pressable onPress={()=>go('Duelo')}><Text style={styles.backLink}>‹ Salir del duelo</Text></Pressable>
    <Text style={styles.h1}>Duelo vs computadora</Text>
    <Text style={styles.subtitle}>Nivel {difficulty==='hard'?'difícil':difficulty==='medium'?'medio':'fácil'}</Text>
    <View style={styles.boardWrap}>
      {squares.map(({sq,p,light})=>{
        const isWhite=p?.color==='w';
        return <Pressable key={sq} onPress={()=>tapSquare(sq)}
          style={[styles.square,{backgroundColor:selected===sq?COLORS.gold:(light?'#F1E7CE':'#769656')}]}>
          <Text style={[styles.piece,{color:isWhite?'#FFFFFF':'#111827',
            textShadowColor:isWhite?'#111827':'#FFFFFF',textShadowRadius:1,textShadowOffset:{width:0,height:1}}]}>
            {p?PIECE_UNICODE[p.type]:''}
          </Text>
        </Pressable>
      })}
    </View>
    <View style={styles.boardMessage}><Text style={styles.boardMessageText}>{message}</Text></View>
    <PrimaryButton title="Reiniciar partida" color={COLORS.navy2} onPress={()=>{setGame(new Chess());setSelected(null);setMessage('Tu turno: juegas con blancas.');force(x=>x+1)}}/>
  </ScrollView>
}

function Progress({completed,xp}){
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Text style={styles.h1}>Progreso</Text><Text style={styles.subtitle}>Tu evolución en la academia.</Text>
    <View style={styles.hero}>
      <Text style={styles.heroEyebrow}>NIVEL ACTUAL</Text><Text style={styles.heroBig}>Explorador II</Text>
      <ProgressBar value={Math.min(100,(xp/300)*100)}/><Text style={styles.heroSmall}>{xp} / 300 XP</Text>
    </View>
    <SectionTitle title="Estadísticas"/>
    <View style={styles.statsGrid}>
      <BigStat icon="✓" value={String(completed.size)} label="Clases completadas"/>
      <BigStat icon="♟" value="4" label="Partidas jugadas"/>
      <BigStat icon="◎" value="12" label="Ejercicios resueltos"/>
      <BigStat icon="🔥" value="5 días" label="Mejor racha"/>
    </View>
    <SectionTitle title="Historial de XP"/>
    <View style={styles.chartCard}>
      <Text style={styles.chartBars}>▂ ▃ ▄ ▆ █</Text>
      <Text style={styles.bodyMuted}>20      40      80      120      {xp}</Text>
    </View>
  </ScrollView>
}
function BigStat({icon,value,label}){return <View style={styles.bigStat}><Text style={styles.bigStatIcon}>{icon}</Text><Text style={styles.bigStatValue}>{value}</Text><Text style={styles.bigStatLabel}>{label}</Text></View>}

function Profile({logout,xp,completed}){
  return <ScrollView contentContainerStyle={styles.contentPad}>
    <Text style={styles.h1}>Perfil</Text>
    <View style={styles.profileCard}>
      <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>♞</Text></View>
      <Text style={styles.profileName}>Alumno Demo</Text><Text style={styles.bodyMuted}>M64-0001 · Exploradores</Text>
      <View style={styles.profileXP}><Text style={styles.profileXPText}>⭐ {xp} XP · {completed.size}/10 clases</Text></View>
    </View>
    <View style={styles.menuCard}>
      <InfoLine icon="🏆" title="Insignias" sub="2 desbloqueadas"/>
      <InfoLine icon="🔥" title="Racha" sub="5 días"/>
      <InfoLine icon="♟" title="Academia" sub="Mente64"/>
    </View>
    <PrimaryButton title="Cerrar sesión" color={COLORS.navy2} onPress={logout}/>
  </ScrollView>
}

function BottomNav({screen,go}){
  return <View style={styles.navSafe}><View style={styles.nav}>
    {nav.map(([name,icon])=><Pressable key={name} onPress={()=>go(name)} style={styles.navItem}>
      <Text style={[styles.navIcon,{color:screen===name?COLORS.gold:COLORS.muted}]}>{icon}</Text>
      <Text style={[styles.navLabel,{color:screen===name?COLORS.navy:COLORS.muted}]}>{name}</Text>
    </Pressable>)}
  </View></View>
}

export default function App(){
  const [logged,setLogged]=useState(false);
  const [screen,setScreen]=useState('Inicio');
  const [lessonId,setLessonId]=useState(2);
  const [difficulty,setDifficulty]=useState('easy');
  const [completed,setCompleted]=useState(()=>new Set([1]));
  const [xp,setXp]=useState(160);

  const go=(to,param)=>{
    if(to==='Clase' && param) setLessonId(param);
    if(to==='Tablero' && param) setDifficulty(param);
    setScreen(to);
  };
  const complete=(lesson)=>{
    const next=new Set(completed); next.add(lesson.id); setCompleted(next); setXp(v=>v+lesson.xp);
    Alert.alert('¡Excelente!',`Completaste la clase y ganaste ${lesson.xp} XP.`);
  };
  if(!logged) return <Login onLogin={()=>setLogged(true)}/>;

  const mainScreens=nav.map(x=>x[0]);
  const showNav=mainScreens.includes(screen);

  return <SafeAreaView style={styles.app}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.navy}/>
    <View style={styles.androidSafe}><Header/></View>
    <View style={styles.screen}>
      {screen==='Inicio'&&<Home go={go} completed={completed} xp={xp}/>}
      {screen==='Aprender'&&<Learn go={go} completed={completed}/>}
      {screen==='Clase'&&<Lesson lessonId={lessonId} onComplete={complete} go={go} completed={completed}/>}
      {screen==='Retos'&&<Challenges/>}
      {screen==='Duelo'&&<DuelMenu go={go}/>}
      {screen==='Nivel'&&<Level go={go}/>}
      {screen==='Tablero'&&<ChessBoard difficulty={difficulty} go={go} onWin={()=>{setXp(v=>v+50);Alert.alert('¡Ganaste!','+50 XP')}}/>}
      {screen==='Progreso'&&<Progress completed={completed} xp={xp}/>}
      {screen==='Perfil'&&<Profile xp={xp} completed={completed} logout={()=>{setLogged(false);setScreen('Inicio')}}/>}
    </View>
    {showNav&&<BottomNav screen={screen} go={go}/>}
  </SafeAreaView>
}

const W=Dimensions.get('window').width;
const BOARD=Math.min(W-32,430);

const styles=StyleSheet.create({
  app:{flex:1,backgroundColor:COLORS.navy},
  androidSafe:{paddingTop:Platform.OS==='android'?Math.max(0,(StatusBar.currentHeight||0)-6):0,backgroundColor:COLORS.navy},
  screen:{flex:1,backgroundColor:COLORS.bg},
  header:{height:72,backgroundColor:COLORS.navy,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18},
  headerLogo:{width:190,height:58},
  headerBadge:{backgroundColor:COLORS.gold,borderRadius:18,paddingHorizontal:12,paddingVertical:7},
  headerBadgeText:{color:COLORS.navy,fontWeight:'900',fontSize:12},
  contentPad:{padding:18,paddingBottom:28},
  h1:{fontSize:30,fontWeight:'900',color:COLORS.text,letterSpacing:-0.5},
  subtitle:{fontSize:15,color:COLORS.muted,marginTop:4,marginBottom:18},
  greetingRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  avatar:{width:54,height:54,borderRadius:27,backgroundColor:COLORS.gold,alignItems:'center',justifyContent:'center'},
  avatarText:{fontSize:28,color:COLORS.navy},
  hero:{backgroundColor:COLORS.navy2,borderRadius:24,padding:20,marginTop:14},
  heroEyebrow:{fontSize:11,color:COLORS.gold2,fontWeight:'900',letterSpacing:1},
  heroBig:{fontSize:22,color:COLORS.white,fontWeight:'900',marginTop:5,marginBottom:10},
  heroSmall:{fontSize:12,color:'#C8D7E7',fontWeight:'700'},
  progressTrack:{height:9,backgroundColor:'#DCE4EC',borderRadius:99,overflow:'hidden',marginVertical:10},
  progressFill:{height:'100%',backgroundColor:COLORS.gold,borderRadius:99},
  statsRow:{flexDirection:'row',gap:8,marginTop:10},
  statCard:{flex:1,backgroundColor:'#113B67',borderRadius:16,padding:12,alignItems:'center'},
  statIcon:{fontSize:18},statValue:{fontSize:17,fontWeight:'900',color:COLORS.white,marginTop:3},statLabel:{fontSize:10,color:'#C8D7E7',marginTop:2},
  sectionTitle:{fontSize:20,fontWeight:'900',color:COLORS.text,marginTop:22,marginBottom:10},
  lessonFeature:{backgroundColor:COLORS.white,borderRadius:22,padding:12,flexDirection:'row',gap:13,borderWidth:1,borderColor:COLORS.line},
  featureThumb:{width:105,height:130,borderRadius:16,backgroundColor:COLORS.navy},
  tag:{fontSize:11,fontWeight:'900',color:COLORS.gold,letterSpacing:0.7,marginTop:2},
  cardTitle:{fontSize:17,fontWeight:'900',color:COLORS.text,marginTop:4},
  bodyMuted:{fontSize:13,color:COLORS.muted,marginTop:4},
  primaryBtn:{borderRadius:14,minHeight:48,alignItems:'center',justifyContent:'center',paddingHorizontal:16,marginTop:10},
  primaryBtnText:{fontSize:15,fontWeight:'900'},
  quickGrid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  quickCard:{width:'48.5%',borderRadius:19,padding:17,minHeight:105,justifyContent:'space-between'},
  quickIcon:{fontSize:28},quickTitle:{fontSize:17,fontWeight:'900',color:COLORS.white},
  missionCard:{backgroundColor:COLORS.white,borderRadius:20,padding:16,flexDirection:'row',alignItems:'center',gap:12,borderWidth:1,borderColor:COLORS.line},
  missionIcon:{width:48,height:48,borderRadius:15,backgroundColor:'#FFF3CF',alignItems:'center',justifyContent:'center'},
  xpPill:{backgroundColor:'#FFF0BF',color:'#875A00',fontWeight:'900',fontSize:12,paddingHorizontal:11,paddingVertical:7,borderRadius:99},
  lessonCard:{backgroundColor:COLORS.white,borderRadius:20,padding:11,flexDirection:'row',gap:12,marginBottom:12,borderWidth:1,borderColor:COLORS.line},
  lessonThumb:{width:100,height:92,borderRadius:14,backgroundColor:COLORS.navy},
  rowBetween:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  status:{fontSize:11,fontWeight:'900'},
  backLink:{fontSize:14,fontWeight:'900',color:COLORS.blue,marginBottom:13},
  videoShell:{backgroundColor:'#000',borderRadius:20,overflow:'hidden',marginTop:12},
  video:{width:'100%',height:220},
  lessonInfoCard:{backgroundColor:COLORS.white,borderRadius:20,padding:8,marginTop:14,borderWidth:1,borderColor:COLORS.line},
  infoLine:{flexDirection:'row',alignItems:'center',gap:12,padding:12,borderBottomWidth:1,borderBottomColor:'#EEF2F6'},
  infoIcon:{fontSize:22,width:30,textAlign:'center',color:COLORS.gold},
  infoTitle:{fontSize:15,fontWeight:'900',color:COLORS.text},
  challengeCard:{backgroundColor:COLORS.white,borderRadius:20,padding:15,marginBottom:11,flexDirection:'row',alignItems:'center',gap:12,borderWidth:1,borderColor:COLORS.line},
  challengeIcon:{width:48,height:48,borderRadius:15,backgroundColor:'#F1F5F9',alignItems:'center',justifyContent:'center'},
  duelCard:{borderRadius:22,padding:19,marginBottom:13,flexDirection:'row',alignItems:'center',gap:14},
  duelIcon:{fontSize:34},duelTitle:{fontSize:20,fontWeight:'900',color:COLORS.white},duelSub:{fontSize:13,color:'#F2F6FA',marginTop:4},duelArrow:{fontSize:34,color:COLORS.white},
  boardWrap:{width:BOARD,height:BOARD,alignSelf:'center',flexDirection:'row',flexWrap:'wrap',borderRadius:10,overflow:'hidden',borderWidth:4,borderColor:COLORS.navy},
  square:{width:'12.5%',height:'12.5%',alignItems:'center',justifyContent:'center'},
  piece:{fontSize:Math.max(27,BOARD/12.3),fontWeight:'600'},
  boardMessage:{backgroundColor:COLORS.white,borderRadius:14,padding:13,marginTop:12,borderWidth:1,borderColor:COLORS.line},
  boardMessageText:{fontSize:14,fontWeight:'800',color:COLORS.text,textAlign:'center'},
  statsGrid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  bigStat:{width:'48.5%',backgroundColor:COLORS.white,borderRadius:18,padding:16,borderWidth:1,borderColor:COLORS.line},
  bigStatIcon:{fontSize:22},bigStatValue:{fontSize:24,fontWeight:'900',color:COLORS.text,marginTop:4},bigStatLabel:{fontSize:12,color:COLORS.muted,marginTop:3},
  chartCard:{backgroundColor:COLORS.white,borderRadius:20,padding:18,borderWidth:1,borderColor:COLORS.line},
  chartBars:{fontSize:50,color:COLORS.blue,letterSpacing:12},
  profileCard:{backgroundColor:COLORS.white,borderRadius:24,padding:22,alignItems:'center',borderWidth:1,borderColor:COLORS.line,marginTop:14},
  profileAvatar:{width:90,height:90,borderRadius:45,backgroundColor:COLORS.navy,alignItems:'center',justifyContent:'center'},
  profileAvatarText:{fontSize:54,color:COLORS.gold},profileName:{fontSize:22,fontWeight:'900',color:COLORS.text,marginTop:10},
  profileXP:{backgroundColor:'#FFF3CF',borderRadius:99,paddingHorizontal:16,paddingVertical:8,marginTop:12},
  profileXPText:{fontWeight:'900',color:'#815800'},
  menuCard:{backgroundColor:COLORS.white,borderRadius:20,padding:4,marginTop:14,borderWidth:1,borderColor:COLORS.line},
  navSafe:{backgroundColor:COLORS.white,paddingBottom:Platform.OS==='android'?18:8,borderTopWidth:1,borderTopColor:COLORS.line},
  nav:{height:66,flexDirection:'row',alignItems:'center'},
  navItem:{flex:1,alignItems:'center',justifyContent:'center'},
  navIcon:{fontSize:20,fontWeight:'900'},navLabel:{fontSize:8.5,fontWeight:'800',marginTop:3},
  loginSafe:{flex:1,backgroundColor:COLORS.navy},
  loginWrap:{flex:1,backgroundColor:COLORS.navy,paddingTop:Platform.OS==='android'?(StatusBar.currentHeight||24):20,paddingHorizontal:24,alignItems:'center',justifyContent:'center'},
  loginLogo:{width:300,height:210},loginTitle:{fontSize:30,fontWeight:'900',color:COLORS.white,marginTop:4},
  loginSub:{fontSize:13,color:'#D8E4F0',marginTop:4,marginBottom:22},
  loginCard:{width:'100%',backgroundColor:COLORS.white,borderRadius:24,padding:20},
  fieldLabel:{fontSize:12,fontWeight:'900',color:COLORS.muted,marginBottom:6,marginTop:8},
  fakeInput:{height:50,borderRadius:13,borderWidth:1,borderColor:COLORS.line,justifyContent:'center',paddingHorizontal:14,backgroundColor:'#FAFCFE'},
  fakeInputText:{fontSize:16,fontWeight:'800',color:COLORS.text},
  demoHint:{fontSize:11,color:COLORS.muted,textAlign:'center',marginTop:12}
});
