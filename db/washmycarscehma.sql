
CREATE TABLE credentials (
    credential_id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    type VARCHAR(1) NOT NULL,
    is_profile_established BOOLEAN DEFAULT FALSE,
    UNIQUE(email)
);


CREATE TABLE services (
    service_id SERIAL PRIMARY KEY NOT NULL,
    service_fee NUMERIC(4,2) NOT NULL,
    service_type VARCHAR(5) NOT NULL,
    service_stripe_fee_id VARCHAR(30) NOT NULL
);

insert into services (service_type, service_fee,service_stripe_fee_id) VALUES ('na', 0,'0');
insert into services (service_type, service_fee,service_stripe_fee_id) VALUES ('car', 15,'price_1KYJqKKYhB8sv9zu8WUO4cmM');
insert into services (service_type, service_fee,service_stripe_fee_id) VALUES ('ute', 20,'price_1KYJqKKYhB8sv9zu8WUO4cmM');
insert into services (service_type, service_fee,service_stripe_fee_id) VALUES ('truck', 40,'price_1KYJqKKYhB8sv9zu8WUO4cmM');


CREATE TABLE owners (
    owner_id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    street_address VARCHAR(50) NOT NULL,
    suburb VARCHAR(50) NOT NULL,
    state VARCHAR(30) NOT NULL,
    postcode INTEGER NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    car_photo VARCHAR(100),
    type VARCHAR(1) NOT NULL,
    active_membership BOOLEAN DEFAULT TRUE,
    credential_id INTEGER, 
    FOREIGN KEY (credential_id) REFERENCES credentials(credential_id),
    UNIQUE(email),
    UNIQUE(mobile)
);

-- THIS TABLE CREATE vehicle
CREATE TABLE vehicles (
vehicle_id SERIAL PRIMARY KEY NOT NULL,
vehicle_type VARCHAR(5) NOT NULL,
vehicle_photo VARCHAR(100) NOT NULL,
owner_id INTEGER,
FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
);

insert into vehicles (vehicle_type, vehicle_photo, owner_id) VALUES ('truck', 'price_1KYJqKKYhB8sv9zu8WUO4cmM',1);
insert into vehicles (vehicle_type, vehicle_photo, owner_id) VALUES ('car', 'price_1KYJqKKYhB8sv9zu8WUO4cmM',1);
insert into vehicles (vehicle_type, vehicle_photo, owner_id) VALUES ('ute', 'price_1KYJqKKYhB8sv9zu8WUO4cmM',1);
insert into vehicles (vehicle_type, vehicle_photo, owner_id) VALUES ('plane', 'price_1KYJqKKYhB8sv9zu8WUO4cmM',1);



//TODO: NEED TO PUT BACK UNIQUE FOR EMAIL AND PHONE IN DB
CREATE TABLE washers (
    washer_id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    street_address VARCHAR(50) NOT NULL,
    suburb VARCHAR(50) NOT NULL,
    state VARCHAR(30) NOT NULL,
    postcode INTEGER NOT NULL,
    mobile VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    profile_photo VARCHAR(100),
    bank_name VARCHAR(20) NOT NULL,
    bank_BSB VARCHAR(6) NOT NULL,
    bank_acct_num VARCHAR(10) NOT NULL,
    type VARCHAR(1) NOT NULL,
    active_membership BOOLEAN DEFAULT TRUE,
    profileUrl VARCHAR(120),
    stripeAccountId VARCHAR(30),
    acceptTerms BOOLEAN DEFAULT TRUE,
    credential_id INTEGER, 
    FOREIGN KEY (credential_id) REFERENCES credentials(credential_id)
);
​

-- SELECT count(*) FROM washers;

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    duration INTEGER,
    is_cancelled BOOLEAN DEFAULT FALSE,
    has_washer_completed BOOLEAN DEFAULT FALSE,
    has_owner_confirmed BOOLEAN DEFAULT FALSE,
    whom_cancelled VARCHAR(6),
    booking_status VARCHAR(1),
    booking_instructions VARCHAR(50),
    washer_assigned INTEGER,
    washer_completed_proof VARCHAR(120),
    walker_assigned_id INTEGER,
    service_fee NUMERIC(4,2),
    our_commission NUMERIC(4,2),
    service_id INTEGER,
    FOREIGN KEY (service_id) REFERENCES services (service_id),
    owner_id INTEGER,
    FOREIGN KEY (owner_id) REFERENCES owners (owner_id),
    vehicle_id INTEGER,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles (vehicle_id)
);

