create extension if not exists "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
    id UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "recipes" (
    recipe_id UUID DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients JSONB,
    instructions TEXT,
    -- user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    -- FOREIGN KEY (user_id) REFERENCES "users"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
    favorite_id UUid DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO
    users (email, name, password)
values
    (
        'johndoe@gmail.com',
        'John Doe',
        'johndoe@gmail.com'
    );

INSERT INTO
    recipes (
        id,
        title,
        description,
        ingredients,
        instructions,
        user_id,
        created_at
    )
VALUES
    (
        '987e6543-a21b-43d2-b654-123456789abc',
        'Spaghetti Carbonara',
        'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
        '[{"name": "Spaghetti", "quantity": "200g"}, 
      {"name": "Pancetta", "quantity": "100g"}, 
      {"name": "Eggs", "quantity": "2 large"}, 
      {"name": "Parmesan cheese", "quantity": "50g, grated"}, 
      {"name": "Black pepper", "quantity": "To taste"}, 
      {"name": "Salt", "quantity": "To taste"}]' :: jsonb,
        '1. Cook spaghetti in salted boiling water until al dente. Reserve 1 cup of pasta water before draining. ' '2. In a large pan, cook pancetta over medium heat until crispy. Remove from heat. ' '3. Beat the eggs in a bowl and mix in grated Parmesan cheese. ' '4. Add the drained spaghetti to the pan with pancetta and toss to coat. ' '5. Remove from heat and quickly mix in the egg and cheese mixture, tossing vigorously to create a creamy sauce. ' '6. Add reserved pasta water a little at a time if needed to loosen the sauce. ' '7. Season with black pepper and additional Parmesan cheese before serving.',
        '01feed4b-38c6-45eb-82d0-dae341ae4f4e',
        '2024-11-26T12:00:00Z'
    )