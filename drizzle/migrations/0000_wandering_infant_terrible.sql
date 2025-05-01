CREATE TABLE `admin` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `menu_item` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` float NOT NULL,
	`is_main_menu` boolean NOT NULL DEFAULT false,
	`image_url` varchar(512) NOT NULL,
	`is_special` boolean NOT NULL DEFAULT false,
	`item_type` varchar(50) NOT NULL,
	`category_id` varchar(36) NOT NULL,
	CONSTRAINT `menu_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menu_settings` (
	`id` varchar(36) NOT NULL,
	`show_price` boolean NOT NULL DEFAULT true,
	`show_description` boolean NOT NULL DEFAULT true,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `menu_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reservation` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone_number` varchar(255) NOT NULL,
	`number_of_guests` int NOT NULL,
	`date` datetime NOT NULL,
	`time` varchar(50) NOT NULL,
	`message` text NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'Pending',
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `reservation_id` PRIMARY KEY(`id`)
);
