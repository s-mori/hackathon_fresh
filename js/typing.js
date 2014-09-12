
document.onkeydown = typeGame;  //キー押下時に関数typeGame()を呼び出す

//文字を格納する配列
var moji = ["A","B","C","D","E","F","G","H","I",
            "J","K","L","M","N","O","P","Q","R",
            "S","T","U","V","W","X","Y","Z"];
var moji_s = ["a","b","c","d","e","f","g","h","i",
            "j","k","l","m","n","o","p","q","r",
            "s","t","u","v","w","x","y","z"];
//キーコードを格納する配列
var kcode = new Array(65,66,67,68,69,70,71,72,73,
                      74,75,76,77,78,79,80,81,82,
                      83,84,85,86,87,88,89,90);

//0～25までの乱数を格納する配列
var rnd = new Array();

//問題文とカウント数を代入する
var mondai = '';

//グローバル変数群
var mondai = "";        //問題の文字列を格納
var mondaiCount = "";   //問題の文字列を格納
var cnt = 0;            //入力数
var typStart,typEnd;    //開始時と終了時の時刻を格納

var ans = 0;           //回答数

//問題の文字列をキーボード番号に対応させる。
function ransu(mondai)
{
  for ( var i = 0 ; i < mondai.length ; i++ )
  {
    //i番目の文字列を探す
    var serch = mondai.charAt(i);
    //i番目にある文字列の番号を探す。
    rnd[i] = moji.indexOf(serch);
    if( rnd[i] < 0 ){
      rnd[i] = moji_s.indexOf(serch);
    }
    //i番目にある文字のキーボードナンバーを保管。
    //rnd[i] = kcode[ mojiNumber ];
    console.log(rnd[i]);
  }
}

//タイピングゲームの問題をセットする関数
function gameSet()
{
  cnt=0;
  
  mondai = dat[ans]['c_word'];

  mondaiCount = mondai.length;
  //乱数作成関数の呼び出し
  ransu(mondai);

  //問題枠に表示する
  document.getElementById("nicoscreen").innerHTML = "<font class='test'>＞</font>" + mondai;
}


//キー入力を受け取る関数
function typeGame(evt)
{
  var kc;  //入力されたキーコードを格納する変数

  //入力されたキーのキーコードを取得
  if (document.all)
  {
    kc = event.keyCode;
  }
  else
  {
    kc = evt.which;
  }

  //入力されたキーコードと、問題文のキーコードを比較
  if (kc == kcode[ rnd[cnt] ])
  {
    //以下、キーコードが一致した時の処理

    //最初の1文字が入力された時間を記録する
    if (cnt==0)
    { 
      typStart = new Date();
    }
    
    cnt++; //カウント数を＋１にする
    
    //全文字入力したか確認
    if ( cnt < mondaiCount)
    {
      //問題文の頭の一文字を切り取る
      mondai = mondai.substring(1,mondai.Length);

      //問題枠に表示する
      document.getElementById("nicoscreen").innerHTML = "<font class='test'>＞</font>" + mondai;
    }
    else
    {
      if(ans == dat.length-1){
        //全文字入力していたら、終了時間を記録する
        typEnd = new Date();
        
        //終了時間－開始時間で掛かったミリ秒を取得する
        var keika = typEnd - typStart;
        
        //1000で割って「切捨て」、秒数を取得
        var sec = Math.floor( keika/1000 );
        
        //1000で割った「余り(%で取得できる）」でミリ秒を取得
        var msec = keika % 1000;
        
        //問題終了を告げる文字列を作成
        var fin="GAME終了　時間："+sec+"秒"+msec;
        
        //問題枠にゲーム終了を表示
        document.getElementById("nicoscreen").innerHTML = fin;
      } else
      {
        ans++;
        gameSet();
      }
    }
  } else {
    nicoscreen.add('m9(^Д^)ﾌﾟｷﾞｬｰ');
  }
}