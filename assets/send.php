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
        echo json_encode(1);
    }
    else {
        echo json_encode(0);
    }
  
    // 接続を閉じる
    $mysqli->close();
}
else
{
    die('The parameter of "data" is not found.');
}
?>