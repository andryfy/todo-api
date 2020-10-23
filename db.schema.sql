--
-- Database schema for : "todo-api"
--
DROP DATABASE IF EXISTS `todo_api`;
CREATE DATABASE IF NOT EXISTS `todo_api` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `todo_api`;

-- --------------------------------------------------------

--
-- Structure of table "tasks"
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `done_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_done` BOOL DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
