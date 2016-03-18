<?php 
// php response
echo "<p>JavaScript sends \"" .$_POST["ttl"] . "\" to php file.<br>";
echo "PHP responsds with: \"" . strrev($_POST["ttl"]) . "\" to php file.</p>";

?>