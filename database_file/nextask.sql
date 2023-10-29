-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2023 at 06:12 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nextask`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `description`, `created_on`, `created_by`, `status`) VALUES
(1, 'Study for Algorithms exam', 'Review chapters 4 to 6 from the textbook', '2023-10-29 04:54:14', 3, 0),
(2, 'Finish coding challenge', 'Internship at XYZ Corp.', '2023-10-29 04:54:14', 1, 1),
(3, 'Submit DBMS project proposal', 'Hospital management system topic', '2023-10-29 04:54:14', 1, 2),
(4, 'Practice SQL queries', 'Focus on JOIN operations', '2023-10-29 04:54:14', 2, 0),
(5, 'Update resume', 'Include the latest achievements & projects', '2023-10-29 04:54:14', 2, 1),
(6, 'Brainstorm capstone project ideas', 'List of 5 potential topics', '2023-10-29 04:54:14', 2, 2),
(7, 'Read research paper', 'Quantum Computing advancements', '2023-10-29 04:54:14', 3, 0),
(8, 'Prepare for tech interview', 'Review data structures & algorithms', '2023-10-29 04:54:14', 3, 1),
(9, 'Watch seminar on IoT', 'By CS department at 3pm', '2023-10-29 04:54:14', 3, 2),
(10, 'Complete OS assignment', 'Implement a simple process scheduler', '2023-10-29 04:54:14', 1, 1),
(11, 'Revise Python basics', 'For web development project', '2023-10-29 04:54:14', 1, 2),
(12, 'Attend data structures tutoring', 'Help juniors with array problems', '2023-10-29 04:54:14', 2, 0),
(13, 'Submit feedback for HCI course', 'Due end of the week', '2023-10-29 04:54:14', 2, 1),
(14, 'Attend AI workshop', '4pm in the main auditorium', '2023-10-29 04:54:14', 2, 2),
(15, 'Setup environment for Android dev', 'Android Studio & SDK setup', '2023-10-29 04:54:14', 3, 1),
(16, 'Practice coding on LeetCode', 'Solve 5 medium problems', '2023-10-29 04:54:14', 3, 0),
(17, 'Review computer networks', 'OSI model', '2023-10-29 04:54:14', 3, 2),
(18, 'Group meeting for Software Eng project', 'Discuss user requirements', '2023-10-29 04:54:14', 1, 0),
(19, 'Write ML lecture summary', 'Neural Networks & Deep Learning topic', '2023-10-29 04:54:14', 2, 1),
(20, 'Meet professor for guidance', 'Discuss research findings', '2023-10-29 04:54:14', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Saitharsan', 'Nanthakumaran', 'sai@gmail.com', '$2b$10$.pzS1Ps/KqRA1zUgIgRFk.0yiEw6vkTQPRAtPBbaDINEWqf2ANnhG'),
(2, 'Laxshan', 'Panchavarnan', 'laxshan@gmail.com', '$2b$10$.pzS1Ps/KqRA1zUgIgRFk.0yiEw6vkTQPRAtPBbaDINEWqf2ANnhG'),
(3, 'Amara', 'Shanan', 'amara@gmail.com', '$2b$10$.pzS1Ps/KqRA1zUgIgRFk.0yiEw6vkTQPRAtPBbaDINEWqf2ANnhG'),
(6, 'saji', 'nan', 'saji@gmail.com', '$2b$10$.pzS1Ps/KqRA1zUgIgRFk.0yiEw6vkTQPRAtPBbaDINEWqf2ANnhG');

-- --------------------------------------------------------

--
-- Table structure for table `user_task`
--

CREATE TABLE `user_task` (
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_task`
--

INSERT INTO `user_task` (`user_id`, `task_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(3, 9),
(1, 10),
(1, 11),
(2, 12),
(2, 13),
(2, 14),
(3, 15),
(3, 16),
(3, 17),
(1, 18),
(2, 19),
(3, 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indexes for table `user_task`
--
ALTER TABLE `user_task`
  ADD KEY `task_usertask` (`task_id`),
  ADD KEY `user_usertask` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_task`
--
ALTER TABLE `user_task`
  ADD CONSTRAINT `task_usertask` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_usertask` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
