# PROPUESTA ARQUITECTÓNICA ADR

## Plataforma de Donaciones Universitarias
### Stack Tecnológico • Justificación • Diagramas C4

| **Proyecto** | Plataforma de Donaciones — Proyecto Arquitectura |
|---|---|
| **Versión / Fecha** | v1.3 — Mayo 2026 |

---

## 1. Resumen Ejecutivo

La Plataforma de Donaciones Universitarias es un sistema web full-stack que permite a usuarios (donantes, administradores y visitantes) crear, visualizar y contribuir a campañas de recaudación organizadas en categorías temáticas: salud, educación, tecnología, arte, emprendimiento, medioambiente, actividades y proyectos universitarios.

El sistema adopta una arquitectura cliente-servidor desacoplada, con una API REST construida en **NestJS** (Node.js + TypeScript) en el backend y una aplicación **Next.js 15** con **React 19** en el frontend. La persistencia se gestiona con **PostgreSQL** vía **Prisma ORM**, el almacenamiento de archivos con **AWS S3**, y la seguridad con autenticación **JWT stateless** con control de roles (ADMIN / USER).

---

## 2. Stack Tecnológico

### 2.1 Backend

| Tecnología | Versión | Rol en el proyecto |
|---|---|---|
| NestJS | ^10.0.0 | Framework principal de la API REST |
| TypeScript | ^5.1.3 | Tipado estático en todo el backend |
| Prisma ORM | ^6.7.0 | Mapeo objeto-relacional y migraciones |
| PostgreSQL | 12 (Docker) | Base de datos relacional principal |
| @nestjs/jwt + Passport | ^11.0.x | Autenticación JWT stateless |
| bcrypt | ^6.0.0 | Hashing seguro de contraseñas |
| AWS SDK v3 (S3) | ^3.804.0 | Almacenamiento de archivos / presigned URLs |
| Multer | ^1.4.5-lts.2 | Manejo de uploads multipart |
| Express | ^5.1.0 | Plataforma HTTP subyacente |
| class-validator | ^0.14.2 | Validación de DTOs |

### 2.2 Frontend

| Tecnología | Versión | Rol en el proyecto |
|---|---|---|
| Next.js | 15.3.2 | Framework React con App Router y SSR |
| React | ^19.0.0 | Biblioteca de interfaz de usuario |
| TypeScript | ^5.x | Tipado estático en el frontend |
| Zustand | ^5.0.4 | Gestión de estado global por feature |
| Axios | ^1.9.0 | Cliente HTTP con interceptores JWT |
| TailwindCSS | ^4.x | Utilidades CSS utility-first |

---

## 3. Architecture Decision Records (ADRs)

Cada ADR documenta una decisión arquitectónica significativa: el contexto que la motivó, la decisión tomada, su justificación técnica y las consecuencias esperadas.

## ADR-001: Reestructuración del modelo de campañas
### Estado

Aceptado

### Contexto

Durante el análisis del sistema inicial se identificó una falla importante en el modelado de la base de datos. El proyecto manejaba una entidad diferente para cada tipo de campaña:

Health
Education
Technology
Art
Entrepreneurship
Environment
UniversityProject

Cada una de estas tablas tenía prácticamente la misma estructura:

id
title
description
goal
raised
userId
createdAt
updatedAt

Esto generaba un problema de redundancia, porque se repetía la misma información en varias entidades. Además, cada categoría necesitaba su propio módulo, controlador, servicio, DTO y lógica de permisos. Por ejemplo, para crear una campaña de salud se necesitaba un servicio de Health, para una de educación un servicio de Education, para una de tecnología un servicio de Technology, y así sucesivamente.

Este diseño hacía que el sistema fuera difícil de mantener. Si se quería agregar una nueva funcionalidad, como eliminar campañas, registrar donaciones, asociar documentos o validar permisos, era necesario repetir o adaptar el mismo código en varios módulos. Esto aumentaba el riesgo de errores, inconsistencias y duplicación innecesaria.

También se identificó que este modelo no cumplía adecuadamente con principios de normalización, ya que una categoría de campaña no debería representarse como una tabla diferente cuando todas comparten los mismos atributos. En realidad, todas son campañas y lo único que cambia es su categoría.

Por esta razón se decidió aplicar ingeniería inversa sobre la estructura existente, analizar las tablas creadas, identificar patrones repetidos y rediseñar el modelo hacia una estructura más limpia, escalable y mantenible.

### Decisión

Se decidió reemplazar las múltiples entidades por categoría por una única entidad principal llamada Campaign.

En lugar de tener:

Health
Education
Technology
Art
Entrepreneurship
Environment
UniversityProject

se definió una única tabla:

Campaign

La entidad Campaign centraliza toda la información común de cualquier campaña:

