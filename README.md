
# Requisitos Previos

* Tener instalado Docker, puedes descargarlo desde la web oficial: [www.docker.com](https://www.docker.com/products/docker-desktop/)

## Arquitectura del Microservicio

![IMG-ARQUITECTURA-NESTJS-WIHT-DOCKER](https://i.ibb.co/1R7B712/Untitled-2024-10-28-2228.png)


## Authors

- [@luiscardozo161002](https://github.com/luiscardozo161002)


## Instalación

Abrir docker iniciar sesión, una vez se encuentre corriendo podemos verificar a través del comando:

```
docker --version
```

Accedemos al directorio donde esta nuestro repositorio localmente. Accedemos dentro de la carpeta donde esta nuestro proyecto. En cada uno de los microservicios de 
```order-service```,```product-service```,```user-service```. Agregar el archivo .env, ya que GitHub lo elimina cuando se sube, el proyecto al repositorio.

Dentro del archivo .env, por cada microservicio, colocar el mismo contenido en cada uno de los microservicios:

```
DB_HOST=postgres_db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=161002
DB_DATABASE=micro_db
```
Reconstruimos las imágenes y levantamos los contenedores en segundo plano, con el comando: 

```
docker-compose up --build -d
```

Una vez terminada esa parte, podemos verificar la existencia de los contenedores de nuestro proyecto, con el comando: 

```
docker ps
```

Ejemplo: 

```
docker ps
CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS          PORTS                    NAMES
ff5c18894ef6   nestjs-order-service     "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes                            nestjs-order-service-1
1bc2d5bd39f5   nestjs-user-service      "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes                            nestjs-user-service-1
7bb1f9ee78ba   nestjs-product-service   "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes                            nestjs-product-service-1
d9006297311a   postgres:17.0            "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes   0.0.0.0:5432->5432/tcp   postgres_db
d493d556dd1d   nestjs-gateway           "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes   0.0.0.0:3000->3000/tcp   nestjs-gateway-1

```

Revisamos los logs de cada contenedor. Para poder encontrar fallos al momento de su creación, con el comando:

```
docker logs **nombre_del_contenedor**
```

Ejemplo:

```
docker logs nestjs-product-service-1
```

y veriamos algo como esto: 

```
[4:07:19 AM] Starting compilation in watch mode...

[4:07:30 AM] Found 0 errors. Watching for file changes.

[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [NestFactory] Starting Nest application...
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +144ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +605ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [InstanceLoader] AppModule dependencies initialized +1ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [RoutesResolver] ProductController {/products}: +16ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [RouterExplorer] Mapped {/products, GET} route +5ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [RouterExplorer] Mapped {/products/:id, GET} route +1ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [RouterExplorer] Mapped {/products, POST} route +2ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [RouterExplorer] Mapped {/products/:id, PUT} route +0ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [RouterExplorer] Mapped {/products/:id, DELETE} route +7ms
[Nest] 36  - 10/28/2024, 4:07:32 AM     LOG [NestApplication] Nest application successfully started +5ms

```

Lo que significa que todo salio bien.

Debemos repetir el comando: ```docker logs **nombre_de_contenedor**```. Con cada uno de los contenedores verificando sus logs, para asegurarnos de que todo salio bien.


## Verificar la existencia de la base de datos y sus tablas.

Para verificar que la base de datos y sus tablas estan creadas, accedemos al bash de nuestra imagen de PostgreSQL, se hace mediante el siguiente comando: 

```
docker exec -it postgres_db bash
```

Se mostrará algo así: 

```
root@d9006297311a:/#
```

Agregamos el siguiente comando:

```
 psql -U postgres
```
Y podemos acceder al contenedor donde se encuentra nuestras bases de datos.

```
root@d9006297311a:/# psql -U postgres
psql (17.0 (Debian 17.0-1.pgdg120+1))
Type "help" for help.

postgres=#
```
Listamos todas las bases de datos, con el comando: 

```
\l
```

Deberiamos encontrar la base de datos **micro_db**

```
postgres=# \l
                                                    List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+------------+------------+--------+-----------+-----------------------
 micro_db  | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           |
 postgres  | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           |
 template0 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           | =c/postgres          +
           |          |          |                 |            |            |        |           | postgres=CTc/postgres
 template1 | postgres | UTF8     | libc            | en_US.utf8 | en_US.utf8 |        |           | =c/postgres          +
           |          |          |                 |            |            |        |           | postgres=CTc/postgres
(4 rows)

postgres=#
```

Accedemos a nuestra base de datos, con el comando: 

```
\c micro_db
```

Veremos algo así:

```
postgres=# \c micro_db
You are now connected to database "micro_db" as user "postgres".
```
¡Listo!, hemos accedido a nuestra base de datos.

Ahora...

Lo que haremos es verificar la existencia de las tablas creadas desde el código de Nestjs con ayuda de su ORM. Con el siguiente comando: 

```
\dt
```

Al ejecutar el comando anterior podemos ver que las tablas estan correctamente creadas.

```
micro_db=# \dt
          List of relations
 Schema |   Name   | Type  |  Owner
--------+----------+-------+----------
 public | orders   | table | postgres
 public | products | table | postgres
 public | users    | table | postgres
(3 rows)
```

Ahora que nuestras tablas estan correctamente creadas, creamos también las funciones de nuestra base de datos, que ocuparemos después, crearemos de una a una las funciones.

* Función para mostrar todas las ordenes:

```
CREATE OR REPLACE FUNCTION show_all_orders()
RETURNS TABLE(
    order_id INT,
    product_name VARCHAR(50),
    quantity INT,
    user_name VARCHAR(50),  -- Asegúrate de que esto coincida con el tipo de username
    total_price DECIMAL(10, 2),
    status VARCHAR(20)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        o.id AS order_id,
        p.name AS product_name,
        o.quantity,
        u.username AS user_name,
        o."totalPrice" AS total_price,  -- Asegúrate de que el nombre de la columna sea correcto
        o.status
    FROM
        orders o
    JOIN
        users u ON o."userId" = u.id
    JOIN
        products p ON o."productId" = p.id
    WHERE
        o."isActive" = true;  -- Filtrar por órdenes activas si es necesario
END;
$$;

-- NOTA: Podemos verificar la existencia de la función creada, con el siguiente comando: SELECT * FROM show_all_orders();

```

* Función para crear una orden:

```

-- Function to create order

CREATE OR REPLACE FUNCTION create_order(
    p_user_name TEXT,
    p_product_name TEXT,
    p_quantity INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INT;
    v_product_id INT;
BEGIN
    -- Obtener el ID del usuario
    SELECT id INTO v_user_id FROM users WHERE username = p_user_name LIMIT 1;
    
    -- Obtener el ID del producto
    SELECT id INTO v_product_id FROM products WHERE name = p_product_name LIMIT 1;
    
    -- Comprobar si se encontró el usuario y el producto
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User % not found', p_user_name;
    END IF;
    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Product % not found', p_product_name;
    END IF;
    
    -- Insertar la orden
    INSERT INTO orders ("userId", "productId", quantity, "totalPrice", status, "isActive")
    VALUES (v_user_id, v_product_id, p_quantity, 
           (SELECT price FROM products WHERE id = v_product_id), 'pending', true);
END;
$$;

-- NOTA: Podemos verificar la existencia de la función creada, con el siguiente comando: SELECT create_order('luis', 'Martillo', 2);

```

* Función para actualizar una orden:

```
-- Function to update order 

CREATE OR REPLACE FUNCTION update_order(
    p_user_name TEXT,
    p_product_name TEXT,
    p_quantity INT,
    p_status VARCHAR(20)
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INT;
    v_product_id INT;
    v_order_id INT;
BEGIN
    -- Obtener el ID del usuario
    SELECT id INTO v_user_id FROM users WHERE username = p_user_name LIMIT 1;

    -- Obtener el ID del producto
    SELECT id INTO v_product_id FROM products WHERE name = p_product_name LIMIT 1;

    -- Comprobar si se encontró el usuario y el producto
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User % not found', p_user_name;
    END IF;
    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Product % not found', p_product_name;
    END IF;

    -- Obtener el ID de la orden basada en el usuario y el producto
    SELECT id INTO v_order_id 
    FROM orders 
    WHERE "userId" = v_user_id AND "productId" = v_product_id AND "isActive" = true
    LIMIT 1;

    -- Comprobar si se encontró la orden
    IF v_order_id IS NULL THEN
        RAISE EXCEPTION 'Order for user % and product % not found', p_user_name, p_product_name;
    END IF;

    -- Actualizar la cantidad, total y estado de la orden
    UPDATE orders
    SET quantity = p_quantity,
        "totalPrice" = p_quantity * (SELECT price FROM products WHERE id = v_product_id),  -- Recalcular el total
        status = p_status
    WHERE id = v_order_id;
END;
$$;

-- NOTA: Podemos verificar la existencia de la función creada, con el siguiente comando: SELECT update_order('luis', 'Martillo', 3, 'shipped');  -- Actualiza la orden del usuario 'luis' con el producto 'Martillo', estableciendo la cantidad en 3 y el estado a 'shipped'.

```

## Capturar información

Ahora que ya tenemos las tablas definidas. Podemos agregar información mediante una consulta INSERT a cada una de las tablas.

```
INSERT INTO users (username, email, password) VALUES
('luis', 'luis_cardozo@gmail.com', 'luis2Car'),
('gerardo', 'gerardo_cardozo@gmail.com', 'gerardo2Car');

INSERT INTO products (name, description, price, stock) VALUES
('Martillo', 'Martillo de Acero del 12', 49.99, 100),
('Clavos', '1kg clavos 2 pulgadas', 39.99, 50);

INSERT INTO orders ("userId", "productId", quantity, "totalPrice") VALUES
(1, 1, 2, 49.98),
(2, 2, 1, 39.99);
```

## Recreando los contenedores e imagenes de docker

Detenemos los contenedores de nuestro proyecto, con el siguiente comando:

```
docker stop $(docker ps -q)
```

Eliminamos todos los contenedores (detenidos y en ejecución) de nuestro proyecto:

```
docker rm $(docker ps -aq)
```

Eliminar todas las imagenes de nuestro proyecto.

```
docker rmi $(docker images -q)
```

Ahora recreamos nuestras imagenes y contenedores con el siguiente comando:

```
docker-compose up --build -d
```

De nuevo verificamos los logs, de cada contenedor. Para poder encontrar fallos, con el comando:

```
docker logs **nombre_del_contenedor**
```

Una vez verificado que todo corre bien. Podemos continuar.

## Probando los microservicios

Ahora podemos comenzar a hacer peticiones a cada uno de nuestros microservicios dockerizados.

Accediendo en el caso de usuarios: 

```
http://localhost:3000/gateway/users
```

El resultado: 

```
[
    {
        "id": 1,
        "username": "luis",
        "email": "luis_cardozo@gmail.com",
        "password": "luis2Car",
        "isActive": true
    },
    {
        "id": 2,
        "username": "gerardo",
        "email": "gerardo_cardozo@gmail.com",
        "password": "gerardo2Car",
        "isActive": true
    }
]
```

Accediendo en el cado de productos: 

```
http://localhost:3000/gateway/products
```

El resultado: 

```
[
    {
        "id": 1,
        "name": "Martillo",
        "description": "Martillo de Acero del 12",
        "price": "49.99",
        "stock": 100,
        "isActive": true
    },
    {
        "id": 2,
        "name": "Clavos",
        "description": "1kg clavos 2 pulgadas",
        "price": "39.99",
        "stock": 50,
        "isActive": true
    }
]
```

Accediendo en el caso de ordenes: 

```
http://localhost:3000/gateway/orders
```

El resultado: 

```
[
    {
        "order_id": 2,
        "product_name": "Clavos",
        "quantity": 1,
        "user_name": "gerardo",
        "total_price": "39.99",
        "status": "pending"
    },
    {
        "order_id": 3,
        "product_name": "Martillo",
        "quantity": 2,
        "user_name": "luis",
        "total_price": "49.99",
        "status": "pending"
    },
    {
        "order_id": 1,
        "product_name": "Martillo",
        "quantity": 3,
        "user_name": "luis",
        "total_price": "149.97",
        "status": "shipped"
    }
]
```

-------------------------------------------------------------------------------------------------------------------
## NOTA: Código de las tablas en caso de requerirlo. 
Código de las tablas de la bd: **micro_db**, con el gestor de base de datos: **PostgreSQL**.

* ADVERTENCIA: Crear de una por una, cada tabla:

```

-- Crear tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isActive BOOLEAN DEFAULT true
);

-- Crear tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    isActive BOOLEAN DEFAULT true
);

-- Crear tabla de órdenes
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    isActive BOOLEAN DEFAULT true
);

```
