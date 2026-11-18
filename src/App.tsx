import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface FoodItem {
  display: string;
  reading: string;
}

const FOOD_LIST: FoodItem[] = [
  { display: 'チーズカレー', reading: 'ちーずかれー' },
  { display: '牛丼', reading: 'ぎゅうどん' },
  { display: 'カルボナーラ', reading: 'かるぼなーら' },
  { display: 'トマトシチュー', reading: 'とまとしちゅー' },
  { display: '生姜焼き肉定食', reading: 'しょうがやきにくていしょく' },
  { display: 'オムライス', reading: 'おむらいす' },
  { display: 'ハンバーグ定食', reading: 'はんばーぐていしょく' },
  { display: 'とんかつ定食', reading: 'とんかつていしょく' },
  { display: '唐揚げ定食', reading: 'からあげていしょく' },
  { display: '天ぷらそば', reading: 'てんぷらそば' },
  { display: 'きつねうどん', reading: 'きつねうどん' },
  { display: '味噌ラーメン', reading: 'みそらーめん' },
  { display: '醤油ラーメン', reading: 'しょうゆらーめん' },
  { display: '豚骨ラーメン', reading: 'とんこつらーめん' },
  { display: '冷やし中華', reading: 'ひやしちゅうか' },
  { display: '焼き餃子', reading: 'やきぎょうざ' },
  { display: 'チャーハン', reading: 'ちゃーはん' },
  { display: '麻婆豆腐', reading: 'まーぼーどうふ' },
  { display: 'エビチリ', reading: 'えびちり' },
  { display: '青椒肉絲', reading: 'ちんじゃおろーす' },
  { display: '回鍋肉', reading: 'ほいこーろー' },
  { display: '小籠包', reading: 'しょうろんぽう' },
  { display: '天津飯', reading: 'てんしんはん' },
  { display: '親子丼', reading: 'おやこどん' },
  { display: 'カツ丼', reading: 'かつどん' },
  { display: '天丼', reading: 'てんどん' },
  { display: 'うな重', reading: 'うなじゅう' },
  { display: '海鮮丼', reading: 'かいせんどん' },
  { display: 'マグロの握り寿司', reading: 'まぐろのにぎりずし' },
  { display: 'サーモンアボカド丼', reading: 'さーもんあぼかどどん' },
  { display: 'お好み焼き', reading: 'おこのみやき' },
  { display: 'たこ焼き', reading: 'たこやき' },
  { display: '焼きそば', reading: 'やきそば' },
  { display: 'もんじゃ焼き', reading: 'もんじゃやき' },
  { display: '肉じゃが', reading: 'にくじゃが' },
  { display: 'サバの味噌煮', reading: 'さばのみそに' },
  { display: 'ブリの照り焼き', reading: 'ぶりのてりやき' },
  { display: 'アジフライ', reading: 'あじふらい' },
  { display: 'カキフライ', reading: 'かきふらい' },
  { display: 'エビフライ', reading: 'えびふらい' },
  { display: 'コロッケ', reading: 'ころっけ' },
  { display: 'メンチカツ', reading: 'めんちかつ' },
  { display: 'すき焼き', reading: 'すきやき' },
  { display: 'しゃぶしゃぶ', reading: 'しゃぶしゃぶ' },
  { display: 'もつ鍋', reading: 'もつなべ' },
  { display: 'キムチ鍋', reading: 'きむちなべ' },
  { display: 'おでん', reading: 'おでん' },
  { display: '茶碗蒸し', reading: 'ちゃわんむし' },
  { display: 'だし巻き卵', reading: 'だしまきたまご' },
  { display: '冷奴', reading: 'ひややっこ' },
  { display: '枝豆', reading: 'えだまめ' },
  { display: 'ポテトサラダ', reading: 'ぽてとさらだ' },
  { display: 'シーザーサラダ', reading: 'しーざーさらだ' },
  { display: 'コーンスープ', reading: 'こーんすーぷ' },
  { display: 'ミネストローネ', reading: 'みねすとろーね' },
  { display: 'クラムチャウダー', reading: 'くらむちゃうだー' },
  { display: 'ビーフシチュー', reading: 'びーふしちゅー' },
  { display: 'クリームシチュー', reading: 'くりーむしちゅー' },
  { display: 'ハヤシライス', reading: 'はやしらいす' },
  { display: 'ドライカレー', reading: 'どらいかれー' },
  { display: 'カツカレー', reading: 'かつかれー' },
  { display: 'ナポリタン', reading: 'なぽりたん' },
  { display: 'ミートソースパスタ', reading: 'みーとそーすぱすた' },
  { display: 'ペペロンチーノ', reading: 'ぺぺろんちーの' },
  { display: 'たらこスパゲッティ', reading: 'たらこすぱげってぃ' },
  { display: 'マルゲリータピザ', reading: 'まるげりーたぴざ' },
  { display: 'グラタン', reading: 'ぐらたん' },
  { display: 'ドリア', reading: 'どりあ' },
  { display: 'ラザニア', reading: 'らざにあ' },
  { display: 'ローストビーフ', reading: 'ろーすとびーふ' },
  { display: 'サーロインステーキ', reading: 'さーろいんすてーき' },
  { display: 'チーズバーガー', reading: 'ちーずばーがー' },
  { display: 'てりやきバーガー', reading: 'てりやきばーがー' },
  { display: 'ホットドッグ', reading: 'ほっとどっぐ' },
  { display: 'フライドポテト', reading: 'ふらいどぽてと' },
  { display: 'フライドチキン', reading: 'ふらいどちきん' },
  { display: 'サンドイッチ', reading: 'さんどいっち' },
  { display: 'カツサンド', reading: 'かつさんど' },
  { display: 'クロワッサン', reading: 'くろわっさん' },
  { display: 'カレーパン', reading: 'かれーぱん' },
  { display: 'メロンパン', reading: 'めろんぱん' },
  { display: 'あんぱん', reading: 'あんぱん' },
  { display: 'フレンチトースト', reading: 'ふれんちとーすと' },
  { display: 'パンケーキ', reading: 'ぱんけーき' },
  { display: 'ワッフル', reading: 'わっふる' },
  { display: 'クレープ', reading: 'くれーぷ' },
  { display: 'ショートケーキ', reading: 'しょーとけーき' },
  { display: 'チーズケーキ', reading: 'ちーずけーき' },
  { display: 'ガトーショコラ', reading: 'がとーしょこら' },
  { display: 'モンブラン', reading: 'もんぶらん' },
  { display: 'ティラミス', reading: 'てぃらみす' },
  { display: 'シュークリーム', reading: 'しゅーくりーむ' },
  { display: 'エクレア', reading: 'えくれあ' },
  { display: 'カスタードプリン', reading: 'かすたーどぷりん' },
  { display: 'コーヒーゼリー', reading: 'こーひーぜりー' },
  { display: 'フルーツパフェ', reading: 'ふるーつぱふぇ' },
  { display: '抹茶アイスクリーム', reading: 'まっちゃあいすくりーむ' },
  { display: 'かき氷', reading: 'かきごおり' },
  { display: 'みたらし団子', reading: 'みたらしだんご' },
  { display: 'いちご大福', reading: 'いちごだいふく' },
];

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [currentFood, setCurrentFood] = useState<FoodItem>(FOOD_LIST[0]);
  const [inputValue, setInputValue] = useState<string>('');
  const [clearedCount, setClearedCount] = useState<number>(0);

  const [showCorrectMark, setShowCorrectMark] = useState<boolean>(false);
  const [questionKey, setQuestionKey] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const markTimerRef = useRef<number | null>(null);
  const isComposingRef = useRef<boolean>(false); // IME変換中フラグ

  const toHiragana = (str: string) => {
    return str.replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  };

  const pickNextFood = (excludeDisplay?: string) => {
    const candidates = FOOD_LIST.filter((item) => item.display !== excludeDisplay);
    const randomIndex = Math.floor(Math.random() * candidates.length);
    setCurrentFood(candidates[randomIndex]);
    setInputValue('');
    setQuestionKey((prev) => prev + 1);
  };

  React.useLayoutEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.value = '';
      setInputValue('');
      inputRef.current.focus();
    }
  }, [questionKey, gameState]);

  const triggerCorrectMark = () => {
    if (markTimerRef.current) {
      window.clearTimeout(markTimerRef.current);
    }
    setShowCorrectMark(true);
    markTimerRef.current = window.setTimeout(() => {
      setShowCorrectMark(false);
    }, 550);
  };

  const startGame = () => {
    setScore(0);
    setClearedCount(0);
    setTimeLeft(60);
    setInputValue('');
    setShowCorrectMark(false);
    pickNextFood();
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 正解チェックの共通関数
  const checkAndProcessInput = (val: string) => {
    const cleanInput = val.replace(/\s+/g, '');
    const normalizedInput = toHiragana(cleanInput);
    const normalizedDisplay = toHiragana(currentFood.display);

    if (
      normalizedInput === currentFood.reading ||
      cleanInput === currentFood.display ||
      normalizedInput === normalizedDisplay
    ) {
      setScore((prev) => prev + 10);
      setClearedCount((prev) => prev + 1);

      // DOMとステートを完全に空にする
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setInputValue('');

      triggerCorrectMark();
      pickNextFood(currentFood.display);

      // iPhoneのキーボードバッファ残留を防ぐため、次フレームでもう一度強制クリアを予約
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.value = '';
          setInputValue('');
        }
      }, 10);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    // IME変換中（未確定状態）でなければ即座に判定
    if (!isComposingRef.current) {
      checkAndProcessInput(val);
    }
  };

  // IME変換が始まったとき
  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  // IME変換が確定したとき（iPhoneで一番文字が残りやすいタイミング）
  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    const val = e.currentTarget.value;
    setInputValue(val);
    checkAndProcessInput(val);
  };

  return (
    <div className="app-container">
      <div className="game-card">
        {gameState === 'start' && (
          <div className="screen start-screen">
            <div className="badge">FOOD FLICK GAME</div>
            <h1 className="title">グルメフリック！</h1>
            <p className="description">
              素早くフリック入力しよう！
            </p>
            <ul className="rules">
              <li>制限時間：60秒</li>
              <li>1フレーズ完成：+10点</li>
              <li>ひらがな・漢字どちらでもOK</li>
            </ul>
            <button className="primary-btn" onClick={startGame}>
              スタート
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="screen play-screen">
            <div className="status-bar">
              <div className={