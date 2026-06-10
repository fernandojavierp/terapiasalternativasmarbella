// scripts/migrate-testimonios.ts
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()
import { createClient } from '@supabase/supabase-js'

// Crear cliente usando variables de entorno para uso fuera de Next.js
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en entorno. Aborta.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const testimoniosJSON = [
  {
    "id": 1,
    "nombre": "Yolanda VD.",
    "email": "yolanda@example.com",
    "testimonio": "Siempre me ha interesado el mundo de las terapias alternativas, pero me costaba mucho encontrar a la persona o lugar adecuado. Hoy doy las gracias de tener a Inés en mi vida, es a la persona en quién más confío para entregarme a lo que venga. Se sale de su consulta flotando, llena de energía y diferentes perspectivas. Ya se lo recomendé a vari@s amig@s y familiares, por lo que lo recomiendo igual a cualquiera que tenga algo de curiosidad, merece muchísimo probar con ella, además que cada sesión es toda una experiencia en sí misma. Muchísimas gracias por todo, una gozada siempre ponerme en tus manos🙏🏼🧡",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-01-15"
  },
  {
    "id": 2,
    "nombre": "Victoria Jaramillo Gutiérrez",
    "email": "victoria@example.com",
    "testimonio": "Me siento flotando como en una nube... la sensación de que todo está bien y todo va a ir bien... es un despertar y una sensación increíble e indescriptible al 100%, pero es como si toda preocupación o desestabilización volviera a ponerse todo en donde tiene que estar. Sin ninguna duda, las terapias alternativas son la mejor opción ante cualquier malestar emocional o físico. Sin olvidarnos de que Inés es increíble en todos los aspectos, con ella te sientes en paz y en las mejores manos. La quiero tener siempre en mi vida y todas sus terapias♥",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-01-20"
  },
  {
    "id": 3,
    "nombre": "Clarice",
    "email": "clarice@example.com",
    "testimonio": "Tuve la suerte de conocer a Inés gracias a una amiga. Recuerdo perfectamente la sensación de paz y relajación desde la primera sesión: con solo su presencia, su tacto y su voz, logra llevarte a un estado de calma profunda. Ahora vivo fuera de España y, en un momento de bajón, me atendió online… y aunque no fue presencial, noté una mejora tanto física como emocional. Incluso le regalé una sesión a mi madre, que es bastante escéptica con las terapias naturales, y salió feliz y completamente relajada. Súper encantada contigo, Inés. ¡Qué ganas de volver a España para tener otra consulta presencial contigo! 🙏💫",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-01-25"
  },
  {
    "id": 4,
    "nombre": "Inma Sánchez",
    "email": "inma@example.com",
    "testimonio": "Después de cada sesión con Inés he sentido un cambio espectacular, sobre todo en mi forma de sobrellevar las cosas, con más fluidez y comprensión. La última especialmente me desbloqueó a nivel tan profundo que hasta mi psicóloga me dio la enhorabuena por el cambio, sintiendo ella no haber podido ayudarme hasta ese nivel tan profundo. Estoy muy agradecida a Inés por su ayuda y sobre todo porque es una persona muy cariñosa y atenta, gracias 😘",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-02-01"
  },
  {
    "id": 5,
    "nombre": "Loli Reyes",
    "email": "loli@example.com",
    "testimonio": "Hola, quería compartirte que Inés es una terapeuta excelente. Me ha ayudado muchísimo, especialmente con el sueño y la intolerancia. Trabaja con mucho cariño y dedicación, y algo que valoro mucho es que no está pendiente del reloj: si necesita estar un poco más contigo, lo hace sin problema. La recomiendo al 100%, ha sido un verdadero apoyo para mí, gracias Inés.",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-02-05"
  },
  {
    "id": 6,
    "nombre": "María del Carmen Morales Rodríguez",
    "email": "maria@example.com",
    "testimonio": "Todas las terapias con Inés super bien, me ha ayudado a encontrarme bastante mejor tanto anímicamente como físicamente. Sí lo recomendaría, te ayuda bastante a superar barreras que tienes y no conocías!!!",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-02-10"
  },
  {
    "id": 7,
    "nombre": "Raúl Fernández Rodríguez",
    "email": "raul@example.com",
    "testimonio": "Sentí en la sesión confianza para dejar fluir. La paz surgía de mi interior. La sensación me continuó por varios días. Una labor hermosa y encomiable la que realiza la Sra. Inés Uría. Gracias. Volvería a repetir. Por su dedicación y buen hacer.",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-02-15"
  },
  {
    "id": 8,
    "nombre": "Claudia Ferrari",
    "email": "claudia@example.com",
    "testimonio": "Buenos días!!! Aquí va mi opinión: Quiero dar gracias a la vida por poner a Inés en mi camino, es una excelente profesional capaz de captar tus necesidades y aplicar la terapia que mejor te va en cada momento y siempre con resultados maravillosos. Muchas gracias!!! 🙏🙏🙏",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-02-20"
  },
  {
    "id": 9,
    "nombre": "Lydia",
    "email": "lydia@example.com",
    "testimonio": "Mi experiencia con Inés fue encantadora, la recomiendo sin duda. Una persona agradable, que te hace poder sanar todo tu interior y llegar a conseguir la paz y sanación. Propusimos varios objetivos y todos tuvieron buenos resultados, me encantó compartir con ella y pronto volveré 💕",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-02-25"
  },
  {
    "id": 10,
    "nombre": "Sandra Maderal",
    "email": "sandra@example.com",
    "testimonio": "Conocí a Inés de casualidad por Instagram, desde el día que la conocí fue como si nos conociésemos de toda la vida. Es una maravillosa persona y profesional. Después de mi terapia con ella, la cual me trató durante toda una mañana, salí del centro relajada, como en una nube, como si me quitasen un gran peso de encima. La terapia me vino genial para saber gestionar y soltar cosas. Además de unos consejos que me han venido súper bien y que practico semanalmente. Agradecida de conocerte y de tenerte en mi vida Inés 💖",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-03-01"
  },
  {
    "id": 11,
    "nombre": "Miriam Beldarrain Uría",
    "email": "miriam@example.com",
    "testimonio": "Tuve la suerte de estar en terapias con Inés. Es espectacular como profesional y qué decir como persona!!!!!! Su presencia, su voz.....te relajan tanto....que te transporta a otro lugar! Se lo recomiendo a todos y todas. Muchas gracias por todo Inés.",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-03-05"
  },
  {
    "id": 12,
    "nombre": "Inga",
    "email": "inga@example.com",
    "testimonio": "Te agradezco muchísimo Inés por esa terapia!! Me siento liberada, siento que me quitaste un saco de piedras. Todo el camino de Marbella hasta la cala me lloré de liberación que sentía. Mil gracias por todo lo que me hiciste! Te admiro 😘❤",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-03-10"
  },
  {
    "id": 13,
    "nombre": "Anónimo",
    "email": "anonimo@example.com",
    "testimonio": "Buenos días, buenas tardes a todos los lectores, amigos y amigas de Inés! Paso por aquí para dejar mi testimonio. Hace unos meses Inés me dirigió en una 'Hipnosis regresiva'. Ya había tenido visiones de partes de mis vidas anteriores, sin embargo con la ayuda de nuestra amiga, mi hermana de otras vidas, pude revivir fragmentos más completos de diferentes vidas anteriores a la actual y descubrir el origen de traumas que estaba sufriendo en esta vida actual. Ahora que han pasado algunos meses de esta regresión, sigo viendo las imágenes, sigo consciente de cómo me sentía tanto en las vidas/experiencias pasadas, como en el momento de la regresión, sin embargo me liberé de lo que me atormentaba a causa de lo vivido... En todo momento Inés estaba a mi vera, tomando notas de mis visiones, de mis palabras y hablando suavemente a mi alma para dirigirla en el viaje de sanación! Hoy en día sigo sintiéndome liberada de lo que me atormentaba. No me he olvidado de nada! Al contrario, he recordado todo lo que estaba borrado de mis recuerdos... Recomiendo al 100% las diferentes terapias con Inés, ya que he tenido el placer de experimentar varias de ellas y todas fueron una liberación de alguna parte de mi Ser. ¡Gracias! ¡Gracias! ¡Gracias hermanita! Te quiero mucho!! P.D.: Inés no es mi hermana en esta vida actual, aunque nos conocemos desde hace más de dos décadas! Pero después de la hipnosis, supe que éramos hermanas en otras vidas!",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-03-10"
  },
  {
    "id": 14,
    "nombre": "Anónimo",
    "email": "anonimo2@example.com",
    "testimonio": "Hola Inés! Quiero agradecerte lo bien que me has hecho sentir en las sesiones que he tenido, tu trato fue exquisito!!! He solucionado mi problema digestivo y de malestar en general!! Además la sesión final de coaching me abrió los ojos a mi futuro próximo, y me abrió puertas que no había visto! Ya no dudo en llevar a buen puerto el negocio que estoy creando!!! Muchas gracias!!! Abrazo enorme ❤️",
    "puntuacion": 5,
    "aprobado": true,
    "visible": true,
    "fecha": "2024-03-15"
  },
  {
    "id": "1760291701037",
    "nombre": "fernando patete",
    "email": "fpatetegonzalez@gmail.com",
    "contenido": "test",
    "calificacion": 5,
    "fechaCreacion": "2025-10-12T17:55:01.037Z",
    "aprobado": false,
    "visible": true
  }

  
];

