<?php
$data = $_POST['data'];
if (isset($data))
{
    $data = explode(", ", $data);

    if ($data[0] == '0' and
        $data[1] == '1' and
        $data[2] == '2' and
        $data[3] == '3' and
        $data[4] == '4' and
        $data[5] == '5' and
        $data[6] == '6' and
        $data[7] == '7') {
        $result = 1;
    }
    else {
        $result = 0;
    }
    echo $result;
}
else
{
    die('The parameter of "data" is not found.');
}
?>
