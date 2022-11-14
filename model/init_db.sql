SET foreign_key_checks = 0;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roadtrips;
DROP TABLE IF EXISTS stops;

SET foreign_key_checks = 1;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL UNIQUE,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`slogan` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `roadtrips` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`image_url` varchar(255) NOT NULL,
    `countries` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`done` BOOLEAN NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `stops` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`longitude` DECIMAL(9,5) NOT NULL,
	`latitude` DECIMAL(9,5) NOT NULL,
	`roadtrip_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

-- CREATE TABLE `favorite_roadtrips` (
-- 	`user_id` INT NOT NULL,
-- 	`roadtrip_id` INT NOT NULL
-- );

ALTER TABLE `roadtrips` ADD CONSTRAINT `roadtrips_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `stops` ADD CONSTRAINT `stops_fk0` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`);

-- ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

-- ALTER TABLE `favorite_roadtrips` ADD CONSTRAINT `favorite_roadtrips_fk1` FOREIGN KEY (`roadtrip_id`) REFERENCES `roadtrips`(`id`);

-- SAMPLE DATA 

INSERT INTO users(username, email, password, image_url, slogan)
    VALUES ("user1", "user1@gmail.com", "123", "test.jpg", "Hello I am user1"), ("user2", "user2@gmail.com", "123", "test.jpg", "Hello I am user2");

INSERT INTO roadtrips(image_url, countries, description, done, user_id) 
    VALUES ("test.jpg", "Spain", "I did a roundtrip in Andalucia...", 1, 1), 
    ("test.jpg", "Portugal", "I did a roundtrip from Porto to Lisbon", 1, 1), 
    ("test.jpg", "France", "I did a roundtrip in Normandy", 1, 2), 
    ("test.jpg", "France", "I did a roundtrip from Paris to Marseille", 1, 2); 

INSERT INTO stops (title, address, longitude, latitude, roadtrip_id)
    VALUES ("Seville", "Av. Test", -5.984459, 37.389091, 1), ("Dos Hermanas", "Test", 37.283180, -5.922240, 1);