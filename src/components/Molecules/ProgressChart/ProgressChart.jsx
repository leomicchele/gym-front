import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ProgressChart.css';

// Registrar los componentes que necesita Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart = ({ historial }) => {
  const [chartData, setChartData] = useState(null);
  const [weeklyChartData, setWeeklyChartData] = useState(null);
  const [vistaActiva, setVistaActiva] = useState('diaria');
  const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState(null);
  const [datosSemanaFiltrados, setDatosSemanaFiltrados] = useState(null);

  useEffect(() => {
    if (!historial || historial.length === 0) return;

    // Recopilamos todos los ejercicios disponibles
    const todosEjercicios = new Set();
    historial.forEach(dia => {
      dia.ejerciciosRealizados.forEach(ejercicio => {
        // Excluir ejercicios que son biseries
        if (!ejercicio.esBiserie) {
          todosEjercicios.add(ejercicio.ejercicio);
        }
      });
    });
    const ejerciciosArray = Array.from(todosEjercicios);
    setEjerciciosDisponibles(ejerciciosArray);
    
    // Establecer el primer ejercicio como seleccionado por defecto
    if (ejerciciosArray.length > 0 && !ejercicioSeleccionado) {
      setEjercicioSeleccionado(ejerciciosArray[0]);
    }

    // Obtener todas las fechas únicas ordenadas
    const todasFechas = [...new Set(
      historial.map(dia => dia.fecha)
    )].sort((a, b) => {
      const [diaA, mesA, yearA] = a.split('/');
      const [diaB, mesB, yearB] = b.split('/');
      return new Date(`${yearA || 2024}-${mesA}-${diaA || 1}`) - new Date(`${yearB || 2024}-${mesB}-${diaB || 1}`);
    });

    // Estructura de datos para almacenar los ejercicios y sus valores
    const ejerciciosData = {};
    const ejerciciosWeeklyData = {};

    // Mapeo de fechas a semanas
    const fechaASemana = {};
    todasFechas.forEach(fecha => {
      const [diaParte, mesParte, yearParte] = fecha.split('/');
      const fechaObj = new Date(`${yearParte || new Date().getFullYear()}-${mesParte}-${diaParte || "1"}`);
      const semana = getSemanaAnio(fechaObj);
      fechaASemana[fecha] = `Semana ${semana}`;
    });

    // Inicializar todos los ejercicios
    ejerciciosArray.forEach(ejercicio => {
      ejerciciosData[ejercicio] = {
        fechas: [],
        maxKilos: [],
        fechaInicio: null,
        fechaFin: null
      };
      
      ejerciciosWeeklyData[ejercicio] = {
        semanas: [],
        maxKilos: [],
        semanaInicio: null,
        semanaFin: null
      };
    });

    // Procesar historial para obtener ejercicios y sus progresos
    historial.forEach(dia => {
      const fecha = dia.fecha;
      const semanaLabel = fechaASemana[fecha];
      
      // Recopilamos ejercicios de este día
      const ejerciciosDelDia = new Set(dia.ejerciciosRealizados.map(e => e.ejercicio));
      
      dia.ejerciciosRealizados.forEach(ejercicio => {
        // Ignorar ejercicios que son biseries
        if (ejercicio.esBiserie) return;
        
        const nombreEjercicio = ejercicio.ejercicio;
        
        // Obtenemos el valor máximo de kilos para cada ejercicio
        const maxKilo = ejercicio.kilos.length > 0 
          ? Math.max(...ejercicio.kilos.map(k => parseFloat(k) || 0))
          : 0;
        
        // Si es la primera vez que vemos este ejercicio, establecemos la fechaInicio
        if (ejerciciosData[nombreEjercicio].fechaInicio === null) {
          ejerciciosData[nombreEjercicio].fechaInicio = fecha;
        }
        
        // Siempre actualizamos la fechaFin para que sea la última fecha vista
        ejerciciosData[nombreEjercicio].fechaFin = fecha;
        
        // Agregamos la fecha y el valor máximo para la vista diaria
        ejerciciosData[nombreEjercicio].fechas.push(fecha);
        ejerciciosData[nombreEjercicio].maxKilos.push(maxKilo);
        
        // Para la vista semanal
        if (!ejerciciosWeeklyData[nombreEjercicio].semanas.includes(semanaLabel)) {
          // Si es la primera vez que vemos este ejercicio en una semana, establecemos semanaInicio
          if (ejerciciosWeeklyData[nombreEjercicio].semanaInicio === null) {
            ejerciciosWeeklyData[nombreEjercicio].semanaInicio = semanaLabel;
          }
          
          // Siempre actualizamos semanaFin para que sea la última semana vista
          ejerciciosWeeklyData[nombreEjercicio].semanaFin = semanaLabel;
          
          ejerciciosWeeklyData[nombreEjercicio].semanas.push(semanaLabel);
          ejerciciosWeeklyData[nombreEjercicio].maxKilos.push(maxKilo);
        } else {
          // Actualizamos solo si el nuevo valor es mayor
          const semanaIndex = ejerciciosWeeklyData[nombreEjercicio].semanas.indexOf(semanaLabel);
          if (maxKilo > ejerciciosWeeklyData[nombreEjercicio].maxKilos[semanaIndex]) {
            ejerciciosWeeklyData[nombreEjercicio].maxKilos[semanaIndex] = maxKilo;
          }
        }
      });
    });

    // Configuración de colores para las líneas
    const colors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 206, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)'
    ];

    // --- CONFIGURACIÓN PARA LA VISTA DIARIA ---
    
    // Crear los datasets para el gráfico diario
    const datasets = Object.keys(ejerciciosData).map((ejercicio, index) => {
      const color = colors[index % colors.length];
      
      // Crear un dataset con datos nulos, excepto para las fechas en que el ejercicio existe
      const ejercicioData = {};
      
      // Crear objeto de datos con valor null para todas las fechas
      todasFechas.forEach(fecha => {
        ejercicioData[fecha] = null;
      });
      
      // Actualizar solo las fechas que tienen datos reales
      ejerciciosData[ejercicio].fechas.forEach((fecha, i) => {
        ejercicioData[fecha] = ejerciciosData[ejercicio].maxKilos[i];
      });
      
      // Crear array de datos en el orden correcto
      const datosOrdenados = todasFechas.map(fecha => ejercicioData[fecha]);
      
      return {
        label: ejercicio,
        data: datosOrdenados,
        borderColor: color,
        backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.2)'),
        tension: 0.3,
        spanGaps: true // Esto permite que la línea salte sobre valores null
      };
    });

    // Configurar datos del gráfico diario
    setChartData({
      labels: todasFechas,
      datasets,
      ejerciciosData
    });
    
    // --- CONFIGURACIÓN PARA LA VISTA SEMANAL ---
    
    // Obtener todas las semanas únicas ordenadas
    const todasSemanas = [...new Set(Object.values(fechaASemana))].sort((a, b) => {
      const semanaNroA = parseInt(a.split(' ')[1]);
      const semanaNroB = parseInt(b.split(' ')[1]);
      return semanaNroA - semanaNroB;
    });
    
    // Crear los datasets para el gráfico semanal
    const weeklyDatasets = Object.keys(ejerciciosWeeklyData).map((ejercicio, index) => {
      const color = colors[index % colors.length];
      
      // Crear un dataset con datos nulos, excepto para las semanas en que el ejercicio existe
      const ejercicioData = {};
      
      // Crear objeto de datos con valor null para todas las semanas
      todasSemanas.forEach(semana => {
        ejercicioData[semana] = null;
      });
      
      // Actualizar solo las semanas que tienen datos reales
      ejerciciosWeeklyData[ejercicio].semanas.forEach((semana, i) => {
        ejercicioData[semana] = ejerciciosWeeklyData[ejercicio].maxKilos[i];
      });
      
      // Crear array de datos en el orden correcto
      const datosOrdenados = todasSemanas.map(semana => ejercicioData[semana]);
      
      return {
        label: ejercicio,
        data: datosOrdenados,
        borderColor: color,
        backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.2)'),
        tension: 0.3,
        spanGaps: true // Esto permite que la línea salte sobre valores null
      };
    });
    
    // Configurar datos del gráfico semanal
    setWeeklyChartData({
      labels: todasSemanas,
      datasets: weeklyDatasets,
      ejerciciosWeeklyData
    });
  }, [historial, ejercicioSeleccionado]);

  // Filtra los datos según el ejercicio seleccionado
  useEffect(() => {
    if (!chartData || !weeklyChartData || !ejercicioSeleccionado) return;
    
    const colors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 206, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(255, 159, 64)'
    ];

    // Buscar el índice del ejercicio seleccionado para mantener el mismo color
    const ejercicioIndex = chartData.datasets.findIndex(dataset => dataset.label === ejercicioSeleccionado);
    const color = colors[ejercicioIndex !== -1 ? ejercicioIndex % colors.length : 0];

    // Filtrar datos diarios
    const datasetFiltrado = chartData.datasets.filter(dataset => 
      dataset.label === ejercicioSeleccionado
    ).map(dataset => ({
      ...dataset,
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.2)')
    }));
    
    setDatosFiltrados({
      labels: chartData.labels,
      datasets: datasetFiltrado
    });
    
    // Filtrar datos semanales
    const datasetSemanaFiltrado = weeklyChartData.datasets.filter(dataset => 
      dataset.label === ejercicioSeleccionado
    ).map(dataset => ({
      ...dataset,
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.2)')
    }));
    
    setDatosSemanaFiltrados({
      labels: weeklyChartData.labels,
      datasets: datasetSemanaFiltrado
    });
  }, [ejercicioSeleccionado, chartData, weeklyChartData]);

  // Obtener el número de semana del año
  const getSemanaAnio = (fecha) => {
    const primerDia = new Date(fecha.getFullYear(), 0, 1);
    const dias = Math.floor((fecha - primerDia) / (24 * 60 * 60 * 1000));
    return Math.ceil((dias + primerDia.getDay() + 1) / 7);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar leyenda ya que sólo mostramos un ejercicio
      },
      title: {
        display: true,
        text: vistaActiva === 'diaria' ? 'Progreso por Fecha' : 'Progreso por Semana',
        font: {
          size: 14 // Tamaño más pequeño para móviles
        }
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return vistaActiva === 'diaria' 
              ? `Fecha: ${context[0].label}` 
              : context[0].label;
          },
          label: (context) => {
            // Solo mostrar valor si no es null
            if (context.parsed.y !== null) {
              return `${context.parsed.y} kg`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Kilos (máximo)'
        },
        beginAtZero: true
      },
      x: {
        title: {
          display: true,
          text: vistaActiva === 'diaria' ? 'Fecha' : 'Semana'
        },
        ticks: {
          maxRotation: 45, // Rotar las etiquetas para ahorrar espacio
          minRotation: 45
        }
      }
    }
  };

  const handleCambioEjercicio = (e) => {
    setEjercicioSeleccionado(e.target.value);
  };

  if (!chartData || !weeklyChartData || !datosFiltrados || !datosSemanaFiltrados || !ejercicioSeleccionado) {
    return <div className="my-4 text-center">Cargando gráfico...</div>;
  }

  return (
    <div className="progress-chart-container my-4">
      <h6 className=" fw-semibold text-start mb-3 text-primary">
        <i className="bi bi-bar-chart-line me-2"></i>
        Gráfico de Progreso
      </h6>
      
      <div className="chart-controls mb-1">
        <div className="row">
          <div className="col-12">
            {/* <label htmlFor="selector-ejercicio" className="form-label">
              <i className="bi bi-dumbbell me-1"></i> Seleccionar ejercicio:
            </label> */}
            <div className="input-group mb-1">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <select 
                id="selector-ejercicio"
                className="form-select" 
                value={ejercicioSeleccionado}
                onChange={handleCambioEjercicio}
                aria-label="Seleccionar ejercicio"
              >
                {ejerciciosDisponibles.map((ejercicio, index) => (
                  <option key={index} value={ejercicio}>{ejercicio}</option>
                ))}
              </select>
            </div>
            <small className="form-text text-muted mt-1">
              <i className="bi bi-info-circle-fill me-1"></i>
              Selecciona un ejercicio para visualizar su progreso
            </small>
          </div>
          
          {/* <div className="col-12 mb-3">
            <label className="form-label">
              <i className="bi bi-calendar-week me-1"></i> Tipo de vista:
            </label>
            <div className="btn-group w-100" role="group">
              <button 
                type="button" 
                className={`btn ${vistaActiva === 'diaria' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setVistaActiva('diaria')}
              >
                <i className="bi bi-calendar-date me-1"></i> Vista Fecha
              </button>
              <button 
                type="button" 
                className={`btn ${vistaActiva === 'semanal' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setVistaActiva('semanal')}
              >
                <i className="bi bi-calendar-week me-1"></i> Vista Semanal
              </button>
            </div>
          </div> */}
        </div>
      </div>
      
      {/* <div className="selected-exercise-info mb-3">
        <h6 className="text-primary mb-0">
          <i className="bi bi-graph-up-arrow me-2"></i> {ejercicioSeleccionado}
        </h6>
      </div> */}
      
      <div className="chart-wrapper">
        <Line 
          data={vistaActiva === 'diaria' ? datosFiltrados : datosSemanaFiltrados} 
          options={options} 
        />
      </div>
      
      <div className="mt-3 fst-italic small text-muted">
        <i className="bi bi-info-circle me-1"></i>
        {vistaActiva === 'diaria' 
          ? `Visualización del peso máximo utilizado para ${ejercicioSeleccionado} por día.`
          : `Visualización del peso máximo utilizado para ${ejercicioSeleccionado} por semana.`
        }
      </div>

      {/* <div className="mt-2 text-center d-block d-md-none small text-muted">
        <i className="bi bi-arrows-angle-expand me-1"></i>
        Toca el gráfico para ampliarlo
      </div> */}
    </div>
  );
};

export default ProgressChart; 