-- Create the database and use it
CREATE DATABASE IF NOT EXISTS YourCarYourWayDB;
USE YourCarYourWayDB;

-- Table: Address
CREATE TABLE Address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    house_number VARCHAR(10),
    street VARCHAR(100),
    postal_code VARCHAR(10),
    city VARCHAR(50),
    country VARCHAR(50)
);

-- Table: Agency
CREATE TABLE Agency (
    agency_id INT AUTO_INCREMENT PRIMARY KEY,
    agency_name VARCHAR(100),
    address_id INT NOT NULL,
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE
);

-- Table: FuelType
CREATE TABLE FuelType (
    fuel_type_id INT AUTO_INCREMENT PRIMARY KEY,
    fuel_name VARCHAR(50),
    fuel_description VARCHAR(100)
);

-- Table: VehicleCategory
CREATE TABLE VehicleCategory (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50),
    category_description VARCHAR(100)
);

-- Table: TransmissionType
CREATE TABLE TransmissionType (
    transmission_id INT AUTO_INCREMENT PRIMARY KEY,
    transmission_name VARCHAR(50),
    transmission_description VARCHAR(100)
);

-- Table: VehicleClass
CREATE TABLE VehicleClass (
    vehicle_class_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    fuel_type_id INT NOT NULL,
    transmission_id INT NOT NULL,
    agency_id INT NOT NULL,
    daily_rate DECIMAL(10, 2),
    FOREIGN KEY (category_id) REFERENCES VehicleCategory(category_id) ON DELETE CASCADE,
    FOREIGN KEY (fuel_type_id) REFERENCES FuelType(fuel_type_id) ON DELETE CASCADE,
    FOREIGN KEY (transmission_id) REFERENCES TransmissionType(transmission_id) ON DELETE CASCADE,
    FOREIGN KEY (agency_id) REFERENCES Agency(agency_id) ON DELETE CASCADE
);

-- Table: Role
CREATE TABLE Role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(45)
);

-- Table: User
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    address_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Role(role_id) ON DELETE CASCADE
);

-- Table: Reservation
CREATE TABLE Reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    departure_agency_id INT NOT NULL,
    return_agency_id INT NOT NULL,
    user_id INT NOT NULL,
    vehicle_class_id INT NOT NULL,
    transaction_number VARCHAR(50),
    total_rate DECIMAL(10, 2),
    FOREIGN KEY (departure_agency_id) REFERENCES Agency(agency_id),
    FOREIGN KEY (return_agency_id) REFERENCES Agency(agency_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (vehicle_class_id) REFERENCES VehicleClass(vehicle_class_id)
);

-- Table: CustomerMessage
CREATE TABLE CustomerMessage (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message_title VARCHAR(100),
    message_content LONGTEXT,
    message_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    message_status TINYINT,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- Table: VehiculeOption
CREATE TABLE VehiculeOption (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(50),
    option_description VARCHAR(100),
    option_rate DECIMAL(10, 2)
);

-- Table: ReservationOptions
CREATE TABLE ReservationOptions (
    reservation_id INT NOT NULL,
    option_id INT NOT NULL,
    PRIMARY KEY (reservation_id, option_id),
    FOREIGN KEY (reservation_id) REFERENCES Reservation(reservation_id),
    FOREIGN KEY (option_id) REFERENCES VehiculeOption(option_id)
);
