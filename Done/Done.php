<?php
// Include the necessary configuration and database connection files
require_once 'config.php';
require_once 'db_connect.php';

// Retrieve and filter the tasks where the status is "done"
$query = "SELECT * FROM tasks WHERE status = 'done'";
$result = mysqli_query($conn, $query);

// Check if there are any done tasks
if (mysqli_num_rows($result) > 0) {
  // Display the filtered tasks
  while ($row = mysqli_fetch_assoc($result)) {
    echo "<p>{$row['task_name']}</p>";
  }
} else {
  echo "<p>No tasks are marked as done.</p>";
}

// Close the database connection
mysqli_close($conn);
?>