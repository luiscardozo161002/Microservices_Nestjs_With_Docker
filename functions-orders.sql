-- Function to show all orders

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

-- SELECT * FROM show_all_orders();

-- RESULT: 

/*

micro_db=#  SELECT * FROM show_all_orders();
 order_id | product_name | quantity | user_name | total_price | status
----------+--------------+----------+-----------+-------------+---------
        2 | Clavos       |        1 | gerardo   |       39.99 | pending
        3 | Martillo     |        2 | luis      |       49.99 | pending
        1 | Martillo     |        3 | luis      |      149.97 | shipped
(3 rows)

*/


-- ############################################################################################

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

-- SELECT create_order('luis', 'Martillo', 2);

-- RESULT:

/*
    CREATE 2 0
*/

-- ############################################################################################


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

-- SELECT update_order('luis', 'Martillo', 3, 'shipped');  -- Actualiza la orden del usuario 'luis' con el producto 'Martillo', estableciendo la cantidad en 3 y el estado a 'shipped'.

-- RESULT: 

/*
    CREATE 2 0
    
*/

