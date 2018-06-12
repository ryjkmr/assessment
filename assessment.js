(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');


    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick(); // ボタンのonclick() 処理を呼び出す
        }
    };

    assessmentButton.onclick = () => {
        console.log('ボタンが押されました！');
        const userName = userNameInput.value;
        if (userName.length === 0) {//名前が空の時は処理を終了する
            return;
        }
        removeAllChildren(resultDivided);
        removeAllChildren(tweetDivided);

        /*    while (resultDivided.firstChild) {//子供の要素がある限り削除する
               resultDivided.removeChild(resultDivided.firstChild);
           }
    */
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        //        resultDivided.innerHTML = '';これじゃ駄目なのかな
        resultDivided.appendChild(header);
        const paragraph = document.createElement('p');
        const result = assessment(userName);//userNameを渡して診断結果のテキストを取得
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
        //  paragraph.innerText = 'テスト';//paragraph要素は唯一のものなので、たの場所にアペンドすると元の場所から消える？
        //        tweetDivided.appendChild(paragraph);
        // console.log(paragraph);
        //  tweetDivided.appendChild(paragraph);

        // ツイートエリアの作成
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あ')
            + '&ref_src=twsrc%5Etfw';

        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = '#あなたのいいところ をツイートする';
        tweetDivided.appendChild(anchor);
        var test = document.getElementById('test');
        test.value = anchor;


        console.log(anchor);
        twttr.widgets.load(); //scriptタグでTwitterのwidgetを指定してあるので、このメソッドが使えるらしい

    };
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
        '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'

    ];
    /*  名前の文字列を渡すと診断結果を返す関数
     @param {string} userName ユーザーの名前
     @return {string} 診断結果 */
    function assessment(userName) {
        //TODO 診断処理を実装する
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);

        }
        const index = sumOfcharCode % answers.length;// コードの合計を回答数で割った余り、回答数が10なら0〜9の値が得られる
        let result = answers[index];
        //TODO {userName}をユーザーの名前に置き換える
        result = result.replace(/\{userName\}/g, userName);
        return result;
    }
    //console.log(assessment('太郎'));
    //console.log(assessment('次郎'));
    //console.log(assessment('太郎'));
    /* console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。郎がする決断にいつも助けられる人がいます。', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    ) */

})();
