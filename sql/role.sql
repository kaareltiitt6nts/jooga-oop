CREATE TABLE IF NOT EXISTS role (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

INSERT INTO `role` (`id`, `title`) VALUES
('admin', 'Administrator'),
('user', 'User');