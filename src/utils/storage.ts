import { Alert } from 'react-native';
import { get, push, ref, set } from 'firebase/database';
import { auth, db } from '../../firebase/config';
import { Resultado } from '../types/navigation';

export type HighScore = Resultado;

type ScoreEntry = {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  category: string;
};

const RESULTS_PATH = 'resultados';
const SCORES_PATH = 'puntajes';

export async function saveScore(entry: ScoreEntry): Promise<void> {
  const usuarioActual = auth.currentUser;

  if (!usuarioActual) {
    Alert.alert('Error', 'No existe una sesión activa');
    return;
  }

  const uid = usuarioActual.uid;
  let nick = usuarioActual.email ?? 'Sin nick';

  try {
    const usuarioSnapshot = await get(ref(db, `usuarios/${uid}`));
    const usuario = usuarioSnapshot.val();
    nick = usuario?.nick ?? nick;
  } catch {
    // Si no se puede leer el usuario, igual se guarda el puntaje.
  }

  const nuevaReferencia = push(ref(db, RESULTS_PATH));
  const id = nuevaReferencia.key ?? Date.now().toString();
  const resultado = {
    uid: uid,
    nick: nick,
    correo: usuarioActual.email ?? '',
    puntaje: entry.score,
    respuestasCorrectas: entry.correctAnswers,
    totalPreguntas: entry.totalQuestions,
    categoria: entry.category,
    fecha: new Date().toLocaleDateString('es-MX'),
    creadoEn: Date.now(),
  };

  const guardados = await Promise.allSettled([
    set(nuevaReferencia, resultado),
    set(ref(db, `${SCORES_PATH}/${id}`), resultado),
    set(ref(db, `usuarios/${uid}/puntajes/${id}`), resultado),
  ]);

  const seGuardo = guardados.some((guardado) => guardado.status === 'fulfilled');

  if (!seGuardo) {
    throw new Error('No se pudo guardar el puntaje en Firebase');
  }
}

export async function getScores(): Promise<HighScore[]> {
  const listaResultados = await leerResultadosSeguro(RESULTS_PATH);
  const listaPuntajes = await leerResultadosSeguro(SCORES_PATH);
  let listaUsuarios: HighScore[] = [];
  let listaUsuarioActual: HighScore[] = [];

  try {
    listaUsuarios = await leerResultadosUsuarios();
  } catch {
    listaUsuarios = [];
  }

  try {
    listaUsuarioActual = await leerResultadosUsuarioActual();
  } catch {
    listaUsuarioActual = [];
  }

  const lista = [...listaResultados, ...listaPuntajes, ...listaUsuarios, ...listaUsuarioActual];
  const resultadosUnicos = lista.filter((item, index, array) => (
    array.findIndex((otro) => otro.id === item.id && otro.uid === item.uid) === index
  ));

  return resultadosUnicos.sort((a, b) => b.puntaje - a.puntaje);
}

async function leerResultadosSeguro(ruta: string): Promise<HighScore[]> {
  try {
    return await leerResultados(ruta);
  } catch {
    return [];
  }
}

async function leerResultados(ruta: string): Promise<HighScore[]> {
  const snapshot = await get(ref(db, ruta));

  if (!snapshot.exists()) return [];

  return convertirResultados(snapshot.val());
}

async function leerResultadosUsuarioActual(): Promise<HighScore[]> {
  const usuarioActual = auth.currentUser;

  if (!usuarioActual) return [];

  const snapshot = await get(ref(db, `usuarios/${usuarioActual.uid}/puntajes`));

  if (!snapshot.exists()) return [];

  return convertirResultados(snapshot.val(), usuarioActual.uid, usuarioActual.email ?? 'Sin nick');
}

async function leerResultadosUsuarios(): Promise<HighScore[]> {
  const snapshot = await get(ref(db, 'usuarios'));

  if (!snapshot.exists()) return [];

  const usuarios = snapshot.val();
  return Object.keys(usuarios).flatMap((uid) => {
    const usuario = usuarios[uid];
    return convertirResultados(usuario?.puntajes ?? {}, uid, usuario?.nick);
  });
}

function convertirResultados(
  datos: Record<string, any>,
  uidPorDefecto = '',
  nickPorDefecto = 'Sin nick'
): HighScore[] {
  return Object.keys(datos).map((id) => ({
    id: id,
    uid: datos[id]?.uid ?? uidPorDefecto,
    nick: datos[id]?.nick ?? nickPorDefecto,
    puntaje: Number(datos[id]?.puntaje ?? 0),
    respuestasCorrectas: Number(datos[id]?.respuestasCorrectas ?? 0),
    totalPreguntas: Number(datos[id]?.totalPreguntas ?? 0),
    categoria: datos[id]?.categoria ?? '',
    fecha: datos[id]?.fecha ?? '',
  })) as HighScore[];
}