model Campaign {
  id          String   @id @default(uuid())
  title       String
  description String
  goal        Float
  raised      Float    @default(0)

  userId      String
  user        User     @relation(fields: [userId], references: [id])

  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])

  donations   Donation[]
  documents   CampaignDocument[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

Con esta decisión, todas las campañas del sistema se almacenan en una sola tabla, sin importar si son de salud, educación, tecnología, arte, emprendimiento, ambiente o proyectos universitarios.

La diferencia entre una campaña y otra ya no depende de una tabla diferente, sino de su relación con la entidad Category.

Por ejemplo:

Campaign: Ayuda para medicamentos
Category: Health

Campaign: Proyecto universitario de robótica
Category: UniversityProject

Campaign: Apoyo a emprendimiento local
Category: Entrepreneurship

También se decidió crear un solo módulo backend para campañas:

campaign
├── campaign.controller.ts
├── campaign.service.ts
├── campaign.module.ts
└── dto

Este módulo se encarga de manejar la lógica general de las campañas:

- crear campaña
- listar campañas
- consultar detalle de campaña
- actualizar campaña
- eliminar campaña
- asociar categoría
- asociar usuario creador
- consultar documentos
- consultar donaciones

Además, esta decisión permitió integrar correctamente otras entidades relacionadas, como:

Donation
CampaignDocument
Category
User
AuditLog

De esta manera, el modelo quedó más coherente y preparado para crecer.

### Consecuencias
#### Ventajas

La principal ventaja es la reducción de duplicación. Ya no es necesario tener siete tablas diferentes con los mismos campos. Toda la lógica relacionada con campañas se concentra en una sola entidad y en un solo módulo backend.

También mejora la mantenibilidad del proyecto. Si se necesita agregar una nueva funcionalidad a las campañas, como generar reportes, eliminar archivos de S3, calcular progreso o validar permisos, solo se implementa una vez en CampaignService.

Otra ventaja importante es que el modelo queda más normalizado. Las campañas se representan como una única entidad y las categorías como una clasificación asociada, lo cual es más correcto desde el punto de vista del diseño de bases de datos.

También mejora la escalabilidad. Si en el futuro se quiere agregar una nueva categoría, no será necesario crear una nueva tabla, un nuevo módulo, un nuevo controlador ni un nuevo servicio. Bastará con registrar una nueva categoría en la tabla Category.

Además, la consulta de campañas se vuelve más simple. En lugar de consultar varias tablas por separado, el sistema puede consultar una sola tabla Campaign y filtrar por categoría cuando sea necesario.

Ejemplo:

const campaigns = await this.prisma.campaign.findMany({
  include: {
    category: true,
    user: true,
  },
});

También se facilita la integración con el frontend. En Next.js ya no se necesita crear páginas o servicios separados para cada tipo de campaña. Se puede manejar todo desde:

campaign.service.ts
CampaignCard
CampaignList
CampaignDetail
CampaignForm

Esto permite aplicar mejor principios de Clean Code y SOLID, especialmente el principio de responsabilidad única, porque cada componente o servicio tiene una función clara.

#### Desventajas

Una desventaja es que fue necesario modificar parte del backend, la base de datos y el frontend. Como el sistema ya tenía entidades separadas, hubo que reemplazar varios módulos anteriores.

También fue necesario adaptar la lógica que antes dependía de nombres de tablas específicas. Por ejemplo, si antes existía un endpoint como:

/health
/education
/technology

ahora se maneja con:

/campaigns
/campaigns?category=Health
/campaigns/:id

Otra desventaja es que la migración puede implicar pérdida o transformación de datos si ya existían campañas guardadas en las tablas anteriores. Sin embargo, en este proyecto se consideró aceptable porque aún estaba en etapa de desarrollo y no se perdía información crítica.

### Riesgos

Uno de los riesgos es no actualizar correctamente todas las referencias antiguas en el código. Si alguna parte del frontend o backend sigue apuntando a módulos como HealthService o EducationService, podría generar errores.

También existe el riesgo de que las categorías no estén correctamente creadas en la base de datos. Como ahora Campaign depende de Category, una campaña no puede crearse si no existe una categoría válida.

Otro riesgo es que el equipo de desarrollo deba adaptarse al nuevo modelo. Aunque es más limpio, requiere entender que las categorías ya no son tablas, sino registros dentro de la entidad Category.

### Impacto en el proyecto

El impacto fue alto, porque esta decisión cambió la estructura principal del sistema. Sin embargo, fue un cambio positivo porque permitió construir una base más sólida.

Después de esta decisión se pudieron implementar correctamente funcionalidades como:

- donaciones por campaña
- documentos por campaña
- reportes PDF por campaña
- permisos por propietario y administrador
- eliminación de campañas con relaciones
- auditoría de acciones
- frontend modular basado en campañas

Esta decisión también permitió justificar técnicamente la aplicación de ingeniería inversa, ya que se partió de un modelo existente, se analizaron sus problemas y se propuso una arquitectura mejorada.

### Alternativas consideradas
#### Alternativa 1: Mantener una tabla por categoría

Se pudo haber mantenido el diseño original con tablas separadas:

Health
Education
Technology
Art
Entrepreneurship
Environment
UniversityProject

Esta opción fue descartada porque generaba mucha duplicación de estructura y lógica. Cada vez que se quisiera agregar una funcionalidad, habría que repetirla en todos los módulos.

Por ejemplo, para eliminar campañas habría que implementar la misma lógica en:

HealthService
EducationService
TechnologyService
ArtService
EntrepreneurshipService
EnvironmentService
UniversityProjectService

Esto no era sostenible.

### Alternativa 2: Usar un campo de texto category dentro de Campaign

Otra opción era crear una sola tabla Campaign, pero guardar la categoría como texto:

category String

Esta opción era más simple, pero fue descartada porque no garantiza integridad de datos. Por ejemplo, podrían existir categorías mal escritas:

health
Health
healt
salud
Salud

Esto complicaría los filtros y reportes.

Alternativa 3: Usar un enum para las categorías

También se consideró usar un enum:

enum CampaignCategory {
  HEALTH
  EDUCATION
  TECHNOLOGY
  ART
}

Esta opción era mejor que usar texto libre, pero fue descartada porque limita la flexibilidad. Si el administrador quiere crear una nueva categoría, habría que modificar el schema de Prisma, crear una migración y desplegar nuevamente el backend.

Como el sistema necesita que el administrador pueda gestionar categorías, se eligió una entidad Category.

### Alternativa seleccionada

La opción seleccionada fue usar una sola entidad Campaign relacionada con una entidad Category, porque ofrece mejor normalización, flexibilidad, escalabilidad y mantenibilidad.

### Fecha

15/05/2026

## ADR-002: Gestión de categorías mediante entidad Category
### Estado

Aceptado

### Contexto

Después de identificar que el sistema tenía una entidad diferente para cada tipo de campaña, surgió la necesidad de definir cómo se iban a manejar las categorías en el nuevo modelo.

Inicialmente, las categorías estaban representadas como tablas independientes. Esto significaba que una campaña de salud se guardaba en la tabla Health, una campaña de educación en Education, una campaña de tecnología en Technology, y así sucesivamente.

Este enfoque generaba un problema importante: las categorías estaban mezcladas con la estructura de datos. Es decir, cada vez que se quería agregar una nueva categoría, era necesario crear una nueva tabla, un nuevo módulo en NestJS, nuevos DTO, nuevos endpoints y nuevas pantallas o lógica en el frontend.

Por ejemplo, si se quería agregar una nueva categoría llamada Sports, habría que crear:

Sports table
SportsController
SportsService
SportsModule
CreateSportsDto
UpdateSportsDto
Frontend service
Frontend page or filtering logic

Esto hacía que el sistema no fuera flexible.

Además, se requería que el administrador pudiera gestionar las categorías del sistema. Es decir, el administrador debía poder crear, editar y eliminar categorías sin necesidad de modificar el código fuente o la base de datos manualmente.

Por esta razón se decidió separar el concepto de campaña del concepto de categoría. Una campaña representa una iniciativa concreta de recaudación, mientras que una categoría representa una clasificación administrativa.

### Decisión

Se decidió crear una entidad independiente llamada Category.

La entidad Category se encarga de almacenar las categorías disponibles para clasificar campañas.

El modelo definido fue:

model Category {
  id          String     @id @default(uuid())
  name        String     @unique
  description String?
  campaigns   Campaign[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

Esta entidad tiene una relación uno a muchos con Campaign:

Una categoría puede tener muchas campañas.
Una campaña pertenece a una sola categoría.

La relación queda así:

model Campaign {
  id          String   @id @default(uuid())
  title       String
  description String
  goal        Float
  raised      Float    @default(0)

  userId      String
  user        User     @relation(fields: [userId], references: [id])

  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

También se decidió crear un módulo específico para categorías en el backend:

category
├── category.controller.ts
├── category.service.ts
├── category.module.ts
└── dto
    ├── create-category.dto.ts
    └── update-category.dto.ts

Este módulo permite:

- crear categorías
- listar categorías
- consultar una categoría
- actualizar categorías
- eliminar categorías

Sin embargo, se definió una regla importante de permisos:

Solo el administrador puede crear, editar o eliminar categorías.
Todos los usuarios pueden consultar categorías.

Esto permite que cualquier usuario pueda ver las categorías disponibles al crear o consultar campañas, pero solo el administrador pueda modificar la estructura clasificatoria del sistema.

Los endpoints quedaron conceptualmente así:

GET    /categories        Público
GET    /categories/:id    Público
POST   /categories        Solo ADMIN
PATCH  /categories/:id    Solo ADMIN
DELETE /categories/:id    Solo ADMIN

En el frontend, también se decidió crear una página de categorías:

/categories

En esta página:

- los usuarios normales pueden ver categorías
- el administrador puede crear, editar y eliminar categorías

Además, las categorías son usadas en el formulario de creación de campañas, permitiendo seleccionar la categoría desde un listado cargado desde la base de datos.

### Consecuencias
#### Ventajas

La principal ventaja es que el sistema se vuelve más flexible. Ahora se pueden agregar nuevas categorías sin modificar el código ni crear nuevas tablas.

Por ejemplo, si se quiere agregar una categoría llamada:

Deportes
Animales
Emergencias
Cultura
Investigación

el administrador puede hacerlo desde el sistema, sin que el desarrollador tenga que cambiar el modelo de Prisma.

Otra ventaja es que se mejora la integridad de los datos. Como Campaign se relaciona con Category mediante una llave foránea, una campaña solo puede pertenecer a una categoría existente. Esto evita errores de escritura o categorías duplicadas por inconsistencias de texto.

También se mejora la organización del sistema. Las categorías pasan a ser una entidad administrativa clara, con su propio CRUD, su propia responsabilidad y su propia relación con campañas.

Además, esta decisión permite aplicar principios SOLID, especialmente el principio de responsabilidad única. La entidad Category se encarga únicamente de representar categorías, mientras que Campaign se encarga de representar campañas.

También mejora la experiencia del frontend. En lugar de tener categorías quemadas en el código, el frontend consulta:

GET /categories

y muestra las categorías actuales de la base de datos. Esto permite que el sistema sea dinámico.

Otra ventaja importante es que facilita los filtros. Se pueden listar campañas por categoría usando una consulta como:

/campaigns?category=Health

o internamente mediante la relación:

where: {
  category: {
    name: {
      equals: category,
      mode: 'insensitive',
    },
  },
}

Esto permite mantener la navegación por categorías sin duplicar entidades.

#### Desventajas

Una desventaja es que ahora la creación de campañas depende de que existan categorías previamente registradas. Si la tabla Category está vacía, los usuarios no podrán crear campañas correctamente.

Por esta razón se debe asegurar que el administrador cree las categorías iniciales del sistema o que se carguen mediante seed.

Otra desventaja es que se agrega una relación adicional en la base de datos. Antes, una campaña estaba directamente asociada a su tabla específica. Ahora requiere una llave foránea categoryId. Aunque esto es más correcto, agrega una consulta adicional cuando se quiere traer información completa de la campaña.

También se requiere controlar permisos. Si cualquier usuario pudiera crear categorías, el sistema podría llenarse de categorías repetidas, mal escritas o innecesarias. Por eso fue necesario proteger los endpoints de creación, actualización y eliminación con autenticación y validación de rol administrador.

### Riesgos

Un riesgo es que se elimine una categoría que ya tiene campañas asociadas. Esto podría generar errores de integridad referencial si no se controla correctamente.

Por esa razón, antes de eliminar categorías, se debe validar si existen campañas asociadas o definir una estrategia clara:

- impedir eliminar categorías con campañas
- reasignar campañas a otra categoría
- eliminar en cascada, si el caso de negocio lo permite

Para este proyecto, lo más seguro es impedir eliminar categorías que tengan campañas asociadas, o controlar el error desde el servicio.

Otro riesgo es que el administrador cree categorías duplicadas con nombres parecidos. Aunque el campo name es único, podrían existir variaciones como:

Health
Salud
Salud general

Esto no rompe el sistema, pero puede afectar la organización. Por eso es importante que el administrador mantenga una convención clara de nombres.

También existe el riesgo de que el frontend no cargue correctamente las categorías y el usuario no pueda crear campañas. Para mitigar esto, el frontend debe manejar estados de carga, errores y listas vacías.

### Impacto en el proyecto

El impacto fue positivo porque permitió que el sistema dejara de depender de tablas fijas por categoría. Esta decisión ayudó directamente a la reestructuración del modelo de campañas.

Gracias a esta entidad se logró:

- normalizar el modelo de datos
- reducir duplicación
- facilitar la creación de campañas
- permitir administración dinámica de categorías
- mejorar filtros
- simplificar el frontend
- evitar creación de nuevos módulos por cada categoría

También permitió que el proyecto quedara mejor alineado con la idea de una plataforma flexible de donaciones categorizadas por campañas.

Esta decisión fue clave para que el sistema pudiera crecer en el futuro sin aumentar innecesariamente la complejidad del código.

### Alternativas consideradas
#### Alternativa 1: Mantener categorías como tablas independientes

Se consideró mantener cada categoría como una tabla separada:

Health
Education
Technology
Art
Entrepreneurship
Environment
UniversityProject

Esta opción fue descartada porque duplicaba estructura, servicios, controladores y lógica de negocio.

Además, no permitía que el administrador gestionara categorías dinámicamente.

#### Alternativa 2: Guardar la categoría como texto en Campaign

Se consideró agregar un campo simple:

category String

Esta opción era rápida, pero fue descartada porque no garantiza integridad. Podrían aparecer categorías mal escritas o duplicadas.

Ejemplo:

Health
health
Healt
Salud
salud

Esto haría más difícil filtrar, reportar y mantener ordenado el sistema.

#### Alternativa 3: Usar un enum de Prisma

Se consideró usar:

enum CategoryType {
  HEALTH
  EDUCATION
  TECHNOLOGY
  ART
  ENTREPRENEURSHIP
  ENVIRONMENT
  UNIVERSITY_PROJECT
}

Esta opción ofrecía mayor control que un texto libre, pero fue descartada porque no es flexible. Cada vez que se quisiera agregar una nueva categoría habría que modificar el schema, crear una migración y desplegar nuevamente.

Esto no cumplía con la necesidad de permitir que el administrador gestione categorías desde el sistema.

#### Alternativa seleccionada

La alternativa seleccionada fue crear una entidad Category, porque permite mantener integridad de datos, flexibilidad administrativa y una arquitectura más limpia.

### Fecha

15/05/2026

## ADR-003: Registro individual de donaciones
### Estado

Aceptado

### Contexto

Durante el análisis del modelo inicial del sistema se identificó que las campañas únicamente tenían un campo acumulado llamado:

raised

Este campo permitía saber cuánto dinero se había recaudado en total para una campaña, pero no permitía conocer el detalle de los aportes individuales.

Es decir, el sistema podía mostrar algo como:

Meta: $1.000.000
Recaudado: $250.000

pero no podía responder preguntas importantes como:

¿Quién donó?
¿Cuánto donó cada usuario?
¿Cuándo se hizo la donación?
¿A qué campaña pertenece cada donación?
¿Cuántas donaciones ha recibido una campaña?
¿Qué historial de donaciones tiene un usuario?

Esto representaba una limitación fuerte para la trazabilidad del sistema. Una plataforma de donaciones no debe depender únicamente de un campo acumulado, porque el valor total puede cambiar, pero no queda evidencia de cómo se llegó a ese valor.

También se identificó que, si solo se usa el campo raised, cualquier operación de aporte quedaría reducida a una suma sobre la campaña. Por ejemplo:

raised = raised + amount

Aunque esto actualiza el progreso, no deja registro histórico de la transacción. Esto afectaba directamente la transparencia del sistema, los reportes, el historial de usuario y la auditoría administrativa.

Además, más adelante se necesitó generar reportes PDF de campaña. Para que esos reportes fueran útiles, no bastaba con mostrar el total recaudado; era necesario listar las donaciones individuales, incluyendo usuario, monto, estado y fecha.

Por esta razón se decidió crear una entidad independiente para representar cada donación realizada dentro del sistema.

### Decisión

Se decidió crear una entidad llamada Donation.

Esta entidad registra cada aporte realizado por un usuario a una campaña específica.

El modelo definido fue:

enum DonationStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model Donation {
  id          String         @id @default(uuid())
  amount      Float
  status      DonationStatus @default(PENDING)

  userId      String
  user        User           @relation(fields: [userId], references: [id])

  campaignId  String
  campaign    Campaign       @relation(fields: [campaignId], references: [id])

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

La entidad Donation se relaciona con:

User
Campaign

Esto significa que:

Un usuario puede realizar muchas donaciones.
Una campaña puede recibir muchas donaciones.
Cada donación pertenece a un usuario y a una campaña.

También se decidió mantener el campo raised en la entidad Campaign, pero no como único registro de donación, sino como un valor acumulado para mostrar rápidamente el progreso de la campaña.

La lógica queda así:

Donation registra el detalle del aporte.
Campaign.raised guarda el total acumulado.

Cuando un usuario realiza una donación, el sistema debe hacer dos acciones principales:

1. Crear un registro en Donation.
2. Actualizar el campo raised de Campaign sumando el monto donado.

Ejemplo lógico:

await prisma.donation.create({
  data: {
    amount,
    userId,
    campaignId,
    status: 'COMPLETED',
  },
});

await prisma.campaign.update({
  where: { id: campaignId },
  data: {
    raised: {
      increment: amount,
    },
  },
});

También se creó un módulo backend específico para donaciones:

donation
├── donation.controller.ts
├── donation.service.ts
├── donation.module.ts
└── dto
    ├── create-donation.dto.ts
    └── update-donation.dto.ts

Este módulo permite manejar operaciones como:

- registrar una donación
- listar donaciones
- consultar donaciones del usuario autenticado
- consultar donaciones por campaña
- consultar detalle de una donación
- actualizar estado de una donación

En el frontend también se agregó la posibilidad de donar desde el detalle de una campaña, además de consultar el historial de donaciones.

### Consecuencias
#### Ventajas

La principal ventaja es que el sistema gana trazabilidad. Cada donación queda registrada individualmente, lo que permite saber exactamente quién donó, cuánto donó y cuándo lo hizo.

También mejora la transparencia de la plataforma. Ya no se depende únicamente de un número acumulado en la campaña, sino que existe un historial completo de aportes.

Otra ventaja importante es que permite construir reportes más completos. Gracias a la entidad Donation, el reporte PDF de campaña puede incluir un detalle como:

1. Juan Pérez | juan@email.com | $50.000 | COMPLETED | 15/05/2026
2. Ana Gómez | ana@email.com | $100.000 | COMPLETED | 15/05/2026

Esto fortalece la parte administrativa y documental del proyecto.

También permite que cada usuario pueda consultar su historial de donaciones. Por ejemplo, un usuario puede ingresar a la sección de donaciones y ver todas las campañas que ha apoyado.

Además, facilita auditoría y control. Si en el futuro se necesita revisar inconsistencias, validar pagos o analizar comportamiento de usuarios, la entidad Donation ofrece una base mucho más sólida.

Otra ventaja es que permite manejar estados. No todas las donaciones necesariamente deben considerarse completadas desde el inicio. Por eso se definió el enum:

PENDING
COMPLETED
FAILED
REFUNDED

Esto deja el sistema preparado para una futura integración con pasarelas de pago, donde una donación podría iniciar como pendiente y luego cambiar a completada o fallida.

#### Desventajas

Una desventaja es que el modelo se vuelve un poco más complejo. Antes solo era necesario actualizar un campo raised, pero ahora se debe crear una donación y actualizar la campaña.

También es necesario cuidar la consistencia entre Donation y Campaign.raised. Si se crea una donación pero no se actualiza raised, el total mostrado en la campaña podría quedar incorrecto.

Por eso, idealmente estas operaciones deben ejecutarse dentro de una transacción de base de datos.

Ejemplo:

await prisma.$transaction(async (tx) => {
  await tx.donation.create({ ... });

  await tx.campaign.update({
    where: { id: campaignId },
    data: {
      raised: {
        increment: amount,
      },
    },
  });
});

Otra desventaja es que al eliminar una campaña se deben considerar las donaciones asociadas. Como existe una relación entre Donation y Campaign, PostgreSQL no permite eliminar una campaña si todavía tiene donaciones relacionadas, a menos que se eliminen primero o se configure una estrategia de cascada.

Esto se evidenció en el proyecto cuando al eliminar una campaña con donaciones apareció un error de llave foránea:

Foreign key constraint violated on the constraint: Donation_campaignId_fkey

Por eso se decidió que al eliminar una campaña también se eliminen primero las donaciones asociadas.

### Riesgos

Un riesgo importante es que se duplique el valor acumulado si la lógica de donación no se controla bien. Por ejemplo, si una petición se ejecuta dos veces, podría crear dos donaciones y sumar dos veces al campo raised.

También existe el riesgo de inconsistencias si una donación cambia de estado. Por ejemplo, si una donación pasa de COMPLETED a REFUNDED, habría que decidir si se descuenta automáticamente del campo raised.

Otro riesgo es manejar incorrectamente los permisos. Si las donaciones no se protegen adecuadamente, un usuario podría intentar consultar donaciones de otros usuarios o crear donaciones en nombre de otra persona.

Por eso se decidió que el userId de la donación no se envíe desde el frontend, sino que se tome del token JWT del usuario autenticado.

### Impacto en el proyecto

El impacto fue alto y positivo. La entidad Donation permitió convertir el sistema de una simple plataforma con montos acumulados a una plataforma con historial real de aportes.

Esta decisión impactó:

Base de datos:
- creación de tabla Donation
- relación con User
- relación con Campaign
- enum DonationStatus

Backend:
- creación de DonationModule
- creación de DonationController
- creación de DonationService
- validación de campaña existente
- actualización de raised
- consulta de donaciones

Frontend:
- formulario de donación en detalle de campaña
- página de historial de donaciones
- visualización del progreso actualizado
- distinción entre donaciones del usuario y donaciones del sistema para admin

Reportes:
- inclusión de detalle de donaciones en PDF

También ayudó a reforzar la justificación del proyecto en términos de trazabilidad, transparencia y control administrativo.

### Alternativas consideradas
#### Alternativa 1: Mantener solo el campo raised

Se consideró mantener únicamente el campo raised dentro de Campaign.

Esta opción era simple, pero fue descartada porque no permitía saber quién realizó los aportes ni construir historial.

También impedía generar reportes detallados y afectaba la transparencia del sistema.

Alternativa 2: Guardar donaciones como arreglo dentro de Campaign

Otra opción era guardar una lista de donaciones dentro de la misma campaña como un campo JSON.

Ejemplo:

donations Json

Esta opción fue descartada porque dificulta consultas, filtros, relaciones con usuarios y reportes. También reduce la integridad referencial, ya que no habría una relación clara con la tabla User.

#### Alternativa 3: Crear una entidad Payment en lugar de Donation

Se consideró crear una entidad llamada Payment.

Sin embargo, se descartó porque el proyecto no estaba enfocado todavía en una pasarela de pago real, sino en registrar aportes o donaciones dentro de la plataforma.

El concepto Donation era más claro para el dominio del proyecto.

#### Alternativa seleccionada

La alternativa seleccionada fue crear una entidad Donation relacionada con User y Campaign, manteniendo además el campo raised en Campaign para mostrar rápidamente el progreso acumulado.

## Fecha

15/05/2026

## ADR-004: Donaciones solo para usuarios autenticados
### Estado

Aceptado

### Contexto

Durante el diseño de la funcionalidad de donaciones se discutió si cualquier visitante podría realizar aportes o si únicamente los usuarios registrados deberían poder donar.

Una opción inicial era permitir donaciones anónimas, ya que esto podría facilitar que más personas apoyaran campañas sin necesidad de crear una cuenta. Sin embargo, esta opción generaba varios problemas para el alcance del proyecto.

El sistema busca mantener trazabilidad de las campañas, de los usuarios y de las acciones importantes. Si se permitían donaciones anónimas, no sería posible asociar correctamente una donación a un usuario. Esto afectaría:

- historial de donaciones del usuario
- reportes por campaña
- auditoría administrativa
- control de aportes
- transparencia del sistema

Además, el proyecto ya contaba con autenticación mediante JWT y roles de usuario. Por lo tanto, era coherente que las acciones relevantes, como donar, subir documentos o crear campañas, estuvieran asociadas a una identidad autenticada.

También se identificó que en el frontend se necesitaba mostrar secciones como:

Mis donaciones
Mis documentos
Mis campañas

Estas secciones solo tienen sentido si las donaciones están asociadas a usuarios registrados.

Por esta razón se decidió que las donaciones no serían anónimas y que solo los usuarios autenticados podrían realizar aportes.

### Decisión

Se decidió que toda donación debe ser realizada por un usuario autenticado.

Esto significa que el endpoint para crear donaciones debe estar protegido con JWT:

@UseGuards(AuthGuard('jwt'))
@Post()
create(@Body() dto: CreateDonationDto, @Request() req) {
  return this.donationService.create(dto, req.user.id);
}

El frontend no debe enviar el userId manualmente. El backend obtiene el usuario desde el token:

req.user.id

Esto evita que un usuario pueda falsificar el identificador de otro usuario.

La entidad Donation queda relacionada obligatoriamente con User:

model Donation {
  id          String         @id @default(uuid())
  amount      Float
  status      DonationStatus @default(PENDING)

  userId      String
  user        User           @relation(fields: [userId], references: [id])

  campaignId  String
  campaign    Campaign       @relation(fields: [campaignId], references: [id])

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

En esta decisión se estableció que:

- Un usuario no autenticado no puede donar.
- El userId se toma del JWT, no del body.
- Cada donación queda asociada a un usuario registrado.
- El sistema puede consultar el historial de donaciones por usuario.

En el frontend, si un usuario intenta donar sin iniciar sesión, se redirige a:

/login

La lógica aplicada es similar a:

const token = storage.getToken();

if (!token) {
  router.push('/login');
  return;
}
### Consecuencias
#### Ventajas

La principal ventaja es la trazabilidad. Cada donación queda asociada a un usuario real del sistema.

Esto permite saber:

quién donó
cuánto donó
a qué campaña donó
cuándo donó
cuál es el estado de la donación

También permite construir la página de historial de donaciones del usuario:

/donations

En esa página, un usuario normal puede ver sus propias donaciones, mientras que el administrador puede consultar las donaciones del sistema.

Otra ventaja es la seguridad. Como el userId se obtiene del token JWT, el usuario no puede enviar manualmente el ID de otro usuario para hacer una donación en su nombre.

También mejora los reportes de campaña. Los reportes PDF pueden incluir el nombre y correo de los usuarios que aportaron, lo que permite mayor transparencia para el administrador y el creador de la campaña.

Además, esta decisión facilita la auditoría. Si una donación genera una acción importante, puede registrarse en AuditLog con referencia al usuario que ejecutó la acción.

#### Desventajas

Una desventaja es que se agrega fricción al proceso de donación. Un visitante que no tenga cuenta debe registrarse o iniciar sesión antes de donar.

Esto puede reducir la cantidad de aportes si el usuario quiere hacer una donación rápida.

Otra desventaja es que se depende del sistema de autenticación. Si el login falla, el token expira o hay problemas con JWT, el usuario no podrá donar aunque quiera hacerlo.

También se requiere manejar correctamente la experiencia del frontend. Si el usuario intenta donar sin estar autenticado, no debe aparecer un error confuso, sino redirigirse a login o mostrar un mensaje claro.

#### Riesgos

Un riesgo es que el usuario perciba el proceso como más largo por tener que iniciar sesión antes de donar.

Otro riesgo es que, si no se valida correctamente en backend, alguien podría intentar llamar el endpoint de donaciones desde Postman sin token. Por eso la protección con AuthGuard('jwt') es obligatoria.

También existe el riesgo de inconsistencias si el frontend intenta guardar el usuario en localStorage, pero el token ya no es válido. En ese caso, el backend debe ser la fuente final de verdad y rechazar la petición con 401 Unauthorized.

Impacto en el proyecto

Esta decisión impactó tanto backend como frontend.

En backend:

- el endpoint POST /donations se protegió con JWT
- el userId se tomó desde req.user.id
- Donation.userId se volvió obligatorio
- se validó que la campaña exista
- se actualizó Campaign.raised al crear donación

En frontend:

- el botón de donar verifica si hay token
- si no hay token, redirige a login
- la página de donaciones muestra datos según usuario
- los servicios envían Authorization: Bearer token

También impactó el modelo de seguridad general del proyecto, porque refuerza la idea de que las acciones relevantes deben estar asociadas a usuarios autenticados.

Esta decisión es coherente con otras reglas del sistema:

- usuarios autenticados pueden crear campañas
- usuarios autenticados pueden donar
- usuarios autenticados pueden subir documentos a sus campañas
- admin tiene permisos especiales
### Alternativas consideradas
#### Alternativa 1: Permitir donaciones anónimas

Se consideró permitir donaciones sin iniciar sesión.

Esta opción habría reducido fricción, pero fue descartada porque no permite trazabilidad completa. Además, dificultaba reportes, historial de usuario y auditoría.

#### Alternativa 2: Permitir donaciones con solo correo electrónico

Otra opción era permitir que alguien donara ingresando solo su correo.

Esta opción fue descartada porque el correo no garantiza identidad dentro del sistema. Además, habría que validar correos, evitar duplicados y manejar casos donde luego el usuario se registre.

#### Alternativa 3: Donaciones mixtas: autenticadas y anónimas

También se consideró permitir ambos tipos de donaciones.

Esta opción fue descartada para esta versión del proyecto porque aumentaba la complejidad. Habría que modificar el modelo para permitir userId opcional, adaptar reportes y manejar dos flujos diferentes.

#### Alternativa seleccionada

La alternativa seleccionada fue permitir donaciones únicamente a usuarios autenticados, asociando cada donación al usuario obtenido desde el token JWT.

### Fecha

15/05/2026

## ADR-005: Gestión documental por campaña
### Estado

Aceptado

### Contexto

Durante la evolución del sistema se identificó que las campañas no solo necesitaban almacenar información básica como título, descripción, meta y monto recaudado. También era necesario asociar archivos o documentos relacionados con cada campaña.

Inicialmente, el sistema solo contemplaba la información textual de la campaña. Sin embargo, para una plataforma de donaciones es importante que las campañas puedan tener soportes adicionales, como documentos explicativos, evidencias, archivos administrativos o reportes generados.

Por ejemplo, una campaña puede necesitar documentos como:

- Carta de soporte
- Evidencia de la necesidad
- Documento del proyecto
- Imagen o PDF explicativo
- Comprobante administrativo
- Reporte de donaciones
- Informe generado automáticamente

Sin una entidad documental, estos archivos no tendrían una forma organizada de relacionarse con una campaña. Además, se perdería trazabilidad sobre quién subió el documento, cuándo fue subido, a qué campaña pertenece y qué tipo de documento es.

También se identificó una necesidad adicional: no todos los documentos tienen el mismo nivel de visibilidad. Algunos documentos pueden ser públicos para cualquier usuario que consulte una campaña, mientras que otros deben ser privados y solo visibles para el administrador o el dueño de la campaña.

En particular, los reportes generados automáticamente contienen información sensible, como usuarios donantes, correos, montos donados y resumen de la campaña. Por esta razón, esos reportes no deben estar disponibles para usuarios externos.

A partir de esta necesidad, se decidió crear una entidad documental asociada directamente a las campañas.

### Decisión

Se decidió crear una entidad llamada CampaignDocument.

Esta entidad permite registrar los documentos asociados a una campaña. Cada documento queda vinculado a una campaña y a un usuario que lo subió o generó.

El modelo permite almacenar metadatos importantes del archivo:

model CampaignDocument {
  id          String       @id @default(uuid())
  title       String
  description String?
  type        DocumentType @default(UPLOADED)

  fileUrl     String?
  s3Key       String
  bucket      String?

  fileName    String?
  mimeType    String?
  size        Int?

  campaignId  String
  campaign    Campaign @relation(fields: [campaignId], references: [id])

  uploadedById String
  uploadedBy   User @relation(fields: [uploadedById], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

También se definió un enum para diferenciar el tipo de documento:

enum DocumentType {
  UPLOADED
  GENERATED
}

La decisión fue separar los documentos en dos tipos principales:

UPLOADED
Documento subido manualmente por un usuario o administrador. Puede representar evidencia, soporte, archivo explicativo o documento relacionado con la campaña.

GENERATED
Documento generado automáticamente por el sistema. En este caso, se usa para reportes PDF de campaña que incluyen información de donaciones, usuarios donantes y resumen administrativo.

También se decidió crear un módulo específico para documentos:

document
├── document.controller.ts
├── document.service.ts
├── document.module.ts
└── dto
    ├── create-document.dto.ts
    └── update-document.dto.ts

Este módulo permite:

- subir documentos a una campaña
- listar documentos
- consultar documentos propios
- consultar documentos por campaña
- consultar un documento específico
- actualizar metadatos del documento
- eliminar documentos
- generar reportes PDF de campaña

Además, se definieron reglas de permisos:

Usuarios externos:
- pueden ver documentos públicos de tipo UPLOADED relacionados con una campaña.
- no pueden ver reportes privados de tipo GENERATED.

Dueño de la campaña:
- puede subir documentos a su campaña.
- puede ver documentos UPLOADED y GENERATED de su campaña.
- puede generar reportes de su campaña.

Administrador:
- puede ver todos los documentos.
- puede generar reportes de cualquier campaña.
- puede eliminar documentos.

En el frontend, esto se reflejó separando visualmente:

Documentos relacionados
Reportes privados

Los documentos relacionados son visibles para todos, mientras que los reportes privados solo aparecen si el usuario autenticado es administrador o dueño de la campaña.

### Consecuencias
#### Ventajas

La principal ventaja es que cada campaña puede tener una trazabilidad documental clara. Ya no se depende únicamente de texto en la campaña, sino que se pueden asociar archivos reales que respalden o expliquen la campaña.

También mejora la organización del sistema. Los documentos no quedan dispersos ni mezclados con la información principal de la campaña, sino que tienen su propia entidad y su propia relación.

Otra ventaja es que se pueden manejar diferentes tipos de documentos mediante DocumentType. Esto permitió distinguir entre archivos subidos manualmente y reportes generados automáticamente.

Esta decisión también facilitó la generación de reportes PDF. Los reportes se almacenan como documentos de tipo GENERATED, quedando asociados a la campaña y disponibles para el administrador o el dueño.

Además, se mejora la seguridad de la información. Los reportes generados contienen información sensible sobre donaciones, por lo que se decidió no mostrarlos a usuarios externos. En cambio, los documentos de soporte sí pueden ser visibles para todos los usuarios.

También mejora la escalabilidad del sistema. Si en el futuro se quiere agregar más tipos de documentos, se puede ampliar el enum o agregar nuevos atributos sin modificar la estructura principal de campañas.

Ejemplo de posibles tipos futuros:

IMAGE
PDF_SUPPORT
PAYMENT_RECEIPT
ADMIN_REPORT
LEGAL_DOCUMENT

También se fortalece el frontend, porque ahora se pueden construir componentes y páginas específicas para documentos:

DocumentForm
DocumentList
documents/page.tsx

Esto permite una mejor separación de responsabilidades y evita mezclar la lógica documental con la lógica principal de campañas.

#### Desventajas

Una desventaja es que el sistema se vuelve más complejo. Antes solo se manejaban campañas y donaciones, pero ahora se debe manejar carga de archivos, metadatos, permisos y almacenamiento externo.

También se debe controlar correctamente la visibilidad de los documentos. Si no se filtran bien los documentos, un usuario externo podría llegar a ver reportes privados. De hecho, durante el desarrollo se detectó este problema y se corrigió separando los documentos UPLOADED de los GENERATED.

Otra desventaja es que eliminar una campaña se vuelve más delicado. Si una campaña tiene documentos, no basta con eliminar el registro de la campaña. También se deben eliminar los documentos asociados de la base de datos y los archivos reales almacenados en S3.

Además, el sistema depende de la correcta configuración del servicio de almacenamiento. Si S3 no está configurado correctamente, la carga o consulta de documentos puede fallar.

#### Riesgos

Un riesgo importante es exponer documentos privados a usuarios no autorizados. Para mitigar este riesgo se decidió que:

GET /campaigns/:id

solo devuelva documentos de tipo UPLOADED, mientras que los documentos completos de una campaña se consultan mediante endpoints protegidos y con validación de permisos.

Otro riesgo es que se eliminen registros de documentos en la base de datos pero no se eliminen los archivos reales de S3. Esto podría generar archivos huérfanos y costos innecesarios. Para reducir este riesgo, se ajustó la eliminación de campañas para borrar también los archivos de S3 asociados.

También existe el riesgo de que se suban archivos con nombres problemáticos, caracteres especiales o espacios. Para esto se decidió limpiar los nombres de archivo antes de construir la clave de S3.

Otro riesgo es que los documentos crezcan demasiado en cantidad o tamaño. Por eso es importante controlar el tamaño máximo de archivos y los tipos permitidos en futuras versiones.

#### Impacto en el proyecto

El impacto fue alto porque se agregó una nueva capacidad funcional al sistema: la gestión documental por campaña.

Esta decisión impactó:

Base de datos:
- creación de CampaignDocument
- creación de DocumentType
- relación con Campaign
- relación con User

Backend:
- creación de DocumentModule
- creación de DocumentController
- creación de DocumentService
- integración con UploaderService
- generación de reportes PDF
- validación de permisos por rol y propietario

Frontend:
- creación de página /documents
- creación de DocumentForm
- visualización de documentos en detalle de campaña
- separación entre documentos públicos y reportes privados

Seguridad:
- restricción de reportes privados
- uso de autenticación JWT
- validación de dueño de campaña o administrador

Esta decisión también permitió justificar mejor el valor del sistema, ya que una plataforma de donaciones necesita evidencias, soportes y reportes para mejorar la transparencia y la administración.

### Alternativas consideradas
#### Alternativa 1: Guardar solo URLs directamente en Campaign

Una opción era agregar campos directamente en Campaign, por ejemplo:

documentUrl String?
reportUrl   String?

Esta opción fue descartada porque limita la cantidad de documentos. Una campaña podría necesitar varios archivos, no solo uno.

Además, mezclar documentos dentro de la entidad Campaign rompe la separación de responsabilidades.

#### Alternativa 2: Guardar documentos como JSON dentro de Campaign

Otra opción era usar un campo JSON:

documents Json

Esta opción fue descartada porque dificulta consultas, filtros, permisos, eliminación individual y relaciones con usuarios.

También haría más difícil distinguir entre documentos públicos y reportes privados.

#### Alternativa 3: Crear una entidad genérica FileUpload sin relación fuerte con Campaign

Se consideró crear una entidad genérica para archivos. Sin embargo, se decidió que para este proyecto era más claro manejar una entidad específica de documentos de campaña, porque el dominio principal gira alrededor de campañas.

#### Alternativa seleccionada

La alternativa seleccionada fue crear CampaignDocument, relacionada con Campaign y User, usando DocumentType para diferenciar documentos subidos y reportes generados.

### Fecha

15/05/2026

## ADR-006: Almacenamiento de archivos en AWS S3
### Estado

Aceptado

### Contexto

Después de decidir que las campañas podían tener documentos asociados, surgió la necesidad de definir dónde almacenar físicamente los archivos.

Una opción inicial era guardar los archivos directamente en la base de datos PostgreSQL. Sin embargo, esto no es recomendable para archivos como PDF, Word, imágenes o documentos grandes, porque aumenta el tamaño de la base de datos, afecta el rendimiento y complica los respaldos.

Otra opción era guardar los archivos localmente en el servidor. Esto podía funcionar durante desarrollo, pero no era adecuado para despliegue en AWS, porque los archivos podrían perderse si la instancia cambia, se reinicia, se reemplaza o se escala horizontalmente.

Además, el sistema necesitaba almacenar diferentes tipos de documentos:

- archivos subidos por usuarios
- documentos de soporte
- reportes PDF generados automáticamente
- archivos asociados a campañas

Por estas razones se decidió usar un servicio especializado para almacenamiento de objetos.

AWS S3 es una opción adecuada porque permite almacenar archivos de manera escalable, separada de la base de datos y compatible con despliegues en la nube.

### Decisión

Se decidió almacenar los archivos en AWS S3.

La base de datos no guarda el archivo completo, sino únicamente sus metadatos y la referencia al objeto en S3.

En la tabla CampaignDocument se guardan campos como:

fileUrl
s3Key
bucket
fileName
mimeType
size
campaignId
uploadedById

La lógica general queda así:

1. El usuario selecciona un archivo desde el frontend.
2. El frontend envía el archivo al backend usando multipart/form-data.
3. El backend recibe el archivo con Multer.
4. El backend genera una clave s3Key.
5. El backend sube el archivo a S3.
6. El backend guarda los metadatos del archivo en PostgreSQL.
7. El sistema usa URLs firmadas para acceder al archivo.

Se creó un servicio específico para encapsular la comunicación con S3:

UploaderService

Este servicio maneja:

- subir archivos
- eliminar archivos
- generar URLs firmadas
- obtener nombre del bucket

Ejemplo conceptual del servicio:

@Injectable()
export class UploaderService {
  private client: S3Client;
  private bucketName: string;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = process.env.AWS_BUCKET_NAME;
  }

  async upload(file: any, key: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.client.send(command);
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });
  }

  async delete(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.client.send(command);
  }
}

También se decidió usar variables de entorno para la configuración:

AWS_BUCKET_NAME=nombre-del-bucket
AWS_REGION=region
AWS_ACCESS_KEY_ID=access-key
AWS_SECRET_ACCESS_KEY=secret-key

Las credenciales no deben quedar escritas directamente en el código fuente.

### Consecuencias
#### Ventajas

La principal ventaja es que los archivos no se almacenan en la base de datos. PostgreSQL queda encargado de guardar información estructurada, mientras que S3 se encarga de guardar archivos.

Esto mejora la escalabilidad del sistema, porque S3 está diseñado para almacenar grandes cantidades de objetos.

También mejora la portabilidad del backend. Si el servidor se reinicia o se despliega en otra instancia, los archivos no se pierden porque están almacenados externamente.

Otra ventaja es que se puede controlar el acceso a los archivos mediante políticas IAM y URLs firmadas. Esto es importante porque no todos los archivos deben ser públicos.

Además, se reducen problemas de rendimiento en la base de datos. Los archivos pesados no afectan las consultas normales de campañas, usuarios o donaciones.

También se facilita la eliminación de archivos. Cada documento tiene un s3Key, por lo que el backend puede eliminar el objeto exacto cuando se elimina un documento o una campaña.

Otra ventaja es que esta decisión está alineada con un futuro despliegue en AWS, porque S3 se integra naturalmente con otros servicios de la nube.

#### Desventajas

Una desventaja es que el sistema ahora depende de un servicio externo. Si S3 está mal configurado, si las credenciales son incorrectas o si el usuario IAM no tiene permisos, la carga de archivos falla.

Durante el desarrollo se presentó un error relacionado con permisos:

not authorized to perform: s3:PutObject

Esto ocurrió porque el usuario IAM no tenía permisos suficientes para subir objetos al bucket. Fue necesario ajustar las políticas de permisos.

También se presentó un problema de configuración de región:

expected region to be configured for aws.auth#sigv4

Esto mostró la importancia de que las variables de entorno coincidan exactamente con las usadas en el código.

Otra desventaja es que el uso de S3 puede generar costos. Aunque para un proyecto pequeño los costos pueden ser bajos, es necesario tener cuidado con almacenamiento, solicitudes y transferencia de datos.

También aumenta la complejidad del despliegue, porque se deben configurar:

- bucket S3
- usuario IAM
- permisos
- variables de entorno
- políticas de acceso
#### Riesgos

Un riesgo importante es exponer credenciales de AWS. Durante el desarrollo se evidenció que las Access Keys no deben compartirse ni subirse al repositorio. La solución es usar variables de entorno y rotar las credenciales si fueron expuestas.

Otro riesgo es otorgar permisos demasiado amplios al usuario IAM. Aunque una solución rápida es usar AmazonS3FullAccess, lo más seguro es crear una política limitada al bucket específico del proyecto.

Ejemplo de permisos recomendados:

{
  "Effect": "Allow",
  "Action": [
    "s3:PutObject",
    "s3:GetObject",
    "s3:DeleteObject"
  ],
  "Resource": "arn:aws:s3:::proyecto-donaciones/*"
}

También existe el riesgo de dejar archivos huérfanos en S3 si se eliminan registros en la base de datos sin eliminar los objetos. Para reducir esto, se ajustó la eliminación de campañas para eliminar primero los archivos asociados en S3.

Otro riesgo es que las URLs firmadas expiren. Esto es esperado, pero el frontend debe estar preparado para solicitar nuevas URLs si es necesario.

#### Impacto en el proyecto

El impacto fue alto porque se agregó una infraestructura externa para almacenamiento.

Esta decisión impactó:

Backend:
- instalación del SDK de AWS
- creación de UploaderService
- integración con DocumentService
- carga de archivos con Multer
- eliminación de archivos en S3
- generación de URLs firmadas

Base de datos:
- almacenamiento de s3Key
- almacenamiento de bucket
- almacenamiento de metadatos del archivo

Frontend:
- formularios con multipart/form-data
- carga de archivos desde DocumentForm
- visualización de links a documentos
- separación de documentos públicos y reportes privados

Seguridad:
- uso de variables de entorno
- control de permisos IAM
- uso de URLs firmadas

Esta decisión permitió que el sistema pueda manejar archivos de manera más profesional y cercana a un entorno real de producción.

### Alternativas consideradas
#### Alternativa 1: Guardar archivos en PostgreSQL

Se consideró guardar archivos directamente en la base de datos usando campos binarios.

Esta opción fue descartada porque aumenta el tamaño de la base de datos y afecta el rendimiento. Además, no es ideal para archivos grandes o numerosos.

#### Alternativa 2: Guardar archivos localmente en el servidor

Se consideró guardar archivos en una carpeta local del backend.

Esta opción fue descartada porque no es segura para despliegues en la nube. Si el servidor se reemplaza, escala o se reinicia, los archivos pueden perderse.

También dificulta el despliegue en múltiples instancias.

#### Alternativa 3: Usar URLs externas ingresadas manualmente

Otra opción era que el usuario pegara una URL externa del documento.

Esta opción fue descartada porque no garantiza disponibilidad, seguridad ni control sobre los archivos. Además, el sistema no podría eliminar ni administrar esos documentos.

#### Alternativa seleccionada

La alternativa seleccionada fue usar AWS S3, guardando los archivos como objetos y almacenando en PostgreSQL únicamente los metadatos y la referencia s3Key.

### Fecha

15/05/2026

## ADR-007: Uso de URLs firmadas para archivos privados
### Estado

Aceptado

### Contexto

Después de decidir que los documentos de las campañas serían almacenados en AWS S3, fue necesario definir cómo los usuarios accederían a esos archivos desde el sistema.

Una opción inicial era dejar los archivos públicos dentro del bucket. Esto habría permitido que cualquier persona con el enlace pudiera abrir el documento directamente. Sin embargo, esta alternativa generaba riesgos importantes de seguridad y privacidad.

En el sistema existen diferentes tipos de archivos:

- documentos públicos relacionados con la campaña
- soportes o evidencias subidas por usuarios
- reportes PDF generados automáticamente
- documentos administrativos

No todos estos archivos deben tener el mismo nivel de acceso. Por ejemplo, un documento de soporte general de una campaña puede ser visible para cualquier usuario que consulte la campaña, pero un reporte generado automáticamente puede contener información sensible como:

- usuarios que donaron
- correos de donantes
- montos aportados
- estado de las donaciones
- resumen administrativo de la campaña

Por esta razón, no era adecuado dejar los archivos completamente públicos en S3.

También se identificó que guardar la URL pública permanente en la base de datos podía ser problemático, porque si alguien copiaba esa URL, podría acceder al archivo sin pasar por las validaciones del backend.

El sistema necesitaba una forma de permitir acceso temporal a los archivos sin hacer público todo el bucket. Para esto se decidió usar URLs firmadas.

### Decisión

Se decidió utilizar URLs firmadas de AWS S3 para acceder a los archivos almacenados.

Una URL firmada es un enlace temporal generado por el backend que permite acceder a un archivo específico de S3 durante un tiempo limitado.

En este proyecto, el backend genera la URL mediante el método:

getSignedUrl()

del SDK de AWS.

La lógica general es:

1. El archivo se sube a S3.
2. En la base de datos se guarda el s3Key del archivo.
3. Cuando el sistema necesita mostrar el archivo, el backend genera una URL firmada.
4. El frontend recibe esa URL temporal.
5. El usuario puede abrir el archivo mientras la URL esté vigente.

Ejemplo conceptual:

async getSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: this.bucketName,
    Key: key,
  });

  return await getSignedUrl(this.client, command, {
    expiresIn: 3600,
  });
}

En este caso, la URL tiene una duración aproximada de:

3600 segundos = 1 hora

También se decidió guardar en la base de datos el s3Key, no depender únicamente del fileUrl.

Ejemplo:

s3Key: campaigns/123/documents/archivo.pdf
bucket: proyecto-donaciones
fileName: archivo.pdf
mimeType: application/pdf
size: 204800

Esto permite que el backend pueda generar nuevas URLs firmadas cuando sea necesario.

### Consecuencias
#### Ventajas

La principal ventaja es que los archivos no tienen que ser públicos de forma permanente. El bucket de S3 puede mantenerse privado y el acceso se controla desde el backend.

Esto mejora la seguridad del sistema, porque el usuario no accede directamente a S3 con permisos libres, sino mediante una URL temporal.

Otra ventaja es que el backend conserva el control sobre quién puede solicitar una URL. Por ejemplo, antes de generar una URL para un documento privado, el backend puede validar:

- si el usuario está autenticado
- si es administrador
- si es dueño de la campaña
- si el documento es público o privado

También permite manejar documentos con diferentes niveles de visibilidad. Los documentos públicos pueden mostrarse a todos los usuarios, mientras que los reportes privados solo se entregan al administrador o al dueño de la campaña.

Otra ventaja importante es que las URLs firmadas expiran. Si un usuario copia el enlace, ese enlace dejará de funcionar después del tiempo definido. Esto reduce el riesgo de exposición permanente.

Además, el uso de s3Key en la base de datos permite regenerar URLs cuando sea necesario. No se depende de una URL fija que pueda expirar o cambiar.

También es una solución más profesional para un sistema que será desplegado en AWS, porque aprovecha mecanismos propios de seguridad de S3.

#### Desventajas

Una desventaja es que el frontend no puede depender de una URL permanente. Si la URL expira, el usuario debe solicitar una nueva desde el backend.

También aumenta un poco la complejidad del backend, porque no basta con guardar y devolver una URL. El backend debe generar URLs firmadas cada vez que lista o consulta documentos.

Otra desventaja es que las URLs firmadas pueden generar confusión durante el desarrollo. Si se guarda una URL firmada en la base de datos y luego expira, puede parecer que el archivo está dañado, cuando en realidad solo expiró el enlace.

Por eso se decidió que el dato realmente importante es el s3Key, y que fileUrl puede regenerarse.

También requiere que las credenciales de AWS tengan permiso para ejecutar:

s3:GetObject

Si el usuario IAM no tiene este permiso, la generación o acceso al archivo puede fallar.

#### Riesgos

Un riesgo es generar URLs firmadas sin validar permisos. Si el backend entrega una URL firmada a cualquier usuario, el sistema estaría exponiendo archivos privados aunque el bucket esté protegido.

Por eso es importante que los endpoints que consultan documentos apliquen las reglas de acceso correspondientes.

Otro riesgo es almacenar URLs firmadas como si fueran permanentes. Si se usa una URL expirada en el frontend, el usuario no podrá abrir el archivo. Para evitar esto, el backend debe generar una URL actualizada al momento de listar o consultar documentos.

También existe el riesgo de configurar un tiempo de expiración demasiado largo. Una URL con expiración muy larga se comporta casi como una URL pública. Por eso se eligió un tiempo razonable de una hora.

Otro riesgo es que los archivos GENERATED, como reportes PDF, puedan ser compartidos mientras la URL firmada esté activa. Aunque la URL expira, durante ese tiempo cualquier persona con el enlace podría acceder. Por eso es importante controlar bien quién recibe la URL.

#### Impacto en el proyecto

Esta decisión impactó principalmente el backend y la forma de consultar documentos.

En backend:

- se creó el método getSignedUrl en UploaderService
- se usa GetObjectCommand
- se genera una URL temporal al consultar documentos
- se evita depender de archivos públicos

En base de datos:

- se almacena s3Key
- se almacena bucket
- se almacenan metadatos del archivo
- fileUrl puede ser temporal

En frontend:

- los enlaces "Ver archivo" o "Ver reporte" usan la URL firmada recibida del backend
- el usuario puede abrir el archivo en una nueva pestaña
- si la URL expira, debe volver a cargar la información

En seguridad:

- el bucket puede mantenerse privado
- el acceso se controla por backend
- los reportes privados no dependen de URLs públicas permanentes

Esta decisión refuerza la seguridad documental del sistema y permite manejar correctamente archivos sensibles asociados a campañas.

### Alternativas consideradas
#### Alternativa 1: Hacer público el bucket de S3

Se consideró permitir acceso público a los archivos del bucket.

Esta opción fue descartada porque exponía todos los documentos a cualquier persona que tuviera el enlace. Además, no permitía diferenciar correctamente documentos públicos y privados.

#### Alternativa 2: Guardar URLs públicas permanentes

También se consideró guardar URLs públicas permanentes en la base de datos.

Esta opción fue descartada porque las URLs quedarían accesibles sin control del backend. Además, no permitiría aplicar reglas de permisos por usuario, rol o propietario.

#### Alternativa 3: Descargar archivos a través del backend

Otra opción era que el backend descargara el archivo desde S3 y lo enviara directamente al frontend.

Esta opción permitiría mayor control, pero aumentaría el consumo de recursos del servidor, porque el backend tendría que actuar como intermediario para cada descarga.

Para este proyecto se consideró más eficiente que el backend genere una URL firmada y que el archivo se descargue directamente desde S3.

#### Alternativa seleccionada

La alternativa seleccionada fue usar URLs firmadas de S3 generadas por el backend, con expiración temporal y control de permisos antes de entregar el enlace.

### Fecha

15/05/2026

## ADR-008: Separación entre documentos públicos y reportes privados
### Estado

Aceptado

### Contexto

Durante el desarrollo del módulo documental se identificó que no todos los archivos asociados a una campaña debían tener la misma visibilidad.

Inicialmente, todos los documentos asociados a una campaña podían aparecer juntos en el detalle de la campaña. Esto generó un problema: un usuario externo podía ver reportes generados automáticamente, aunque no fuera administrador ni dueño de la campaña.

Esto era incorrecto porque los reportes generados contienen información sensible de la campaña, como:

- listado de donaciones
- nombres o correos de donantes
- montos aportados
- estado de las donaciones
- información administrativa

En cambio, existen otros documentos que sí pueden ser visibles para cualquier usuario. Por ejemplo:

- documento explicativo de la campaña
- soporte público
- evidencia relacionada con la causa
- archivo informativo cargado por el creador

Por esta razón se necesitaba separar claramente los documentos públicos de los reportes privados.

También se identificó que esta separación no debía ser solo visual en el frontend. Si el backend enviaba todos los documentos al navegador, aunque el frontend ocultara algunos, los datos privados seguirían viajando al cliente. Esto no es seguro.

Por lo tanto, la decisión debía aplicarse tanto en backend como en frontend.

### Decisión

Se decidió diferenciar los documentos mediante el enum DocumentType.

El enum definido fue:

enum DocumentType {
  UPLOADED
  GENERATED
}

Se estableció la siguiente regla:

UPLOADED:
Documentos subidos manualmente por el usuario o administrador.
Representan documentos públicos relacionados con la campaña.
Pueden ser visibles para cualquier usuario que consulte la campaña.

GENERATED:
Documentos generados automáticamente por el sistema.
Actualmente representan reportes PDF de campaña.
Solo pueden ser visibles para el administrador o para el dueño de la campaña.

También se decidió que el endpoint público de detalle de campaña:

GET /campaigns/:id

debe retornar únicamente documentos de tipo UPLOADED.

En el backend, la consulta se ajustó conceptualmente así:

documents: {
  where: {
    type: 'UPLOADED',
  },
  orderBy: {
    createdAt: 'desc',
  },
}

Esto garantiza que los usuarios externos no reciban reportes privados cuando consultan una campaña.

Para usuarios con permisos especiales, es decir, administrador o dueño de la campaña, el frontend puede solicitar los documentos completos usando un endpoint protegido:

GET /documents/campaign/:campaignId

Este endpoint valida:

- usuario autenticado
- administrador o dueño de la campaña

Si el usuario cumple la condición, puede ver documentos UPLOADED y GENERATED.

En frontend se decidió separar visualmente:

Documentos relacionados
Reportes privados

Los documentos relacionados muestran archivos UPLOADED.

Los reportes privados muestran archivos GENERATED, pero solo si el usuario autenticado es administrador o dueño de la campaña.

### Consecuencias
#### Ventajas

La principal ventaja es la mejora de seguridad. Los reportes privados ya no son enviados a cualquier usuario que consulte una campaña.

También se mejora la claridad funcional del sistema. Los usuarios externos solo ven documentos relacionados con la campaña, mientras que los administradores y dueños tienen acceso a reportes internos.

Otra ventaja es que la separación permite cumplir mejor con el principio de mínimo privilegio. Cada usuario solo accede a la información que necesita según su rol o relación con la campaña.

También mejora la experiencia de usuario. En lugar de mostrar todos los archivos mezclados, el sistema presenta dos secciones claras:

Documentos relacionados
Reportes privados

Esto permite que el dueño de la campaña o el administrador entienda fácilmente cuáles documentos son públicos y cuáles son internos.

Además, esta decisión permite escalar el sistema en el futuro. Si se agregan nuevos tipos de documentos privados, la lógica ya está preparada para separar visibilidad por tipo.

Ejemplo:

UPLOADED       público
GENERATED      privado
ADMIN_REPORT   privado
LEGAL_FILE     privado

También mejora la arquitectura porque el control de privacidad no queda únicamente en el frontend. El backend filtra la información desde la consulta principal.

#### Desventajas

Una desventaja es que el frontend necesita hacer una lógica adicional. Primero carga el detalle de la campaña y luego, si el usuario es administrador o dueño, carga los documentos completos.

Esto agrega más complejidad al archivo de detalle de campaña.

Otra desventaja es que se deben mantener dos formas de consultar documentos:

GET /campaigns/:id
GET /documents/campaign/:campaignId

La primera devuelve información pública de la campaña, mientras que la segunda devuelve documentos completos para usuarios autorizados.

También se requiere tener cuidado al crear nuevos endpoints. Cualquier endpoint que devuelva documentos debe respetar la diferencia entre UPLOADED y GENERATED.

#### Riesgos

Un riesgo es olvidar aplicar el filtro type: 'UPLOADED' en algún endpoint público. Esto podría volver a exponer reportes privados.

Otro riesgo es confiar únicamente en el frontend para ocultar reportes. Esto no sería seguro, porque los datos seguirían llegando al navegador. Por eso la decisión incluye una regla explícita en backend.

También existe el riesgo de que un usuario externo intente consultar directamente:

GET /documents/campaign/:campaignId

Para mitigar esto, el backend debe validar que el usuario sea dueño de la campaña o administrador antes de devolver los documentos completos.

Otro riesgo es que un documento privado sea guardado accidentalmente como UPLOADED. En ese caso, podría ser visible públicamente. Por eso es importante que los reportes generados automáticamente siempre se guarden con:

type: GENERATED
Impacto en el proyecto

Esta decisión impactó backend, frontend y reglas de negocio.

En backend:

- se filtraron documentos públicos en GET /campaigns/:id
- se mantuvo un endpoint protegido para documentos completos por campaña
- se validó dueño o administrador para documentos privados
- los reportes PDF se guardan como GENERATED

En frontend:

- se separaron documentos relacionados y reportes privados
- se ocultaron reportes a usuarios externos
- se mostraron reportes solo a admin o dueño
- se cargaron documentos completos solo si el usuario tiene permisos

En seguridad:

- usuarios externos no reciben reportes privados
- se evita exponer información sensible de donaciones
- se aplica control de permisos en backend

En experiencia de usuario:

- el usuario externo ve documentos normales de la campaña
- el dueño ve reportes administrativos de su campaña
- el administrador ve reportes de cualquier campaña

Esta decisión fue importante porque corrigió un problema real detectado durante las pruebas: usuarios externos podían revisar reportes generados. Después del ajuste, esa información quedó protegida.

### Alternativas consideradas
#### Alternativa 1: Mostrar todos los documentos a todos los usuarios

Esta opción fue descartada porque exponía información sensible contenida en los reportes generados.

No era aceptable que cualquier usuario pudiera ver reportes con donantes, correos y montos.

#### Alternativa 2: Ocultar reportes solo en el frontend

Se consideró filtrar los reportes en React o Next.js.

Esta opción fue descartada como solución única porque los datos seguirían llegando al navegador. Aunque no se mostraran visualmente, podrían inspeccionarse desde herramientas de desarrollo.

#### Alternativa 3: Crear otra tabla para reportes

Otra opción era crear una tabla separada llamada CampaignReport.

Esta opción habría separado más claramente los reportes, pero se consideró innecesaria para esta versión del proyecto. Como los reportes también son documentos asociados a campañas, era suficiente diferenciarlos por DocumentType.

#### Alternativa seleccionada

La alternativa seleccionada fue mantener una sola entidad CampaignDocument, usando DocumentType para diferenciar documentos públicos UPLOADED y reportes privados GENERATED, aplicando filtros y validaciones tanto en backend como en frontend.

### Fecha

15/05/2026

## ADR-009: Generación automática de reportes PDF
### Estado

Aceptado

### Contexto

Durante el desarrollo del módulo documental se identificó que no era suficiente permitir únicamente la carga manual de archivos asociados a una campaña. Aunque los usuarios podían subir documentos de soporte, evidencias o archivos relacionados, seguía existiendo una necesidad administrativa importante: generar automáticamente un reporte completo de cada campaña.

El sistema ya contaba con varias entidades relacionadas:

Campaign
Category
User
Donation
CampaignDocument

Gracias a estas entidades, el sistema tenía información suficiente para construir un documento resumen de una campaña, incluyendo:

- información general de la campaña
- categoría
- usuario creador
- meta económica
- monto recaudado
- porcentaje de avance
- donaciones realizadas
- usuarios donantes
- documentos asociados

Antes de esta decisión, el administrador o el dueño de una campaña podían ver información en pantalla, pero no existía un archivo formal que consolidara los datos. Esto limitaba la trazabilidad documental y hacía más difícil entregar evidencias o informes administrativos sobre el estado de una campaña.

Además, como se había creado la entidad CampaignDocument, era necesario aprovecharla no solo para documentos subidos manualmente, sino también para documentos generados por el sistema. Por esta razón ya existía el enum:

enum DocumentType {
  UPLOADED
  GENERATED
}

Los documentos UPLOADED representan archivos cargados manualmente por usuarios o administradores. Sin embargo, hacía falta implementar correctamente los documentos GENERATED, que serían creados automáticamente por el sistema.

También se identificó que estos reportes no debían ser públicos, porque pueden contener información sensible, como nombres, correos y montos donados por los usuarios. Por lo tanto, la generación y visualización de reportes debía estar restringida al administrador o al dueño de la campaña.

### Decisión

Se decidió implementar la generación automática de reportes PDF por campaña.

Para esto se agregó un endpoint en el backend:

POST /documents/generate-report/:campaignId

Este endpoint permite generar un reporte PDF asociado a una campaña específica.

La generación del reporte sigue este flujo:

1. El usuario autenticado solicita generar el reporte.
2. El backend valida que la campaña exista.
3. El backend valida que el usuario sea administrador o dueño de la campaña.
4. El backend consulta la información completa de la campaña.
5. El backend obtiene categoría, creador, donaciones y documentos asociados.
6. El backend genera un archivo PDF.
7. El backend sube el PDF a AWS S3.
8. El backend guarda el reporte en CampaignDocument con type GENERATED.
9. El frontend recarga la campaña y muestra el reporte en la sección privada.

Para generar el PDF se decidió usar la librería:

pdfkit

El reporte generado incluye información como:

Reporte de campaña

Información general:
- título
- descripción
- categoría
- creador
- correo del creador
- meta
- recaudado
- faltante
- progreso
- fecha de creación

Resumen de donaciones:
- cantidad de donaciones
- total recaudado

Detalle de donaciones:
- nombre del donante
- correo del donante
- monto
- estado
- fecha

Documentos asociados:
- título del documento
- tipo de documento
- nombre del archivo

El archivo se almacena en S3 con una ruta similar a:

campaigns/{campaignId}/reports/reporte-{nombre-campaña}-{timestamp}.pdf

Luego se registra en la base de datos como un documento de campaña:

type: GENERATED
campaignId: campaign.id
uploadedById: userId
mimeType: application/pdf

También se decidió que el reporte solo pueda ser generado por:

- el administrador
- el usuario creador de la campaña

Por esta razón, el endpoint se protege con autenticación JWT, pero la autorización específica se valida en el servicio, comparando el userId del token con el userId de la campaña.

### Consecuencias
#### Ventajas

La principal ventaja es que el sistema puede producir reportes administrativos automáticamente sin que el usuario tenga que construirlos manualmente.

Esto mejora la trazabilidad de la plataforma, porque cada campaña puede tener un documento formal que resume su estado, sus donaciones y sus archivos asociados.

También fortalece la transparencia del sistema. El administrador o el dueño de la campaña pueden revisar en un solo archivo quiénes han donado, cuánto se ha recaudado y qué documentos existen.

Otra ventaja es que se reutiliza la entidad CampaignDocument. En lugar de crear una tabla separada para reportes, los reportes se tratan como documentos generados por el sistema. Esto mantiene el modelo simple y coherente.

Además, el reporte queda almacenado en AWS S3, por lo que no ocupa espacio pesado en la base de datos. La base de datos solo guarda metadatos, como:

fileName
mimeType
size
s3Key
bucket
campaignId
uploadedById

También se mejora la experiencia del frontend, porque el dueño de la campaña o el administrador puede generar el reporte desde el detalle de la campaña con un botón:

Generar reporte PDF

Después de generarlo, el reporte aparece en una sección separada llamada:

Reportes privados

Otra ventaja es que esta decisión ayuda a justificar la existencia del módulo documental y del tipo GENERATED. El sistema no solo permite cargar documentos, sino también producir documentación automática.

#### Desventajas

Una desventaja es que se agrega complejidad al backend. Ahora el servicio de documentos no solo sube archivos, sino que también genera PDFs, consulta relaciones y sube archivos generados a S3.

También se introduce una dependencia adicional:

pdfkit

Esto implica instalar, mantener y configurar correctamente la librería.

Otra desventaja es que la generación de reportes puede tardar más si una campaña tiene muchas donaciones o documentos asociados. Aunque para este proyecto el volumen es manejable, en un sistema más grande podría ser necesario generar reportes en segundo plano.

También es necesario cuidar el formato del PDF. Si las descripciones son muy largas o hay muchas donaciones, el documento podría necesitar paginación o mejor diseño visual.

Otra desventaja es que si S3 falla, el reporte podría generarse en memoria pero no guardarse correctamente. Por eso el proceso depende tanto de la generación del PDF como de la disponibilidad de S3.

#### Riesgos

Un riesgo importante es que usuarios no autorizados generen reportes de campañas que no les pertenecen. Para mitigar esto, el backend valida que el usuario sea administrador o dueño de la campaña.

Otro riesgo es exponer información sensible. Los reportes incluyen información de donantes y montos, por lo que no deben mostrarse a usuarios externos.

También existe el riesgo de generar reportes duplicados. Si el usuario presiona varias veces el botón, podrían crearse varios PDFs para la misma campaña. Esto no rompe el sistema, pero puede generar archivos innecesarios en S3.

En una versión futura se podría controlar esto de varias formas:

- deshabilitar el botón mientras se genera
- reemplazar el reporte anterior
- mantener historial de reportes
- permitir eliminar reportes antiguos

Otro riesgo es que la URL firmada expire. El archivo sigue existiendo en S3, pero el enlace temporal deja de funcionar. Para mitigarlo, el backend puede generar una nueva URL firmada cada vez que se consultan los documentos.

#### Impacto en el proyecto

El impacto fue alto porque se agregó una funcionalidad administrativa nueva y se fortaleció el módulo documental.

En backend impactó:

- DocumentController
- DocumentService
- UploaderService
- AWS S3
- CampaignDocument
- Donation
- Campaign

Se agregó el endpoint:

POST /documents/generate-report/:campaignId

En base de datos impactó:

- uso del enum DocumentType.GENERATED
- almacenamiento del reporte como CampaignDocument
- relación del reporte con Campaign
- relación del reporte con User

En frontend impactó:

- detalle de campaña
- botón Generar reporte PDF
- separación entre documentos relacionados y reportes privados
- visualización del reporte solo para admin o dueño

En seguridad impactó:

- validación de usuario autenticado
- validación de propietario o administrador
- ocultamiento de reportes a usuarios externos

Esta decisión aportó valor al proyecto porque convierte los datos del sistema en documentación formal, útil para seguimiento, control y evidencia.

### Alternativas consideradas
#### Alternativa 1: No generar reportes

Se consideró dejar el sistema únicamente con visualización en pantalla.

Esta opción fue descartada porque no permitía tener un documento consolidado de la campaña. Además, limitaba la trazabilidad y la capacidad administrativa del sistema.

#### Alternativa 2: Generar reportes manualmente fuera del sistema

Otra opción era que el administrador copiara los datos y creara reportes manuales en Word, Excel o PDF.

Esta opción fue descartada porque consume tiempo, puede generar errores humanos y no aprovecha la información ya almacenada en la base de datos.

#### Alternativa 3: Generar reportes en Excel

Se consideró generar reportes en Excel.

Esta opción puede ser útil en el futuro, especialmente para análisis de datos. Sin embargo, para esta versión se eligió PDF porque es un formato más formal para informes y más fácil de presentar como documento administrativo.

#### Alternativa 4: Crear una entidad separada CampaignReport

También se consideró crear una tabla específica para reportes.

Esta opción fue descartada porque los reportes también son documentos asociados a campañas. Por eso era más simple y coherente almacenarlos en CampaignDocument usando type: GENERATED.

#### Alternativa seleccionada

La alternativa seleccionada fue generar reportes PDF automáticamente con pdfkit, almacenarlos en S3 y registrarlos como documentos de campaña de tipo GENERATED.

### Fecha

15/05/2026

## ADR-010: Modelo de permisos por rol y propietario
### Estado

Aceptado

### Contexto

Durante el desarrollo del sistema se identificó que no era suficiente manejar permisos únicamente con roles generales como:

ADMIN
USER

Inicialmente, varias acciones se plantearon como exclusivas del administrador. Sin embargo, al analizar el comportamiento real del sistema, se observó que algunas operaciones también debían estar permitidas para el usuario creador de una campaña.

Por ejemplo, si un usuario crea una campaña, debe poder gestionar ciertos aspectos de esa campaña, como:

- eliminar su propia campaña
- subir documentos relacionados
- generar reportes de su campaña
- ver reportes privados de su campaña

Pero ese mismo usuario no debería poder administrar campañas de otros usuarios.

Por otro lado, el administrador sí debe tener un control más amplio del sistema:

- gestionar categorías
- eliminar cualquier campaña
- ver todos los documentos
- generar reportes de cualquier campaña
- consultar logs de auditoría

También se identificó que los usuarios externos o usuarios que no son dueños de una campaña deben tener permisos limitados. Estos usuarios deben poder:

- ver campañas
- donar
- ver documentos públicos relacionados

Pero no deben poder:

- eliminar campañas ajenas
- generar reportes de campañas ajenas
- ver reportes privados
- subir documentos a campañas ajenas

Por esta razón se decidió aplicar un modelo de permisos combinado: por rol y por propietario.

### Decisión

Se decidió implementar un modelo de permisos basado en dos criterios:

1. Rol del usuario
2. Propiedad del recurso

El rol determina permisos generales del sistema, mientras que la propiedad determina si un usuario puede gestionar un recurso que él mismo creó.

Los roles definidos son:

enum Role {
  ADMIN
  USER
}

La regla general queda así:

ADMIN:
Puede administrar recursos globales y gestionar cualquier campaña.

USER:
Puede crear campañas, donar y gestionar únicamente sus propias campañas.

Usuario externo o no propietario:
Puede ver campañas, donar si está autenticado y consultar documentos públicos.

Para acciones administrativas puras, como gestionar categorías, se mantiene el uso de RolesGuard:

@UseGuards(AuthGuard('jwt'), RolesGuard)

Esto aplica para acciones como:

POST /categories
PATCH /categories/:id
DELETE /categories/:id
GET /audit-logs

Sin embargo, para acciones donde también debe permitirse al dueño del recurso, no se usa únicamente RolesGuard. En esos casos, el backend valida la propiedad dentro del servicio.

Por ejemplo, para eliminar una campaña:

const isOwner = campaign.userId === userId;
const isAdmin = role === 'ADMIN';

if (!isOwner && !isAdmin) {
  throw new ForbiddenException(
    'No tienes permiso para eliminar esta campaña',
  );
}

Para generar un reporte:

const isOwner = campaign.userId === userId;
const isAdmin = role === 'ADMIN';

if (!isOwner && !isAdmin) {
  throw new ForbiddenException(
    'No tienes permiso para generar reportes de esta campaña',
  );
}

Con esto, el sistema permite que el administrador actúe sobre cualquier recurso, pero también respeta los derechos del usuario creador sobre su propia campaña.

En frontend se replica esta lógica para mostrar u ocultar botones:

const isAdmin = currentUser?.role === "ADMIN";
const isOwner = currentUser?.id === campaign.userId;
const canManageCampaign = isAdmin || isOwner;

Si canManageCampaign es verdadero, el usuario ve botones como:

- Subir documento
- Generar reporte PDF
- Eliminar campaña

Si es falso, el usuario solo ve opciones públicas, como donar o consultar documentos relacionados.

### Consecuencias
#### Ventajas

La principal ventaja es que el sistema maneja permisos de forma más realista. No todo depende únicamente de ser administrador. El usuario que crea una campaña tiene permisos sobre su propio recurso.

Esto mejora la experiencia del usuario creador, porque puede gestionar su campaña sin depender siempre del administrador.

También mejora la seguridad, porque un usuario normal no puede modificar ni eliminar campañas de otros usuarios.

Otra ventaja es que el modelo se adapta mejor al dominio del proyecto. En una plataforma de campañas y donaciones, tiene sentido que existan permisos diferentes según la relación del usuario con la campaña.

También se evita sobrecargar al administrador. Si solo el admin pudiera generar reportes o eliminar campañas, cualquier usuario creador tendría que depender de él para gestionar su propia campaña.

Además, el modelo permite aplicar el principio de mínimo privilegio:

Cada usuario tiene solo los permisos necesarios según su rol y relación con el recurso.

También mejora la claridad del frontend. La interfaz se adapta según el usuario:

Admin:
ve acciones administrativas.

Dueño:
ve acciones sobre su campaña.

Usuario externo:
ve solo acciones públicas.
#### Desventajas

Una desventaja es que la lógica de permisos se vuelve más compleja. Ya no basta con verificar si el usuario es ADMIN; también se debe comparar el userId del recurso con el usuario autenticado.

Esto requiere más código en los servicios backend.

Otra desventaja es que puede haber duplicación de validaciones si varias entidades manejan la misma regla de propietario o administrador.

Por ejemplo, esta lógica puede aparecer en varios lugares:

const isOwner = resource.userId === userId;
const isAdmin = role === 'ADMIN';

if (!isOwner && !isAdmin) {
  throw new ForbiddenException(...);
}

En el futuro se podría extraer a una función reutilizable para evitar duplicación.

También es necesario cuidar que el frontend y el backend estén alineados. El frontend puede ocultar botones, pero el backend siempre debe validar permisos. Ocultar botones no es suficiente.

#### Riesgos

Un riesgo importante es aplicar la validación solo en frontend. Si se oculta un botón, pero el endpoint no valida permisos, un usuario podría llamar la API directamente desde Postman o desde el navegador.

Por eso se decidió que el backend sea la fuente de verdad para permisos.

Otro riesgo es olvidar validar propiedad en algún endpoint. Por ejemplo, permitir que un usuario consulte o elimine documentos de una campaña ajena.

También existe el riesgo de confundir permisos de documentos públicos y privados. Por ejemplo, los documentos UPLOADED pueden ser visibles para todos, pero los reportes GENERATED solo para admin o dueño.

Otro riesgo es que el usuario almacenado en localStorage esté desactualizado. Por eso el backend no debe confiar en datos enviados por el frontend para permisos, sino en el token JWT.

#### Impacto en el proyecto

Esta decisión impactó varias funcionalidades.

En backend:

CampaignService:
- eliminar campaña solo si es admin o dueño
- actualizar campaña solo si es admin o dueño, si se permite edición

DocumentService:
- subir documentos solo si es admin o dueño
- generar reportes solo si es admin o dueño
- consultar documentos completos solo si es admin o dueño

CategoryController:
- crear, editar y eliminar categorías solo admin

AuditLogController:
- consultar auditoría solo admin

En frontend:

Detalle de campaña:
- botón eliminar solo admin o dueño
- botón generar reporte solo admin o dueño
- botón subir documento solo admin o dueño

Documentos:
- reportes privados solo admin o dueño

Categorías:
- formulario de categorías solo admin

En base de datos:

User.role permite distinguir ADMIN y USER.
Campaign.userId permite saber quién creó una campaña.
CampaignDocument.uploadedById permite saber quién subió o generó un documento.
Donation.userId permite saber quién donó.

Esta decisión fue fundamental para asegurar que el sistema tenga reglas claras de acceso y gestión.

### Alternativas consideradas
#### Alternativa 1: Todo lo gestiona solo el administrador

Se consideró que solo el administrador pudiera eliminar campañas, generar reportes y subir documentos.

Esta opción fue descartada porque limita demasiado al usuario creador. Si alguien crea una campaña, debería poder gestionar aspectos básicos de su propia campaña.

#### Alternativa 2: Cualquier usuario autenticado puede gestionar cualquier campaña

Esta opción fue descartada por completo porque representa un riesgo de seguridad. Un usuario podría eliminar campañas ajenas o generar reportes privados de campañas que no le pertenecen.

#### Alternativa 3: Manejar permisos solo en frontend

Se consideró ocultar botones según el usuario.

Esta opción fue descartada como solución única porque el frontend no es una barrera de seguridad real. Las validaciones deben estar en backend.

#### Alternativa 4: Crear roles adicionales

Se consideró crear más roles, por ejemplo:

CAMPAIGN_OWNER
DONOR
MANAGER

Esta opción fue descartada para esta versión porque agregaba complejidad innecesaria. La propiedad del recurso ya permite saber si un usuario es dueño de una campaña.

#### Alternativa seleccionada

La alternativa seleccionada fue usar un modelo mixto: permisos por rol (ADMIN) y permisos por propiedad del recurso (userId de la campaña).

### Fecha

15/05/2026

## ADR-011: Registro de auditoría del sistema
### Estado

Aceptado

### Contexto

Durante el desarrollo del sistema se identificó la necesidad de registrar acciones importantes realizadas dentro de la plataforma. El proyecto no solo maneja campañas y donaciones, también permite acciones administrativas y operaciones sensibles como creación de campañas, eliminación de recursos, carga de documentos, generación de reportes y gestión de categorías.

Inicialmente, muchas de estas acciones se ejecutaban directamente desde los servicios, pero no quedaba un historial formal de lo que había ocurrido. Por ejemplo, si un administrador eliminaba una campaña, si un usuario creaba una campaña o si se registraba una donación, el sistema podía realizar la operación, pero no existía una entidad encargada de guardar trazabilidad.

Esto representaba una limitación importante porque en una plataforma de donaciones es necesario tener control sobre las acciones relevantes del sistema. No basta con que la operación se ejecute correctamente; también es necesario poder revisar posteriormente quién hizo qué, cuándo lo hizo y sobre qué recurso actuó.

Además, el sistema maneja distintos roles y permisos. Existen usuarios normales, usuarios dueños de campañas y administradores. Por esta razón, era importante contar con un mecanismo que ayudara a supervisar acciones críticas y facilitar el seguimiento administrativo.

También se identificó que el sistema podría necesitar reportes o revisiones posteriores sobre eventos como:

- creación de campañas
- eliminación de campañas
- registro de donaciones
- inicio de sesión
- carga de documentos
- generación de reportes
- actualización de categorías

Por esta razón se decidió crear un registro de auditoría.

### Decisión

Se decidió crear una entidad llamada AuditLog.

Esta entidad permite almacenar eventos importantes del sistema, asociando cada acción con un usuario, una entidad afectada y una descripción.

El modelo definido fue:

enum AuditAction {
  CREATE
  UPDATE
  DELETE
  LOGIN
  DONATION
}

model AuditLog {
  id          String      @id @default(uuid())
  action      AuditAction
  entity      String?
  entityId    String?
  description String?

  userId      String?
  user        User?       @relation(fields: [userId], references: [id])

  createdAt   DateTime    @default(now())
}

La entidad permite registrar información como:

action: tipo de acción realizada
entity: nombre de la entidad afectada
entityId: identificador del recurso afectado
description: detalle de lo ocurrido
userId: usuario que realizó la acción
createdAt: fecha y hora del evento

Ejemplo de registros posibles:

action: CREATE
entity: Campaign
entityId: id-de-campaña
description: Usuario creó una nueva campaña
userId: id-del-usuario

action: DONATION
entity: Donation
entityId: id-donación
description: Usuario realizó una donación a una campaña
userId: id-del-usuario

action: DELETE
entity: Campaign
entityId: id-de-campaña
description: Administrador eliminó una campaña
userId: id-del-admin

También se decidió crear un módulo específico de auditoría:

audit-log
├── audit-log.controller.ts
├── audit-log.service.ts
├── audit-log.module.ts
└── dto

Este módulo permite consultar los logs registrados en el sistema.

Además, se decidió que el acceso a los logs de auditoría sea exclusivo del administrador, ya que contienen información sensible sobre acciones del sistema.

Por esa razón, el endpoint principal queda protegido con autenticación y RolesGuard:

@UseGuards(AuthGuard('jwt'), RolesGuard)

En el frontend se creó una ruta administrativa:

/admin/audit-logs

Esta página permite al administrador consultar acciones registradas y aplicar filtros como:

- acción
- entidad
- usuario
Consecuencias
#### Ventajas

La principal ventaja es que el sistema gana trazabilidad. Las acciones importantes dejan de ser eventos invisibles y pasan a quedar registradas en una tabla de auditoría.

Esto permite responder preguntas como:

¿Quién creó esta campaña?
¿Quién eliminó este documento?
¿Cuándo se realizó una donación?
¿Qué acciones hizo un administrador?
¿Qué entidad fue afectada?

También mejora la seguridad administrativa. Si ocurre un problema, el administrador puede consultar los logs para identificar qué usuario ejecutó determinada acción.

Otra ventaja es que la auditoría ayuda a fortalecer la transparencia del sistema. En una plataforma de donaciones, donde se manejan campañas, aportes y documentos, es importante tener evidencia de las operaciones realizadas.

Además, la entidad AuditLog está desacoplada de las entidades principales. Esto significa que no se mezcla la información de auditoría dentro de Campaign, Donation o Document, sino que se maneja en una tabla especializada.

También permite crecer en el futuro. Si más adelante se agregan nuevas acciones, se puede ampliar el enum AuditAction o registrar nuevas entidades afectadas sin modificar de forma fuerte el resto del sistema.

Ejemplo de posibles acciones futuras:

DOCUMENT_UPLOAD
DOCUMENT_GENERATE
CATEGORY_CREATE
CATEGORY_DELETE
USER_REGISTER

Otra ventaja es que facilita la construcción de una vista administrativa en el frontend. La página /admin/audit-logs permite mostrar eventos importantes del sistema de forma organizada.

#### Desventajas

Una desventaja es que se agrega más complejidad al backend. Cada operación importante puede requerir una llamada adicional para registrar un log.

También se debe tener cuidado de no llenar la tabla con eventos irrelevantes. Si se registra absolutamente todo, la auditoría puede crecer demasiado y volverse difícil de consultar.

Otra desventaja es que se debe mantener consistencia entre la acción real y el log. Si una operación falla, no debería quedar registrado como si hubiera sido exitosa.

Por ejemplo, si se intenta eliminar una campaña pero falla por una restricción de base de datos, no se debería guardar un log diciendo que la campaña fue eliminada correctamente.

También es necesario definir con claridad qué acciones se consideran auditables. No todas las consultas del sistema necesitan registrarse.

#### Riesgos

Un riesgo es registrar información sensible en la descripción del log. Por ejemplo, nunca se deben guardar contraseñas, tokens JWT, credenciales de AWS ni información secreta dentro de AuditLog.

Otro riesgo es que los logs crezcan demasiado con el tiempo. En un sistema real sería recomendable aplicar estrategias como paginación, filtros por fecha o limpieza histórica.

También existe el riesgo de que los logs no se creen si el desarrollador olvida llamar al servicio de auditoría dentro de una operación importante.

En una versión futura se podría mejorar esto usando interceptores, eventos de dominio o middleware para registrar acciones de forma más automática.

Otro riesgo es permitir que usuarios normales consulten los logs. Esto podría exponer información del sistema o acciones de otros usuarios. Por eso el acceso debe mantenerse restringido al administrador.

#### Impacto en el proyecto

Esta decisión impactó varias partes del sistema.

En base de datos:

- creación de AuditLog
- creación de AuditAction
- relación opcional con User

En backend:

- creación de AuditLogModule
- creación de AuditLogService
- creación de AuditLogController
- protección con RolesGuard
- posibilidad de registrar acciones importantes desde otros servicios

En frontend:

- creación de ruta /admin/audit-logs
- visualización de logs
- filtros por acción, entidad y usuario
- restricción visual para usuarios no administradores

En seguridad:

- acceso solo para ADMIN
- seguimiento de acciones sensibles
- apoyo para revisión administrativa

Esta decisión mejora la calidad arquitectónica del sistema porque agrega una capa de observabilidad y trazabilidad sobre las operaciones críticas.

### Alternativas consideradas
#### Alternativa 1: No registrar auditoría

Se consideró no crear auditoría y confiar únicamente en los datos finales de la base de datos.

Esta opción fue descartada porque no permite saber cómo ocurrieron los cambios ni quién los realizó.

#### Alternativa 2: Guardar logs en consola

Otra opción era usar únicamente console.log en el backend.

Esta alternativa fue descartada porque los logs de consola no son persistentes, son difíciles de consultar desde el sistema y pueden perderse al reiniciar el servidor.

Alternativa 3: Guardar auditoría dentro de cada entidad

Se consideró agregar campos de auditoría en cada entidad, como:

createdBy
updatedBy
deletedBy

Aunque esto puede ser útil, fue descartado como única solución porque no permite registrar múltiples eventos sobre el mismo recurso ni construir un historial completo.

#### Alternativa 4: Usar un servicio externo de monitoreo

Se consideró que en el futuro se podría usar un servicio externo para logs. Sin embargo, para esta etapa del proyecto era más adecuado implementar una tabla AuditLog sencilla dentro de la base de datos.

#### Alternativa seleccionada

La alternativa seleccionada fue crear una entidad AuditLog propia del sistema, relacionada opcionalmente con User, protegida para consulta exclusiva del administrador.

### Fecha

15/05/2026

## ADR-012: Arquitectura frontend modular con Clean Code
### Estado

Aceptado

### Contexto

Durante el desarrollo del frontend en Next.js se identificó la necesidad de evitar que toda la lógica, estilos, llamadas a API y renderizado quedaran mezclados dentro de los archivos page.tsx.

Al inicio, algunas páginas tenían demasiadas responsabilidades. Por ejemplo, una página podía encargarse de:

- renderizar la vista
- manejar estados
- hacer llamadas al backend
- validar permisos
- procesar formularios
- definir estilos
- formatear fechas
- formatear moneda
- mostrar errores

Esto hacía que los archivos crecieran mucho y fueran difíciles de mantener. Además, cada vez que se necesitaba reutilizar una funcionalidad, había riesgo de copiar y pegar código.

El proyecto necesitaba manejar varias secciones:

- login
- registro
- campañas
- creación de campañas
- detalle de campaña
- categorías
- donaciones
- documentos
- logs de auditoría

También se necesitaban componentes repetidos como botones, inputs, cards, badges, formularios, listas y encabezados de página.

Por esta razón se decidió organizar el frontend aplicando principios de Clean Code, separación de responsabilidades y reutilización de componentes.

### Decisión

Se decidió implementar una arquitectura frontend modular dentro de src.

La estructura definida fue:

src
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login
│   ├── register
│   ├── campaigns
│   ├── categories
│   ├── donations
│   ├── documents
│   └── admin
│       └── audit-logs
│
├── components
│   ├── ui
│   ├── layout
│   ├── forms
│   └── features
│
├── config
├── hooks
├── lib
├── services
├── types
└── utils

Cada carpeta tiene una responsabilidad clara.

La carpeta app contiene las rutas de Next.js:

/campaigns
/campaigns/create
/campaigns/[id]
/categories
/donations
/documents
/admin/audit-logs

La carpeta components/ui contiene componentes genéricos reutilizables:

Button
Input
Textarea
Select
Card
Badge
Loading

La carpeta components/layout contiene componentes estructurales:

Navbar
Container
PageHeader

La carpeta components/forms contiene formularios reutilizables:

LoginForm
RegisterForm
CampaignForm
CategoryForm
DonationForm
DocumentForm

La carpeta components/features contiene componentes relacionados con funcionalidades específicas:

campaigns/CampaignCard
campaigns/CampaignList
campaigns/CampaignDetail
categories/CategoryList
donations/DonationList
documents/DocumentList

La carpeta services contiene la comunicación con el backend:

auth.service.ts
campaign.service.ts
category.service.ts
donation.service.ts
document.service.ts
audit-log.service.ts

La carpeta lib contiene utilidades base de infraestructura frontend:

api.ts
storage.ts

La carpeta types contiene las interfaces y tipos TypeScript:

auth.ts
campaign.ts
category.ts
donation.ts
document.ts
user.ts
audit-log.ts

La carpeta utils contiene funciones auxiliares:

formatCurrency.ts
formatDate.ts
handleError.ts

También se decidió usar Tailwind CSS para estilos, evitando archivos CSS por componente y favoreciendo clases reutilizables junto con componentes UI.

El archivo global de estilos queda en:

src/app/globals.css
### Consecuencias
#### Ventajas

La principal ventaja es que el frontend queda más organizado y fácil de mantener. Cada archivo tiene una responsabilidad clara.

Las páginas de app se enfocan en construir la vista general y coordinar componentes, mientras que la lógica reutilizable se mueve a servicios, hooks, componentes y utilidades.

Esto mejora el principio de responsabilidad única. Por ejemplo:

Button.tsx solo maneja botones.
campaign.service.ts solo maneja llamadas a campañas.
formatCurrency.ts solo formatea moneda.
CampaignCard.tsx solo renderiza una tarjeta de campaña.

También mejora la reutilización. El mismo componente Button, Input, Card o Loading puede usarse en varias páginas sin repetir clases ni estructura.

Otra ventaja es que se reducen errores por duplicación. Si se necesita cambiar el estilo de los botones, se modifica en un solo componente y se refleja en todo el sistema.

También mejora el tipado con TypeScript. Al tener tipos definidos en src/types, los servicios, hooks y componentes pueden trabajar con estructuras claras.

Ejemplo:

import { Campaign } from "@/types/campaign";

Esto permite detectar errores antes de ejecutar el sistema.

La arquitectura también facilita el consumo del backend. En lugar de hacer fetch directamente en todas las páginas, se creó un archivo api.ts y servicios específicos.

Ejemplo:

campaignService.findAll()
documentService.generateCampaignReport(id)
authService.login(data)

Esto permite centralizar el manejo de tokens, headers, errores y URLs base.

También se mejora el manejo de autenticación usando storage.ts, donde se centraliza el acceso a localStorage para guardar token y usuario.

Además, la arquitectura permite crecer. Si se agrega una nueva funcionalidad, se puede crear su propio service, type, hook y componentes sin desordenar el resto del proyecto.

#### Desventajas

Una desventaja es que al principio se crean más archivos. Para un proyecto pequeño puede parecer más largo tener tantas carpetas y componentes.

También se necesita disciplina para mantener la estructura. Si se empieza a poner lógica de servicios dentro de componentes o código repetido dentro de páginas, se pierde el beneficio de la arquitectura.

Otra desventaja es que puede ser más difícil para alguien nuevo entender el flujo completo, porque debe revisar varios archivos:

page.tsx
service.ts
types.ts
components
utils

Sin embargo, esto es preferible a tener un solo archivo demasiado grande y difícil de mantener.

También se debe tener cuidado con los componentes client. En Next.js, si un componente usa hooks como useState, useEffect o useRouter, debe llevar:

"use client";

Durante el desarrollo también se detectó un problema de hidratación cuando se consultaba localStorage directamente en el render. Esto se corrigió usando estados de montaje y evitando leer window o localStorage antes de que el componente estuviera en cliente.

#### Riesgos

Un riesgo es sobreestructurar el proyecto. Si se crean demasiadas abstracciones innecesarias, el desarrollo puede volverse más lento.

Otro riesgo es duplicar responsabilidades. Por ejemplo, si una validación se hace en un formulario, en un hook y en un servicio al mismo tiempo, puede generar inconsistencias.

También existe el riesgo de confiar en el frontend para seguridad. Aunque el frontend oculte botones según el rol, el backend siempre debe validar permisos. Por eso se dejó claro que las reglas de seguridad reales están en el backend.

Otro riesgo es que las páginas sigan creciendo demasiado si no se mueven partes a componentes. Por ejemplo, el detalle de campaña puede crecer bastante porque maneja donación, documentos, reportes y eliminación. En el futuro se puede dividir aún más usando componentes como:

CampaignProgressCard
CampaignDocumentsSection
CampaignReportsSection
CampaignActionsPanel
Impacto en el proyecto

Esta decisión impactó todo el frontend.

Se crearon componentes reutilizables de UI:

Button
Input
Textarea
Select
Card
Badge
Loading

Se crearon componentes de layout:

Navbar
Container
PageHeader

Se crearon formularios reutilizables:

LoginForm
RegisterForm
CampaignForm
CategoryForm
DonationForm
DocumentForm

Se crearon servicios para consumir el backend:

auth.service.ts
campaign.service.ts
category.service.ts
donation.service.ts
document.service.ts
audit-log.service.ts

Se crearon tipos para mantener consistencia:

User
Campaign
Category
Donation
CampaignDocument
AuditLog
AuthResponse

Se crearon utilidades comunes:

formatCurrency
formatDate
handleError

También se mejoró la claridad de las páginas principales:

/campaigns
/campaigns/create
/campaigns/[id]
/documents
/categories
/donations
/admin/audit-logs

Esta arquitectura hizo que el frontend quedara más alineado con principios de Clean Code, especialmente:

- separación de responsabilidades
- reutilización
- legibilidad
- bajo acoplamiento
- tipado fuerte
- centralización de llamadas API
### Alternativas consideradas
#### Alternativa 1: Dejar todo dentro de page.tsx

Se consideró construir cada página con toda su lógica interna.

Esta opción fue descartada porque los archivos crecerían demasiado y sería difícil reutilizar formularios, botones, listas o servicios.

#### Alternativa 2: Crear solo componentes visuales, sin servicios

Otra opción era separar componentes visuales pero hacer los fetch directamente en las páginas.

Esta opción fue descartada porque repetiría lógica de API, headers, token y manejo de errores en muchas páginas.

#### Alternativa 3: Usar una arquitectura por módulos completos

Se consideró organizar todo por feature, por ejemplo:

features/campaigns
features/documents
features/donations

Esta alternativa es válida, pero para este proyecto se eligió una estructura mixta más sencilla, separando components, services, types, hooks y utils.

#### Alternativa 4: Usar una librería externa de UI

Se pudo usar una librería completa como Material UI o Chakra UI.

Esta opción fue descartada porque el proyecto ya estaba usando Tailwind CSS y era suficiente crear componentes propios básicos para mantener control del diseño.

#### Alternativa seleccionada

La alternativa seleccionada fue una arquitectura modular con carpetas separadas por responsabilidad, usando Next.js App Router, TypeScript, Tailwind CSS, servicios centralizados y componentes reutilizables.

### Fecha

15/05/2026