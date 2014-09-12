<?php
  define('DB_HOST','localhost');
  define('DB_USER','root');
  define('DB_PORT','8889');
  define('DB_NAME','fresh');
  $dbhost = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";port=".DB_PORT.";charset=utf8";
/*
+-----------------+
| Tables_in_fresh |
+-----------------+
| c_typing        |ｃ言語の問題が入ってる。
| contents        |コンテンツの種類=>今はタイピング
| php_typing      |PHPの問題が入っている問題
| prog_languages  |言語の種類。
| user            |登録ユーザー。
+-----------------+
*/
  try{
    $pdo = new PDO($dbhost,DB_USER);

    if(!$pdo){
      echo '接続に失敗しました';
    } else {
      echo '接続に成功しました';
      
      $sql = "SELECT
                *
              FROM
                c_typing
              ";

      //SQL事業部別の給与平均のデータベースを入れる
      $statement = $pdo->query($sql);
      //データベースを配列情報に変換して、入れる
      $row = $statement->fetchAll(PDO::FETCH_ASSOC);
      // var_dump($row);
      //データベースの接続アウト
      $pdo=null;
    }
  } catch(PDOException $e) {
    echo 'Error:'.$e->getMessage();//エラーの内容を吐き出す
  }
/*  foreach ($row as $r) {
    # code...
    echo (json_encode($r));
  }*/
?>

<!DOCTYPE html>
<script> var dat = JSON.parse('<?php echo json_encode($row);?>'); </script>
<html lang="ja">
  <head>
    <link rel="stylesheet" type="text/css" href="css/typing.css">
    <script type="text/javascript" src="js/typing.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/nicoscreen.js"></script>
    <!-- ページの文字コード決定 -->
    <meta charset="utf-8">
    <!-- 自分で作ったjavascriptの宣言 -->
    <title>typing</title>
  </head>
  <body onload="gameSet()">
    <div id="nicoscreen" style="width:600px;height:400px" >

      <p id='modai'> aaaa</p>
      <div id="test">
      </div>
    </div>

    <script type="text/javascript">
      var obj = {
        "base":{
          color:"white",
          speed:"normal",
          interval:"normal",
          font_size:"30px",
          loop:true
      },
        
      "comments":[
        /*"ワロスｗｗｗｗｗ",
        "ｗｗｗｗｗ",
        "かわいい", 
        "(*´д`*)はぁはぁ",
        "なんだこれｗｗｗ",
        "ねこかわゆす"*/
      ]  
    };

    nicoscreen.set(obj);
    nicoscreen.start();
    function addComment(){
    
    var str = $("#text_comment").val();
    nicoscreen.add(str);
    
    $("#text_comment").val(""); 
  }
    </script>
  </body>
</html>
