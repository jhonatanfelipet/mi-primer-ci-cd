# ⚙️ CI/CD Pipelines & Automation Lab with GitHub Actions

[![CI Python](https://github.com/jhonatanfelipet/mi-primer-ci-cd/actions/workflows/ci-python.yml/badge.svg)](https://github.com/jhonatanfelipet/mi-primer-ci-cd/actions/workflows/ci-python.yml)
[![Docker Build](https://github.com/jhonatanfelipet/mi-primer-ci-cd/actions/workflows/docker-build.yml/badge.svg)](https://github.com/jhonatanfelipet/mi-primer-ci-cd/actions/workflows/docker-build.yml)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=flat&logo=githubactions&logoColor=white)](https://github.com/features/actions)

Laboratorio integral de Integración Continua y Despliegue Continuo (CI/CD) utilizando **GitHub Actions**. Este repositorio cubre desde pruebas unitarias automatizadas con cobertura de código y matrices de entornos, hasta construcción de imágenes en contenedores, publicación en GitHub Container Registry (GHCR) y gestión de *Self-Hosted Runners*.

---

## 🎯 Objetivos del Proyecto

- **Automatización del ciclo de vida del software**: Validar cambios en cada `push` o `pull_request`.
- **Estrategias de prueba**: Pruebas unitarias con `pytest`, fixtures y generación de reportes de cobertura (`pytest-cov`).
- **Pruebas en Matriz**: Validación cruzada en múltiples versiones del runtime de Python.
- **Empaquetado y Registro de Contenedores**: Construcción de imágenes Docker seguras y publicación automatizada en `ghcr.io`.
- **Ejecutores Propios (*Self-Hosted Runners*)**: Integración y orquestación de runners en infraestructura local/on-premise.
- **Monitoreo programado**: Automatización mediante tareas cron con GitHub Actions.

---

## 🏗️ Arquitectura y Estructura

```plaintext
mi-primer-ci-cd/
├── .github/workflows/         # Definición declarativa de pipelines
│   ├── ci-python.yml          # Pipeline principal: tests + cobertura de código
│   ├── ci-matrix.yml          # Matriz de versiones de Python (3.9, 3.10, 3.11)
│   ├── docker-build.yml       # Build de imagen Docker y push a GHCR
│   ├── condicional.yml        # Lógica condicional según rama origen
│   ├── self-hosted-test.yml   # Ejecución en runners dedicados on-premise
│   ├── docker-en-runner.yml   # Despliegue en contenedor sobre runner propio
│   ├── monitoreo.yml          # Tarea cron periódica para health checks
│   └── variables.yml          # Manejo de secretos y variables de entorno
├── mi-app-python/             # Microservicio API REST con Flask
│   ├── app.py                 # Endpoints: /health, /suma, /saludo
│   ├── Dockerfile             # Contenedor optimizado
│   ├── requirements.txt       # Dependencias del proyecto
│   └── tests/                 # Suite de pruebas unitarias
└── mi-app/                    # Aplicación web multicapa con Nginx y Docker Compose
```

---

## 🚀 Pipelines Implementados

### 1. Pipeline de Calidad y Pruebas (`ci-python.yml`)
- Se dispara automáticamente ante eventos de `push` y `pull_request` en ramas clave.
- Configura el entorno virtual y resolución de dependencias.
- Realiza verificación activa de arranque del servicio (`/health`).
- Ejecuta la suite de pruebas unitarias con `pytest` y genera el reporte de cobertura HTML, publicándolo como artefacto descargable (`upload-artifact@v4`).

### 2. Pruebas de Matriz Multi-Versión (`ci-matrix.yml`)
- Valida la compatibilidad del código contra múltiples versiones objetivo de Python en paralelo, asegurando consistencia entre versiones.

### 3. Construcción y Publicación de Contenedores (`docker-build.yml`)
- Automatiza el login autenticado contra el registro de contenedores de GitHub (`ghcr.io`).
- Construye la imagen Docker utilizando etiquetas dinámicas basadas en el SHA del commit y la rama correspondiente.

### 4. Self-Hosted Runners y Monitoreo Programado
- Flujos especializados para infraestructura propia con etiquetas `[self-hosted]`.
- Flujo cron (`monitoreo.yml`) para sondeo periódico del estado de la aplicación.

---

## 💻 Ejecución Local

Para ejecutar y probar la aplicación Flask localmente:

```bash
cd mi-app-python

# Crear y activar entorno virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar las pruebas unitarias con cobertura
pytest --cov=app --cov-report=term-missing tests/

# Iniciar la API
python app.py
```

---

## 👤 Autor

**Jhonatan Felipe Taborda**
- Perfil: [@jhonatanfelipet](https://github.com/jhonatanfelipet)
- Foco: Automatización, DevOps & Cloud Computing