async function migrateTestimonios() {
  try {
    console.log('Iniciando migración de testimonios...');
    
    for (const testimonio of testimoniosJSON) {
      // Evitar duplicados comprobando si ya existe un registro con el mismo nombre y email
      const { data: existing, error: checkError } = await supabase
        .from('testimonios')
        .select('id')
        .eq('nombre', testimonio.nombre)
        .eq('email', testimonio.email)
        .limit(1);

      if (checkError) {
        console.error(`Error verificando existencia para ${testimonio.nombre}:`, checkError);
      }

      if (existing && existing.length > 0) {
        console.log(`ℹ️ ${testimonio.nombre} ya migrado previamente (saltando)`);
        continue;
      }

      // Normalizar estructura del JSON (soporta formato original y formato nuevo)
      const testimonioSupabase = {
        nombre: testimonio.nombre,
        email: testimonio.email,
        contenido: testimonio.contenido || testimonio.testimonio, // Mapear contenido o testimonio
        calificacion: testimonio.calificacion ?? testimonio.puntuacion, // Mapear calificacion o puntuacion
        aprobado: testimonio.aprobado,
        visible: testimonio.visible,
        fecha_creacion: testimonio.fechaCreacion || (testimonio.fecha ? testimonio.fecha + 'T00:00:00Z' : new Date().toISOString())
      };

      const { data, error } = await supabase
        .from('testimonios')
        .insert([testimonioSupabase])
        .select();

      if (error) {
        console.error(`Error insertando testimonio de ${testimonio.nombre}:`, error);
      } else {
        console.log(`✅ ${testimonio.nombre} migrado`);
      }
    }
    
    console.log('Migración completada!');
  } catch (error) {
    console.error('Error en migración:', error);
  }
}

migrateTestimonios();