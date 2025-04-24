-- Insertion des rôles
INSERT INTO Role (role_name) VALUES ('CLIENT');
INSERT INTO Role (role_name) VALUES ('SUPPORT');

-- Insertion des adresses pour les utilisateurs
INSERT INTO Address (house_number, street, postal_code, city, country) 
VALUES ('10', 'Rue de Paris', '75000', 'Paris', 'France');

INSERT INTO Address (house_number, street, postal_code, city, country)
VALUES ('20', 'Rue de Lyon', '69000', 'Lyon', 'France');

-- Insertion d'un utilisateur CLIENT
-- Remplacez le hashbcrypt par celui généré pour "Password@123"
INSERT INTO User (first_name, last_name, email, password, address_id, role_id)
VALUES (
    'Alice', 
    'Dupont', 
    'alice.dupont@example.com', 
    '$2a$10$abcdefghijklmno12345678901234',  -- BCrypt hash pour "Password@123"
    1, -- Correspond à l'adresse insérée précédemment
    1  -- Rôle CLIENT (première insertion dans Role)
);

-- Insertion d'un utilisateur SUPPORT
-- Remplacez le hashbcrypt par celui généré pour "Support@123"
INSERT INTO User (first_name, last_name, email, password, address_id, role_id)
VALUES (
    'Bob', 
    'Martin', 
    'bob.martin@example.com', 
    '$2a$10$zyxwvutsrqponmlk98765432109876',  -- BCrypt hash pour "Support@123"
    2, -- Correspond à l'adresse insérée précédemment
    2  -- Rôle SUPPORT
);
